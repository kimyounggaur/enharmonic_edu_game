// 화면 점검: 배치, 문구, 흐름, 키보드, 소리 예약, 화면 크기, 배달일. 사람이 눈으로 보기 전에 돌린다.
//   node tools/check.mjs [index.html] [묶음…] [--out 보고.json]
//   묶음: layout text flow keys audio resize days shots   (적지 않으면 shots를 뺀 전부)
//   준비: npm i -D playwright && npx playwright install chromium    다른 크롬을 쓰려면 CHROME=실행 파일 경로
// 페이지의 전역 이름(S, M, run, ctx, 엔진 함수, 검사 구획의 t* 함수)을 그대로 읽는다. 페이지를 고치지 않는다.
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
const args = process.argv.slice(2), outAt = args.indexOf("--out"), outFile = outAt >= 0 ? args.splice(outAt, 2)[1] : "";
const fileArg = args.find((a) => a.endsWith(".html")) || "index.html", groups = args.filter((a) => !a.endsWith(".html"));
const file = "file://" + path.resolve(fileArg);
const VIEWS = [[320, 545], [320, 568], [360, 600], [360, 640], [390, 664], [390, 844], [430, 932], [800, 600]];
const report = { file: fileArg, layout: {}, text: {}, flow: [], keys: [], audio: [], resize: [], days: [], counts: {}, fails: [] };
const count = (k, n = 1) => { report.counts[k] = (report.counts[k] || 0) + n; };
const want = (name) => (groups.length ? groups.includes(name) : name !== "shots");
const show = (g) => { console.log("── " + g + " ──"); report[g].forEach((x) => console.log(x)); };
const check = (group, cond, what) => { count(group + (cond ? ":pass" : ":fail")); if (!cond) report.fails.push(group + " · " + what); return cond; };
const lineOf = (group) => (what, cond, got) => { report[group].push((cond ? "ok " : "FAIL ") + what + (cond ? "" : " → " + JSON.stringify(got))); check(group, cond, what + " " + JSON.stringify(got)); };

