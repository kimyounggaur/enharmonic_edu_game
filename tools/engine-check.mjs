// Browser-free verification of the actual inline source. This does not claim UI or audible QA.
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';

const input = path.resolve(process.argv[2] || 'index.html');
const html = fs.readFileSync(input, 'utf8');
const script = html.match(/<script>([\s\S]*?)<\/script>/)?.[1];
if (!script) throw new Error('Inline application script missing');
new vm.Script(script, { filename: input });
const section = (n) => {
  const start = script.indexOf(`// == ${n} `);
  const marker = `// -- ${n} 끝 --`;
  const end = script.indexOf(marker, start);
  if (start < 0 || end < start) throw new Error(`Section ${n} missing`);
  return script.slice(start, end + marker.length);
};
const context = vm.createContext({
  console,
  atBoot() {},
  window: {},
  document: {
    querySelector: () => ({ textContent: script }),
    documentElement: { outerHTML: html },
  },
});
// Only source sections with no DOM/audio side effects are evaluated. Test registration is inert.
const pure = [1, 2, 3, 9, 11].map(section).join('\n');
vm.runInContext(pure, context, { filename: input + ':pure-sections' });
const result = vm.runInContext(`(() => {
  const include = t => /^(TH|CH|SC|JB|FL|SV)-/.test(t.id) || ['ST-01','ST-02','AU-08','CT-01','CT-03'].includes(t.id);
  return TESTS.filter(include).map(t => {
    const failures = []; let count = 0;
    const ok = (value, detail) => { count++; if (!value) failures.push(detail); };
    const eq = (actual, expected, detail) => ok(JSON.stringify(actual) === JSON.stringify(expected), detail + ': ' + JSON.stringify(actual) + ' != ' + JSON.stringify(expected));
    try { t.fn(ok, eq); } catch (e) { failures.push(e.stack || String(e)); }
    return { id:t.id, pass:count > 0 && failures.length === 0, assertions:count, failures };
  });
})()`, context);
const failures = result.filter(t => !t.pass);
const summary = {
  mode: 'source syntax and browser-free original test subset',
  tests: result.length,
  passed: result.length - failures.length,
  assertions: result.reduce((n,t) => n + t.assertions, 0),
  fileBytes: Buffer.byteLength(html),
  failures,
  notRun: ['Browser layout', 'Real pointer and keyboard input', 'AudioContext scheduling integration', 'Device or audible sound checks'],
};
console.log(JSON.stringify(summary, null, 2));
if (process.argv.includes('--save')) {
  fs.mkdirSync(path.join(path.dirname(input), 'docs'), { recursive: true });
  fs.writeFileSync(path.join(path.dirname(input), 'docs', 'engine-check-report.json'), JSON.stringify(summary, null, 2) + '\n');
  const content = vm.runInContext(`({
    days: DAYS.map(day => ({ id:day.id, name:day.name, jobs:day.jobs.map(job => {
      const m=jobModel(job,day);
      return { id:job.id, mode:cardText(m).chip, address:nameTxt(m.note), from:m.from, target:m.target,
        window:nameTxt(whiteOfStep(m.win))+'~'+nameTxt(whiteOfStep(m.win+WIN-1)),
        steps:m.steps, spellings:m.names.map(nameTxt), plates:platesOf(m).map(nameTxt), errors:checkJob(m) };
    }) })),
    scenes: SCENES.map(sc => {
      const day=DAYS.find(d=>d.jobs.some(j=>j.id===sc.after)), m=sceneModel(sc,day);
      return { id:sc.id,title:sc.title,after:sc.after,addresses:m.board0.map(nameTxt),lines:m.lines };
    }),
    houses: Array.from({length:12},(_,i)=>({midi:60+i,addresses:spellingsAt(60+i).map(nameTxt),hz:hz(60+i)}))
  })`, context);
  const report = ['# 엔진에서 다시 만든 배달·발견·주소 표', '',
    '실제 제품의 구획 1~3에서 계산했다. 수동 정답표를 복제하지 않았다.', '',
    '| 배달 | 방식 | 주소 | 출발 집 | 도착 집 | 창 | 걸음 | 얻을 수 있는 문패 |',
    '|---|---|---|---|---|---|---|---|'];
  for (const day of content.days) for (const job of day.jobs)
    report.push('| '+[job.id,job.mode,job.address,job.from,job.target,job.window,job.steps,job.plates.join(', ')].join(' | ')+' |');
  report.push('', '| 발견 | 제목 | 끼어드는 자리 | 문패 |', '|---|---|---|---|');
  for (const scene of content.scenes) report.push('| '+[scene.id,scene.title,scene.after,scene.addresses.join(', ')].join(' | ')+' |');
  report.push('', '| 집 번호 | 주소 | 주파수 |', '|---|---|---|');
  for (const house of content.houses) report.push('| '+[house.midi,house.addresses.join(', '),house.hz.toFixed(2)+'Hz'].join(' | ')+' |');
  fs.writeFileSync(path.join(path.dirname(input), 'docs', 'content-from-engine.json'), JSON.stringify(content, null, 2)+'\n');
  fs.writeFileSync(path.join(path.dirname(input), 'docs', 'content-from-engine.md'), report.join('\n')+'\n');
}
process.exitCode = failures.length ? 1 : 0;