// ── 페이지 안에서 도는 함수 ──
const inPage = () => {
  window.__probe = () => {                                               // 지금 상태와 모델에서 점검에 쓰는 값
    const m = M, d = dayNow(), run_ = S.screen === "run";
    return { screen: S.screen, day: S.day, idx: S.idx, phase: S.phase, pos: S.pos, pen: S.pen, target: m.target, from: m.from, steps: m.steps, win: m.win, lo: winLo(m.win), hi: winHi(m.win),
      board: S.board.map(keyOf), rest: (m.rest || []).map((p) => ({ k: keyOf(p), h: midiOf(anchorOf(p)), a: p.a })), todo: m.todo, right: m.right || [], picks: S.picks, off: S.off,
      cause: m.cause || null, mis: m.mis || null, msg: S.msg.text, tone: S.msg.tone, done: S.done, flawed: S.flawed, tries: S.tries, closing: S.screen === "close", signs: m.day.signs,
      hop: m.hop, lit: S.lit, results: S.results, requeue: S.requeue, id: m.job.id, jobs: d.jobs.length, queue: queueNow().length, first: run_ && !S.results.some((r) => r.id === m.job.id),
      mine: S.mine, goal: S.goal, scene: S.scene, report: S.report, gained: S.gained, dev: S.dev, whites: [...document.querySelectorAll(".wh")].map((e) => +e.dataset.m) };
  };
  window.__metrics = () => {                                             // 배달 화면의 치수와 넘침
    const q = (id) => document.getElementById(id), R = (el) => el.getBoundingClientRect(), out = { issues: [] }, de = document.documentElement;
    const vis = (el) => { if (!el || el.closest("[hidden]")) return false; const r = R(el); return r.width > 0 && r.height > 0; };
    out.scrollX = de.scrollWidth - innerWidth; out.scrollY = de.scrollHeight - innerHeight;
    out.rows = ["hud", "card", "stage", "readout", "controls"].map((id) => Math.round(R(q(id)).height * 10) / 10);
    const st = q("stage"), sr = R(st), inside = (r, box, pad = 0.6) => r.top >= box.top - pad && r.bottom <= box.bottom + pad && r.left >= box.left - pad && r.right <= box.right + pad;
    for (const id of ["sheet", "street", "houses", "zones", "boardRow", "routeRow", "envelope", "staff"]) if (!inside(R(q(id)), sr)) out.issues.push("무대 밖으로 나감: " + id);
    if (st.scrollHeight > st.clientHeight + 1) out.issues.push("무대 넘침 " + (st.scrollHeight - st.clientHeight) + "px");
    const textH = (el) => { const g = document.createRange(); g.selectNodeContents(el); return g.getBoundingClientRect().height; };
    out.readoutH = Math.round(textH(q("readout")) * 10) / 10;
    if (out.readoutH > 40.5) out.issues.push("판독 줄이 2줄을 넘음: " + q("readout").textContent);
    out.askH = Math.round(R(q("ask")).height * 10) / 10;
    if (out.askH > R(q("card")).height - 2) out.issues.push("편지 카드가 넘침: " + q("ask").textContent);
    let minFont = 99; const small = [];
    document.querySelectorAll("#app *").forEach((el) => {
      if (!vis(el) || el.closest(".sr") || el.closest("svg")) return;
      if (![...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) return;
      const f = parseFloat(getComputedStyle(el).fontSize);
      if (f < minFont) minFont = f;
      if (f < 12) small.push(el.id || el.className);
    });
    out.minFont = minFont;
    if (small.length) out.issues.push("12px보다 작은 글자: " + small.join(","));
    let minBtn = 999;
    document.querySelectorAll("#app button").forEach((b) => {
      if (!vis(b) || b.classList.contains("house")) return;
      const r = R(b); minBtn = Math.min(minBtn, r.width, r.height);
      if (r.width < 43.9 || r.height < 43.9) out.issues.push("44px보다 작은 단추: " + (b.id || b.textContent) + " " + r.width.toFixed(1) + "x" + r.height.toFixed(1));
      if (b.scrollWidth > b.clientWidth + 1) out.issues.push("단추 글자가 넘침: " + (b.id || b.textContent));
      if (!inside(r, R(q("controls")), 0.6) && !b.closest("#hud")) out.issues.push("조작부 밖의 단추: " + (b.id || b.textContent));
    });
    out.minBtn = Math.round(minBtn * 10) / 10;
    out.mainH = R(q("main")).height;
    const wh = document.querySelector(".wh"), bk = document.querySelector(".bk");
    out.white = [Math.round(R(wh).width * 10) / 10, Math.round(R(wh).height * 10) / 10];
    out.black = [Math.round(R(bk).width * 10) / 10, Math.round(R(bk).height * 10) / 10];
    out.staffW = Math.round(R(q("staff")).width * 10) / 10; out.sheetH = Math.round(R(q("sheet")).height * 10) / 10;
    const sv = R(q("staff"));
    document.querySelectorAll("#staff .note, #staff .clef").forEach((n) => { if (!inside(R(n), sv, 0.8)) out.issues.push("악보 밖으로 나간 그림: " + (n.dataset.k || "음자리표")); });
    const notes = [...document.querySelectorAll("#staff .note")].map((n) => R(n));
    for (let i = 1; i < notes.length; i++) if (notes[i].left < notes[i - 1].right - 0.5) out.issues.push("음표끼리 겹침");
    const clef = document.querySelector("#staff .clef"), firstAcc = document.querySelector("#staff .note");
    if (clef && firstAcc && R(firstAcc).left < R(clef).right - 0.5) out.issues.push("음자리표와 음표가 겹침");
    const board = q("board");
    if (vis(board)) { const br = R(q("boardRow")); if (!inside(R(board), br, 0.8)) out.issues.push("문패 판이 줄 밖으로 나감"); board.querySelectorAll(".plate").forEach((p) => { if (p.scrollWidth > p.clientWidth + 1) out.issues.push("문패 글자가 넘침"); }); out.boardW = Math.round(R(board).width); }
    const street = R(q("street"));
    if (vis(q("pin")) && !inside(R(q("pin")), { top: street.top - 6, bottom: street.bottom, left: street.left - 12, right: street.right + 12 })) out.issues.push("우체부가 길 밖");
    document.querySelectorAll("#zones span").forEach((z) => { if (z.scrollWidth > z.clientWidth + 1) out.issues.push("구역 글자가 잘림: " + z.textContent); });
    if (q("envName").scrollWidth > q("envelope").clientWidth) out.issues.push("봉투의 주소가 넘침");
    document.querySelectorAll(".wh b, .wh span").forEach((t) => { if (t.scrollWidth > t.parentElement.clientWidth + 1) out.issues.push("집 글자가 넘침"); });
    return out;
  };
  window.__sheet = (id) => {                                             // 겹쳐 뜨는 화면(지도, 마감)의 치수와 넘침
    const el = document.getElementById(id), R = (x) => x.getBoundingClientRect(), out = { issues: [] }, box = R(el);
    const vis = (x) => { if (x.closest("[hidden]")) return false; const r = R(x); return r.width > 0 && r.height > 0; };
    out.scrollX = document.documentElement.scrollWidth - innerWidth;
    if (out.scrollX > 0 || el.scrollWidth > el.clientWidth + 1) out.issues.push("가로로 넘침");
    let minFont = 99, minBtn = 999;
    el.querySelectorAll("*").forEach((x) => {
      if (!vis(x) || x.closest(".sr") || x.closest("svg")) return;
      if ([...x.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) { const f = parseFloat(getComputedStyle(x).fontSize); minFont = Math.min(minFont, f); if (f < 12) out.issues.push("12px보다 작은 글자: " + x.textContent.trim().slice(0, 12)); }
      if (x.tagName === "BUTTON") {
        const r = R(x); minBtn = Math.min(minBtn, r.width, r.height);
        if (r.width < 43.9 || r.height < 43.9) out.issues.push("44px보다 작은 단추: " + x.textContent.trim().slice(0, 12));
        if (x.scrollWidth > x.clientWidth + 1) out.issues.push("단추 글자가 넘침: " + x.textContent.trim().slice(0, 12));
        if (r.left < box.left - 0.6 || r.right > box.right + 0.6) out.issues.push("화면 밖의 단추: " + x.textContent.trim().slice(0, 12));
      }
    });
    out.minFont = minFont; out.minBtn = Math.round(minBtn * 10) / 10; out.scrolls = el.scrollHeight > el.clientHeight + 1;
    return out;
  };
  window.__walkAll = () => {                                             // 배달 전부를 바른 길과 두 번씩 틀리는 길로 지나며 장면마다 잰다. 상태를 넣어서 넘긴다(입력 없이 돈다)
    const out = { scenes: 0, minFont: 99, minBtn: 999, maxReadout: 0, maxAsk: 0, maxBoard: 0, rows: {}, issues: [], mode: document.getElementById("app").dataset.mode };
    const snap = (tag) => {
      const m = window.__metrics();
      out.scenes++;
      out.minFont = Math.min(out.minFont, m.minFont); out.minBtn = Math.min(out.minBtn, m.minBtn); out.maxReadout = Math.max(out.maxReadout, m.readoutH); out.maxAsk = Math.max(out.maxAsk, m.askH);
      out.maxBoard = Math.max(out.maxBoard, m.boardW || 0); out.rows[m.rows.join("/")] = 1; out.white = m.white; out.black = m.black; out.staff = [m.staffW, m.sheetH];
      if (m.scrollX > 0 || m.scrollY > 0) m.issues.push(`스크롤 ${m.scrollX}/${m.scrollY}`);
      if (m.mainH < 51.9) m.issues.push("주 단추가 52px보다 낮음");
      m.issues.forEach((i) => out.issues.push(tag + " · " + i));
    };
    for (const wrongs of [0, 2]) for (const d of BOOK) d.jobs.forEach((job, j) => {
      openRun(d.id, j, [], [], { dev: true });
      for (let guard = 0; guard < 60; guard++) {
        const ph = S.phase, len = S.board.length, tag = M.job.id + " " + ph + (wrongs ? " (틀리는 길)" : "");
        snap(tag);
        if (ph === "deliver") {
          if (S.board.length > 1) for (const k of [0, S.board.length]) { setState({ lit: k, msg: say("good", listenLabel(S.board, k)) }); snap(tag + " 듣기 " + k); }
          break;
        }
        for (let k = 0; k < wrongs && S.phase === ph && S.board.length === len; k++) { const st = tSpoil(M, S); if (!st) break; setState(st); snap(tag + " 오답" + (k + 1)); }
        if (S.phase !== ph || S.board.length !== len) continue;
        if (ph === "plate") {                                            // 쓰는 도중: 흰 집만 고른 때, 기호까지 고른 때
          const ans = M.rest.find((n) => !S.board.some((b) => sameSpell(b, n)));
          setState(tApply(S, F.move(M, S, midiOf(anchorOf(ans))))); snap(tag + " 글자");
          setState(tApply(S, F.sign(M, S, ans.a))); snap(tag + " 기호");
          setState(tApply(S, F.confirm(M, S)));
        } else setState(tSolve(M, S));
      }
    });
    if (typeof SCENES !== "undefined") for (const sc of SCENES) {         // 발견 장면: 문장마다, 그리고 들어 보기의 표시마다
      openScene(sc, "run");
      M.lines.forEach((line, i) => { setState({ scene: Object.assign({}, S.scene, { line: i }), msg: say("", line) }); snap(sc.id + " 문장" + (i + 1)); });
      const n = M.tune ? M.tune.mids.length : S.board.length;
      for (let k = 0; k <= n; k++) { setState({ lit: k }); snap(sc.id + " 듣기 " + k); }
    }
    out.rows = Object.keys(out.rows);
    return out;
  };
  // 오디오 스파이: 발진기의 주파수, 예약 시각, 취소를 적는다
  const log = []; window.__audio = log; window.__bursts = 0;
  const AC = window.AudioContext; if (!AC) return;
  const mk = AC.prototype.createOscillator;
  AC.prototype.createOscillator = function () {
    const c = this, o = mk.call(this), e = { freq: null, startAt: null, stopAt: null, calledAt: null, cancels: [], peak: null };
    const set = o.frequency.setValueAtTime.bind(o.frequency);
    o.frequency.setValueAtTime = (v, w) => { e.freq = Math.round(v * 100) / 100; return set(v, w); };
    const start = o.start.bind(o); o.start = (w) => { e.startAt = w; e.calledAt = c.currentTime; log.push(e); return start(w); };
    const stop = o.stop.bind(o); o.stop = (w) => { if (w === undefined) e.cancels.push(c.currentTime); else e.stopAt = w; return stop(w); };
    return o;
  };
  const mb = AC.prototype.createBufferSource;
  AC.prototype.createBufferSource = function () { window.__bursts++; return mb.call(this); };
};

const browser = await chromium.launch({ executablePath: process.env.CHROME || undefined, args: ["--no-sandbox", "--autoplay-policy=no-user-gesture-required"] });
async function open(w, h, touch = true, hash = "", init = null) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 2, isMobile: touch, hasTouch: touch });
  const page = await ctx.newPage();
  page.errs = []; page.reqs = [];
  page.on("console", (m) => { if (m.type() === "error") page.errs.push(m.text()); });
  page.on("pageerror", (e) => page.errs.push(String(e)));
  page.on("request", (r) => { if (!r.url().startsWith("file:")) page.reqs.push(r.url()); });
  if (init) await page.addInitScript(init);
  await page.addInitScript(inPage);
  await page.goto(file + hash);
  await page.waitForFunction(() => window.__twn && window.__tests);
  return page;
}
const probe = (page) => page.evaluate(() => window.__probe());
const metrics = (page) => page.evaluate(() => window.__metrics());
const has = (page, name) => page.evaluate((n) => { try { return typeof (0, eval)(n) !== "undefined"; } catch (e) { return false; } }, name);   // 그 이름이 페이지에 있는가(단계마다 다르다)
async function tapHouse(page, m) {                                       // 흰 집은 아래쪽, 검은 집은 가운데를 누른다
  const loc = page.locator(`.house[data-m="${m}"]`), box = await loc.boundingBox(), white = await loc.evaluate((e) => e.classList.contains("wh"));
  await page.touchscreen.tap(box.x + box.width / 2, box.y + box.height * (white ? 0.82 : 0.5));
}
const tap = (page, sel) => page.tap(sel);
async function solve(page, p) {                                          // 지금 단계를 바르게 푼다
  if (p.screen === "scene") await tap(page, "#main");
  else if (p.phase === "start") { await tapHouse(page, p.from); await tap(page, "#main"); }
  else if (p.phase === "walk") { for (let i = 0; i < Math.abs(p.target - p.pos); i++) await tap(page, p.target > p.pos ? "#goRight" : "#goLeft"); await tap(page, "#main"); }
  else if (p.phase === "drop") { await tapHouse(page, p.target); await tap(page, "#main"); }
  else if (p.phase === "plate") { const ans = p.rest.find((r) => !p.board.includes(r.k)); await tapHouse(page, ans.h); await tap(page, `#setSign [data-a="${ans.a}"]`); await tap(page, "#main"); }
  else if (p.phase === "sort") { for (let i = 0; i < p.right.length; i++) if (p.right[i] !== p.picks[i]) await tap(page, `#setCards [data-i="${i}"]`); await tap(page, "#main"); }
  else if (p.phase === "diag") await tap(page, `#setCause [data-c="${p.cause}"]`);
  else if (p.phase === "deliver") await tap(page, "#main");
}
async function spoil(page, p) {                                          // 지금 단계에서 한 번 틀린다. 틀릴 수 없으면 false
  if (p.phase === "start") { await tapHouse(page, p.whites.find((w) => w !== p.from && Math.abs(w - p.from) > 2)); await tap(page, "#main"); }
  else if (p.phase === "walk") { if (p.pos === p.target) await tap(page, p.steps > 0 ? "#goLeft" : "#goRight"); await tap(page, "#main"); }
  else if (p.phase === "drop") { await tapHouse(page, p.target + (p.target + 1 <= p.hi ? 1 : -1)); await tap(page, "#main"); }
  else if (p.phase === "plate") {
    const ans = p.rest.find((r) => !p.board.includes(r.k)), bad = ans.a > -2 && p.signs.includes(ans.a - 1) ? ans.a - 1 : ans.a + 1;
    await tapHouse(page, ans.h); await tap(page, `#setSign [data-a="${bad}"]`); await tap(page, "#main");
  } else if (p.phase === "sort") {
    const i = p.right.findIndex((r, k) => !r && !p.off.includes(k));
    if (i < 0) return false;
    if (!p.picks[i]) await tap(page, `#setCards [data-i="${i}"]`);
    await tap(page, "#main");
  } else if (p.phase === "diag") await tap(page, `#setCause [data-c="${["letter", "dir", "count", "octave"].find((c) => c !== p.cause && !p.off.includes(c))}"]`);
  else return false;
  return true;
}
async function toDeliver(page, wrongs = 0) {                             // 지금 배달을 듣기 단계까지 한다. wrongs: 단계마다 틀릴 횟수. 발견 장면은 넘긴다
  for (let guard = 0; guard < 60; guard++) {
    let p = await probe(page);
    if (p.closing || (p.screen === "run" && p.phase === "deliver")) return p;
    if (p.screen === "scene") { await tap(page, "#main"); continue; }
    for (let k = 0; k < wrongs; k++) { const q = await probe(page); if (q.phase !== p.phase || q.board.length !== p.board.length || !(await spoil(page, q))) break; }
    p = await probe(page);
    if (p.phase !== "deliver") await solve(page, p);
  }
  return null;
}
async function finishJob(page, wrongs = 0) {                             // 지금 배달을 마치고 주 단추로 넘긴다(다음 배달, 발견 장면, 또는 마감)
  const p = await toDeliver(page, wrongs);
  if (p && !p.closing) await tap(page, "#main");
  return p;
}

// ── 1. 배치: 여덟 화면 × 배달 전부 × (바른 길, 두 번씩 틀리는 길)의 모든 장면. 입력 없이 상태를 넣어 넘긴다 ──
if (want("layout")) await Promise.all(VIEWS.map(async ([w, h]) => {
  const key = w + "x" + h, page = await open(w, h, true, "#sp");
  if (h < 545) await tap(page, "#goOn");
  const L = await page.evaluate(() => window.__walkAll());
  report.layout[key] = L;
  count("layout:scenes", L.scenes); count("layout:pass", L.scenes - new Set(L.issues.map((i) => i.split(" · ")[0])).size);
  for (const i of L.issues) { report.fails.push(key + " · " + i); count("layout:fail"); }
  check("layout-rows", L.rows.length === 1, key + " 다섯 줄의 높이가 장면마다 다르다 " + L.rows.join(" | "));
  check("console", page.errs.length === 0, key + " 콘솔 오류 " + JSON.stringify(page.errs));
  check("network", page.reqs.length === 0, key + " 외부 요청 " + page.reqs.length);
  await page.context().close();
  console.log(key, L.mode, "장면", L.scenes, "줄", L.rows.join(" | "), "글자≥", L.minFont, "단추≥", L.minBtn, "흰 집", L.white.join("×"), "검은 집", L.black.join("×"), "악보", L.staff.join("×"), "판독", L.maxReadout, "카드", L.maxAsk, "문패 판", L.maxBoard, "문제", L.issues.length);
}));

// ── 2. 문구가 두 줄에 들어가는가: 문구 전부를 좁은 화면의 판독 줄과 편지 카드에 넣어 본다 ──
if (want("text")) {
  for (const [w, h] of [[320, 545], [320, 568], [360, 600], [390, 664]]) {
    const page = await open(w, h, true, "#sp");
    const res = await page.evaluate(() => {
      const ro = document.getElementById("readout"), ask = document.getElementById("ask"), card = document.getElementById("card"), over = [], overCard = [];
      const H = (el) => { const g = document.createRange(); g.selectNodeContents(el); return g.getBoundingClientRect().height; };
      const texts = window.__twn.texts().concat(typeof abortText === "function" ? ["[다시 듣기]", "[들어 보기]"].flatMap((b) => [abortText("hidden", b), abortText("stall", b)]) : []);   // 발견 장면이 있으면 그 문장도 들어 있다
      const cards = BOOK.flatMap((d) => d.jobs.map((j) => cardText(jobModel(j, d)))).concat(typeof SCENES !== "undefined" ? SCENES.map((sc) => sceneModel(sc, sceneDay(sc)).card) : []);
      let maxH = 0;
      for (const t of texts) { ro.innerHTML = "<span>" + rich(t) + "</span>"; const hh = H(ro); maxH = Math.max(maxH, hh); if (hh > 40.5) over.push(t); }
      for (const c of cards) { document.getElementById("chip").textContent = c.chip; ask.innerHTML = rich(c.text); if (ask.getBoundingClientRect().height > card.getBoundingClientRect().height - 2) overCard.push(c.text); }
      return { n: texts.length, over, maxH: Math.round(maxH * 10) / 10, cards: cards.length, overCard };
    });
    report.text[w + "x" + h] = res;
    check("text", res.over.length === 0 && res.overCard.length === 0, `${w}x${h} 넘치는 문구 ${JSON.stringify(res.over.concat(res.overCard))}`);
    console.log(w + "x" + h, "문구", res.n, "최대 높이", res.maxH, "넘침", res.over.length, "카드", res.cards, "넘침", res.overCard.length);
    await page.context().close();
  }
}

// ── 3. 흐름과 문구: 390×844에서 검사용 하루(#sp)의 아홉 건을 손으로 ──
if (want("flow")) {
  const page = await open(390, 844, true, "#sp");
  const F = lineOf("flow"), hasDays = await has(page, "dayReport");
  const txt = () => page.evaluate(() => document.getElementById("readout").textContent.replace(/\s+/g, " ").trim());
  let p = await probe(page);
  F("처음에는 소리 켜기 단추가 보인다", await page.isVisible("#soundChip"), null);
  // sp-1 바로 배달 G4
  await tap(page, "#main"); p = await probe(page);
  F("sp-1 고르지 않고 배달: 채점하지 않고 안내만 한다", p.phase === "drop" && !p.flawed && p.tries === 0 && /집을 먼저 골라 주세요/.test(p.msg), [p.phase, p.msg]);
  F("소리 켜기 단추가 첫 손짓 뒤에 사라진다", !(await page.isVisible("#soundChip")), null);
  await tapHouse(page, 69); await tap(page, "#main"); p = await probe(page);
  F("sp-1 A4에 배달: 1차는 내 길과 까닭", p.flawed && p.tries === 1 && p.mine && p.mine.to === 69 && /기호가 없으면 글자 집이 도착 집이에요. 지금은 오른쪽으로 두 칸 옆집이에요/.test(p.msg), [p.mine, p.msg]);
  await tap(page, "#main"); p = await probe(page);
  F("sp-1 2차: 우체부를 G4로 옮겨 주고 확정을 기다린다", p.phase === "drop" && p.pos === 67 && p.tries === 2 && !!p.goal, [p.pos, p.msg]);
  await tap(page, "#main"); p = await probe(page);
  F("sp-1 납품, 기록은 절반", p.phase === "deliver" && p.done === "half" && /4구역의 솔 집/.test(p.msg), [p.done, p.msg]);
  await tap(page, "#main");
  // sp-2 걸어서 C#4
  p = await probe(page);
  F("sp-2 출발 단계로 시작", p.id === "sp-2" && p.phase === "start" && /글자 C의 흰 집/.test(p.msg), p.msg);
  await tapHouse(page, 61); await tap(page, "#main"); p = await probe(page);
  F("sp-2 검은 집에서 출발: 흰 집이어야 한다고 말한다", p.phase === "start" && /출발 집은 늘 흰 집/.test(p.msg), p.msg);
  await tapHouse(page, 60); await tap(page, "#main"); p = await probe(page);
  F("sp-2 출발 집 C4 → 걸음 단계", p.phase === "walk" && p.pos === 60 && /샵은 오른쪽으로 한 칸/.test(p.msg), p.msg);
  await tapHouse(page, 64); p = await probe(page);
  F("sp-2 걸음 단계에서 집을 눌러도 옮겨지지 않는다", p.pos === 60 && /걸어서 가요/.test(p.msg), [p.pos, p.msg]);
  await tap(page, "#goLeft"); await tap(page, "#main"); p = await probe(page);
  F("sp-2 왼쪽으로 걸음: 방향이 까닭", p.phase === "walk" && /샵은 오른쪽이에요. 지금은 왼쪽으로 걸었어요/.test(p.msg), p.msg);
  await tap(page, "#goRight"); await tap(page, "#goRight");
  let hops = await page.evaluate(() => document.querySelector("#routes g").dataset.hops);
  F("sp-2 걸음 호 1개", hops === "1", hops);
  await tap(page, "#goRight"); hops = await page.evaluate(() => document.querySelector("#routes g").dataset.hops);
  F("sp-2 두 칸 걸으면 호 2개", hops === "2", hops);
  await tap(page, "#goLeft"); await tap(page, "#main"); p = await probe(page);
  F("sp-2 납품(기록 절반)", p.phase === "deliver" && p.done === "half" && p.board.join() === "C#4", [p.done, p.board]);
  await tap(page, "#main");
  // sp-3 걸어서 Db4 → 두 주소
  for (let i = 0; i < 2; i++) { p = await probe(page); await solve(page, p); }
  p = await probe(page);
  F("sp-3 한 번에 납품, 문패 둘", p.phase === "deliver" && p.done === "full" && p.board.join() === "Db4,C#4" && /주소 2개가 한 집에/.test(p.msg), [p.board, p.msg]);
  F("sp-3 문패 판에 두 주소가 보인다", (await page.locator("#board .plate").count()) === 2 && (await page.locator("#routes g").count()) === 2, null);
  await page.waitForFunction(() => S.lit === 0, null, { timeout: 3000 });
  F("sp-3 듣기: 첫 주소가 밝아지고 판독 줄이 그 걸음을 말한다", /레에서 왼쪽으로 한 칸/.test(await txt()), await txt());
  await page.waitForFunction(() => S.lit === 2, null, { timeout: 4000 });
  F("sp-3 듣기: 함께 낼 때 두 문패가 모두 밝다", (await page.locator("#board .plate.is-lit").count()) === 2 && /한 소리/.test(await txt()), await txt());
  await page.waitForFunction(() => S.lit === -1 && !run, null, { timeout: 5000 });
  p = await probe(page);
  F("sp-3 듣기가 끝나면 한 문장", p.msg === "⟦Db4⟧는 레에서 반음 아래, ⟦C#4⟧는 도에서 반음 위. 같은 집이에요.", p.msg);
  await tap(page, "#main");
  // sp-4 F#4 + 문패 하나
  p = await probe(page); await solve(page, p); p = await probe(page);
  F("sp-4 배달 뒤 문패 쓰기", p.phase === "plate" && p.todo === 1 && (await page.locator("#board .slot").count()) === 1, [p.phase, p.todo]);
  await tap(page, "#main"); p = await probe(page);
  F("sp-4 덜 고르고 확정: 채점하지 않는다", !p.flawed && /모두 골라요/.test(p.msg), p.msg);
  await tapHouse(page, 66); p = await probe(page);
  F("sp-4 검은 집을 누르면 안내만", p.pen.h === null && /흰 집을 골라요/.test(p.msg), p.msg);
  await tapHouse(page, 65); await tap(page, '#setSign [data-a="1"]'); await tap(page, "#main"); p = await probe(page);
  F("sp-4 이미 달린 문패(F#4): 채점하지 않는다", !p.flawed && /이미 달린 문패/.test(p.msg), p.msg);
  await tapHouse(page, 67); await tap(page, '#setSign [data-a="1"]');
  hops = await page.evaluate(() => { const g = document.querySelector("#routes g"); return g ? g.className.baseVal + g.dataset.hops : ""; });
  F("sp-4 미리 보기: G에서 샵 한 칸의 길이 그려진다", hops === "r-live1", hops);
  const env = await page.evaluate(() => document.getElementById("envelope").textContent.replace(/\s+/g, " "));
  F("sp-4 봉투에 쓰는 주소와 기호의 읽기", /쓰는 주소/.test(env) && /샵/.test(env), env);
  await tap(page, "#main"); p = await probe(page);
  F("sp-4 틀린 주소 G#4: 내 길을 보여 주고 까닭을 말한다", p.flawed && p.tries === 1 && p.mine && p.mine.to === 68 && /솔에서 오른쪽으로 한 칸. 다른 집에 도착해요/.test(p.msg), [p.mine, p.msg]);
  await tap(page, '#setSign [data-a="-1"]'); await tap(page, "#main"); p = await probe(page);
  F("sp-4 Gb4 문패 → 납품", p.phase === "deliver" && p.board.join() === "F#4,Gb4" && p.done === "half", [p.board, p.done]);
  await tap(page, "#main");
  // sp-5 악보 편지 E#4
  p = await probe(page);
  const env5 = await page.evaluate(() => document.getElementById("envelope").textContent.replace(/\s+/g, " "));
  F("sp-5 악보 편지: 봉투가 주소를 숨긴다", /악보 편지/.test(env5) && !/E/.test(env5) && (await page.locator('#staff .note[data-k="E#4"]').count()) === 1, env5);
  await solve(page, p); p = await probe(page);
  F("sp-5 E#4는 흰 집 F4", p.phase === "deliver" && p.target === 65 && /미에서 반음 위예요. F 4와 같은 집이에요/.test(p.msg.replace(/⟦F4⟧/, "F 4")), p.msg);
  await tap(page, "#main");
  // sp-6 Cx4 + 세 주소
  for (let i = 0; i < 2; i++) { p = await probe(page); await solve(page, p); }
  p = await probe(page);
  F("sp-6 더블샵은 두 칸 → 문패 둘을 더 쓴다", p.phase === "plate" && p.todo === 2 && p.target === 62 && (await page.locator("#board .slot").count()) === 2, [p.phase, p.todo]);
  await solve(page, p); p = await probe(page);
  F("sp-6 하나를 달면 남은 수를 말한다", p.phase === "plate" && p.board.length === 2 && /주소가 1개 더 있어요/.test(p.msg), p.msg);
  await tapHouse(page, 64); await tap(page, '#setSign [data-a="-1"]'); await tap(page, "#main"); p = await probe(page);
  F("sp-6 Eb4는 다른 집", p.flawed && /미에서 왼쪽으로 한 칸. 다른 집에 도착해요/.test(p.msg), p.msg);
  await tap(page, "#main"); p = await probe(page);
  F("sp-6 두 번 틀리면 적어 준다", p.tries === 2 && p.pen.h === 64 && p.pen.a === -2 && /적어 두었어요/.test(p.msg), [p.pen, p.msg]);
  await tap(page, "#main"); p = await probe(page);
  F("sp-6 세 주소가 한 집에", p.phase === "deliver" && p.board.join() === "Cx4,D4,Ebb4" && (await page.locator("#staff .note").count()) === 3 && (await page.locator("#routes g").count()) === 3, p.board);
  await tap(page, "#main");
  // sp-7 분류
  p = await probe(page);
  F("sp-7 창이 C4~D5로 옮겨진다", p.lo === 60 && p.hi === 74 && (await page.locator("#setCards button").count()) === 4, [p.lo, p.hi]);
  await tap(page, "#main"); p = await probe(page);
  F("sp-7 고르지 않고 확정", !p.flawed && /하나 이상/.test(p.msg), p.msg);
  await tap(page, '#setCards [data-i="0"]'); await tap(page, '#setCards [data-i="3"]'); await tap(page, "#main"); p = await probe(page);
  F("sp-7 D5를 고르면 구역이 다르다고 말하고 그 카드를 끈다", p.flawed && p.off.join() === "3" && /5구역의 집이에요. 구역이 다르면 다른 소리예요/.test(p.msg) && p.picks.join() === "true,false,false,false", [p.off, p.msg]);
  F("sp-7 꺼진 카드는 눌리지 않는다", await page.locator('#setCards [data-i="3"]').isDisabled(), null);
  await tap(page, "#main"); p = await probe(page);
  F("sp-7 두 번째 오답: 골라 주고 확정을 기다린다", p.tries === 2 && p.picks.join() === "true,true,false,false" && /골라 두었어요/.test(p.msg), [p.picks, p.msg]);
  await tap(page, "#main"); p = await probe(page);
  F("sp-7 납품: 세 주소", p.phase === "deliver" && p.board.join() === "D4,Cx4,Ebb4", p.board);
  await tap(page, "#main");
  // sp-8 B#3
  p = await probe(page);
  F("sp-8 창이 B3~C5로 돌아온다", p.lo === 59 && p.hi === 72, [p.lo, p.hi]);
  await tapHouse(page, 71); await tap(page, "#main"); p = await probe(page);
  F("sp-8 4구역의 B에서 출발: 구역이 까닭", /글자는 맞아요. 이 집은 4구역이에요. 편지의 숫자는 3이에요/.test(p.msg), p.msg);
  p = await probe(page); await solve(page, p); p = await probe(page); await solve(page, p); p = await probe(page);
  F("sp-8 B#3은 구역 경계를 넘어 C4", p.phase === "deliver" && p.target === 60 && /시에서 반음 위예요. ⟦C4⟧와 같은 집이에요/.test(p.msg), p.msg);
  await tap(page, "#main");
  // 다시 내기(P17부터): ◐로 끝난 배달이 마감 배달 앞에 한 번 더 나온다. 다시 낸 배달은 바르게 푼다
  const again = [];
  for (p = await probe(page); p.id !== "sp-9" && again.length < 9; p = await probe(page)) { again.push(p.id); await finishJob(page); }
  if (hasDays) F("◐로 끝난 배달 여섯이 마감 배달 앞에 차례로 다시 나온다", again.join() === "sp-1,sp-2,sp-4,sp-6,sp-7,sp-8", again);
  else F("다시 내기가 아직 없으면 바로 마감 배달이다", again.length === 0, again);
  // sp-9 반송 편지
  p = await probe(page);
  F("sp-9 반송: 잘못 걸은 길(C5 → B4)이 보이고 주 단추는 꺼져 있다", p.phase === "diag" && p.mis.from === 72 && p.mis.to === 71 && (await page.locator("#main").isDisabled()) && (await page.locator("#routes g.r-mine").count()) === 1, p.mis);
  await tap(page, '#setCause [data-c="dir"]'); p = await probe(page);
  F("sp-9 까닭을 틀리면 그 단추가 꺼진다", p.phase === "diag" && p.off.join() === "dir" && p.flawed, p.off);
  await tap(page, '#setCause [data-c="octave"]'); p = await probe(page);
  F("sp-9 까닭은 구역 → 고쳐서 배달", p.phase === "drop" && p.pos === 71 && /숫자 4는 출발 집의 구역이에요. 4구역의 C 집에서 출발해요/.test(p.msg), p.msg);
  await solve(page, p); p = await probe(page);
  F("sp-9 Cb4는 B3", p.phase === "deliver" && p.target === 59, p.target);
  F("마지막 배달의 주 단추는 마감하기", (await page.textContent("#main")) === "마감하기", null);
  await tap(page, "#main"); p = await probe(page);
  const sum = await page.textContent("#closeSum");
  F("마감: 한 번에 배달한 수는 첫 번째 결과만 센다", p.closing && /한 번에 배달한 편지 2\/9/.test(sum), sum);
  F("마감 화면이 떠 있는 동안 뒤의 배달 화면은 쓸 수 없다", await page.evaluate(() => document.getElementById("app").inert === true && !document.getElementById("closing").hidden), null);
  if (hasDays) { const note = await page.textContent("#closeNote"); F("마감: 통과 기준(9건이면 8통)을 말한다", p.report && p.report.full === 2 && p.report.need === 8 && !p.report.passed && /8통/.test(note), note); }
  await tap(page, "#restart"); p = await probe(page);
  F("[다시 배달]: 첫 배달로 돌아가고 기록이 빈다", !p.closing && p.id === "sp-1" && p.phase === "drop" && p.results.length === 0 && p.requeue.length === 0 && (await page.locator("#dots i.is-full, #dots i.is-half").count()) === 0, [p.id, p.results]);
  check("console", page.errs.length === 0, "흐름 콘솔 오류 " + JSON.stringify(page.errs));
  await page.context().close();
  show("flow");
}

// ── 4. 키보드만으로 ──
if (want("keys")) {
  const page = await open(800, 600, false, "#sp");
  const K = lineOf("keys");
  const press = async (...ks) => { for (const k of ks) await page.keyboard.press(k); };
  let p = await probe(page);
  await press("ArrowRight", "ArrowRight", "Enter"); p = await probe(page);
  K("sp-1 화살표 두 번(F4 → G4), Enter", p.phase === "deliver" && p.done === "full", [p.phase, p.pos]);
  await press("Enter"); p = await probe(page);
  await press("ArrowLeft", "ArrowLeft", "ArrowLeft", "ArrowLeft", "ArrowLeft", "Enter"); p = await probe(page);
  K("sp-2 왼쪽 다섯 번으로 C4, Enter로 출발", p.phase === "walk" && p.pos === 60, [p.phase, p.pos]);
  await press("ArrowRight", "Enter"); p = await probe(page);
  K("sp-2 오른쪽 한 번, Enter로 배달", p.phase === "deliver" && p.done === "full", p.phase);
  await press("Enter"); p = await probe(page);
  await press("ArrowLeft", "ArrowLeft", "ArrowLeft", "Enter", "ArrowLeft", "Enter", "Enter"); p = await probe(page);
  K("sp-3 끝까지", p.id === "sp-4" && p.phase === "drop", [p.id, p.phase]);
  await press("ArrowRight", "Enter"); p = await probe(page);
  K("sp-4 바로 배달 F#4", p.phase === "plate", p.phase);
  await press("ArrowRight"); p = await probe(page);
  K("sp-4 쓰기: 오른쪽 화살표는 목표 집에서 가까운 흰 집(G4)으로", p.pen.h === 67, p.pen);
  await press("ArrowDown"); p = await probe(page);
  K("sp-4 처음 누른 위아래 화살표는 '기호 없음'부터", p.pen.a === 0, p.pen);
  await press("ArrowDown", "Enter"); p = await probe(page);
  K("sp-4 아래 화살표로 플랫, Enter로 문패", p.phase === "deliver" && p.board.join() === "F#4,Gb4" && p.done === "full", [p.board, p.done]);
  await press("Enter", "Enter"); p = await probe(page);
  K("sp-5 처음 자리가 도착 집(F4)이어도 Enter만으로는 넘어가지 않는다", p.id === "sp-5" && p.phase === "drop" && !p.flawed, [p.id, p.phase]);
  await press("ArrowRight", "ArrowLeft", "Enter", "Enter"); p = await probe(page);
  K("sp-5 한 번 옮겼다 돌아와 Enter", p.id === "sp-6" && p.results[4].done === "full", [p.id, p.results]);
  await press("ArrowLeft", "ArrowLeft", "ArrowLeft", "ArrowLeft", "ArrowLeft", "Enter", "ArrowRight", "ArrowRight", "Enter"); p = await probe(page);
  K("sp-6 걸어서 D4 → 쓰기", p.phase === "plate" && p.todo === 2, p.phase);
  await press("ArrowRight", "ArrowLeft", "3", "Enter"); p = await probe(page);
  K("sp-6 숫자 키 3 = 기호 없음 → D4 문패", p.board.join() === "Cx4,D4", p.board);
  await press("ArrowRight", "1", "Enter"); p = await probe(page);
  K("sp-6 숫자 키 1 = 더블플랫 → Ebb4, 납품", p.phase === "deliver" && p.board.join() === "Cx4,D4,Ebb4" && p.done === "full", [p.board, p.done]);
  await press("Enter", "1", "2", "Enter"); p = await probe(page);
  K("sp-7 숫자 키로 카드 둘을 고르고 Enter", p.phase === "deliver" && p.done === "full", [p.phase, p.done]);
  await press("Enter"); p = await probe(page);
  const need = p.pos - 59;
  await press(...Array(need).fill("ArrowLeft"), "Enter", "ArrowRight", "Enter", "Enter"); p = await probe(page);
  K("sp-8 끝까지", p.id === "sp-9" && p.phase === "diag", [p.id, p.phase]);
  await press("Enter"); p = await probe(page);
  K("sp-9 까닭 단계에서 Enter는 듣지 않는다", p.phase === "diag" && !p.flawed, p.phase);
  await press("4"); p = await probe(page);
  K("sp-9 숫자 키 4 = 구역", p.phase === "drop", p.phase);
  await press(...Array(12).fill("ArrowLeft"), "Enter"); p = await probe(page);
  K("sp-9 왼쪽으로 열두 칸(B3), Enter", p.phase === "deliver" && p.done === "full", [p.pos, p.done]);
  K("키보드만으로 아홉 건을 모두 한 번에 배달", p.results.length === 9 && p.results.every((r) => r.done === "full"), p.results);
  await page.locator("#goLeft").focus();                                  // 숨은 묶음의 단추는 포커스를 받지 못한다
  const before = (await probe(page)).closing;
  await press("Enter"); p = await probe(page);
  K("숨은 단추에 포커스를 주려 해도 Enter는 주 단추로 간다(마감)", before === false && p.closing === true, [before, p.closing]);
  await press("ArrowLeft", "Enter"); p = await probe(page);
  K("마감 화면에서는 화살표와 Enter가 배달을 건드리지 않는다", p.closing === true && p.results.length === 9, [p.closing, p.results.length]);
  const focusOk = await page.evaluate(async () => { window.__twn.openDay(0); const h = document.querySelector('.house[data-m="60"]'); h.focus(); h.click(); return document.activeElement === h; });
  K("집을 누른 뒤에도 포커스가 그 집에 남는다", focusOk, null);
  check("console", page.errs.length === 0, "키보드 콘솔 오류 " + JSON.stringify(page.errs));
  await page.context().close();
  show("keys");
}

// ── 5. 소리: 예약 시각과 주파수, 취소, 멈춤 ──
if (want("audio")) {
  const page = await open(390, 844, true, "#sp");
  const A = lineOf("audio");
  const logSince = (n) => page.evaluate((n) => window.__audio.slice(n).map((e) => ({ f: e.freq, t: e.startAt, stop: e.stopAt, c: e.cancels.length ? e.cancels[0] : null, at: e.calledAt })), n);
  const len = () => page.evaluate(() => window.__audio.length);
  const rel = (list) => list.map((e) => [e.f, Math.round((e.t - list[0].t) * 1000) / 1000, Math.round((e.stop - e.t) * 1000) / 1000]);
  let p = await probe(page);
  A("처음에는 오디오 컨텍스트가 없다", await page.evaluate(() => ctx === null), null);
  await tap(page, "#goRight"); await tap(page, "#goRight"); await page.waitForTimeout(60);
  let L = await logSince(0);
  A("집을 옮길 때마다 그 집의 소리: F#4 369.99Hz, G4 392Hz", L.length === 2 && L[0].f === 369.99 && L[1].f === 392, L.map((e) => e.f));
  A("새 걸음 소리가 앞의 걸음 소리를 끊는다", L[0].c !== null, L[0]);
  A("컨텍스트가 돌고 소리 켜기 단추가 없다", (await page.evaluate(() => ctx.state)) === "running" && !(await page.isVisible("#soundChip")), null);
  let n0 = await len();
  await tap(page, "#main"); await page.waitForTimeout(80);
  L = await logSince(n0); p = await probe(page);
  A("sp-1 납품: G4 한 음(392Hz, 0.65초)", p.phase === "deliver" && L.length === 1 && L[0].f === 392 && Math.abs(L[0].stop - L[0].t - 0.65) < 1e-6, rel(L));
  A("효과음은 발진기가 아니라 잡음이다", (await page.evaluate(() => window.__bursts)) >= 2, null);
  await tap(page, "#main");
  for (let i = 0; i < 2; i++) { p = await probe(page); await solve(page, p); }
  await tap(page, "#main");
  p = await probe(page); await solve(page, p); p = await probe(page);
  await tap(page, "#goLeft"); await page.waitForTimeout(40);
  n0 = await len(); await tap(page, "#main"); await page.waitForTimeout(80);
  L = await logSince(n0);
  const hopCut = (await logSince(0))[n0 - 1];
  A("듣기가 시작되면 남은 걸음 소리를 끊는다", hopCut.c !== null, hopCut);
  A("sp-3 듣기: 277.18Hz가 0, +0.8초, 그리고 +1.6초에 둘이 함께", JSON.stringify(rel(L)) === JSON.stringify([[277.18, 0, 0.65], [277.18, 0.8, 0.65], [277.18, 1.6, 1.13], [277.18, 1.6, 1.13]]), rel(L));
  A("네 음이 한 번에 예약된다", L.every((e) => Math.abs(e.at - L[0].at) < 0.02), L.map((e) => e.at));
  A("두 주소의 주파수가 글자 그대로 같다", L[0].f === L[1].f, null);
  n0 = await len();
  await tap(page, "#again"); await page.waitForTimeout(40); await tap(page, "#again"); await page.waitForTimeout(80);
  const all = await logSince(0), firstBatch = all.slice(n0 - 4, n0), second = all.slice(n0, n0 + 4);
  A("다시 듣기를 연달아 누르면 음이 여덟 개 새로 예약된다", all.length - n0 === 8, all.length - n0);
  A("앞선 묶음의 아직 나지 않은 음은 시작 전에 취소된다", second.every((e) => e.c !== null && e.c <= e.t + 0.001), second.map((e) => [e.t, e.c]));
  A("처음 묶음도 취소된다", firstBatch.every((e) => e.c !== null), firstBatch.map((e) => e.c));
  await page.waitForFunction(() => S.lit === 0);
  await page.evaluate(() => ctx.suspend()); await page.waitForTimeout(250);
  p = await probe(page);
  A("소리가 멈추면 듣기를 멈추고 알린다", p.lit === -1 && /소리가 멈춰서 듣기를 멈췄어요/.test(p.msg) && (await page.isVisible("#soundChip")) && (await page.evaluate(() => run === null)), p.msg);
  await tap(page, "#soundChip"); await page.waitForTimeout(150);
  A("소리 켜기를 누르면 다시 돈다", (await page.evaluate(() => ctx.state)) === "running" && !(await page.isVisible("#soundChip")), null);
  await tap(page, "#again"); await page.waitForFunction(() => S.lit === 0);
  await page.evaluate(() => { Object.defineProperty(document, "hidden", { value: true, configurable: true }); document.dispatchEvent(new Event("visibilitychange")); });
  p = await probe(page);
  A("화면을 떠나면 듣기를 멈춘다", p.lit === -1 && /화면을 떠나서 듣기를 멈췄어요/.test(p.msg), p.msg);
  await page.evaluate(() => { Object.defineProperty(document, "hidden", { value: false, configurable: true }); });
  await tap(page, "#main");
  p = await probe(page); await solve(page, p); p = await probe(page); await solve(page, p);
  await tap(page, "#main"); p = await probe(page); await solve(page, p); await tap(page, "#main");
  for (let i = 0; i < 2; i++) { p = await probe(page); await solve(page, p); }
  p = await probe(page); await solve(page, p); p = await probe(page);
  await tapHouse(page, 64); await tap(page, '#setSign [data-a="-2"]'); await page.waitForTimeout(40);
  n0 = await len(); await tap(page, "#main"); await page.waitForTimeout(80);
  L = await logSince(n0);
  A("sp-6 듣기: 293.66Hz가 0, +0.8, +1.6초, 그리고 +2.4초에 셋이 함께", JSON.stringify(rel(L)) === JSON.stringify([[293.66, 0, 0.65], [293.66, 0.8, 0.65], [293.66, 1.6, 0.65], [293.66, 2.4, 1.13], [293.66, 2.4, 1.13], [293.66, 2.4, 1.13]]), rel(L));
  n0 = await len();
  await tap(page, "#main"); await page.waitForTimeout(60);
  const cut = (await logSince(0)).slice(n0 - 6, n0);
  A("다음 배달로 넘어가면 남은 음이 취소된다", cut.every((e) => e.c !== null), cut.map((e) => e.c));
  check("console", page.errs.length === 0, "소리 콘솔 오류 " + JSON.stringify(page.errs));
  await page.context().close();
  // 소리가 막힌 환경: 발진기를 만들 수 없을 때도 듣기 표시가 화면 시계로 돈다
  const page2 = await open(390, 844, true, "#sp-3", () => { delete window.AudioContext; delete window.webkitAudioContext; });
  p = await probe(page2); await solve(page2, p); p = await probe(page2); await solve(page2, p);
  await page2.waitForFunction(() => S.lit === 2, null, { timeout: 4000 });
  await page2.waitForFunction(() => S.lit === -1 && !run, null, { timeout: 4000 });
  p = await probe(page2);
  A("소리를 쓸 수 없어도 듣기 표시가 끝까지 돌고 소리 켜기 단추가 보인다", /같은 집이에요/.test(p.msg) && (await page2.isVisible("#soundChip")), p.msg);
  await page2.context().close();
  show("audio");
}

// ── 6. 화면 크기 바꾸기와 낮은 화면 ──
if (want("resize")) {
  const page = await open(390, 844, true, "#sp-6");
  const Z = lineOf("resize");
  let p = await probe(page); await solve(page, p); p = await probe(page); await solve(page, p); p = await probe(page);
  await tapHouse(page, 64); await tap(page, '#setSign [data-a="-2"]');
  let m = await metrics(page);
  const w0 = m.staffW;
  Z("390×844 넉넉 모드: 오선 칸 12px, 집 높이 150px(상한)", m.sheetH === 115.2 && m.white[1] === 150 && m.issues.length === 0, [m.sheetH, m.white, m.issues]);
  await page.setViewportSize({ width: 360, height: 640 }); await page.waitForTimeout(260);
  m = await metrics(page); p = await probe(page);
  Z("360×640으로 줄이면 기본 모드로 다시 그린다(오선 칸 11px)", m.sheetH === 105.6 && m.staffW < w0 && m.issues.length === 0 && m.scrollX <= 0 && m.scrollY <= 0, [m.sheetH, m.staffW, m.issues]);
  Z("쓰던 주소가 그대로 남는다", p.phase === "plate" && p.pen.h === 64 && p.pen.a === -2 && (await page.locator("#staff .note.is-ghost").count()) === 1, p.pen);
  await page.setViewportSize({ width: 640, height: 360 }); await page.waitForTimeout(260);
  Z("640×360(눕힌 폰): 안내가 뜬다", await page.isVisible("#lowScreen"), null);
  await page.setViewportSize({ width: 320, height: 480 }); await page.waitForTimeout(260);
  Z("320×480: 안내가 뜬다", await page.isVisible("#lowScreen"), null);
  await tap(page, "#goOn"); await page.waitForTimeout(100);
  m = await metrics(page);
  Z("그래도 계속하기: 545px 높이를 지키고 세로로 65px 밀린다", m.rows.join("/") === "44/50/271/40/104" && m.scrollY === 65 && m.scrollX <= 0 && !(await page.isVisible("#lowScreen")), [m.rows, m.scrollY, m.issues]);
  const page3 = await open(320, 544, true, "#sp"), page4 = await open(320, 545, true, "#sp");
  Z("320×544: 안내가 뜬다 / 320×545: 뜨지 않는다", (await page3.isVisible("#lowScreen")) && !(await page4.isVisible("#lowScreen")), null);
  await page3.context().close(); await page4.context().close();
  check("console", page.errs.length === 0, "크기 콘솔 오류 " + JSON.stringify(page.errs));
  await page.context().close();
  show("resize");
}

// ── 7. 배달일: 저장, 다시 내기, 발견 장면, 이어하기, 통과와 잠금(P17부터). 지도는 P19부터 ──
if (want("days")) {
  const page = await open(390, 844, true, "");
  const D = lineOf("days"), hasDays = await has(page, "dayReport"), hasScenes = await has(page, "SCENES"), hasMap = await page.evaluate(() => !!document.getElementById("mapScreen"));
  if (!hasDays) D("배달일의 흐름이 아직 없다. P17 뒤에 돌린다", true, null);
  else {
    const saved = () => page.evaluate(() => JSON.parse(localStorage.getItem("twn_save_v1") || "null"));
    const sheet = (id) => page.evaluate((x) => window.__sheet(x), id);
    const rows = () => page.evaluate(() => [...document.querySelectorAll("#mapList button")].map((b) => [b.dataset.d, !b.disabled, b.textContent]));
    const titleUp = () => page.isVisible("#titleScreen");                // 타이틀(#titleScreen, #startBtn)과 소리 확인 장(#soundCheck, #soundYes)은 P20부터 있다
    const pick = async (id) => {                                         // 지도에서 배달일을 고른다. 지도가 없는 단계에서는 처음 화면이 곧 배달이다
      if (!hasMap) return;
      await tap(page, `#mapList [data-d="${id}"]`);
      if (await page.isVisible("#soundCheck")) await tap(page, "#soundYes");
    };
    const leave = async () => { if (hasMap) await tap(page, "#toMap"); else { await page.reload(); await page.waitForFunction(() => window.__twn && window.__tests); } };
    const resumeBtn = async () => ((await titleUp()) ? "#startBtn" : "#mapResume");   // [이어서 배달]은 타이틀이 있으면 타이틀에, 없으면 지도에 있다
    let p, m, s;
    if (await titleUp()) {
      D("처음 화면은 타이틀이고 [배달 시작]이 있다", /배달 시작/.test(await page.textContent("#startBtn")), await page.textContent("#startBtn"));
      await tap(page, "#startBtn");
    }
    if (hasMap) {
      const r = await rows(); m = await sheet("mapScreen");
      D("지도가 뜨고 배달일 여섯 가운데 0단만 열려 있다", (await page.isVisible("#mapScreen")) && r.length === 6 && r.map((x) => x[1]).join() === "true,false,false,false,false,false" && /0단을 통과하면 열려요/.test(r[1][2]), r);
      D("지도: 넘침 0, 글자 12px 이상, 단추 44px 이상, 자가검사 줄", m.issues.length === 0 && /^자가검사 (\d+)\/\1$/.test(await page.textContent("#mapTests")), [m, await page.textContent("#mapTests")]);
      D("지도가 떠 있는 동안 뒤의 배달 화면은 쓸 수 없고 [이어서 배달]은 없다", await page.evaluate(() => document.getElementById("app").inert && document.getElementById("mapResume").hidden), null);
    }
    await pick("d0"); p = await probe(page);
    D("0단의 첫 배달에서 시작한다. 기록하는 배달이다", p.screen === "run" && p.id === "d0-01" && p.dev === false && p.results.length === 0, [p.screen, p.id, p.dev]);
    m = await metrics(page);
    D("배달 화면(지도 단추가 있을 때)의 넘침 0", m.issues.length === 0 && m.scrollX <= 0 && m.scrollY <= 0, m.issues);
    await finishJob(page); s = await saved();
    D("배달 하나를 마칠 때마다 저장한다", !!s && s.version === 1 && JSON.stringify(s.active) === JSON.stringify({ day: "d0", index: 1, results: [1], requeue: [], gained: [] }) && s.stats.jobs === 1, s && s.active);
    await finishJob(page, 1); p = await probe(page); s = await saved();
    D("d0-02를 한 번 틀리면 ◐, 다시 낼 배달에 들어가고 까닭을 센다", p.id === "d0-03" && p.results[1].done === "half" && p.requeue.join() === "1" && s.causes.extra === 1 && s.active.results.join() === "1,2", [p.requeue, s.causes]);
    await finishJob(page); await finishJob(page); p = await probe(page);
    if (hasScenes) {
      m = await metrics(page);
      D("d0-04 뒤에 발견 장면 S1: 머리표 '발견', [들어 보기], [다음]", p.screen === "scene" && p.scene.id === "S1" && (await page.textContent("#chip")) === "발견" && (await page.textContent("#again")) === "들어 보기" && (await page.textContent("#main")) === "다음" && m.issues.length === 0, [p.screen, m.issues]);
      await tap(page, "#again"); await page.waitForFunction(() => S.lit === 2, null, { timeout: 4000 });
      D("S1 들어 보기: 걸음마다 두 집을 차례로 내고 그 걸음이 굵어진다", (await page.locator("#routes g.is-lit").count()) === 1 && (await page.evaluate(() => S.msg.text === M.lines[0])), null);
      await tap(page, "#main"); p = await probe(page);
      D("[다음]: 둘째 문장으로 가고 듣던 것을 멈춘다", p.screen === "scene" && p.scene.line === 1 && p.lit === -1 && /미와 파, 시와 도/.test(p.msg) && (await page.evaluate(() => run === null)), p.msg);
      await tap(page, "#main");
      D("마지막 문장의 주 단추는 [알겠어요]", (await page.textContent("#main")) === "알겠어요", null);
      await tap(page, "#main"); p = await probe(page); s = await saved();
      D("장면을 닫으면 다음 배달로 가고 본 장면을 저장한다", p.screen === "run" && p.id === "d0-05" && s.scenes.join() === "S1", [p.id, s.scenes]);
    } else D("발견 장면이 아직 없으면 바로 다음 배달이다", p.screen === "run" && p.id === "d0-05", p.id);
    await finishJob(page); await finishJob(page); p = await probe(page);
    D("마감 배달 앞에 d0-02가 한 번 더 나온다", p.id === "d0-02" && p.idx === 6 && p.queue === 8 && p.first === false && (await page.textContent("#main")) !== "마감하기", [p.id, p.idx, p.queue]);
    await finishJob(page); p = await probe(page);
    D("그다음이 마감 배달이다", p.id === "d0-07" && p.idx === 7, [p.id, p.idx]);
    await finishJob(page); p = await probe(page); s = await saved(); m = await sheet("closing");
    D("마감: 다시 낸 배달은 세지 않는다(6/7). 통과하고 도장 하나", p.closing && p.report.full === 6 && p.report.passed && p.report.stamp === 1 && /6\/7/.test(await page.textContent("#closeSum")) && /통과했어요/.test(await page.textContent("#closeNote")), p.report);
    D("마감 화면: 넘침 0, 글자 12px 이상, 단추 44px 이상", m.issues.length === 0, m);
    D("저장: 0단 통과, 하던 배달일 없음, 마친 배달 8건 가운데 한 번에 7건", JSON.stringify(s.days.d0) === JSON.stringify({ passed: true, stamp: 1, runs: 1, best: 6 }) && s.active === null && s.stats.jobs === 8 && s.stats.clean === 7, [s.days, s.active, s.stats]);
    await leave();
    if (hasMap) { const r = await rows(); D("지도: 1단이 열리고 0단에 기록과 도장이 적힌다", r.map((x) => x[1]).join() === "true,true,false,false,false,false" && /한 번에 배달 6\/7 · 도장/.test(r[0][2]), r); }
    await pick("d1"); p = await probe(page);
    D("1단의 첫 배달", p.id === "d1-01" && p.day === "d1", p.id);
    for (let i = 0; i < 3; i++) await finishJob(page);
    p = await probe(page);
    if (p.screen === "scene") { await finishJob(page); }                  // (d1-03을 마친 뒤이므로 여기서는 장면이 아니다)
    await page.reload(); await page.waitForFunction(() => window.__twn && window.__tests);
    if (hasMap) {
      const rb = await resumeBtn(), label = await page.textContent(rb);
      D("새로고침하면 [이어서 배달]이 있다", /이어서 배달/.test(label) && (rb !== "#mapResume" || /이어서 배달: 1단 4번째 편지/.test(label)), [rb, label]);
      await tap(page, rb);
    }
    p = await probe(page);
    D("이어하기: 1단의 넷째 배달에서, 앞의 기록 셋과 얻은 문패를 그대로", p.id === "d1-04" && p.idx === 3 && p.results.map((r) => r.done).join() === "full,full,full" && p.gained.join() === "C1,D-1,F1,G-1" && (await page.locator("#dots i.is-full").count()) === 3, [p.id, p.results, p.gained]);
    for (let i = 0; i < 3; i++) await finishJob(page, 1);                  // d1-04, 05, 06을 ◐로
    for (let i = 0; i < 3; i++) await finishJob(page);                     // 다시 낸 셋은 한 번에
    p = await probe(page);
    D("다시 낸 배달 셋을 지나 마감 배달", p.id === "d1-07" && p.idx === 9 && p.queue === 10, [p.id, p.idx, p.queue]);
    await finishJob(page); p = await probe(page); s = await saved();
    D("마감: 7건 가운데 4건이면 통과하지 못한다. 기준(6통)을 말한다", p.closing && p.report.full === 4 && !p.report.passed && /6통이면/.test(await page.textContent("#closeNote")), [p.report, await page.textContent("#closeNote")]);
    D("다시 낸 배달을 한 번에 마치면 문패를 얻는다(1단의 문패 10개)", s.plates.length === 10 && p.gained.length === 10 && /새 문패 10개/.test(await page.textContent("#closeNote")) && (await page.locator("#closeNote svg").count()) === 10, [s.plates, p.gained]);
    D("마감 화면(새 문패 10개): 넘침 0", (await sheet("closing")).issues.length === 0, await sheet("closing"));
    await leave();
    if (hasMap) {
      const r = await rows();
      D("지도: 통과하지 못한 1단 뒤의 2단은 잠겨 있다", r.map((x) => x[1]).join() === "true,true,false,false,false,false" && /한 번에 배달 4\/7 · 6통부터 통과/.test(r[1][2]) && /1단을 통과하면 열려요/.test(r[2][2]), r);
      await pick("d0"); await finishJob(page); await finishJob(page);
      await tap(page, "#exitBtn"); p = await probe(page);
      D("배달 도중 [지도]: 묻지 않고 지도로 가고 저장했다고 알린다", p.screen === "map" && /여기까지 저장했어요/.test(await page.textContent("#mapNote")) && /이어서 배달: 0단 3번째 편지/.test(await page.textContent("#mapResume")), [p.screen, await page.textContent("#mapNote")]);
      await tap(page, "#mapResume"); p = await probe(page);
      D("[이어서 배달]: 0단의 셋째 배달", p.screen === "run" && p.id === "d0-03" && p.results.length === 2, [p.id, p.results.length]);
      for (let i = 0; i < 4; i++) await finishJob(page);
      await toDeliver(page);                                             // 마감 배달을 듣기 단계까지만 하고 나간다
      await tap(page, "#exitBtn"); await page.reload(); await page.waitForFunction(() => window.__twn && window.__tests);
      const rb = await resumeBtn(), label = await page.textContent(rb);
      D("마지막 배달까지 마치고 나갔어도 [이어서 배달]이 있다(지도에서는 \"0단 마감하기\")", /이어서 배달/.test(label) && (rb !== "#mapResume" || /이어서 배달: 0단 마감하기/.test(label)), [rb, label]);
      await tap(page, rb); p = await probe(page); s = await saved();
      D("이어서 열면 바로 마감하고 한 번에 배달 도장을 받는다", p.closing && p.report.stamp === 2 && s.days.d0.stamp === 2 && s.days.d0.runs === 2 && s.days.d0.best === 7 && s.active === null && /한 번에 배달 도장/.test(await page.textContent("#closeNote")), [p.report, s.days.d0]);
      await tap(page, "#restart"); p = await probe(page);
      D("[다시 배달]: 같은 배달일의 첫 배달, 기록하는 배달", p.id === "d0-01" && p.dev === false && p.results.length === 0, [p.id, p.dev]);
    }
  }
  check("console", page.errs.length === 0, "배달일 콘솔 오류 " + JSON.stringify(page.errs));
  check("network", page.reqs.length === 0, "배달일 외부 요청 " + page.reqs.length);
  await page.context().close();
  // 완주: 여섯 배달일을 탭만으로, 바른 길과 두 번씩 틀리는 길로. 바로가기로 열어 저장하지 않는다
  if (hasDays) {
    const page2 = await open(320, 568, true, "#d0");
    let scenes = 0, jobs = 0;
    for (const wrongs of [0, 2]) for (let d = 1; d <= 6; d++) {
      await page2.evaluate((x) => window.__twn.openDay(x), d);
      let end = null;
      for (let guard = 0; guard < 80 && !end; guard++) {
        const p = await probe(page2);
        if (p.closing) { end = p; break; }
        if (p.screen === "scene") scenes++; else jobs++;
        const m = await metrics(page2);
        if (m.issues.length || m.scrollX > 0 || m.scrollY > 0) check("days", false, `완주 d${d - 1} ${p.id} ${p.screen} ${m.issues.join(" / ")}`);
        if (p.screen === "scene") { while ((await probe(page2)).screen === "scene") await tap(page2, "#main"); }
        else await finishJob(page2, p.first ? wrongs : 0);
      }
      const first = {};
      if (end) end.results.forEach((r) => { if (!(r.id in first)) first[r.id] = r.done; });
      D(`완주 ${d - 1}단 ${wrongs ? "두 번씩 틀리는 길" : "바른 길"}: 마감까지`, !!end && end.results.length === end.queue && end.queue === (wrongs ? 2 * end.jobs - 1 : end.jobs) && Object.values(first).every((x) => x === (wrongs ? "half" : "full")) && end.report.passed === !wrongs,
        end && [end.results.length, end.queue, end.report]);
    }
    D("완주한 배달 화면과 발견 장면의 수", jobs === 46 + 46 + 40 && (!hasScenes || scenes === 12), [jobs, scenes]);
    D("바로가기로 연 창은 저장하지 않는다", (await page2.evaluate(() => localStorage.getItem("twn_save_v1"))) === null, null);
    check("console", page2.errs.length === 0, "완주 콘솔 오류 " + JSON.stringify(page2.errs));
    await page2.context().close();
  }
  show("days");
}

// ── 8. 눈으로 볼 화면 ──
if (want("shots")) {
  const dir = path.join(path.dirname(path.resolve(fileArg)), "shots");
  fs.mkdirSync(dir, { recursive: true });
  const shots = [["#sp-2", 320, 568, async (page) => { let p = await probe(page); await solve(page, p); await tap(page, "#goRight"); }, "walk"],
    ["#sp-6", 320, 568, async (page) => { let p = await probe(page); await solve(page, p); p = await probe(page); await solve(page, p); await tapHouse(page, 64); await tap(page, '#setSign [data-a="-2"]'); }, "plate"],
    ["#sp-6", 320, 568, async (page) => { for (let i = 0; i < 4; i++) { const p = await probe(page); await solve(page, p); } await page.waitForFunction(() => S.lit === 1); }, "deliver3"],
    ["#sp-7", 320, 568, async (page) => { await tap(page, '#setCards [data-i="0"]'); await tap(page, '#setCards [data-i="3"]'); await tap(page, "#main"); }, "sort"],
    ["#sp-9", 320, 568, async () => {}, "diag"],
    ["#d5-6", 320, 545, async (page) => { let p = await probe(page); await solve(page, p); p = await probe(page); await solve(page, p); await tapHouse(page, 60); await tap(page, '#setSign [data-a="-2"]'); }, "bb3"],
    ["#sp-1", 390, 844, async (page) => { await tap(page, "#main"); await tapHouse(page, 69); await tap(page, "#main"); }, "drop2"],
    ["#d4-7", 800, 600, async (page) => { await tap(page, '#setCards [data-i="0"]'); }, "wide"]];
  for (const [hash, w, h, go, name] of shots) { const page = await open(w, h, true, hash); await go(page); await page.waitForTimeout(150); await page.screenshot({ path: path.join(dir, `${w}-${name}.png`) }); await page.context().close(); }
  console.log("화면 " + shots.length + "장: " + dir);
}
await browser.close();
if (outFile) fs.writeFileSync(outFile, JSON.stringify(report, null, 1));
console.log("── 합계 ──"); console.log(JSON.stringify(report.counts));
console.log("실패 " + report.fails.length); report.fails.slice(0, 60).forEach((f) => console.log(" - " + f));
process.exit(report.fails.length ? 1 : 0);
