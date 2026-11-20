# 『두 이름의 음악 마을』 바이브 코딩 프롬프트 가이드

| 항목 | 내용 |
|---|---|
| 문서 | 바이브 코딩 프롬프트 가이드 v1.0 (2026-11-20) |
| 바탕 문서 | 『두 이름의 음악 마을』 설계서 v1.0 (`두이름의음악마을_설계서.md`, 2026-11-19) |
| 만드는 것 | 딴이름한소리를 배우는 모바일 게임 웹앱. `index.html` 한 파일, 외부 의존성 0 |
| 프롬프트 | P00(헌법)과 P01~P33. [그대로] 14개, [점검] 9개, [설계] 10개 |
| 확인한 범위 | [그대로] 14개의 코드를 모두 넣은 `index.html`(2,122줄, 153,276바이트)을 헤드리스 브라우저에서 실행했다. 자가검사 47/47 |
| 확인하지 못한 것 | 실기기, 귀로 듣기, 실제 AI 코딩 도구에서의 실행, [설계] 프롬프트의 결과물, 학습자와 강사의 검수(0.3절) |

## 목차

- 0. 먼저 읽기
- 1. P00 헌법
- 2. PO0 뼈대: P01, P02
- 3. PO1 이론 엔진과 배달 모델: P03, P04, P05
- 4. PO2 길과 악보: P06, P07, P08, P09
- 5. PO3 소리: P10, P11, P12
- 6. PO4 읽기 조작: P13, P14
- 7. PO5 쓰기 · 분류 · 반송: P15, P16
- 8. PO6 배달일과 진행: P17, P18, P19, P20, P21
- 9. PO7 주소록과 복습: P22~P27
- 10. PO8 그림 · 연출 · 튜토리얼: P28~P32
- 11. PO9 기기 확인과 정리: P33
- 12. 새 세션 복원 프롬프트
- 13. 문제 해결 프롬프트 모음
- 14. 배포
- 부록 A. 게이트 보고 양식
- 부록 B. 검사 47개와 화면 점검 10개
- 부록 C. 프롬프트와 설계서 대응표
- 부록 D. 화면 점검 도구 `tools/check.mjs`
- 부록 E. 배달 46건과 발견 장면 6개

---

## 0. 먼저 읽기

### 0.1 이 문서의 자리

시리즈의 문서 순서는 초안 → 설계서 → 프롬프트 가이드다. 설계서가 "무엇을 어떤 순서로 만드는가"를 정했고, 이 문서는 그 순서를 AI 코딩 도구에 줄 프롬프트 33개로 옮겼다. 설계서의 단계 PO0~PO9와 게이트 GPO0~GPO9를 그대로 쓴다.

설계서와 이 문서를 저장소의 `docs/`에 함께 둔다. [그대로] 프롬프트는 이 문서만으로 수행할 수 있다. [설계] 프롬프트는 설계서의 절을 근거로 든다.

2026-11-19에 설계서의 권장안대로 진행하기로 확인받았다. 물은 것은 D1(코어 조작: 걷기와 쓰기)과 D5(v1.0의 범위: 0~5단)이고 답은 "추천대로"였다. 나머지 결정 항목은 따로 묻지 않았고 권장안을 기본값으로 썼다(0.8절).

### 0.2 프롬프트의 세 종류

| 종류 | 프롬프트 | 뜻 |
|---|---|---|
| [그대로] 14개 | P01~P04, P06~P08, P10, P11, P13, P15, P17~P19 | 프롬프트 안에 코드가 있다. AI는 정해진 자리에 글자 그대로 넣는다. 전부 실행해서 확인한 코드다 |
| [점검] 9개 | P05, P09, P12, P14, P16, P21, P27, P32, P33 | 코드를 더하지 않는다. AI는 규칙 위반을 소스에서 찾아 보고하고, 사람은 화면과 소리를 확인한다. 게이트 하나에 하나씩이다 |
| [설계] 10개 | P20, P22~P26, P28~P31 | 요구와 완료 기준만 있다. 결과물을 만들어 확인하지 못했다 |

[그대로] 14개를 끝내면 여섯 배달일의 배달 46건을 끝까지 할 수 있다. 다시 내기, 통과와 잠금, 문패 얻기, 발견 장면 여섯, 저장과 이어하기, 임시 지도가 돈다. 타이틀, 정식 지도와 마감 화면, 소리 확인 장, 주소록, 복습 배달, 자유 마을, 설정, 그림, 연출, 튜토리얼, 접근성 마무리는 [설계]다.

설계서의 부록 D는 저장, 검사 러너, 배달일의 흐름, 발견 장면을 [설계]로 두었다. 가이드를 만들며 그 부분의 코드를 쓰고 실행해 확인했으므로 [그대로]로 옮겼다.

### 0.3 확인한 것과 못 한 것

**확인한 것.** Chrome for Testing 153(헤드리스)의 모바일 에뮬레이션(터치, 화면 배율 2)에서 했다.

- **골든 빌드.** [그대로] 14개의 조각 41개를 차례로 넣은 `index.html`은 2,122줄, 153,276바이트다. `index.html#test`의 첫 줄은 `자가검사 47/47 (전체 47개 중 47개 작성) · TH 12/12 · CH 4/4 · SC 3/3 · JB 4/4 · FL 5/5 · AU 8/8 · ST 4/4 · SV 4/4 · CT 3/3`다.
- **단계마다.** 프롬프트 14개 각각을 끝낸 파일을 따로 만들어 열었다. 콘솔 오류 0, 외부 요청 0이고 `#test`의 첫 줄이 0.6절의 표와 같다.
- **완료 기준.** [그대로] 프롬프트의 "완료 기준" 72개는 그 단계의 파일에서 코드로 확인한 것만 실었다. 화면의 글자는 그 파일에서 읽은 것이다.
- **변이 검사.** 코드를 한 군데씩 일부러 틀리게 고친 변이 86가지를 자가검사가 모두 잡았다. 검사 47개 가운데 변이를 하나도 잡지 못한 검사는 없다.
- **다시 조립.** 완성된 이 문서만 읽어서 프롬프트 14개의 조각을 차례로 넣어 보았다. 단계 파일 14개가 골든 빌드의 것과 바이트까지 같다.
- **화면 점검(부록 D의 도구).** 여덟 화면 × 769장면 = 6,152장면에서 스크롤 0, 잘림 0, 겹침 0, 가장 작은 글자 12px, 가장 작은 단추 44px, 다섯 줄의 높이가 장면 내내 같다. 문구 424가지와 편지 카드 61개가 네 화면에서 두 줄 이내다. 흐름 확인 53개, 키보드 22개, 소리 예약 19개, 화면 크기 7개, 배달일 45개가 모두 통과했다.
- **자가검사에 드는 시간.** 불러올 때 약 27ms, `#test`로 열면 약 77ms다. 헤드리스 데스크톱의 값이고 폰에서는 재지 않았다.

**못 한 것.**

- **프롬프트를 실제 AI 코딩 도구에 넣어 돌려 보지 않았다.** 확인한 것은 "문서의 조각을 문서의 순서대로 넣으면 그 파일이 된다"까지다. AI가 조각을 고쳐 넣거나 자리를 틀리게 넣는 경우는 13장의 증상 표로 대비했다.
- **실기기에서는 아무것도 재지 않았다. 소리는 한 번도 귀로 듣지 않았다.** 손가락으로 집을 고르는 감각, 폰 스피커의 음색과 음량, iOS Safari의 오디오 정책, 기호 그림이 작은 화면에서 읽히는지는 이 문서의 어떤 수치에도 들어 있지 않다. iPhone의 무음 스위치 대응(`navigator.audioSession.type = "playback"`)은 코드에 넣었지만 실기기에서 확인하지 않았다 [제안, 미측정].
- **[설계] 프롬프트 10개의 결과물은 만들어 보지 않았다.**
- **학습자와 강사에게 보여 준 적이 없다.** 문구, 배달 순서, 발견 장면의 문장은 검수 전이다.

### 0.4 쓰는 법

1. 새 저장소를 만들고 `docs/`에 설계서와 이 문서를 넣는다.
2. AI 코딩 도구의 첫 대화에 **P00(헌법)** 을 준다. AI가 이해 질문에 답하면 1장의 정답과 견준다. 틀린 답이 있으면 그 항목을 바로잡은 뒤에 시작한다.
3. P01부터 번호 순서로 하나씩 준다. **한 프롬프트가 한 커밋이다**(커밋 메시지 예: `P03: 이론 엔진`).
4. 프롬프트가 끝나면 그 절의 "완료 기준"을 직접 본다. 맨 먼저 `index.html#test`의 첫 줄을 본다.
5. [점검] 프롬프트에서는 게이트 보고(부록 A)를 `docs/post-gate-report.md`에 더한다. 게이트를 넘긴 때에만 버전을 올린다.
6. 대화가 길어져 세션을 새로 열 때는 12장의 복원 프롬프트로 시작한다.
7. 문제가 생기면 13장에서 증상을 찾아 그 프롬프트를 준다.

**프롬프트를 주는 두 가지 방법.**

- 파일로: 도구가 저장소의 파일을 읽을 수 있으면 이렇게 말한다. "`docs/두이름의음악마을_바이브코딩_프롬프트가이드.md`의 P03 프롬프트 상자를 읽고 그대로 수행해 줘. 조각은 문서의 글자 그대로 넣어."
- 붙여 넣기: 프롬프트 상자(회색 상자 하나)의 내용을 통째로 복사해 붙여 넣는다. 상자 안에서 역따옴표 세 개로 시작하고 끝나는 줄은 조각의 경계이므로 함께 복사한다.

**[그대로]의 원칙.** 조각은 "마커 줄 바로 위에 넣기"만 한다. 이미 있는 줄을 고치거나 옮기지 않는다. 예외는 P19의 첫 조각 하나다(P17의 임시 규칙 세 줄을 지운다). AI가 조각을 고쳐 넣었다면 되돌리고 다시 시킨다. 고칠 까닭이 있으면 `docs/decisions.md`에 적은 뒤에 고치고, 그 뒤의 "완료 기준"과 `#test` 줄이 달라질 수 있음을 기억한다.

**개발용 바로가기.** 주소 끝에 붙인다. 바로가기로 연 창은 기록을 저장하지 않는다.

| 주소 끝 | 뜻 | 생기는 때 |
|---|---|---|
| `#test` | 검사 결과표 | P02 |
| `#d3`, `#d3-2` | 3단의 첫 배달, 3단의 둘째 배달에서 시작 | P06 |
| `#sp`, `#sp-6` | 검사용 하루(아홉 건)의 첫 배달, 여섯째 배달 | P06 |
| `#d3-2!`, `#sp-6!` | 그 배달을 풀린 상태(듣기 단계)로 연다 | P08 |
| `#S2` | 발견 장면 S2에서 시작 | P18 |

### 0.5 준비물

| 준비물 | 쓰임 |
|---|---|
| AI 코딩 도구 | 파일을 고치고 터미널 명령을 돌릴 수 있는 것. 이 문서(400KB 남짓)를 절 단위로 읽을 수 있어야 한다. 한 번에 다 읽지 못하면 프롬프트 상자를 붙여 넣는 방법을 쓴다 |
| 브라우저 | Chrome 또는 Safari. `index.html`을 파일로 바로 연다. 서버가 필요 없다 |
| 폰 | iPhone(Safari) 한 대와 Android(Chrome) 한 대. P12, P14, P21, P33에서 쓴다 |
| Git, GitHub, Vercel | 커밋과 배포(14장). P21에서 처음 배포한다 |
| Node와 Playwright | 부록 D의 화면 점검 도구. `npm i -D playwright && npx playwright install chromium`. Playwright의 설치 문서는 Node 20, 22, 24 계열을 요구한다(2026-11 기준. playwright.dev/docs/intro). 이 문서는 Node 22와 Playwright 1.63에서 돌렸다. P09부터 쓴다. 없으면 [점검] 프롬프트의 "도구 없이 보는 법"으로 대신한다 |

### 0.6 진행 지도

프롬프트를 끝낸 뒤 `index.html#test`의 첫 줄 앞부분이 이 표와 같아야 한다. [점검]과 [설계]는 검사 수를 바꾸지 않는다. P18 뒤로는 47/47이 내려가면 안 된다.

| 프롬프트 | 종류 | 단계 | 내용 | 끝난 뒤 `#test`의 앞부분 | 파일 |
|---|---|---|---|---|---|
| P01 | 그대로 | PO0 | 파일 전체: 스타일, 틀, 구획 12개, 상태, 화면 크기 | 검사 없음 | 265줄 |
| P02 | 그대로 | PO0 | 저장과 검사 러너 | 5/5 | 396줄 |
| P03 | 그대로 | PO1 | 이론 엔진 | 23/23 | 717줄 |
| P04 | 그대로 | PO1 | 배달 모델, 흐름 함수, 배달 씨앗 | 36/36 | 1,238줄 |
| P05 | 점검 | PO1 | 게이트 GPO1 | 36/36 (앞과 같다) |  |
| P06 | 그대로 | PO2 | 길과 편지 카드 | 36/36 | 1,338줄 |
| P07 | 그대로 | PO2 | 악보 창, 봉투, 판독 줄 | 36/36 | 1,394줄 |
| P08 | 그대로 | PO2 | 걸음, 문패 판, 조작부 | 36/36 | 1,476줄 |
| P09 | 점검 | PO2 | 게이트 GPO2, 화면 점검 도구 | 36/36 (앞과 같다) |  |
| P10 | 그대로 | PO3 | 소리: 컨텍스트, 집의 소리, 효과음, 언락 | 39/39 | 1,605줄 |
| P11 | 그대로 | PO3 | 듣기 | 44/44 | 1,725줄 |
| P12 | 점검 | PO3 | 게이트 GPO3, 귀로 듣기 | 44/44 (앞과 같다) |  |
| P13 | 그대로 | PO4 | 읽기 조작과 임시 마감 | 45/45 | 1,797줄 |
| P14 | 점검 | PO4 | 게이트 GPO4 | 45/45 (앞과 같다) |  |
| P15 | 그대로 | PO5 | 쓰기, 분류, 반송 | 45/45 | 1,813줄 |
| P16 | 점검 | PO5 | 게이트 GPO5, 자동 완주 | 45/45 (앞과 같다) |  |
| P17 | 그대로 | PO6 | 배달일의 흐름, 저장, 이어하기 | 46/46 | 1,955줄 |
| P18 | 그대로 | PO6 | 발견 장면 | 47/47 | 2,083줄 |
| P19 | 그대로 | PO6 | 임시 지도 | 47/47 | 2,122줄 |
| P20 | 설계 | PO6 | 타이틀, 정식 지도와 마감, 소리 확인 | 47/47 (앞과 같다) |  |
| P21 | 점검 | PO6 | 게이트 GPO6, 첫 배포 | 47/47 (앞과 같다) |  |
| P22 | 설계 | PO7 | 주소록 | 47/47 (앞과 같다) |  |
| P23 | 설계 | PO7 | 알아 두기와 발견 장면 다시 보기 | 47/47 (앞과 같다) |  |
| P24 | 설계 | PO7 | 복습 배달 | 47/47 (앞과 같다) |  |
| P25 | 설계 | PO7 | 자유 마을 | 47/47 (앞과 같다) |  |
| P26 | 설계 | PO7 | 설정 | 47/47 (앞과 같다) |  |
| P27 | 점검 | PO7 | 게이트 GPO7 | 47/47 (앞과 같다) |  |
| P28 | 설계 | PO8 | 그림 | 47/47 (앞과 같다) |  |
| P29 | 설계 | PO8 | 연출과 동작 줄이기 | 47/47 (앞과 같다) |  |
| P30 | 설계 | PO8 | 튜토리얼 | 47/47 (앞과 같다) |  |
| P31 | 설계 | PO8 | 접근성 | 47/47 (앞과 같다) |  |
| P32 | 점검 | PO8 | 게이트 GPO8 | 47/47 (앞과 같다) |  |
| P33 | 점검 | PO9 | 게이트 GPO9, 기기 확인과 정리 | 47/47 (앞과 같다) |  |

첫 줄의 전체 꼴은 이렇다.

| 끝난 프롬프트 | `index.html#test`의 첫 줄 |
|---|---|
| P02 | `자가검사 5/5 (전체 47개 중 5개 작성) · ST 1/1 · SV 4/4` |
| P03 | `자가검사 23/23 (전체 47개 중 23개 작성) · TH 11/11 · CH 4/4 · SC 3/3 · ST 1/1 · SV 4/4` |
| P04, P06, P07, P08 | `자가검사 36/36 (전체 47개 중 36개 작성) · TH 12/12 · CH 4/4 · SC 3/3 · JB 4/4 · FL 5/5 · ST 2/2 · SV 4/4 · CT 2/2` |
| P10 | `자가검사 39/39 (전체 47개 중 39개 작성) · TH 12/12 · CH 4/4 · SC 3/3 · JB 4/4 · FL 5/5 · AU 3/3 · ST 2/2 · SV 4/4 · CT 2/2` |
| P11 | `자가검사 44/44 (전체 47개 중 44개 작성) · TH 12/12 · CH 4/4 · SC 3/3 · JB 4/4 · FL 5/5 · AU 8/8 · ST 2/2 · SV 4/4 · CT 2/2` |
| P13, P15 | `자가검사 45/45 (전체 47개 중 45개 작성) · TH 12/12 · CH 4/4 · SC 3/3 · JB 4/4 · FL 5/5 · AU 8/8 · ST 3/3 · SV 4/4 · CT 2/2` |
| P17 | `자가검사 46/46 (전체 47개 중 46개 작성) · TH 12/12 · CH 4/4 · SC 3/3 · JB 4/4 · FL 5/5 · AU 8/8 · ST 4/4 · SV 4/4 · CT 2/2` |
| P18, P19와 그 뒤 | `자가검사 47/47 (전체 47개 중 47개 작성) · TH 12/12 · CH 4/4 · SC 3/3 · JB 4/4 · FL 5/5 · AU 8/8 · ST 4/4 · SV 4/4 · CT 3/3` |

게이트는 GPO0(P02 뒤, 따로 프롬프트를 두지 않고 P02의 완료 기준으로 본다), GPO1(P05), GPO2(P09), GPO3(P12), GPO4(P14), GPO5(P16), GPO6(P21, 첫 배포 v0.6), GPO7(P27), GPO8(P32), GPO9(P33)다.

### 0.7 설계서에서 구체화하거나 바꾼 것

설계서와 어긋나 보이는 곳은 이 절이 기준이다.

| # | 내용 | 까닭 |
|---|---|---|
| 1 | **조각은 덧붙이기만 한다.** 스크립트의 구획 12개마다 끝 마커(`// -- N 끝 --`)가 있고 조각은 그 줄 바로 위에 들어간다. 스타일과 화면 틀에도 마커가 하나씩 있다 | 프롬프트마다 "어디에 무엇을 넣는가"가 한 줄로 정해진다. 문서만으로 다시 조립해 확인할 수 있다 |
| 2 | **순서는 갈고리로 정한다.** `atBoot(순서, fn)`은 시작할 때, `onPaint(순서, fn)`은 그릴 때 순서가 작은 것부터 돈다. 일이 생긴 것은 `on(이름, fn)`과 `emit(이름, 값)`으로 알린다(`leave`, `listen`, `audio`, `wrong`, `done`, `next`, `finish`) | 뒤의 프롬프트가 앞의 코드를 고치지 않고 끼어든다 |
| 3 | 상태의 `day`는 배달일의 id 글자(`"d0"`)다. 설계서 10.2절은 숫자다. 상태에 `gained`(이번에 얻은 문패), `report`(그날의 결과), `dev`(바로가기로 열었다), `note`(지도 위의 한 줄)를 더했다 | 검사용 하루 `sp`와 배달일을 같은 방식으로 연다. 마감 화면과 지도가 쓸 값이 필요했다 |
| 4 | 저장의 `active`에 `gained`를 더했다. `version`은 1 그대로다. 이어하기는 저장된 `requeue`를 믿지 않고 `results`에서 다시 계산해 견준다(`resumePlan`). 어긋나면 잇지 않고 지운다 | 이어서 한 날의 마감 화면에도 새 문패가 나온다. 손상된 저장으로 빈 화면이 뜨지 않는다 |
| 5 | 검사가 들어오는 순서는 설계서 11.0절과 같다(PO0 5 → PO1 36 → PO3 44 → PO4 45 → PO6 47). PO6 안에서는 P17이 46, P18이 47이다 | |
| 6 | **ST-03을 넓혔다.** 중간 배달로 들어가기에 더해 그날의 줄(다시 내기), 통과 계산, 도장, 문패 얻기, 까닭 누계, 바로가기의 무기록을 본다. 화면을 실제로 그려 보는 부분은 `#test`에서는 배달 55건 전부, 평소에는 배달일마다 첫 배달만이다 | 배달일의 규칙을 볼 검사가 따로 없었다. 자가검사에 드는 시간이 평소 약 27ms, 55건을 모두 그리면 약 77ms다(헤드리스 데스크톱) |
| 7 | AU-05의 "듣기가 시작되면 남은 걸음 소리를 끊는다"는 AU-04에서 본다 | 듣기 쪽 코드가 P11에 들어오기 때문이다 |
| 8 | JB-01에 "반송 편지의 까닭 단추 정답이 엔진의 진단과 같다"를, FL-05에 "숫자의 받침 표가 숫자를 읽은 소리와 같다"를, SV-01에 "저장 열쇠가 `twn_save_v1`이다"를 더했다 | 변이 검사에서 빠져나간 변이를 잡으려고 |
| 9 | **씨앗 46건을 P04에서 한 번에 넣는다.** 설계서는 3~5단의 24건을 PO7에서 넣는다. 발견 장면 여섯도 P18에서 한 번에 넣는다 | 검사 JB와 CT-02가 46건과 장면 여섯을 함께 본다. GPO6의 완주 범위는 0~2단 그대로이고 3~5단의 완주는 GPO7에서 본다 |
| 10 | **발견 장면의 무대.** 주소 하나를 보여 주는 장면(S3, S4)은 도착한 흰 집의 제 이름을 문패로 함께 단다(E♯4와 F4). 봉투에는 "주소 n개 / 한 집"을, S1에는 "한 칸 / 반음"을 적는다. S6의 "주소록 35칸이 잠깐 뜬다"는 주소록이 생긴 뒤(P23)로 미뤘다 | 문패 판과 악보 창을 그대로 쓰면서 "두 주소, 한 집"이 보이게 했다 |
| 11 | **임시 지도(P19).** 배달일 여섯 줄, 잠긴 까닭, 기록과 도장, [이어서 배달], 자가검사 줄만 있다. 타이틀과 정식 지도는 P20이다. P17과 P19 사이에는 지도가 없어서 처음 화면이 "하던 배달일, 없으면 통과하지 않은 첫 배달일"이다. P19가 그 세 줄을 지운다 | [그대로]만으로 여섯 배달일을 끝까지 할 수 있게 |
| 12 | **바로가기로 연 창은 기록하지 않고 지도로 가지 않는다**(`S.dev`). HUD의 [지도]와 마감 화면의 [지도로]가 없다 | 점검하다가 기록이 섞이지 않게 |
| 13 | 마감 화면의 문구를 정했다. "통과했어요. 도장을 받았어요." / "모두 한 번에 배달했어요. 한 번에 배달 도장을 받았어요." / "한 번에 배달한 편지가 6통이면 다음 배달일이 열려요." 그리고 "새 문패 n개: …" | 설계서 9.4절에는 항목만 있다 |
| 14 | HUD의 나가기 단추 이름은 [지도]다 | 누르면 가는 곳을 적었다 |
| 15 | 걸음 연습의 오답에도 까닭 코드를 준다(`stay`, `dir`, `count`). 코드는 `causeOf`가 정한다 | 까닭 누계와 복습 배달의 재료다 |
| 16 | 화면 점검 도구의 배치 점검은 손짓 없이 상태를 넣어 장면을 넘긴다. 그래서 입력이 없는 P09부터 쓸 수 있다. 장면은 화면마다 769개다(설계서의 스파이크는 614개). 듣기의 밝아지는 장면과 발견 장면을 더했다 | |
| 17 | 문구는 424가지다. 배달이 내는 문구 400가지, 발견 장면의 제목과 문장 20가지, 듣기 중단 문구 4가지다. 설계서는 배달을 바른 길, 한 번 틀리는 길, 두 번 틀리는 길로 흉내 내어 272가지를 모았다. 가이드는 채점하지 않는 입력의 안내와, 단계마다 틀린 집·카드·주소·까닭을 하나씩 모두 넣어 본 문구를 더 모은다 | 틀린 자리에 따라 낱말이 달라지는 문구까지 두 줄에 들어가는지 재려고 |
| 18 | 검사용 하루 `sp`(스파이크의 아홉 건)를 제품에 남겼다. 지도에는 없고 `#sp`로만 연다 | 화면 점검 도구의 흐름, 키보드, 소리 확인이 이 아홉 건으로 돈다 |
| 19 | 전역 오류 화면(설계서 10.7절), 소리 확인 장(7.5절)은 [그대로]에 없다. P20에서 만든다 | |

### 0.8 결정 항목의 기본값

| 결정 | 가이드가 쓴 값 | 확정 |
|---|---|---|
| D1 코어 조작 | 걷기와 쓰기 | 2026-11-19 확인 |
| D5 v1.0의 범위 | 0~5단, 주소 35개 | 2026-11-19 확인 |
| D2 길 | 건반 모양의 집 줄, 창은 흰 집 아홉 채 | 권장안. GPO4에서 실기기로 확인 |
| D3 주소 표기, D4 화면의 말 | C♯4, 샵·플랫·더블샵·더블플랫, "구역" | 권장안. 강사 검수(P33) |
| D6 겹임시표의 날 | 3단 더블샵, 4단 더블플랫 | 권장안 |
| D7 대상·말투·보상 | 초등 3학년부터, 해요체, 문패와 도장 | 승계 |
| D8 악보, D9 기호 그림 | 높은음자리표, 기둥 없는 음표, 직접 그린 SVG | 권장안 |
| D10 음색과 듣기 | 배음을 얹은 지속음, 0.8초 간격, 마지막에 함께 | 권장안. GPO3에서 귀로 확인 |
| D11 저장소와 배포 | 새 GitHub 저장소 + Vercel | 승계 |
| D12 제목, D14 그림 방향 | 『두 이름의 음악 마을』, 건반의 구조를 지키는 평면 SVG | 권장안. P28 전에 확정 |
| D13 통과 기준 | 한 번에 배달한 편지가 80% 이상(올림). 다시 낸 배달은 세지 않는다 | 권장안 |
| D15 12평균율 안내 | S2의 한 문장과 주소록의 카드 | 권장안. 강사 검수 |
| D16, D17 | v1.1, v1.2의 범위. 이 가이드 밖이다 | |
| D18 복습 배달 | v1.0에 넣는다(P24) | 권장안 |

---

## 1. P00 헌법

작업을 시작할 때 한 번 준다. 세션을 새로 열 때는 12장의 복원 프롬프트가 이 내용을 줄여서 다시 준다. AI가 맨 끝의 이해 질문에 답하면 상자 아래의 정답과 견준다.

````text
[P00 · 헌법] 『두 이름의 음악 마을』 작업 규칙

너는 『두 이름의 음악 마을』을 만드는 작업자다. 딴이름한소리(C♯4와 D♭4처럼 이름은 다르고 소리는 같은 음)를 배우는 모바일 게임 웹앱이고 결과물은 index.html 한 파일이다. 아래 규칙은 이 작업이 끝날 때까지 바뀌지 않는다. 규칙을 어긴 코드는 버그로 취급한다. 다 읽은 뒤 맨 끝의 질문 14개에 답하고, 답을 확인받기 전에는 아무 파일도 만들지 않는다.

■ 게임
- 마을의 길 하나가 건반이다. 집 하나가 음높이 하나다(집 번호 = MIDI 번호). 흰 집과 검은 집이 있다.
- 주소는 음이름 표기 하나다. 글자(C~B) + 기호(없음, 샵, 플랫, 더블샵, 더블플랫) + 숫자(옥타브)로 이루어진다. 예: C♯4.
- 주소는 셋으로 읽는다. 글자와 숫자는 출발 집(그 구역의 흰 집), 기호는 걸음(샵은 오른쪽으로 한 칸, 플랫은 왼쪽으로 한 칸, 더블은 두 칸), 걸어서 닿는 곳이 도착 집이다. 한 칸이 반음이다.
- 한 집에 주소가 여럿 붙는다. 그것이 딴이름한소리다. 플레이어는 우체부다. 편지의 주소를 읽고 걸어가 배달하고, 같은 집의 다른 주소를 문패로 써서 단다.
- 배달 방식은 여섯이다. 걸음 연습, 걸어서 배달, 바로 배달, 악보 편지(주소를 악보로만 준다), 우편 분류(같은 집으로 가는 편지 고르기), 반송 편지(잘못 걸은 길의 까닭 찾기).
- 배달일(한 판)은 0단부터 5단까지 여섯이고 배달은 7, 7, 8, 8, 8, 8건, 모두 46건이다.

■ 시리즈 규칙 S1~S12 (앞선 타이틀과 같다)
S1  결과물은 index.html 한 파일이다. 빌드 단계가 없다.
S2  외부 의존성 0, 외부 요청 0. 글꼴, 그림, 스크립트를 밖에서 가져오지 않는다.
S3  이론 표를 손으로 적지 않는다. 이론 표는 장음계 공식 [2, 2, 1, 2, 2, 2, 1] 하나뿐이다. 주소, 딴이름, 걸음, 주파수, 화음, 음계는 엔진이 계산한다.
S4  상태는 setState(patch) 한 곳에서만 바뀐다.
S5  저장은 localStorage에 하고, 쓸 수 없으면 메모리에 둔다.
S6  저장 열쇠는 twn_save_v1, 스키마에는 version: 1을 넣는다. 필드를 더할 때는 없는 필드를 기본값으로 채우고 버전을 올리지 않는다.
S7  주파수는 440 × 2^((집 번호 − 69) / 12) 하나만 쓴다.
S8  소리는 첫 손짓에 연다. click, touchstart, keydown 세 곳에 건다. 소리가 꺼져 있으면 화면에 "소리 켜기"를 보인다.
S9  합성음만 쓴다. 오디오 파일 0개.
S10 타이머로 상태나 소리를 바꾸지 않는다. setInterval은 0곳, setTimeout은 화면 크기 변화의 디바운스 한 곳뿐이다.
S11 금지 표현: "병행조", "언제나 같은 주파수", "항상 같은 주파수".
S12 자가검사가 전부 통과한 뒤에 커밋한다.

■ 이 타이틀의 규칙 R1~R19
R1  소리는 집 번호 하나에서 나온다. 주소 → midiOf → hz. 주소마다 주파수를 따로 두지 않는다.
R2  주소는 글자, 변화량, 숫자 세 값({ L, a, o })으로만 저장한다. 더블샵을 샵 둘로, E♯을 F로 바꾸지 않는다.
R3  배달에는 씨앗만 적는다(방식, 주소, 도움 설정). 도착 집, 문패, 카드의 옳고 그름, 반송 길, 문구 속 낱말은 엔진과 배달 모델이 만든다.
R4  "같은 집"은 집 번호의 일치로만 판정한다. 12로 나눈 나머지(samePc)는 판정에 쓰지 않는다. C♯4와 D♭5는 다른 집이다.
R5  기호는 늘 글자의 흰 집에서 센다. 앞의 기호에 더하지 않는다. 조표와 제자리표가 없다.
R6  귀로 주소를 묻지 않는다. 소리는 같은 집임을 확인하는 데만 쓴다.
R7  단서가 없으면 그 집의 주소를 모두 정답으로 받는다.
R8  길의 창은 흰 집 아홉 채다. 배달 하나 동안 창이 움직이지 않는다. 필요한 집이 한 창에 들어오지 않는 씨앗은 받지 않는다(checkJob).
R9  집을 누르는 것은 확정이 아니다. 채점은 주 단추로만 한다. 고르지 않은 확정, 덜 쓴 주소, 이미 달린 문패는 채점하지 않고 안내만 한다.
R10 오답은 결과를 지우지 않는다. 1차에 내 길과 까닭을 보여 주고, 2차에 고쳐 준 뒤 확정을 기다린다. 그 배달의 기록은 ◐다. 벌점, 목숨, 제한 시간이 없다.
R11 모든 소리는 오디오 클록에 한 번에 예약하고 묶음으로 취소한다.
R12 효과음에는 음높이가 없다(잡음으로 만든다). 음높이가 있는 소리는 집의 소리 하나뿐이다. 틀렸을 때 집의 소리를 내지 않는다.
R13 기호(♯ ♭ 𝄪 𝄫)와 음자리표는 글꼴이 아니라 SVG로 그린다. 화면 읽기에는 말로 준다("C 샵 4").
R14 배달 화면은 폭 320px, 높이 545px 이상에서 스크롤이 없다. 다섯 줄(HUD, 편지 카드, 무대, 판독 줄, 조작부)의 자리와 높이가 단계에 따라 움직이지 않는다.
R15 글자 12px 이상, 단추 44px 이상(주 단추 52px), 대비 4.5:1 이상. 집만은 폭이 44px에 못 미칠 수 있다.
R16 이모지 0. 화살표와 기록 표시(● ◐)도 글자가 아니라 그림으로 그린다.
R17 틀은 한 번만 만든다. 길은 창이 바뀔 때만, 악보·걸음·문패 판은 그릴 내용이 바뀔 때만 다시 만든다. 판독 줄은 노드를 두고 글만 바꾼다.
R18 소리가 멈추면 듣기를 멈추고 알린다. 화면을 떠나도 같다.
R19 색만으로 뜻을 전하지 않는다. 도착 집은 줄무늬, 내 길은 점선, 기록은 모양을 함께 쓴다.

■ 작업 규칙 W1~W14
W1  [그대로] 프롬프트의 조각은 글자 그대로 넣는다. 고치지 않고, 줄이지 않고, 다시 쓰지 않는다. 주석과 빈 줄도 그대로 둔다.
W2  조각을 넣을 자리는 마커 줄 바로 위다. 마커 줄을 지우거나 옮기지 않는다. 이미 있는 줄의 순서를 바꾸지 않는다.
W3  프롬프트가 시작 전에 보라고 한 `index.html#test`의 첫 줄이 기대와 다르면 멈추고 보고한다.
W4  검사를 조용히 고치지 않는다. 검사가 실패하면 검사가 아니라 방금 넣은 코드를 먼저 의심한다. 기대값이 틀렸다고 판단하면 근거를 docs/decisions.md에 적고 사람에게 묻는다.
W5  index.html 말고 만드는 파일은 docs/ 아래의 문서와 tools/check.mjs뿐이다.
W6  [설계] 프롬프트에서도 이미 있는 [그대로] 코드를 고치지 않는다. 갈고리(atBoot, onPaint, on)로 잇는다. 고쳐야만 하면 무엇을 왜 고치는지 먼저 말하고 확인을 받는다.
W7  새 코드의 자리: 화면은 구획 10 SCREENS, 입력은 구획 8 INPUT, 상태를 바꾸는 함수는 구획 4 STATE, 순수 계산은 구획 1~3, 검사는 구획 11 TESTS. 스타일과 화면 틀도 마커 줄 위에 덧붙인다.
W8  상태 객체 S에 직접 값을 넣지 않는다(S.x = …, Object.assign(S, …) 금지). 화면을 직접 고치는 대신 상태를 바꾸고 onPaint가 그리게 한다.
W9  이론 값, 주소, 주파수, 문구 속 낱말을 손으로 적지 않는다. 엔진의 함수를 부른다.
W10 화면의 글은 해요체, 한 번에 두 문장 이내. 문구 속 주소는 토큰(⟦C#4⟧)으로 적고 rich()가 그림으로 바꾸게 한다.
W11 새 화면 요소를 만들면 320×545, 320×568, 360×640, 390×844에서 스크롤과 잘림을 본다.
W12 끝나면 프롬프트가 정한 대로 보고한다. 돌리지 못한 것은 NOT_RUN이라고 적는다. 보지 않은 것을 봤다고 쓰지 않는다. 폰에서 확인하지 않았으면 그렇게 적는다.
W13 한 프롬프트에 한 커밋. 메시지는 "P03: 이론 엔진" 꼴.
W14 막히면 추측으로 메우지 말고 묻는다. 근거는 docs/의 설계서 절 번호로 든다.

■ 낱말
길: 건반 모양으로 늘어선 집들 / 집: 건반 하나 / 집 번호: MIDI 번호(화면에는 보이지 않는다) / 주소: 음이름 표기 하나 / 글자·기호·숫자: 주소의 세 부분 / 구역: 옥타브(C부터 B까지) / 구역 경계: B와 C 사이 / 출발 집: 주소의 글자와 숫자가 가리키는 흰 집 / 걸음, 한 칸: 옆집으로 한 번 옮기는 것, 반음 / 도착 집: 주소가 가리키는 집 / 문패, 문패 판: 집에 달린 주소 하나, 도착 집 위에 뜨는 주소 모음 / 편지, 봉투: 문제의 음, 그 주소를 크게 적은 칸 / 우체부: 지금 서 있는 집을 가리키는 표시 / 창: 화면에 보이는 흰 집 아홉 채 / 배달, 배달일: 문제 하나, 한 판 / 단계: 출발(start), 걸음(walk), 고르기(drop), 쓰기(plate), 분류(sort), 까닭(diag), 듣기(deliver) / 마감 배달: 배달일의 마지막 배달 / 발견 장면: 배달 사이에 끼는 비교 화면 / 배달 기록: ●(한 번에 배달) 또는 ◐(안내를 받음) / 판독 줄: 무대 아래 한두 줄의 안내
화면의 말: 샵, 플랫, 더블샵, 더블플랫, 딴이름한소리, 구역. "옥타브"는 주소록의 알아 두기에서 한 번만 밝힌다.

■ 파일의 구조
index.html 하나에 <style>, <body>, <script>가 차례로 있다.
- 스타일의 끝 마커:  /* -- 스타일 끝 -- */
- 화면 틀의 끝 마커:  <!-- -- 화면 끝 -- -->
- 스크립트는 구획 12개다. 구획마다 머리 줄 "// == N 이름 =="과 끝 마커 "// -- N 끝 --"이 있다. 마지막 줄은 boot();다.
  1 THEORY  이론 엔진. 순수 함수. window, document, 소리를 부르지 않는다
  2 FLOW    배달 모델(jobModel), 문구, 흐름 함수 F.*, 발견 장면의 모델. 순수 함수
  3 JOBS    배달 씨앗(DAYS, SPIKE), 발견 장면 씨앗(SCENES)
  4 STATE   상태 S, setState, 갈고리, 배달 열기, act, 배달일의 흐름, 지도 열기
  5 VIEW    기호와 음표 그림, 길·악보·걸음·문패 판·봉투·판독 줄·조작부 그리기
  6 AUDIO   컨텍스트, 집의 소리, 효과음, 묶음 취소
  7 RUN     듣기(예약, 프레임, 중단)
  8 INPUT   탭, 키보드, 언락, 화면 크기
  9 STORAGE 저장과 불러오기, 폴백
  10 SCREENS 겹쳐 뜨는 화면(마감, 지도, …)
  11 TESTS  검사 러너와 검사
  12 BOOT   시작
- 의존 방향은 1 ← 2 ← 3·4 ← 5~8 ← 10이다.

■ 갈고리 (구획 4에 있다)
atBoot(순서, fn)   시작할 때 한 번. 순서가 작은 것부터. 쓰는 순서: 10 조작부 단추 만들기, 20 화면 재기, 25 소리 표시, 30 저장 불러오기, 40 검사, 50 처음 화면과 바로가기, 51 장면 바로가기, 55 풀린 상태로 열기, 90~92 점검용 창구(window.__twn)
onPaint(순서, fn)  setState 뒤마다. 순서가 작은 것부터. 쓰는 순서: 10 겹쳐 뜨는 화면 보이기, 12 지도, 20 진행 점, 30 편지 카드, 40 길, 50 봉투와 악보, 60 걸음과 문패 판, 70 판독 줄, 80 조작부, 90·91 마감
on(이름, fn) / emit(이름, 값)
  leave   무대의 내용이 바뀐다(듣기를 멈춘다)
  listen  배달이 듣기 단계에 들어섰다
  audio   오디오 컨텍스트의 상태가 바뀌었다
  wrong   채점한 오답. 값은 까닭 코드
  done    배달이 듣기 단계에 들어섰다. 값은 "full" 또는 "half". 돌려준 값을 상태에 함께 넣는다
  next    듣기 단계에서 주 단추. 처리했으면 true를 돌려준다(아니면 다음 배달로 간다)
  finish  그날의 줄이 끝났다. 돌려준 값을 상태에 함께 넣는다

■ 상태 S의 필드
screen "map" | "run" | "scene" | "close" · day 배달일 id("d0"…, 검사용 "sp") · idx 그날의 줄에서의 자리 · requeue 다시 낼 배달의 번호들 · results [{ id, done }] 줄의 자리대로 · gained 이번에 얻은 문패 · report 그날의 결과 · dev 바로가기로 열었다(기록하지 않는다) · scene null | { id, line, from } · note 지도 위의 한 줄
phase 단계 · pos 우체부가 선 집 · picked 이 단계에서 집을 골랐는가 · tries 이 단계에서 틀린 횟수 · flawed 이 배달에서 한 번이라도 틀렸는가 · pen { h, a } 쓰는 주소(흰 집, 변화량) · board 문패 판 · picks, off 분류에서 고른 카드, 꺼진 카드나 까닭 단추 · mine, goal 내 길, 바른 길({ from, to }) · lit 울리는 주소의 순번(-1 없음, board.length 함께) · done "" | "full" | "half" · msg { tone, text }
배달 모델 M은 상태가 아니다. 씨앗에서 언제든 다시 계산한다(jobModel). 듣기 객체 run도 상태 밖이다.

■ 공식
집 번호 = 12 × (숫자 + 1) + 자연음 반음값 + 변화량        midiOf
자연음 반음값 = 장음계 공식의 누적합(0 2 4 5 7 9 11)        semisOf
글자 자리 = 7 × 숫자 + 글자(0~6). 기호는 자리를 바꾸지 않는다   stepOf  (오선의 자리)
구역 = floor(집 번호 / 12) − 1                            zoneOf
한 집의 주소 = 변화량 a(0, +1, −1, +2, −2)마다 (집 번호 − a)가 흰 집이면 그 흰 집의 글자 + a   spellingsAt
주파수 = 440 × 2^((집 번호 − 69) / 12)                     hz
그날의 줄 = [첫 번째 배달들] + [다시 낼 배달들] + [마감 배달]    queueOf
통과 = 한 번에 배달한 편지가 배달 수 × 0.8 이상(올림). 첫 번째 결과만 센다   passNeed, dayReport

■ 잠금 정답표 (어긋나면 코드가 틀린 것이다)
- C4 = 60, A4 = 69 = 440Hz, B3 = 59, C5 = 72.
- C♯4 = D♭4 = 61(277.18Hz). B♯3 = C4 = 60. C♭4 = B3 = 59. E♯4 = F4 = 65. F♭4 = E4 = 64.
- C♯4와 D♭5는 같은 집이 아니다. B♯3과 C3은 같은 집이 아니다.
- D4 집의 주소는 D4, C𝄪4, E𝄫4 셋이다. G♯4 집은 G♯4, A♭4 둘뿐이다. 열두 집 가운데 주소가 둘인 집은 이것 하나다.
- 한 구역의 주소는 35가지다(흰 집의 글자 문패 7 + 얻는 문패 28).
- 오선의 자리: C4와 C♯4는 28, D♭4는 29. E♯4의 음표는 E의 자리에 그린다.
- 배달일에서 얻는 문패는 0, 10, 4, 6, 6, 2개다. 통과 기준은 7건이면 6통, 8건이면 7통이다.
- 듣기: t0 = 지금 + 0.15초. k번째 주소는 t0 + 0.8k초에 0.62초(크기 0.3). 주소가 둘 이상이면 t0 + 0.8n초에 모두 함께 1.1초(각 0.3 ÷ n). 걸음 소리는 0.24초(크기 0.28).
- 화면: 다섯 줄의 높이는 320×568에서 44 / 50 / 294 / 40 / 104px. 높이 545px 미만이면 안내를 띄운다.
- 검사는 47개다. TH 12, CH 4, SC 3, JB 4, FL 5, AU 8, ST 4, SV 4, CT 3.

■ 한 배달의 흐름
걸음 연습: 걸음 → 듣기
걸어서 배달: 출발 → 걸음 → (쓰기) → 듣기
바로 배달, 악보 편지: 고르기 → (쓰기) → 듣기
우편 분류: 분류 → 듣기
반송 편지: 까닭 → 고르기 → 듣기
흐름 함수 F.move, F.nudge, F.sign, F.pick, F.cause, F.confirm은 (배달 모델, 상태, 입력)을 받아 "바뀔 값"만 돌려준다. 상태를 바꾸지 않고 화면도 소리도 만지지 않는다. act가 그 값을 setState에 넘기고 fx(hop, stamp, nope, listen)의 소리를 낸다.

■ 검사
index.html#test로 열면 결과표가 뜬다. 첫 줄은 "자가검사 n/n (전체 47개 중 n개 작성) · TH a/b · …" 꼴이다. 결과는 window.__tests에도 있다. 평소에도 불러올 때 한 번 돈다.

■ 보고
프롬프트마다 끝에 "보고"가 적혀 있다. 기본은 이 네 가지다.
1. index.html#test의 첫 줄(글자 그대로)
2. 콘솔 오류 수와 외부 요청 수
3. 넣은 조각 수, 조각에서 바꾼 글자(없어야 한다)
4. 하지 못한 것과 그 까닭

■ 이해 질문 (지금 답한다)
1. C♯4와 D♭4의 출발 집과 걸음은 각각 무엇인가? 둘이 같은 집이라는 것은 무엇으로 판정하는가?
2. C♯4와 D♭5는 딴이름한소리인가? 12로 나눈 나머지를 판정에 쓰면 안 되는 까닭은?
3. B♯3은 어느 집인가? C3이 아닌 까닭은?
4. 한 집의 주소는 몇 개인가? 한 구역의 주소는 모두 몇 가지인가? 그 수는 어디서 나오는가?
5. C𝄪4를 "C♯♯4"나 "D4"로 저장하면 안 되는 까닭은?
6. E♯4의 음표는 오선의 어느 자리에 그리는가?
7. 집을 누르면 채점하는가? 아무것도 고르지 않고 [배달]을 누르면?
8. 오답 1차와 2차에 화면이 하는 일은? 그 배달의 기록은?
9. 쓰기의 정답은 하나인가? C4 집에 B♯3 문패를 달려면 무엇을 누르는가?
10. 주소마다 주파수를 적은 표를 두면 안 되는 까닭은?
11. 듣기의 둘째 음을 setTimeout으로 내면 안 되는 까닭은? 함께 낼 때 음마다 크기를 주소 수로 나누는 까닭은?
12. [그대로] 프롬프트의 조각은 어디에 넣는가? 더 나은 코드가 떠오르면 어떻게 하는가?
13. 화면의 글자 하나를 바꾸려면 무엇을 부르는가? 직접 하면 안 되는 일 두 가지는?
14. 프롬프트를 시작할 때 `#test`의 첫 줄이 기대와 다르면 어떻게 하는가? 검사가 실패하면 무엇부터 의심하는가?
````

**정답.**

1. C♯4는 C4에서 오른쪽으로 한 칸, D♭4는 D4에서 왼쪽으로 한 칸이다. 집 번호가 61로 같다. 판정은 집 번호의 일치다.
2. 아니다. 구역이 달라 다른 집이다(61과 73). 나머지는 구역을 지운다(R4).
3. C4다. 숫자는 글자를 따라간다. 3구역의 B에서 오른쪽으로 한 칸 걸으면 경계를 넘어 4구역의 C다.
4. 셋이고 G♯/A♭ 집만 둘이다. 35가지다. 그 집에서 두 칸 안에 있는 흰 집의 수다.
5. 주소는 글자, 변화량, 숫자다. 바꿔 저장하면 오선의 자리와 출발 집이 달라진다. 더블샵은 글자의 흰 집에서 두 칸이지 앞의 샵에 더하는 것이 아니다(R2, R5).
6. E의 자리, 맨 아랫줄이다. 기호는 글자 자리를 바꾸지 않는다. 집 번호로 자리를 정하면 F의 자리에 그려져 틀린다.
7. 채점하지 않는다. 우체부만 옮긴다. 채점은 주 단추다. 고르지 않은 확정은 안내만 하고 틀린 것으로 세지 않는다(R9).
8. 1차에 내 길과 까닭을 보여 준다. 2차에 바른 길을 나란히 그리고 옮겨 준 뒤 확정을 기다린다. 기록은 ◐다(R10).
9. 하나가 아니다. 도착 집의 주소이고 아직 판에 없으면 어느 것이든 받는다(R7). 3구역의 B 집과 [샵] 단추를 누른다. 숫자는 고른 흰 집에서 저절로 나온다.
10. 같은 집이 같은 소리라는 것이 코드로 보장되지 않는다. 주소 → 집 번호 → 공식 하나다(R1, S7).
11. 간격이 흔들리고 취소할 수 없다. 모든 음을 한 번에 예약하고 묶음으로 취소한다(R11). 같은 주파수의 음을 겹치면 진폭이 더해진다. 함께 낸 소리가 앞의 한 음과 같은 크기로 들려야 "한 소리"다.
12. 프롬프트가 적은 마커 줄의 바로 위에, 글자 그대로 넣는다. 더 나은 코드가 떠올라도 고쳐 넣지 않는다. 보고에 제안으로 적는다(W1, W2).
13. `setState(patch)`를 부른다. 상태 객체 `S`에 직접 값을 넣는 것, 그리고 화면 요소를 `onPaint` 밖에서 직접 고치는 것은 하지 않는다(W8).
14. 멈추고 보고한다(W3). 검사가 아니라 방금 넣은 코드를 먼저 의심한다. 검사를 조용히 고치지 않는다(W4).

---

## 2. PO0 뼈대

목표는 빈 틀이 뜨고, 저장이 되고, 검사 다섯 개가 도는 것이다. 설계서 11장의 PO0에 해당한다.

### P01 [그대로] 파일 전체: 스타일, 틀, 구획 12개

| 항목 | 내용 |
|---|---|
| 단계 | PO0 |
| 시작 전 | 빈 저장소 |
| 끝난 뒤 | `index.html` 265줄. 검사는 아직 없다 |
| 조각 | 1개(파일 전체) |

**무엇이 들어가는가.**

- **스타일.** 색과 간격의 토큰, 다섯 줄(HUD 44px, 편지 카드, 무대, 판독 줄 40px, 조작부 104px)의 격자, 주소 글자와 기호 그림, 악보 창, 길과 집, 걸음, 문패 판, 조작부의 묶음, 겹쳐 뜨는 화면. 설계서 부록 C.5의 스타일에서 스파이크에만 있던 것(배달일 고르기)을 빼고 HUD의 [지도] 단추를 더했다. 흰 집의 테두리 색은 설계서 9.5절이 고치라고 한 `#84929e`다.
- **화면 틀.** `#app` 안에 다섯 줄이 있고 조작부에는 단계별 묶음 다섯(`#setMove`, `#setSign`, `#setCards`, `#setCause`, `#setListen`)이 미리 놓여 있다. 보이기만 바꾼다(R17). 높이가 낮을 때의 안내 `#lowScreen`이 따로 있다. 설계서 부록 C.6의 틀에서 스파이크의 마감 화면과 배달일 고르기를 뺐다. 마감 화면은 P13에서, 지도는 P19에서 들어온다.
- **스크립트.** 구획 12개의 머리와 끝 마커. 구획 4에 상태 `S`, `setState`, 갈고리(`atBoot`, `onPaint`, `on`, `emit`). 구획 5에 화면 높이로 모드와 집의 높이를 정하는 `measure`. 구획 8에 화면 크기 변화의 디바운스(이 파일의 유일한 `setTimeout`). 구획 12에 `boot`.

````text
[P01 · 그대로] 파일 전체를 만든다

P00의 W1, W2, W5를 지킨다.

시작 전: 저장소에 index.html이 없어야 한다. 있으면 멈추고 보고한다.

할 일: 저장소의 맨 위에 index.html을 만들고 아래 조각을 글자 그대로 넣는다. 조각이 파일의 전부다.

조각 1/1 · 새 파일: index.html (파일 전체)
```html
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>두 이름의 음악 마을</title>
<style>
:root{
  --counter:#e8eef2; --panel:#ffffff; --line:#cbd6de; --ink:#1a2630; --ink-2:#4b5b68;
  --road:#dde6ec; --wall:#fffdf8; --wall-edge:#84929e; --dark:#26323d;
  --lit:#ffd35c; --steel:#17627e; --steel-soft:#dcedf4;
  --good:#256f43; --warn:#8f5000; --bad:#ab3626;
  --sp:10px; --keyH:100px; --cardH:56px; --gap:8px;
}
*{box-sizing:border-box}
html,body{height:100%;margin:0}
body{font-family:system-ui,-apple-system,"Apple SD Gothic Neo","Malgun Gothic","Noto Sans KR",sans-serif;background:var(--counter);color:var(--ink);
  word-break:keep-all;-webkit-text-size-adjust:100%;-webkit-tap-highlight-color:transparent;overflow:hidden}
button{font:inherit;color:inherit;margin:0;touch-action:manipulation}
.sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}

/* 틀: 다섯 줄. 넷은 높이가 고정이고 무대만 늘어난다 */
#app{height:100vh;height:100dvh;max-width:720px;margin:0 auto;padding:var(--gap) 8px;display:grid;grid-template-rows:44px var(--cardH) minmax(0,1fr) 40px 104px;gap:var(--gap)}
#app[data-mode="narrow"]{--cardH:50px;--gap:6px}
body.is-low{overflow:auto}
body.is-low #app{height:545px}

/* HUD */
#hud{display:flex;align-items:center;gap:8px;min-width:0}
#dots{display:flex;gap:4px;flex:1;min-width:0}
#dots i{width:10px;height:10px;border-radius:50%;border:1.5px solid var(--ink-2);flex:none}
#dots i.is-now{border-color:var(--steel);box-shadow:0 0 0 2px var(--steel-soft)}
#dots i.is-full{background:var(--ink);border-color:var(--ink)}
#dots i.is-half{background:linear-gradient(90deg,var(--ink) 50%,transparent 50%);border-color:var(--ink)}
#soundChip{height:44px;padding:0 12px;border-radius:22px;border:1.5px solid var(--warn);background:var(--panel);color:var(--warn);font-size:13px;font-weight:700;white-space:nowrap}
#exitBtn{height:44px;min-width:56px;padding:0 10px;border-radius:8px;border:1.5px solid var(--ink-2);background:var(--panel);font-size:13px;font-weight:700;white-space:nowrap}

/* 편지 카드 */
#card{background:var(--panel);border:1px solid var(--line);border-radius:10px;padding:0 10px;display:flex;align-items:center;gap:8px;min-width:0;overflow:hidden}
#chip{flex:none;font-size:12px;font-weight:700;color:var(--steel);background:var(--steel-soft);border-radius:6px;padding:3px 7px;white-space:nowrap}
#ask{margin:0;font-size:15px;line-height:1.3;font-weight:600}
#app[data-mode="narrow"] #ask{font-size:14px}

/* 주소 글자와 기호 */
.nm{white-space:nowrap;font-weight:700}
.nm .oc{color:var(--ink-2);margin-left:.04em}
#envName .oc{font-size:.8em}
.sg{display:inline-block;height:1.05em;width:auto;vertical-align:-.2em;margin:0 .04em;overflow:visible}
.sg2{vertical-align:.08em}

/* 무대 */
#stage{background:var(--panel);border:1px solid var(--line);border-radius:10px;padding:6px 8px;display:flex;flex-direction:column;justify-content:center;gap:6px;min-height:0;overflow:hidden;align-self:center;width:100%;height:100%}
#sheet{display:flex;gap:8px;height:calc(var(--sp) * 9.6);flex:none}
#envelope{flex:none;width:88px;border:1.5px solid var(--line);border-radius:8px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;background:var(--counter)}
#envLabel{font-size:12px;color:var(--ink-2)}
#envName{font-size:26px;line-height:1.15}
#envNote{font-size:12px;color:var(--ink-2);min-height:14px}
#staff{flex:1;min-width:0;height:100%;display:block}
#staff .ln{stroke:var(--ink-2);stroke-width:1}
#staff .clef path{fill:none;stroke:var(--ink);stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round}
#staff .clef circle{fill:var(--ink)}
#staff .note{color:var(--ink)}
#staff .hd{fill:currentColor}
#staff .hole{fill:var(--panel)}
#staff .note.is-ghost{color:var(--steel)}
#staff .note.is-ghost .hd{fill:none;stroke:currentColor;stroke-width:1.6;stroke-dasharray:3 2}
#staff .note.is-ghost .hole{fill:none}
#staff .note.is-lit{color:var(--steel)}
#staff .mark{fill:var(--lit);stroke:var(--ink);stroke-width:1}
.gl{fill:currentColor;stroke:none}
.gs{fill:none;stroke:currentColor}

/* 길: 문패 판, 걸음, 집, 구역 */
#street{flex:none;position:relative}
#boardRow{height:28px;position:relative}
#board{position:absolute;top:0;height:26px;display:flex;gap:4px;align-items:stretch}
.plate{min-width:40px;padding:0 6px;border:1.5px solid var(--ink);border-radius:5px;background:var(--panel);font-size:13px;display:flex;align-items:center;justify-content:center}
.plate.is-lit{background:var(--lit)}
.slot{min-width:30px;border:1.5px dashed var(--ink-2);border-radius:5px;color:var(--ink-2);font-size:13px;display:flex;align-items:center;justify-content:center}
#routeRow{height:26px;position:relative}
#routes{position:absolute;inset:0;width:100%;height:100%;overflow:visible}
#routes path{fill:none;stroke-width:2.2;stroke-linecap:round}
#routes .r-live{stroke:var(--steel);color:var(--steel)}
#routes .r-mine{stroke:var(--warn);color:var(--warn);stroke-dasharray:5 3}
#routes .r-goal{stroke:var(--good);color:var(--good)}
#routes .r-done{stroke:var(--good);color:var(--good)}
#routes .r-done.is-lit{stroke-width:3.4}
#routes polygon,#routes circle{fill:currentColor;stroke:none}
#pin{position:absolute;bottom:1px;width:18px;height:18px;margin-left:-9px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:var(--steel);border:2px solid var(--panel);box-shadow:0 0 0 1px var(--steel);pointer-events:none}
#houses{position:relative;height:var(--keyH);background:var(--road);border-radius:4px}
#pin.is-idle{background:var(--panel);box-shadow:0 0 0 2px var(--steel);border-color:var(--panel)}
.house{position:absolute;top:0;padding:0;border-radius:0 0 5px 5px;cursor:pointer}
.wh{height:100%;background:var(--wall);border:1px solid var(--wall-edge);display:flex;flex-direction:column;justify-content:flex-end;align-items:center;padding-bottom:5px;z-index:1}
.wh b{font-size:14px;line-height:1.1}
.wh span{font-size:12px;line-height:1.1;color:var(--ink-2)}
.bk{height:60%;background:var(--dark);border:1px solid var(--dark);z-index:2}
.bk::before{content:"";position:absolute;inset:0 -15% 0 -15%}
.house.is-edge{border-left:3px solid var(--ink)}
.house.is-from{box-shadow:inset 0 0 0 3px var(--steel-soft),inset 0 0 0 4px var(--steel)}
.wh.is-goal{background:repeating-linear-gradient(135deg,var(--lit) 0 6px,#ffe08a 6px 12px)}
.bk.is-goal{background:repeating-linear-gradient(135deg,var(--dark) 0 5px,#55616d 5px 10px);border-color:var(--lit);box-shadow:inset 0 0 0 2px var(--lit)}
.house.is-here{outline:3px solid var(--steel);outline-offset:-3px}
.bk.is-here{outline-color:var(--lit);z-index:3}
.house:focus-visible{outline:3px solid var(--ink);outline-offset:-3px;z-index:4}
#zones{height:18px;position:relative}
#zones span{position:absolute;top:2px;height:16px;font-size:12px;line-height:16px;text-align:center;color:var(--ink-2);border-top:2px solid var(--ink-2);white-space:nowrap;overflow:hidden}
#zones span + span{border-left:3px solid var(--ink)}

/* 판독 줄 */
#readout{margin:0;height:40px;display:flex;align-items:center;font-size:13.5px;line-height:1.35;padding:0 4px;overflow:hidden}
#readout.is-good{color:var(--good)} #readout.is-warn{color:var(--warn)} #readout.is-bad{color:var(--bad)}
#readout .nm .oc{color:inherit}

/* 조작부: 44px 줄 + 52px 줄 */
#controls{display:grid;grid-template-rows:44px 52px;gap:8px}
.set{display:flex;gap:6px;height:44px}
.set[hidden]{display:none}
.set button{flex:1;min-width:0;height:44px;border:1.5px solid var(--ink-2);border-radius:8px;background:var(--panel);font-size:14px;font-weight:600;display:flex;align-items:center;justify-content:center;gap:4px;padding:0 2px}
.set button:disabled{opacity:.38}
.set button[aria-pressed="true"]{background:var(--steel-soft);border-color:var(--steel);box-shadow:inset 0 0 0 1.5px var(--steel)}
.set button.is-off{text-decoration:line-through}
#setSign button{flex-direction:column;gap:0}
#setSign button i{font-style:normal;font-size:12px;line-height:1.15;letter-spacing:-.5px;color:var(--ink-2)}
#setSign button .sg{font-size:19px;vertical-align:0}
#setSign button .sg2{margin:3px 0 3px}
#setSign button .sg0{font-size:15px;line-height:19px;font-weight:700}
#setCards button{font-size:16px}
.arw{width:12px;height:12px;flex:none}
#rowB{display:flex;gap:8px}
#main{flex:1;height:52px;border:0;border-radius:10px;background:var(--steel);color:#fff;font-size:17px;font-weight:700}
#main:disabled{background:var(--line);color:var(--ink-2)}

/* 겹쳐 뜨는 화면 */
.sheet{position:fixed;inset:0;background:rgba(232,238,242,.97);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:16px;text-align:center;z-index:20}
.sheet[hidden]{display:none}
.sheet h2{margin:0;font-size:18px}
.sheet p{margin:0;font-size:14px;line-height:1.5;max-width:300px}
.sheet ol{margin:0;padding:0;list-style:none;font-size:13px;line-height:1.7;text-align:left}
.sheet button{height:48px;padding:0 20px;border:0;border-radius:10px;background:var(--steel);color:#fff;font-size:16px;font-weight:700}
.sheet button.is-plain{background:var(--panel);color:var(--ink);border:1.5px solid var(--ink-2)}
.rec{display:inline-block;width:10px;height:10px;border-radius:50%;border:1.5px solid var(--ink);margin-right:6px;vertical-align:-1px}
.rec.is-full{background:var(--ink)} .rec.is-half{background:linear-gradient(90deg,var(--ink) 50%,transparent 50%)}
@media (prefers-reduced-motion:no-preference){#pin{transition:left .12s ease-out}}
/* -- 스타일 끝 -- */
</style>
</head>
<body>
<div id="app" data-mode="base">
  <header id="hud">
    <button id="exitBtn" type="button" hidden>지도</button>
    <span id="dots" aria-hidden="true"></span>
    <button id="soundChip" type="button" hidden>소리 켜기</button>
  </header>
  <section id="card"><span id="chip"></span><p id="ask" aria-live="polite"></p></section>
  <section id="stage" aria-label="배달 무대">
    <div id="sheet">
      <div id="envelope"><span id="envLabel"></span><b id="envName"></b><span id="envNote"></span></div>
      <svg id="staff" role="img" aria-label="악보"></svg>
    </div>
    <div id="street">
      <div id="boardRow"><div id="board" hidden></div></div>
      <div id="routeRow"><svg id="routes" aria-hidden="true"></svg><div id="pin" hidden></div></div>
      <div id="houses" role="group" aria-label="길의 집들"></div>
      <div id="zones" aria-hidden="true"></div>
    </div>
  </section>
  <p id="readout" role="status"></p>
  <section id="controls" aria-label="조작">
    <div id="rowA">
      <div class="set" id="setMove">
        <button type="button" id="goLeft"><svg class="arw" viewBox="0 0 12 12" aria-hidden="true"><path d="M9 1L2 6l7 5z" fill="currentColor"/></svg>왼쪽 한 칸</button>
        <button type="button" id="goRight">오른쪽 한 칸<svg class="arw" viewBox="0 0 12 12" aria-hidden="true"><path d="M3 1l7 5-7 5z" fill="currentColor"/></svg></button>
      </div>
      <div class="set" id="setSign" hidden></div>
      <div class="set" id="setCards" hidden></div>
      <div class="set" id="setCause" hidden></div>
      <div class="set" id="setListen" hidden><button type="button" id="again">다시 듣기</button></div>
    </div>
    <div id="rowB"><button type="button" id="main"></button></div>
  </section>
</div>
<div class="sheet" id="lowScreen" hidden>
  <h2>화면이 낮아요</h2>
  <p>세로로 돌리거나 창을 키워 주세요. 높이 545px부터 한 화면에 들어가요.</p>
  <button type="button" id="goOn">그래도 계속하기</button>
</div>
<!-- -- 화면 끝 -- -->
<script>
// == 1 THEORY ==
// 이론 엔진. 순수 함수다. window, document, 소리를 부르지 않는다.
// -- 1 끝 --

// == 2 FLOW ==
// 배달 모델, 문구, 흐름 함수. 순수 함수다.
// -- 2 끝 --

// == 3 JOBS ==
// 배달 씨앗과 발견 장면 씨앗.
// -- 3 끝 --

// == 4 STATE ==
// 상태를 바꾸는 곳은 setState 하나뿐이다.
const $ = (id) => document.getElementById(id);
const BOOT = [], PAINT = [], HOOKS = {};
const atBoot = (order, fn) => BOOT.push([order, fn]);                    // 시작할 때 할 일. 순서가 작은 것부터 한다
const onPaint = (order, fn) => { PAINT.push([order, fn]); PAINT.sort((a, b) => a[0] - b[0]); };   // 그릴 때 할 일. 순서가 작은 것부터 한다
const on = (name, fn) => { (HOOKS[name] = HOOKS[name] || []).push(fn); };  // 일이 생겼을 때 할 일을 건다
const emit = (name, arg) => (HOOKS[name] || []).map((fn) => fn(arg));      // 건 일을 차례로 하고 돌려준 값들을 모은다
let M = null;                                                            // 지금 배달의 모델. 씨앗에서 계산한 값이고 상태가 아니다
let painting = true;                                                     // 검사가 화면을 건드리지 않게 그리기를 끄는 자리
const S = { screen: "run", day: "", idx: -1, requeue: [], results: [], gained: [], report: null, dev: false, scene: null, note: "",
            phase: "", pos: 0, picked: false, tries: 0, flawed: false, pen: { h: null, a: null }, board: [], picks: [], off: [],
            mine: null, goal: null, lit: -1, done: "", msg: { tone: "", text: "" } };
function render() { if (painting) for (const p of PAINT) p[1](); }
function setState(patch) { Object.assign(S, patch); render(); }
// -- 4 끝 --

// == 5 VIEW ==
let SP = 10;                                                             // 오선 한 칸(px)
const built = {};                                                        // 다시 그릴지 가리는 열쇠들
function measure() {                                                     // 화면 높이에서 모드와 집의 높이를 정한다
  const h = window.innerHeight, app = $("app"), low = document.body.classList.contains("is-low");
  const mode = h < 620 || low ? "narrow" : h < 760 ? "base" : "tall";
  app.dataset.mode = mode;
  SP = mode === "narrow" ? 10 : mode === "base" ? 11 : 12;
  app.style.setProperty("--sp", SP + "px");
  const fixed = SP * 9.6 + 6 + 28 + 26 + 18 + 14;                        // 악보 창, 틈, 문패 줄, 걸음 줄, 구역 띠, 무대의 안쪽 여백과 테두리
  $("stage").style.maxHeight = "none";
  const keyH = Math.max(72, Math.min(150, $("stage").offsetHeight - fixed));
  app.style.setProperty("--keyH", keyH + "px");
  $("stage").style.maxHeight = fixed + keyH + "px";                       // 높은 화면에서는 무대를 키우지 않고 남는 높이를 위아래에 둔다
  $("lowScreen").hidden = h >= 545 || low;
}
function redraw() { built.staff = built.routes = built.board = ""; render(); }   // 폭이 바뀌었을 때: 폭으로 그린 것을 다시 그린다
atBoot(20, measure);
// -- 5 끝 --

// == 6 AUDIO ==
// -- 6 끝 --

// == 7 RUN ==
// -- 7 끝 --

// == 8 INPUT ==
$("goOn").addEventListener("click", () => { document.body.classList.add("is-low"); measure(); redraw(); });
let resizeTimer = 0;
window.addEventListener("resize", () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(() => { measure(); redraw(); }, 120); });
// -- 8 끝 --

// == 9 STORAGE ==
// -- 9 끝 --

// == 10 SCREENS ==
// -- 10 끝 --

// == 11 TESTS ==
// -- 11 끝 --

// == 12 BOOT ==
function boot() { BOOT.sort((a, b) => a[0] - b[0]).forEach((b) => b[1]()); render(); }
// -- 12 끝 --
boot();
</script>
</body>
</html>
```

하지 말 것:
- 구획 머리("// == N 이름 ==")와 끝 마커("// -- N 끝 --", "/* -- 스타일 끝 -- */", "<!-- -- 화면 끝 -- -->")를 지우거나 고치지 않는다. 뒤의 프롬프트가 모두 이 줄들을 찾는다.
- 빈 구획에 코드를 미리 채우지 않는다.
- 스타일을 정리하거나 줄을 나누지 않는다. 다른 파일을 만들지 않는다.

보고: index.html의 줄 수, 브라우저로 열었을 때의 콘솔 오류 수, 조각에서 바꾼 글자(없어야 한다).
````

**완료 기준.** `index.html`을 브라우저에서 파일로 연다.

- 콘솔 오류 0, 외부 요청 0.
- 다섯 줄(HUD, 편지 카드, 무대, 판독 줄, 조작부)의 높이가 320×568에서 44 / 50 / 294 / 40 / 104px이고 스크롤이 없다.
- 화면에는 빈 틀만 보인다. 편지 카드와 판독 줄이 비어 있고, 조작부에 [왼쪽 한 칸] [오른쪽 한 칸]과 글자 없는 주 단추가 있다.
- 스크립트에 구획 머리(`// == N 이름 ==`) 12개와 끝 마커(`// -- N 끝 --`) 12개가 있고 마지막 줄이 `boot();`다.
- 390×844에서는 넉넉 모드다(`#app`의 `data-mode`가 `tall`). 다섯 줄은 44 / 56 / 357.2 / 40 / 104px이다.
- 320×544로 열면 "화면이 낮아요" 안내가 뜬다. [그래도 계속하기]를 누르면 사라지고 세로로 밀어 쓴다.
- 320×545에서는 안내가 뜨지 않는다.

**사람이 볼 것.** 폰 화면 크기(개발자 도구의 기기 모드 320×568, 390×844)에서 빈 틀이 화면에 꽉 차고 밀리지 않는다.

### P02 [그대로] 저장과 검사 러너

| 항목 | 내용 |
|---|---|
| 단계 | PO0. 끝나면 게이트 GPO0 |
| 시작 전 | P01의 빈 틀. 검사 없음 |
| 끝난 뒤 `#test` | `자가검사 5/5 (전체 47개 중 5개 작성) · ST 1/1 · SV 4/4` |
| 조각 | 4개(구획 9, 구획 11, 화면 틀, 스타일) |

**무엇이 들어가는가.**

- **저장(구획 9).** `blankSave()`가 기본 저장을 만든다. `readSave(글자)`는 저장된 글자를 읽고, 깨졌거나 더 높은 버전이면 기본값과 그 까닭을 돌려준다. `healSave`는 빠진 필드만 기본값으로 채운다. `makeStore(backend)`가 `load`, `save`, `reset`을 가진 저장소를 만든다. 읽지 못한 원본은 `twn_save_v1_backup`에 남기고, 저장소가 오류를 던지면 메모리에만 둔다(`persistent`가 `false`). `hold`가 `true`이면 쓰지 않는다(바로가기와 검사가 쓴다).
- **검사 러너(구획 11).** `test(id, 이름, fn)`으로 검사를 등록하고 `runTests()`가 묶음 순서로 돌린다. 결과는 `window.__tests`와 `window.__testLine`에 놓이고 `#test`로 열면 결과표를 그린다. `appSource()`는 검사 구획을 뺀 스크립트의 글자를 돌려준다. 소스 점검 검사가 쓴다.
- **검사 다섯.** ST-02(상태에 값을 넣는 곳이 `setState` 하나다), SV-01~SV-04(저장을 쓰고 읽기, 빠진 필드 채우기, 깨진 저장과 높은 버전, 막힌 저장소).

````text
[P02 · 그대로] 저장과 검사 러너

P00의 W1~W5를 지킨다.

시작 전: index.html을 열어 빈 틀이 보이고 콘솔 오류가 0인지 확인한다. 아니면 멈추고 보고한다.

할 일: 아래 조각 4개를 적힌 자리에 글자 그대로 넣는다. 자리는 마커 줄의 바로 위다. 마커 줄은 그대로 둔다.

조각 1/4 · 넣을 자리: `// -- 9 끝 --` 줄 바로 위 (구획 9 STORAGE)
```js
const SAVE_KEY = "twn_save_v1";
const blankSave = () => ({ version: 1,
  settings: { volume: 0.8, muted: false, motion: "system", tutorialSeen: [], soundChecked: false },
  days: {}, plates: [], scenes: [], causes: {}, stats: { jobs: 0, clean: 0 }, active: null });
function healSave(raw) {                                                 // 빠진 필드만 기본값으로 채운다. 있는 값은 지킨다
  const base = blankSave(), isObj = (v) => !!v && typeof v === "object" && !Array.isArray(v);
  const out = Object.assign({}, base, raw, { version: 1 });
  out.settings = Object.assign(base.settings, isObj(raw.settings) ? raw.settings : {});
  out.stats = Object.assign(base.stats, isObj(raw.stats) ? raw.stats : {});
  for (const k of ["plates", "scenes"]) if (!Array.isArray(out[k])) out[k] = [];
  for (const k of ["days", "causes"]) if (!isObj(out[k])) out[k] = {};
  if (!isObj(out.active)) out.active = null;
  return out;
}
function readSave(text) {                                                // 저장된 글자를 읽는다. 못 읽으면 기본값과 그 까닭을 돌려준다
  if (text === null || text === undefined || text === "") return { save: blankSave(), why: "" };
  try {
    const raw = JSON.parse(text);
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) return { save: blankSave(), why: "broken" };
    if (raw.version > 1) return { save: blankSave(), why: "newer" };
    return { save: healSave(raw), why: "" };
  } catch (e) { return { save: blankSave(), why: "broken" }; }
}
function makeStore(backend) {                                            // backend(): localStorage 같은 것을 돌려준다. 던지면 메모리에만 둔다
  const st = { data: blankSave(), persistent: true, hold: false, why: "",
    load() {
      try {
        const text = backend().getItem(SAVE_KEY), r = readSave(text);
        if (r.why) backend().setItem(SAVE_KEY + "_backup", text);         // 읽지 못한 원본은 남겨 둔다
        st.data = r.save; st.why = r.why;
      } catch (e) { st.persistent = false; st.data = blankSave(); }
      return st.data;
    },
    save() {                                                             // 저장했으면 true
      if (!st.persistent || st.hold) return false;
      try { backend().setItem(SAVE_KEY, JSON.stringify(st.data)); return true; } catch (e) { st.persistent = false; return false; }
    },
    reset() { st.data = blankSave(); return st.save(); },
  };
  return st;
}
const store = makeStore(() => window.localStorage);
atBoot(30, () => store.load());
```

조각 2/4 · 넣을 자리: `// -- 11 끝 --` 줄 바로 위 (구획 11 TESTS)
```js
const TESTS = [], TOTAL_TESTS = 47, GROUPS = ["TH", "CH", "SC", "JB", "FL", "AU", "ST", "SV", "CT"];
const test = (id, name, fn) => TESTS.push({ id, name, fn });
function runTests() {                                                    // 검사마다 { id, name, pass, n, fails }
  const rank = (t) => GROUPS.indexOf(t.id.slice(0, 2)) * 100 + +t.id.slice(3);   // 묶음 순서, 번호 순서로 돌린다
  return TESTS.slice().sort((a, b) => rank(a) - rank(b)).map((t) => {
    const fails = [];
    let n = 0;
    const ok = (cond, what) => { n++; if (!cond) fails.push(what); };
    const eq = (a, b, what) => ok(JSON.stringify(a) === JSON.stringify(b), `${what}: ${JSON.stringify(a)} ≠ ${JSON.stringify(b)}`);
    try { t.fn(ok, eq); } catch (e) { fails.push("오류: " + (e && e.message)); }
    return { id: t.id, name: t.name, pass: n > 0 && fails.length === 0, n, fails: fails.slice(0, 5) };
  });
}
function testLine(res) {                                                 // #test의 첫 줄
  const part = GROUPS.map((g) => { const a = res.filter((r) => r.id.startsWith(g)); return a.length ? `${g} ${a.filter((r) => r.pass).length}/${a.length}` : ""; }).filter(Boolean);
  return `자가검사 ${res.filter((r) => r.pass).length}/${res.length} (전체 ${TOTAL_TESTS}개 중 ${res.length}개 작성) · ${part.join(" · ")}`;
}
function appSource() {                                                   // 검사 구획을 뺀 스크립트의 글자. 소스 점검에 쓴다
  const s = document.querySelector("script").textContent, a = s.indexOf("\n// == 11 TESTS =="), b = s.indexOf("\n// == 12 BOOT ==");   // 줄 머리의 구획 머리만 찾는다
  return s.slice(0, a) + s.slice(b);
}
function showTests(res) {
  const esc = (t) => String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;");
  $("testLine").textContent = testLine(res);
  $("testList").innerHTML = res.map((r) => `<li class="${r.pass ? "" : "is-fail"}"><i class="rec ${r.pass ? "is-full" : ""}"></i>${r.id} ${esc(r.name)} <small>${r.n}</small>${r.fails.map((f) => `<br><em>${esc(f)}</em>`).join("")}</li>`).join("");
  $("testPage").hidden = false;
}
atBoot(40, () => {
  const res = runTests();
  window.__tests = res;
  window.__testLine = testLine(res);
  if (location.hash === "#test") showTests(res);
});
const fakeStorage = (init, broken) => {                                  // 검사용 저장소
  const m = Object.assign({}, init);
  return { m, getItem(k) { if (broken) throw new Error("막힘"); return k in m ? m[k] : null; }, setItem(k, v) { if (broken) throw new Error("막힘"); m[k] = String(v); } };
};

test("ST-02", "상태를 바꾸는 곳은 setState 하나다", (ok) => {
  const src = appSource();
  ok(!/\bS\.[A-Za-z_$][\w$.]*\s*(=(?![=>])|\+=|-=|\+\+|--)/.test(src), "S의 필드에 직접 값을 넣는 곳이 없다");
  ok((src.match(/Object\.assign\(S\b/g) || []).length === 1, "Object.assign(S, …)는 setState 안의 한 곳뿐이다");
  ok((src.match(/\bS\s*=(?![=>])/g) || []).length === 1, "S를 만드는 곳은 한 곳이고 다시 대입하지 않는다");
});
test("SV-01", "저장을 쓰고 읽으면 같은 값이다", (ok, eq) => {
  const be = fakeStorage(), a = makeStore(() => be);
  a.load();
  a.data.plates.push("C1"); a.data.days.d0 = { passed: true, stamp: 1, runs: 1, best: 6 }; a.data.active = { day: "d1", index: 2, results: [1, 2], requeue: [1] };
  ok(a.save(), "저장했다");
  const b = makeStore(() => be);
  b.load();
  eq(b.data, a.data, "다시 읽은 값"); eq(b.data.version, 1, "version"); ok(b.persistent, "저장할 수 있다");
  eq(Object.keys(be.m), ["twn_save_v1"], "저장 열쇠"); eq(JSON.parse(be.m[SAVE_KEY]).version, 1, "저장된 글자의 version");
  a.hold = true; a.data.plates.push("D-1"); ok(a.save() === false && JSON.parse(be.m[SAVE_KEY]).plates.length === 1, "hold이면 쓰지 않는다");
});
test("SV-02", "빠진 필드만 기본값으로 채운다", (ok, eq) => {
  const be = fakeStorage({ [SAVE_KEY]: JSON.stringify({ version: 1, plates: ["D-1"], settings: { muted: true } }) }), s = makeStore(() => be).load();
  eq(s.plates, ["D-1"], "있는 값은 지킨다"); eq(s.settings.muted, true, "설정의 있는 값"); eq(s.settings.volume, blankSave().settings.volume, "설정의 빠진 값");
  eq(s.scenes, [], "빠진 배열"); eq(s.stats, { jobs: 0, clean: 0 }, "빠진 통계"); eq(s.active, null, "하던 배달일 없음"); eq(s.causes, {}, "빠진 까닭 누계"); eq(s.days, {}, "빠진 배달일 기록");
});
test("SV-03", "깨진 저장과 더 높은 버전은 기본값으로 시작하고 원본을 남긴다", (ok, eq) => {
  for (const text of ["{깨진", JSON.stringify({ version: 2, plates: ["X"] }), "[1,2]"]) {
    const be = fakeStorage({ [SAVE_KEY]: text }), st = makeStore(() => be);
    eq(st.load(), blankSave(), "기본값으로 시작: " + text); eq(be.m[SAVE_KEY + "_backup"], text, "원본을 남긴다"); ok(st.why === "broken" || st.why === "newer", "까닭을 적는다");
  }
  const be = fakeStorage(), st = makeStore(() => be);
  st.load();
  ok(!((SAVE_KEY + "_backup") in be.m) && st.why === "", "저장이 없으면 백업도 없다");
});
test("SV-04", "저장소가 오류를 던지면 메모리에 둔다", (ok, eq) => {
  const st = makeStore(() => fakeStorage(null, true));
  eq(st.load(), blankSave(), "기본값"); ok(!st.persistent, "저장되지 않음을 안다");
  st.data.plates.push("C1");
  ok(st.save() === false, "저장은 실패를 알린다"); eq(st.data.plates, ["C1"], "메모리의 값은 남는다");
  const none = makeStore(() => { throw new Error("막힘"); });
  none.load();
  ok(!none.persistent, "저장소 접근이 막혀도 죽지 않는다");
});
```

조각 3/4 · 넣을 자리: `<!-- -- 화면 끝 -- -->` 줄 바로 위 (화면 틀의 끝)
```html
<div class="sheet" id="testPage" hidden>
  <h2>자가검사</h2>
  <p id="testLine"></p>
  <ol id="testList"></ol>
</div>
```

조각 4/4 · 넣을 자리: `/* -- 스타일 끝 -- */` 줄 바로 위 (스타일의 끝)
```css
#testPage{justify-content:flex-start;align-items:stretch;text-align:left;overflow:auto;z-index:30}
#testPage p{max-width:none;font-weight:700}
#testList li.is-fail{color:var(--bad)}
#testList small{color:var(--ink-2)}
#testList em{font-style:normal;font-size:12px}
```

하지 말 것:
- TOTAL_TESTS(47)를 지금 있는 검사 수로 바꾸지 않는다. 첫 줄의 "전체 47개 중 5개 작성"이 진행을 알려 준다.
- 검사를 통과시키려고 검사 코드를 고치지 않는다.
- localStorage를 다른 곳에서 직접 부르지 않는다. 저장은 store를 거친다.

보고: index.html#test의 첫 줄(글자 그대로), 콘솔 오류 수, 넣은 조각 수, 조각에서 바꾼 글자(없어야 한다).
````

**완료 기준.**

- `index.html#test`의 첫 줄: `자가검사 5/5 (전체 47개 중 5개 작성) · ST 1/1 · SV 4/4`
- 콘솔 오류 0, 외부 요청 0.
- `index.html#test`로 열면 검사 결과표가 뜬다. 검사 다섯 줄이 모두 통과 표시다.
- 평소 주소로 열면 결과표가 뜨지 않는다. 콘솔에서 `window.__tests.length`는 5, `window.__testLine`은 위의 첫 줄이다.
- 콘솔에서 `store.save()`가 `true`를 돌려주고 `localStorage.getItem("twn_save_v1")`에 `"version":1`이 들어 있다.
- 화면은 P01과 같은 빈 틀이다. 다섯 줄의 높이가 그대로다.

**게이트 GPO0.** 위의 완료 기준이 모두 맞으면 넘긴다. 부록 A의 양식으로 `docs/post-gate-report.md`를 만들고 첫 블록을 적는다(`gate: GPO0`, `tests: { ST: 1/1, SV: 4/4 }`). 설계서의 결정 D3, D7, D11은 권장안으로 진행한다(0.8절). 버전은 v0.0이다.

---

## 3. PO1 이론 엔진과 배달 모델

목표는 화면 없이 배달 55건(v1.0의 46건과 검사용 9건)을 끝까지 흉내 내는 것이다. 화면은 이 단계가 끝나도 빈 틀이다.

### P03 [그대로] 이론 엔진

| 항목 | 내용 |
|---|---|
| 단계 | PO1 |
| 시작 전 `#test` | `자가검사 5/5 (전체 47개 중 5개 작성) · ST 1/1 · SV 4/4` |
| 끝난 뒤 `#test` | `자가검사 23/23 (전체 47개 중 23개 작성) · TH 11/11 · CH 4/4 · SC 3/3 · ST 1/1 · SV 4/4` |
| 조각 | 2개(구획 1에 엔진, 구획 11에 검사 18개) |

**무엇이 들어가는가.** 설계서 부록 C.1의 엔진이다. 글자 그대로다.

- **집과 주소.** 이론 표는 `MAJOR = [2, 2, 1, 2, 2, 2, 1]` 하나다. 주소는 `{ L, a, o }`(글자 0~6, 변화량 −2~2, 숫자). `midiOf`가 집 번호를, `hz`가 주파수를, `stepOf`가 오선의 자리를, `spellingsAt`이 한 집의 주소 전부를 계산한다. `isEnharmonic`은 "집은 같고 철자는 다르다"다.
- **씨앗 글자.** `parse("C#4")`가 주소로 바꾸고 `keyOf`가 되돌린다. 씨앗 표기는 `bb b (없음) # x`다.
- **걸음과 까닭.** `diagnose(주소, 고른 집)`이 오답의 까닭(`octave`, `letter`, `extra`, `stay`, `count`, `dir`)을, `diagStart`가 출발 집 오답의 까닭을, `misroute`가 반송 편지의 잘못 걸은 길을 만든다.
- **오선과 창.** `ledgers`가 덧줄을, `windowFor`가 필요한 집이 모두 들어오는 창을(없으면 `null`), `xOf`가 집의 가로 자리를 계산한다.
- **화음과 음계.** `above`, `triad`, `twins`, `scale`, `contextNames`. v1.1과 v1.2의 화면이 쓸 엔진이다. 지금 넣고 지금 검사한다.
- **말.** 화면의 낱말은 여기서만 만든다. `signKo`(샵, 플랫, 더블샵, 더블플랫), `hopsKo`(오른쪽으로 한 칸), `walkKo`, `pitchKo`, 주소 토큰 `T`(⟦C#4⟧), 숫자를 읽은 소리의 받침으로 조사를 고르는 `josa`.
- **검사 18개.** TH-01~TH-11, CH-01~CH-04, SC-01~SC-03. 설계서를 쓸 때 Node에서 돌린 검사를 페이지 안으로 옮긴 것이다.

````text
[P03 · 그대로] 이론 엔진

P00의 W1~W5를 지킨다.

시작 전: index.html#test의 첫 줄이 아래와 같은지 확인한다. 다르면 멈추고 보고한다.
  자가검사 5/5 (전체 47개 중 5개 작성) · ST 1/1 · SV 4/4

할 일: 아래 조각 2개를 적힌 자리에 글자 그대로 넣는다. 자리는 마커 줄의 바로 위다. 마커 줄은 그대로 둔다.

조각 1/2 · 넣을 자리: `// -- 1 끝 --` 줄 바로 위 (구획 1 THEORY)
```js
// ═══ 두 이름의 음악 마을 · 이론 엔진 ═══
// 이론 표는 장음계 공식 하나뿐이다. 집 번호, 주소(철자), 걸음, 화음, 음계는 모두 여기서 계산한다.
// DOM과 오디오를 만지지 않는다. 검사 러너와 Node가 같은 글자를 그대로 부른다.

// ── 집과 주소 ──
const MAJOR = [2, 2, 1, 2, 2, 2, 1];                                    // 장음계 공식: 온 온 반 온 온 온 반
const LETTERS = "CDEFGAB";
const MAXA = 2;                                                         // 변화량의 한계: 더블샵(+2), 더블플랫(-2)
const mod = (x, n) => ((x % n) + n) % n;
const semisOf = (L) => MAJOR.slice(0, L).reduce((s, x) => s + x, 0);    // 글자의 자연음 반음값: 0 2 4 5 7 9 11
const P = (L, a = 0, o = 4) => ({ L, a, o });                           // 주소: 글자 0~6, 변화량 -2~2, 구역(옥타브 숫자)
const midiOf = (p) => 12 * (p.o + 1) + semisOf(p.L) + p.a;              // 집 번호(MIDI)
const hz = (midi) => 440 * Math.pow(2, (midi - 69) / 12);               // 시리즈 고정 공식
const stepOf = (p) => 7 * p.o + p.L;                                    // 글자 자리. 기호는 자리를 바꾸지 않는다
const zoneOf = (midi) => Math.floor(midi / 12) - 1;                     // 집이 놓인 구역(C부터 B까지가 한 구역)
const anchorOf = (p) => P(p.L, 0, p.o);                                 // 출발 집: 같은 글자, 같은 숫자의 흰 집
const sameSpell = (a, b) => a.L === b.L && a.a === b.a && a.o === b.o;
const sameHouse = (a, b) => midiOf(a) === midiOf(b);                    // 구역까지 같은 소리
const samePc = (a, b) => mod(midiOf(a) - midiOf(b), 12) === 0;          // 구역을 무시하면 같다. 정답 판정에 쓰지 않는다
const isEnharmonic = (a, b) => sameHouse(a, b) && !sameSpell(a, b);     // 딴이름한소리: 주소는 다르고 집은 같다
function whiteAt(midi) {                                                // 흰 집이면 그 주소, 검은 집이면 null
  const pc = mod(midi, 12), L = MAJOR.findIndex((_, i) => semisOf(i) === pc);
  return L < 0 ? null : P(L, 0, (midi - pc) / 12 - 1);
}
const isWhite = (midi) => whiteAt(midi) !== null;
const whiteOfStep = (step) => P(mod(step, 7), 0, Math.floor(step / 7)); // 글자 자리 → 흰 집의 주소
const ALL_SIGNS = [0, 1, -1, 2, -2];
function spellingsAt(midi, signs = ALL_SIGNS) {                         // 이 집의 모든 주소. 걸음 수마다 흰 집에서 출발해 본다
  const out = [];
  for (const a of signs) { const w = whiteAt(midi - a); if (w) out.push(P(w.L, a, w.o)); }
  return out;
}

// ── 씨앗 글자 ↔ 주소 ──
const ACC = ["bb", "b", "", "#", "x"];                                  // 씨앗 표기. 변화량 -2 … +2
function parse(text) {
  const m = /^([A-G])(bb|b|#|x|)(-?\d)$/.exec(text);
  if (!m) throw new Error("주소 씨앗을 읽을 수 없다: " + text);
  return P(LETTERS.indexOf(m[1]), ACC.indexOf(m[2]) - MAXA, +m[3]);
}
const keyOf = (p) => LETTERS[p.L] + ACC[p.a + MAXA] + p.o;
const SIGN_CH = ["\u{1D12B}", "♭", "", "♯", "\u{1D12A}"];     // 문서와 읽기용 글자. 화면은 SVG로 그린다
const nameTxt = (p) => LETTERS[p.L] + SIGN_CH[p.a + MAXA] + p.o;

// ── 걸음 ──
const walkOf = (p) => ({ from: midiOf(anchorOf(p)), steps: p.a, to: midiOf(p) });
function diagnose(p, chosen) {                                          // 배달 오답의 까닭
  const w = walkOf(p), d = chosen - w.from;
  if (chosen === w.to) return "ok";
  if (mod(chosen - w.to, 12) === 0) return "octave";                    // 글자와 기호는 맞고 구역이 다르다
  if (Math.abs(d) > MAXA + 1) return "letter";                          // 출발 집(글자)부터 다르다
  if (p.a === 0) return "extra";                                        // 기호가 없는데 걸었다
  if (d === 0) return "stay";                                           // 글자 집에서 멈췄다
  return Math.sign(d) === Math.sign(p.a) ? "count" : "dir";             // 걸음 수가 다르다 / 반대쪽으로 걸었다
}
function diagStart(p, chosen) {                                         // 출발 집 오답의 까닭
  const w = whiteAt(chosen);
  if (!w) return "black";
  if (w.L === p.L && w.o === p.o) return "ok";
  return w.L === p.L ? "octave" : "letter";
}
function misroute(p, kind) {                                            // 반송 편지: 잘못 걸은 길
  const w = walkOf(p), sg = Math.sign(p.a);
  if (kind === "stay") return { from: w.from, to: w.from };
  if (kind === "dir") return { from: w.from, to: w.from - p.a };
  if (kind === "count") return { from: w.from, to: w.from + sg * (MAXA + 1 - Math.abs(p.a)) };
  const shift = 12 * (p.o - zoneOf(w.to));                              // octave: 도착 집의 구역을 주소의 숫자로 착각한 길
  return shift ? { from: w.from + shift, to: w.to + shift } : null;
}

// ── 오선(높은음자리표). 줄은 아래부터 E4 G4 B4 D5 F5 ──
const STAFF_BOTTOM = stepOf(P(2, 0, 4));                             // 맨 아랫줄 E4의 글자 자리
const STAFF_TOP = STAFF_BOTTOM + 8;                                     // 맨 윗줄 F5
function ledgers(p) {                                                   // 덧줄이 놓일 글자 자리들
  const s = stepOf(p), out = [];
  for (let k = STAFF_BOTTOM - 2; k >= s; k -= 2) out.push(k);
  for (let k = STAFF_TOP + 2; k <= s; k += 2) out.push(k);
  return out;
}

// ── 창: 길에서 화면에 보이는 흰 집 아홉 채 ──
const WIN = 9;
const HOME = stepOf(P(6, 0, 3));                                        // 기본 창은 B3부터 C5까지
function windowFor(needs) {                                             // 필요한 집이 모두 들어오는 창의 첫 흰 집(글자 자리). 없으면 null
  const lo = Math.min(...needs), hi = Math.max(...needs);
  let s = HOME;
  while (midiOf(whiteOfStep(s)) > lo) s--;
  while (midiOf(whiteOfStep(s + WIN - 1)) < hi) s++;
  return midiOf(whiteOfStep(s)) <= lo ? s : null;
}
const winLo = (start) => midiOf(whiteOfStep(start));
const winHi = (start) => midiOf(whiteOfStep(start + WIN - 1));
function xOf(midi, start) {                                             // 집의 가로 자리(창 폭 = 1). 흰 집은 칸의 가운데, 검은 집은 두 흰 집의 경계
  const w = whiteAt(midi);
  return w ? (stepOf(w) - start + 0.5) / WIN : (stepOf(whiteAt(midi + 1)) - start) / WIN;
}

// ── 음정과 3화음(v1.1), 음계(v1.2) ──
const refSemis = (num) => 12 * Math.floor((num - 1) / 7) + semisOf((num - 1) % 7);     // 장·완전 음정의 반음 수
const isPerfect = (num) => [0, 3, 4].includes((num - 1) % 7);                          // 1·4·5도 계열
function above(p, num, q) {                                             // p에서 위로 num도, 성질 q(P M m A d)인 음의 주소. 만들 수 없으면 null
  if ((q === "P") !== isPerfect(num) && "PMm".includes(q)) return null; // 완전은 1·4·5도에만, 장·단은 2·3·6·7도에만
  const off = q === "A" ? 1 : q === "m" ? -1 : q === "d" ? (isPerfect(num) ? -1 : -2) : 0;
  const w = whiteOfStep(stepOf(p) + num - 1), a = midiOf(p) + refSemis(num) + off - midiOf(w);
  return Math.abs(a) > MAXA ? null : P(w.L, a, w.o);
}
const TRIAD = { maj: ["M", "P"], min: ["m", "P"], dim: ["m", "d"], aug: ["M", "A"] };  // 3화음 공식: 3음과 5음의 성질
function triad(root, kind) {                                            // 밑음, 3음, 5음의 주소. 겹임시표를 넘으면 null
  const t = above(root, 3, TRIAD[kind][0]), f = above(root, 5, TRIAD[kind][1]);
  return t && f ? [root, t, f] : null;
}
const isStacked = (notes) => notes.every((n, i) => i === 0 || stepOf(n) - stepOf(notes[i - 1]) === 2);   // 글자를 하나씩 건너뛴 3도 쌓기
const sameHouses = (xs, ys) => xs.length === ys.length && xs.every((x, i) => midiOf(x) === midiOf(ys[i]));
function twins(root, kind) {                                            // 같은 집들을 누르는 딴이름 화음
  return triad(root, kind) ? spellingsAt(midiOf(root)).filter((r) => !sameSpell(r, root)).map((r) => triad(r, kind)).filter(Boolean) : [];
}
function scale(tonic, mode = "major") {                                 // 음계: 글자를 하나씩 차례로 쓴다. mode: major, minor, harmonic
  const steps = mode === "major" ? MAJOR : MAJOR.slice(5).concat(MAJOR.slice(0, 5));   // 자연단음계는 장음계의 여섯째 음에서 시작한다
  const out = [tonic];
  let m = midiOf(tonic);
  for (let i = 0; i < 6; i++) {
    m += steps[i];
    const w = whiteOfStep(stepOf(tonic) + i + 1), a = m - midiOf(w);
    if (Math.abs(a) > MAXA) return null;
    out.push(P(w.L, a, w.o));
  }
  if (mode === "harmonic") { const s = out[6]; if (s.a + 1 > MAXA) return null; out[6] = P(s.L, s.a + 1, s.o); }
  return out;
}
const fitsIn = (p, notes) => notes.some((n) => n.L === p.L && n.a === p.a);            // 구역을 빼고 같은 철자가 들어 있는가
const contextNames = (midi, notes) => spellingsAt(midi).filter((p) => fitsIn(p, notes));   // 문맥에 맞는 주소. 하나뿐일 때만 단일 정답으로 낸다

// ── 말: 화면의 낱말은 여기서만 만든다 ──
const SOL = ["도", "레", "미", "파", "솔", "라", "시"];
const NUM_KO = ["", "한", "두", "세"];
const JONG = [1, 1, 0, 1, 0, 0, 1, 1, 1, 0];                            // 숫자 0~9를 읽은 소리의 받침(영 일 이 삼 사 오 육 칠 팔 구)
const signKo = (a) => (a === 0 ? "기호 없음" : (Math.abs(a) === MAXA ? "더블" : "") + (a > 0 ? "샵" : "플랫"));
const dirKo = (a) => (a > 0 ? "오른쪽" : "왼쪽");
const hopsKo = (a) => `${dirKo(a)}으로 ${NUM_KO[Math.abs(a)]} 칸`;
const T = (p) => "⟦" + keyOf(p) + "⟧";                        // 주소 토큰 ⟦C#4⟧. 화면은 기호를 그려 넣고 읽기용은 말로 바꾼다
const josa = (p, withJong, without) => T(p) + (JONG[mod(p.o, 10)] ? withJong : without);   // 주소는 숫자로 끝난다
const numJosa = (n, withJong, without) => n + (JONG[mod(n, 10)] ? withJong : without);
const sayKo = (p) => LETTERS[p.L] + (p.a ? " " + signKo(p.a) : "") + " " + p.o;        // 읽기용: "C 샵 4"
const walkKo = (p) => (p.a ? `${SOL[p.L]}에서 ${hopsKo(p.a)}` : `${p.o}구역의 ${SOL[p.L]} 집`);                 // 걸음으로 말하기
const pitchKo = (p) => (p.a ? `${SOL[p.L]}에서 ${Math.abs(p.a) === MAXA ? "두 반음" : "반음"} ${p.a > 0 ? "위" : "아래"}` : `${p.o}구역의 ${SOL[p.L]} 집`);   // 높낮이로 말하기
```

조각 2/2 · 넣을 자리: `// -- 11 끝 --` 줄 바로 위 (구획 11 TESTS)
```js

// ── TH 이론, CH 화음, SC 음계 ──
const tN = (t) => parse(t), tMi = (t) => midiOf(parse(t)), tK = (ps) => ps.map(keyOf);
const tALL = [];                                                         // 글자 7 × 기호 5 × 구역 0~8 = 315
for (let o = 0; o <= 8; o++) for (let L = 0; L < 7; L++) for (let a = -MAXA; a <= MAXA; a++) tALL.push(P(L, a, o));
const tOCT4 = tALL.filter((p) => p.o === 4);
test("TH-01", "자연음 반음값과 집 번호", (ok, eq) => {
  eq([0, 1, 2, 3, 4, 5, 6].map(semisOf), [0, 2, 4, 5, 7, 9, 11], "자연음 반음값");
  eq([tMi("C4"), tMi("A4"), tMi("B3"), tMi("C5"), tMi("C-1")], [60, 69, 59, 72, 0], "기준 집");
});
test("TH-02", "주소는 출발 집에서 기호만큼 걷는다", (ok, eq) => {
  for (const p of tALL) {
    ok(midiOf(p) - midiOf(anchorOf(p)) === p.a, "걸음 " + keyOf(p));
    ok(isWhite(midiOf(anchorOf(p))), "출발 집은 흰 집 " + keyOf(p));
    ok(sameSpell(parse(keyOf(p)), p), "씨앗 왕복 " + keyOf(p));
    ok(stepOf(anchorOf(p)) === stepOf(p), "기호는 글자 자리를 바꾸지 않는다 " + keyOf(p));
    eq(walkOf(p), { from: midiOf(anchorOf(p)), steps: p.a, to: midiOf(p) }, "walkOf " + keyOf(p));
  }
});
test("TH-03", "한 집의 주소 수", (ok, eq) => {
  const twoNamed = new Set();
  for (let m = 21; m <= 108; m++) {
    const ss = spellingsAt(m), near = [-2, -1, 0, 1, 2].filter((d) => isWhite(m + d)).length;
    ok(ss.every((s) => midiOf(s) === m), "모두 같은 집 " + m);
    ok(new Set(tK(ss)).size === ss.length, "겹침 없음 " + m);
    ok(ss.length === near, "주소 수 = 두 칸 안의 흰 집 수 " + m);
    ok(ss.length === (mod(m, 12) === 8 ? 2 : 3), "주소는 셋, 한 곳만 둘 " + m);
    if (ss.length === 2) twoNamed.add(mod(m, 12));
  }
  eq([...twoNamed], [8], "주소가 둘뿐인 집");
  eq(tK(spellingsAt(68)), ["G#4", "Ab4"], "그 집의 주소");
});
test("TH-04", "주소는 모두 35가지", (ok) => {
  for (let z = 1; z <= 7; z++) {
    const set = new Set();
    for (let pc = 0; pc < 12; pc++) spellingsAt(12 * (z + 1) + pc).forEach((s) => set.add(LETTERS[s.L] + s.a));
    ok(set.size === 35, "구역 " + z + "의 주소 35가지");
  }
});
test("TH-05", "구역 숫자가 갈리는 집", (ok, eq) => {
  for (let m = 24; m <= 107; m++) {
    const ds = [...new Set(spellingsAt(m).map((s) => s.o))].sort(), z = zoneOf(m), pc = mod(m, 12);
    eq(ds, pc <= 1 ? [z - 1, z] : pc >= 10 ? [z, z + 1] : [z], "구역 숫자 " + m);
  }
});
test("TH-06", "초안의 예시", (ok, eq) => {
  const SAME = [["C#4", "Db4"], ["D#4", "Eb4"], ["F#4", "Gb4"], ["G#4", "Ab4"], ["A#4", "Bb4"], ["E#4", "F4"], ["Fb4", "E4"], ["B#3", "C4"], ["Cb4", "B3"],
    ["Cx4", "D4"], ["Dx4", "E4"], ["Ebb4", "D4"], ["Bbb4", "A4"], ["Bx3", "C#4"], ["Cbb4", "Bb3"], ["Cx4", "Ebb4"]];
  for (const [a, b] of SAME) { ok(isEnharmonic(tN(a), tN(b)), a + " = " + b); ok(isEnharmonic(tN(b), tN(a)), b + " = " + a); ok(hz(tMi(a)) === hz(tMi(b)), "주파수 " + a); }
  ok(!isEnharmonic(tN("C#4"), tN("Db5")) && samePc(tN("C#4"), tN("Db5")), "C#4와 Db5는 구역이 다르다");
  ok(!isEnharmonic(tN("B#3"), tN("C3")) && tMi("B#3") === 60 && tMi("C3") === 48, "B#3은 C3이 아니다");
  ok(!isEnharmonic(tN("C#4"), tN("C#4")), "같은 주소는 딴이름이 아니다");
  eq(tK(spellingsAt(62)), ["D4", "Cx4", "Ebb4"], "D4의 세 주소");
  eq(tK(spellingsAt(61)), ["C#4", "Db4", "Bx3"], "C#4의 세 주소");
  eq(tK(spellingsAt(60)), ["C4", "B#3", "Dbb4"], "C4의 세 주소");
  eq(tK(spellingsAt(58)), ["A#3", "Bb3", "Cbb4"], "Bb3의 세 주소");
  eq(tK(spellingsAt(61, [0, 1, -1])), ["C#4", "Db4"], "기호를 덜 배운 날의 주소");
});
test("TH-07", "주파수", (ok, eq) => {
  ok(hz(69) === 440 && hz(81) === 880, "A4 = 440");
  eq([60, 61, 62, 65, 66, 67, 59].map((m) => Math.round(hz(m) * 100) / 100), [261.63, 277.18, 293.66, 349.23, 369.99, 392, 246.94], "기준 주파수");
});
test("TH-08", "오선의 자리", (ok, eq) => {
  eq([STAFF_BOTTOM, STAFF_TOP, stepOf(tN("C4")), stepOf(tN("C#4")), stepOf(tN("Db4")), stepOf(tN("E#4")), stepOf(tN("F4"))], [30, 38, 28, 28, 29, 30, 31], "글자 자리");
  eq([ledgers(tN("C4")), ledgers(tN("B3")), ledgers(tN("A#3")), ledgers(tN("D4")), ledgers(tN("F5")), ledgers(tN("A5")), ledgers(tN("Cbb4"))], [[28], [28], [28, 26], [], [], [40], [28]], "덧줄");
});
test("TH-09", "오답의 까닭", (ok, eq) => {
  const CODES = ["ok", "octave", "letter", "extra", "stay", "count", "dir"];
  for (const p of tOCT4) {
    const w = walkOf(p);
    for (let c = w.from - 15; c <= w.from + 15; c++) {
      const r = diagnose(p, c);
      ok(CODES.includes(r), "까닭 코드");
      ok((r === "ok") === (c === w.to), "ok는 도착 집뿐 " + keyOf(p) + " " + c);
      ok((r === "octave") === (c !== w.to && mod(c - w.to, 12) === 0), "octave " + keyOf(p) + " " + c);
    }
  }
  eq([diagnose(tN("C#4"), 60), diagnose(tN("C#4"), 59), diagnose(tN("C#4"), 62), diagnose(tN("Cx4"), 61), diagnose(tN("Cb4"), 71), diagnose(tN("G4"), 68), diagnose(tN("C#4"), 68)],
    ["stay", "dir", "count", "count", "octave", "extra", "letter"], "까닭 예시");
  eq([diagStart(tN("C#4"), 60), diagStart(tN("C#4"), 61), diagStart(tN("C#4"), 72), diagStart(tN("C#4"), 62)], ["ok", "black", "octave", "letter"], "출발 집의 까닭");
});
test("TH-10", "반송 길", (ok, eq) => {
  for (const p of tOCT4.filter((x) => x.a)) {
    for (const k of ["stay", "dir", "count"]) {
      const r = misroute(p, k);
      ok(r.to !== midiOf(p) && diagnose(p, r.to) === k, "반송 " + k + " " + keyOf(p));
    }
    const o = misroute(p, "octave"), crosses = zoneOf(midiOf(p)) !== p.o;
    ok(crosses ? o && diagnose(p, o.to) === "octave" : o === null, "구역 반송 " + keyOf(p));
  }
  eq(tOCT4.filter((p) => misroute(p, "octave")).map(keyOf), ["Cbb4", "Cb4", "B#4", "Bx4"], "구역 숫자를 넘는 주소");
  eq([misroute(tN("B#4"), "octave"), misroute(tN("Cb4"), "octave"), misroute(tN("Ax4"), "count"), misroute(tN("Gbb4"), "dir")],
    [{ from: 59, to: 60 }, { from: 72, to: 71 }, { from: 69, to: 70 }, { from: 67, to: 69 }], "반송 예시");
});
test("TH-11", "창", (ok, eq) => {
  eq([HOME, windowFor([60]), winLo(27), winHi(27), windowFor([58]), winLo(26), winHi(26), windowFor([74]), winLo(28), winHi(28), windowFor([58, 74])], [27, 27, 59, 72, 26, 57, 71, 28, 60, 74, null], "창의 자리");
  for (const s of [25, 26, 27, 28, 29]) {
    let prev = -1;
    for (let m = winLo(s); m <= winHi(s); m++) { const x = xOf(m, s); ok(x > prev && x >= 0 && x <= 1, "가로 자리가 차례로 늘어난다"); prev = x; }
    ok(Math.abs(xOf(winLo(s), s) - 0.5 / WIN) < 1e-12 && Math.abs(xOf(winHi(s), s) - (WIN - 0.5) / WIN) < 1e-12, "양 끝 흰 집");
  }
  ok(Math.abs(xOf(61, 27) - 2 / WIN) < 1e-12, "검은 집은 두 흰 집의 경계");
});
test("CH-01", "음정", (ok, eq) => {
  eq(tK([above(tN("C4"), 3, "M"), above(tN("C4"), 5, "P"), above(tN("C4"), 3, "m"), above(tN("C4"), 5, "d"), above(tN("C4"), 5, "A"), above(tN("C#4"), 3, "M"), above(tN("D#4"), 3, "M")]),
    ["E4", "G4", "Eb4", "Gb4", "G#4", "E#4", "Fx4"], "음정 예시");
  ok(above(tN("C4"), 3, "P") === null && above(tN("C4"), 5, "M") === null && above(tN("Bx4"), 3, "M") === null, "만들 수 없는 음정");
});
test("CH-02", "3화음은 글자를 하나씩 건너뛴다", (ok, eq) => {
  const SEMI = { maj: [4, 7], min: [3, 7], dim: [3, 6], aug: [4, 8] }, count = {};
  for (const kind of Object.keys(TRIAD)) {
    count[kind] = 0;
    for (const r of tOCT4) {
      const t = triad(r, kind);
      if (!t) continue;
      count[kind]++;
      ok(isStacked(t), "쌓기 " + keyOf(r) + kind);
      eq([midiOf(t[1]) - midiOf(t[0]), midiOf(t[2]) - midiOf(t[0])], SEMI[kind], "반음 구조 " + keyOf(r) + kind);
      eq(t.map((n) => n.L), [r.L, mod(r.L + 2, 7), mod(r.L + 4, 7)], "글자 " + keyOf(r) + kind);
    }
  }
  eq(count, { maj: 31, min: 31, dim: 29, aug: 27 }, "쓸 수 있는 3화음의 수");
});
test("CH-03", "초안의 화음", (ok, eq) => {
  eq(tK(triad(tN("C#4"), "maj")), ["C#4", "E#4", "G#4"], "C# 장화음");
  eq(tK(triad(tN("Db4"), "maj")), ["Db4", "F4", "Ab4"], "Db 장화음");
  eq(tK(triad(tN("D#4"), "maj")), ["D#4", "Fx4", "A#4"], "D# 장화음");
  eq(tK(triad(tN("Eb4"), "maj")), ["Eb4", "G4", "Bb4"], "Eb 장화음");
  ok(sameHouses(triad(tN("C#4"), "maj"), triad(tN("Db4"), "maj")) && sameHouses(triad(tN("D#4"), "maj"), triad(tN("Eb4"), "maj")), "같은 집들");
  const wrong = ["D#4", "G4", "A#4"].map(tN);
  ok(sameHouses(wrong, triad(tN("D#4"), "maj")) && !isStacked(wrong), "D#-G-A#은 같은 집이지만 3도 쌓기가 아니다");
  eq(tK(triad(tN("G#4"), "maj")), ["G#4", "B#4", "D#5"], "G# 장화음");
  eq(tK(triad(tN("Ab4"), "maj")), ["Ab4", "C5", "Eb5"], "Ab 장화음");
  eq(tK(triad(tN("Db4"), "min")), ["Db4", "Fb4", "Ab4"], "Db 단화음");
});
test("CH-04", "딴이름 화음", (ok, eq) => {
  for (const kind of Object.keys(TRIAD)) for (const r of tOCT4) {
    const base = triad(r, kind);
    for (const t of twins(r, kind)) ok(sameHouses(t, base) && isStacked(t) && !sameSpell(t[0], r), "쌍둥이 " + keyOf(r) + kind);
  }
  eq(twins(tN("C#4"), "maj").map(tK), [["Db4", "F4", "Ab4"]], "C# 장화음의 쌍둥이");
  eq(twins(tN("D#4"), "maj").map(tK), [["Eb4", "G4", "Bb4"], ["Fbb4", "Abb4", "Cbb5"]], "D# 장화음의 쌍둥이(이론상 Fbb 장화음도 같은 집이다)");
  eq(twins(tN("D#4"), "maj").filter((t) => Math.abs(t[0].a) <= 1).map(tK), [["Eb4", "G4", "Bb4"]], "밑음의 기호를 하나까지로 묶으면 Eb 장화음뿐");
});
test("SC-01", "음계는 글자를 한 번씩 쓴다", (ok, eq) => {
  let count = 0;
  for (const mode of ["major", "minor", "harmonic"]) for (const t of tOCT4) {
    const s = scale(t, mode);
    if (!s) continue;
    count++;
    ok(new Set(s.map((n) => n.L)).size === 7, "글자 일곱 " + keyOf(t) + mode);
    ok(s.every((n, i) => i === 0 || stepOf(n) - stepOf(s[i - 1]) === 1), "차례 " + keyOf(t) + mode);
  }
  eq(count, 84, "쓸 수 있는 음계의 수");
  eq(tK(scale(tN("C4"))), ["C4", "D4", "E4", "F4", "G4", "A4", "B4"], "C 장음계");
  eq(tK(scale(tN("F#4"))), ["F#4", "G#4", "A#4", "B4", "C#5", "D#5", "E#5"], "F# 장음계의 일곱째 음은 E#");
  eq(tK(scale(tN("A4"), "minor")), ["A4", "B4", "C5", "D5", "E5", "F5", "G5"], "A 자연단음계");
  eq([keyOf(scale(tN("G#4"), "harmonic")[6]), keyOf(scale(tN("D#4"), "harmonic")[6]), keyOf(scale(tN("A#4"), "harmonic")[6]), keyOf(scale(tN("A4"), "harmonic")[6])], ["Fx5", "Cx5", "Gx5", "G#5"], "화성단음계의 이끎음");
});
test("SC-02", "마지막 올림표는 이끎음", (ok) => {
  let prev = new Set(), tonic = tN("C4");
  for (let i = 0; i < 7; i++) {
    tonic = above(tonic, 5, "P");
    const s = scale(P(tonic.L, tonic.a, 4)), sharps = new Set(s.filter((n) => n.a === 1).map((n) => n.L)), fresh1 = [...sharps].filter((L) => !prev.has(L));
    ok(sharps.size === i + 1 && fresh1.length === 1 && fresh1[0] === s[6].L, "올림표 " + (i + 1) + "개 " + keyOf(tonic));
    prev = sharps;
  }
});
test("SC-03", "문맥에 맞는 주소", (ok, eq) => {
  eq(tK(contextNames(65, triad(tN("C#4"), "maj"))), ["E#4"], "C# 장화음의 3음 자리");
  eq(tK(contextNames(65, triad(tN("Db4"), "maj"))), ["F4"], "Db 장화음의 3음 자리");
  eq(tK(contextNames(65, scale(tN("F#4")))), ["E#4"], "F# 장조의 일곱째 음");
  eq(tK(contextNames(67, triad(tN("D#4"), "maj"))), ["Fx4"], "D# 장화음의 3음 자리");
  eq(tK(contextNames(65, scale(tN("C4")))), ["F4"], "C 장조");
  ok(spellingsAt(65).length === 3, "단서가 없으면 세 주소가 모두 맞다");
});
```

하지 말 것:
- 엔진에 표를 더하지 않는다. 주파수의 소수, 자연음 반음값 표(0 2 4 5 7 9 11), 딴이름 쌍 목록을 적지 않는다. 필요한 값은 함수로 계산한다.
- 엔진 함수가 window, document, 소리를 부르게 하지 않는다.
- 함수 이름과 인자의 순서를 바꾸지 않는다. 뒤의 조각이 모두 이 이름으로 부른다.
- 검사의 기대값을 고치지 않는다.

보고: index.html#test의 첫 줄(글자 그대로), 콘솔 오류 수, 넣은 조각 수, 조각에서 바꾼 글자(없어야 한다).
````

**완료 기준.**

- `index.html#test`의 첫 줄: `자가검사 23/23 (전체 47개 중 23개 작성) · TH 11/11 · CH 4/4 · SC 3/3 · ST 1/1 · SV 4/4`
- 콘솔 오류 0, 외부 요청 0.
- 콘솔에서 `spellingsAt(62).map(nameTxt)` → `["D4", "C𝄪4", "E𝄫4"]`. D4 집의 주소 셋이다.
- `midiOf(parse("B#3"))` → `60`, `midiOf(parse("Cb4"))` → `59`. 숫자는 글자를 따라간다.
- `hz(61).toFixed(2)` → `"277.18"`, `hz(midiOf(parse("C#4"))) === hz(midiOf(parse("Db4")))` → `true`.
- `spellingsAt(68).length` → `2`. G♯/A♭ 집만 주소가 둘이다.
- 화면은 여전히 빈 틀이다.

### P04 [그대로] 배달 모델, 흐름 함수, 배달 씨앗

| 항목 | 내용 |
|---|---|
| 단계 | PO1 |
| 시작 전 `#test` | `자가검사 23/23 (전체 47개 중 23개 작성) · TH 11/11 · CH 4/4 · SC 3/3 · ST 1/1 · SV 4/4` |
| 끝난 뒤 `#test` | `자가검사 36/36 (전체 47개 중 36개 작성) · TH 12/12 · CH 4/4 · SC 3/3 · JB 4/4 · FL 5/5 · ST 2/2 · SV 4/4 · CT 2/2` |
| 조각 | 3개(구획 2에 배달 모델과 흐름, 구획 3에 씨앗, 구획 11에 검사 13개) |

**무엇이 들어가는가.** 설계서 부록 C.2와 C.3이다.

- **배달 모델(구획 2).** `jobModel(씨앗, 배달일)`이 씨앗에서 문제의 모든 값을 만든다. 출발 집, 도착 집, 그 집의 주소들(그날까지 배운 기호로), 써야 할 문패 수, 카드의 옳고 그름, 반송 길과 까닭, 창. `phasesOf`가 단계의 순서를, `cardText`가 편지 카드의 문장을, `platesOf`가 얻을 문패를, `checkJob`이 출제 제약을 어긴 것의 목록을 돌려준다.
- **문구.** `guide`(단계에 들어설 때), `reason`(배달을 마쳤을 때), `sameKo`(듣기가 끝난 뒤), `startErr`·`walkErr`·`dropErr`·`sortErr`(오답의 까닭), `causeText`(반송). 낱말은 모두 엔진에서 온다.
- **흐름 함수.** `fresh(모델)`이 배달의 처음 상태를 만든다. `F.move`(집을 눌렀다), `F.nudge`(한 칸 단추), `F.sign`(기호 단추), `F.pick`(카드), `F.cause`(까닭 단추), `F.confirm`(주 단추)이 "바뀔 값"만 돌려준다. 소리는 `fx: [{ t: "hop", midi }]`처럼 지시로 적혀 나온다.
- **씨앗(구획 3).** `DAYS`는 배달일 여섯(46건), `SPIKE`는 검사용 하루(9건)다. 씨앗의 열쇠는 `id ask note steps show plate with cards err preview final`뿐이다.
- **검사 13개.** JB-01~JB-04(씨앗), FL-01~FL-05(흐름: 한 번에, 한 번 틀리고, 두 번 틀리고, 채점하지 않는 입력, 문구), ST-01(단계 전환), TH-12(소스에 이론 값이 글자로 적혀 있지 않다), CT-01(문구의 주소는 토큰), CT-03(금지 표현). 구획 11에는 배달을 흉내 내는 도우미(`tSolve`, `tSpoil`, `tPlay`, `tTexts`)도 함께 들어간다. 화면 점검 도구가 이 도우미를 쓴다.

````text
[P04 · 그대로] 배달 모델, 흐름 함수, 배달 씨앗

P00의 W1~W5를 지킨다.

시작 전: index.html#test의 첫 줄이 아래와 같은지 확인한다. 다르면 멈추고 보고한다.
  자가검사 23/23 (전체 47개 중 23개 작성) · TH 11/11 · CH 4/4 · SC 3/3 · ST 1/1 · SV 4/4

할 일: 아래 조각 3개를 적힌 자리에 글자 그대로 넣는다. 자리는 마커 줄의 바로 위다. 마커 줄은 그대로 둔다.

조각 1/3 · 넣을 자리: `// -- 2 끝 --` 줄 바로 위 (구획 2 FLOW)
```js
// ═══ 배달 모델과 흐름 ═══
// 씨앗에서 문제의 모든 값을 만들고(jobModel), 조작마다 "바뀔 값"만 돌려준다(F.*).
// 상태를 직접 바꾸지 않는다. 화면은 돌려받은 값을 setState에 넘기고 fx(소리)를 실행한다.

// ── 배달 모델 ──
function jobModel(job, day) {
  const note = parse(job.note), hop = job.ask === "hop";
  const from = hop ? midiOf(note) : midiOf(anchorOf(note));             // 출발 집
  const target = hop ? from + job.steps : midiOf(note);                 // 도착 집
  const names = spellingsAt(target, day.signs);                         // 이 집의 주소들(오늘까지 배운 기호로)
  const board0 = hop ? [] : [note].concat((job.with || []).map(parse)); // 처음부터 달려 있는 문패
  const rest = names.filter((n) => !board0.some((b) => sameSpell(b, n)));
  const todo = job.plate === "all" ? rest.length : job.plate ? 1 : 0;   // 써야 할 문패 수
  const m = { job, day, note, ask: job.ask, show: job.show || "both", hop, from, target, steps: hop ? job.steps : note.a,
              names, board0, rest, todo, preview: !!job.preview, final: !!job.final };
  const needs = [from, target];
  if (todo) rest.forEach((n) => needs.push(midiOf(anchorOf(n))));
  if (job.ask === "sort") {
    m.cards = job.cards.map(parse);
    m.right = m.cards.map((c) => midiOf(c) === target);
    m.cards.forEach((c) => needs.push(midiOf(c), midiOf(anchorOf(c))));
  }
  if (job.ask === "fix") {
    m.mis = misroute(note, job.err);                                    // 잘못 배달된 길
    m.cause = job.err === "stay" ? "count" : job.err;
    if (m.mis) needs.push(m.mis.from, m.mis.to);
  }
  m.win = windowFor(needs);
  return m;
}
const phasesOf = (m) => (m.hop ? ["walk", "deliver"] : m.ask === "sort" ? ["sort", "deliver"] : m.ask === "fix" ? ["diag", "drop", "deliver"]
  : (m.ask === "walk" ? ["start", "walk"] : ["drop"]).concat(m.todo ? ["plate"] : [], ["deliver"]));
const homeOf = (m) => midiOf(whiteOfStep(m.win + (WIN - 1) / 2));       // 우체부가 처음 서는 곳: 창의 가운데 흰 집
const CHIP = { hop: "걸음 연습", walk: "걸어서 배달", drop: "바로 배달", sort: "우편 분류", fix: "반송 편지" };
function cardText(m) {                                                  // 편지 카드의 머리표와 문장
  const chip = m.show === "staff" && m.ask === "drop" ? "악보 편지" : CHIP[m.ask];
  if (m.hop) return { chip, text: `${T(m.note)} 집에서 ${hopsKo(m.steps)} 걸어가 배달해 주세요.` };
  if (m.ask === "sort") return { chip, text: `${josa(m.note, "과", "와")} 같은 집으로 가는 편지를 모두 골라 주세요.` };
  if (m.ask === "fix") return { chip, text: `${T(m.note)} 편지가 잘못 배달됐어요. 까닭을 찾아 고쳐 주세요.` };
  if (m.show === "staff") return { chip, text: "악보에 적힌 주소로 배달해 주세요." };
  return { chip, text: `${T(m.note)} 편지를 배달해 주세요.` };
}
function platesOf(m) {                                                  // 이 배달로 얻을 수 있는 문패(글자와 기호)
  const out = m.hop || m.note.a === 0 ? [] : [m.note];
  if (m.todo) m.rest.forEach((n) => { if (n.a) out.push(n); });
  if (m.cards) m.cards.forEach((c, i) => { if (m.right[i] && c.a) out.push(c); });
  return out;
}
function checkJob(m) {                                                  // 출제 제약. 어긴 것의 목록을 돌려준다
  const bad = [], lo = m.win === null ? 0 : winLo(m.win), hi = m.win === null ? -1 : winHi(m.win), inWin = (x) => x >= lo && x <= hi;
  if (m.win === null) bad.push("한 창에 들어가지 않는다");
  if (!inWin(m.from) || !inWin(m.target)) bad.push("출발 집이나 도착 집이 창 밖이다");
  if (m.hop && (m.job.steps === 0 || !isWhite(m.from))) bad.push("걸음 연습은 흰 집에서 한 칸 이상 걷는다");
  if (m.ask === "walk" && m.note.a === 0) bad.push("걸어서 배달에는 기호가 있어야 한다");
  if (!m.hop && !m.day.signs.includes(m.note.a)) bad.push("아직 배우지 않은 기호다");
  if (m.job.plate && m.rest.length < 1) bad.push("쓸 문패가 없다");
  if (m.ask === "sort") {
    if (!m.right.some(Boolean) || m.right.every(Boolean)) bad.push("분류에는 맞는 편지와 아닌 편지가 다 있어야 한다");
    if (m.cards.some((c) => sameSpell(c, m.note))) bad.push("기준 편지와 같은 주소의 카드가 있다");
    if (m.cards.some((c, i) => m.cards.findIndex((d) => sameSpell(c, d)) !== i)) bad.push("같은 카드가 두 장이다");
    if (m.cards.some((c) => !m.day.signs.includes(c.a))) bad.push("카드에 아직 배우지 않은 기호가 있다");
  }
  if (m.ask === "fix" && (!m.mis || m.mis.to === m.target || !inWin(m.mis.from) || !inWin(m.mis.to))) bad.push("반송 길을 만들 수 없다");
  return bad;
}

// ── 문구 ──
const say = (tone, text) => ({ tone, text });
function guide(m, phase, board) {                                       // 단계에 들어설 때의 안내
  const p = m.note;
  if (phase === "start") return say("", `글자 ${LETTERS[p.L]}의 흰 집에 서요. 숫자 ${numJosa(p.o, "은", "는")} ${p.o}구역이에요.`);
  if (phase === "walk") return say("", m.hop ? "아래 단추로 한 칸씩 걸어요. 한 칸이 반음이에요." : `${signKo(p.a)}은 ${hopsKo(p.a)}이에요. 아래 단추로 걸어요.`);
  if (phase === "drop") return say("", m.ask === "fix" ? "맞는 집으로 옮겨 다시 배달해요." : m.show === "staff" ? "악보의 자리와 기호를 읽고 집을 골라요." : "집을 고르고 [배달]을 눌러요.");
  if (phase === "plate") return say("", "이 집의 다른 주소를 써요. 흰 집으로 글자를, 단추로 기호를 정해요.");
  if (phase === "sort") return say("", "같은 집으로 가는 편지를 모두 고르고 [확정]을 눌러요.");
  if (phase === "diag") return say("", "배달된 길을 보세요. 어디가 잘못됐을까요?");
  return say("good", reason(m, board || m.board0));
}
function reason(m, board) {                                             // 배달을 마쳤을 때의 한 문장
  const p = m.note, w = whiteAt(m.target);
  if (m.hop) return `${T(p)}에서 ${hopsKo(m.steps)} 가면 ${w ? T(w) + " 집" : "검은 집"}이에요.`;
  if (board.length > 1) return `주소 ${board.length}개가 한 집에 모였어요. 차례로 듣고, 함께 들어요.`;
  return `${josa(p, "은", "는")} ${pitchKo(p)}${p.a ? "예요" : "이에요"}.` + (p.a && w ? ` ${josa(w, "과", "와")} 같은 집이에요.` : "");
}
function sameKo(board) {                                                // 듣기가 끝난 뒤의 한 문장
  if (board.length === 2) return `${josa(board[0], "은", "는")} ${pitchKo(board[0])}, ${josa(board[1], "은", "는")} ${pitchKo(board[1])}. 같은 집이에요.`;
  return `${board.slice(0, -1).map(T).join(", ")}, ${josa(board[board.length - 1], "은", "는")} 모두 같은 집이에요.`;
}
const listenLabel = (board, k) => (k < board.length ? `${T(board[k])}: ${walkKo(board[k])}` : "함께 내면 한 소리로 들려요.");
function startErr(m, pos, c) {
  const p = m.note, w = whiteAt(pos);
  if (c === "black") return `출발 집은 늘 흰 집이에요. 글자 ${LETTERS[p.L]}의 집을 찾아요.`;
  if (c === "letter") return `이 집은 ${LETTERS[w.L]}예요. 편지의 글자는 ${LETTERS[p.L]}예요.`;
  return `글자는 맞아요. 이 집은 ${w.o}구역이에요. 편지의 숫자는 ${numJosa(p.o, "이에요", "예요")}.`;
}
function walkErr(m, pos) {
  const d = pos - m.from, a = m.steps;
  if (m.hop) return `${hopsKo(a)} 가야 해요. 지금은 ${d ? hopsKo(d) + " 걸었어요" : "아직 걷지 않았어요"}.`;
  if (d === 0) return `글자 집에서 멈췄어요. ${signKo(a)}만큼 걸어요.`;
  if (Math.sign(d) !== Math.sign(a)) return `${signKo(a)}은 ${dirKo(a)}이에요. 지금은 ${dirKo(d)}으로 걸었어요.`;
  return `${signKo(a)}은 ${NUM_KO[Math.abs(a)]} 칸이에요. 지금은 ${NUM_KO[Math.abs(d)]} 칸 걸었어요.`;
}
function dropErr(m, pos, c) {
  const p = m.note;
  if (c === "octave") return `글자와 기호는 맞아요. 출발 집이 ${p.o}구역의 ${LETTERS[p.L]} 집이어야 해요.`;
  if (c === "letter") return `글자 ${LETTERS[p.L]}의 흰 집에서 출발해요. 지금 집은 거기서 너무 멀어요.`;
  if (c === "extra") return `기호가 없으면 글자 집이 도착 집이에요. 지금은 ${hopsKo(pos - m.from)} 옆집이에요.`;
  return walkErr(m, pos);
}
const helpKo = (m) => `${josa(m.note, "은", "는")} ${walkKo(m.note)}이에요. 옮겨 두었어요. [배달]을 눌러요.`;
function sortErr(m, c) {
  if (samePc(c, m.note)) return `${josa(c, "은", "는")} ${zoneOf(midiOf(c))}구역의 집이에요. 구역이 다르면 다른 소리예요.`;
  return `${josa(c, "은", "는")} ${walkKo(c)}. 다른 집이에요.`;
}
const CAUSES = ["letter", "dir", "count", "octave"];
const CAUSE_KO = { letter: "출발 집", dir: "방향", count: "걸음 수", octave: "구역" };
function causeText(m) {
  const p = m.note, a = p.a, d = m.mis.to - m.mis.from;
  if (m.cause === "dir") return `${signKo(a)}은 ${dirKo(a)}인데 ${dirKo(d)}으로 갔어요. 고쳐서 배달해요.`;
  if (m.cause === "count") return `${signKo(a)}은 ${NUM_KO[Math.abs(a)]} 칸인데 ${d ? NUM_KO[Math.abs(d)] + " 칸 갔어요" : "걷지 않았어요"}. 고쳐서 배달해요.`;
  return `숫자 ${numJosa(p.o, "은", "는")} 출발 집의 구역이에요. ${p.o}구역의 ${LETTERS[p.L]} 집에서 출발해요.`;
}

// ── 흐름: 조작 하나에 바뀔 값만 돌려준다. 바뀔 것이 없으면 null ──
const NOPE = [{ t: "nope" }];
function fresh(m) {
  const first = phasesOf(m)[0];
  return { phase: first, pos: first === "walk" ? m.from : first === "diag" ? m.mis.to : homeOf(m), picked: false, tries: 0, flawed: false,
           pen: { h: null, a: null }, board: m.board0.slice(), picks: m.cards ? m.cards.map(() => false) : [], off: [],
           mine: null, goal: null, lit: -1, done: "", msg: guide(m, first) };
}
function enter(m, S, phase, extra) {                                    // 다음 단계로
  const base = { phase, picked: false, tries: 0, mine: null, goal: null, off: [], pen: { h: null, a: null }, msg: guide(m, phase, (extra && extra.board) || S.board) };
  if (phase === "deliver") Object.assign(base, { pos: m.target, done: S.flawed ? "half" : "full", fx: [{ t: "stamp" }, { t: "listen" }] });
  return Object.assign(base, extra);
}
const toNext = (m, S, extra) => { const ps = phasesOf(m); return enter(m, S, ps[ps.indexOf(S.phase) + 1], extra); };
const inWindow = (m, x) => x >= winLo(m.win) && x <= winHi(m.win);
const F = {
  move(m, S, midi) {                                                    // 집을 눌렀다
    if (!inWindow(m, midi)) return null;
    if (S.phase === "start" || S.phase === "drop") return { pos: midi, picked: true, mine: null, fx: [{ t: "hop", midi }] };
    if (S.phase === "walk") return { msg: say("", "걸어서 가요. 아래 단추를 눌러요.") };
    if (S.phase === "plate") return isWhite(midi) ? { pen: { h: midi, a: S.pen.a }, mine: null, fx: [{ t: "hop", midi }] }
                                                  : { msg: say("", "글자는 흰 집에 있어요. 흰 집을 골라요.") };
    return null;
  },
  nudge(m, S, dir) {                                                    // 걷기 단추 또는 화살표 키
    if (S.phase === "start" || S.phase === "drop" || S.phase === "walk") {
      const pos = S.pos + dir;
      if (!inWindow(m, pos) || (S.phase === "walk" && Math.abs(pos - m.from) > MAXA + 1)) return null;
      return { pos, picked: true, mine: null, fx: [{ t: "hop", midi: pos }] };
    }
    if (S.phase === "plate") {                                          // 쓰기에서는 흰 집끼리 옮겨 다닌다
      let h = S.pen.h === null ? m.target : S.pen.h;
      do { h += dir; } while (inWindow(m, h) && !isWhite(h));
      return inWindow(m, h) ? { pen: { h, a: S.pen.a }, mine: null, fx: [{ t: "hop", midi: h }] } : null;
    }
    return null;
  },
  sign(m, S, a) {                                                       // 기호 단추
    return S.phase === "plate" && m.day.signs.includes(a) ? { pen: { h: S.pen.h, a }, mine: null } : null;
  },
  pick(m, S, i) {                                                       // 편지 카드
    return S.phase === "sort" && !S.off.includes(i) ? { picks: S.picks.map((v, k) => (k === i ? !v : v)), mine: null } : null;
  },
  cause(m, S, c) {                                                      // 반송 편지의 까닭
    if (S.phase !== "diag" || S.off.includes(c)) return null;
    if (c === m.cause) return enter(m, S, "drop", { pos: m.mis.to, mine: m.mis, msg: say("good", "맞아요. " + causeText(m)) });
    if (S.tries + 1 >= 2) return enter(m, S, "drop", { pos: m.mis.to, mine: m.mis, flawed: true, msg: say("warn", `${CAUSE_KO[m.cause]} 쪽이 달랐어요. ` + causeText(m)), fx: NOPE });
    return { tries: S.tries + 1, flawed: true, off: S.off.concat([c]), msg: say("warn", "길을 다시 보세요. 출발 집의 글자와 구역, 방향, 걸음 수를 차례로 견줘요."), fx: NOPE };
  },
  confirm(m, S) {                                                       // 주 단추
    const p = m.note, tries = S.tries + 1;
    if ((S.phase === "start" || S.phase === "drop") && !S.picked) return { msg: say("", "집을 먼저 골라 주세요. 집을 누르거나 단추로 옮겨요.") };   // 고르지 않은 확정은 채점하지 않는다
    if (S.phase === "start") {
      const c = diagStart(p, S.pos);
      if (c === "ok") return enter(m, S, "walk", { pos: m.from });
      if (tries >= 2) return { tries, flawed: true, pos: m.from, picked: true, msg: say("warn", `출발 집은 ${p.o}구역의 ${SOL[p.L]}(${LETTERS[p.L]}) 집이에요. 옮겨 두었어요. [여기서 출발]을 눌러요.`), fx: NOPE };
      return { tries, flawed: true, msg: say("warn", startErr(m, S.pos, c)), fx: NOPE };
    }
    if (S.phase === "walk") {
      if (S.pos === m.target) return toNext(m, S);
      if (tries >= 2) return { tries, flawed: true, pos: m.target, msg: say("warn", m.hop ? `${hopsKo(m.steps)} 가면 이 집이에요. 옮겨 두었어요. [배달]을 눌러요.` : helpKo(m)), fx: NOPE };
      return { tries, flawed: true, msg: say("warn", walkErr(m, S.pos)), fx: NOPE };
    }
    if (S.phase === "drop") {
      if (S.pos === m.target) return toNext(m, S);
      const near = Math.abs(S.pos - m.from) <= MAXA + 1, mine = S.mine || { from: m.from, to: near ? S.pos : m.from };
      if (tries >= 2) return { tries, flawed: true, pos: m.target, picked: true, mine, goal: { from: m.from, to: m.target }, msg: say("warn", helpKo(m)), fx: NOPE };
      return { tries, flawed: true, mine, msg: say("warn", dropErr(m, S.pos, diagnose(p, S.pos))), fx: NOPE };
    }
    if (S.phase === "plate") {
      if (S.pen.h === null || S.pen.a === null) return { msg: say("", "흰 집과 기호를 모두 골라요.") };
      const w = whiteAt(S.pen.h), pen = P(w.L, S.pen.a, w.o);
      if (S.board.some((b) => sameSpell(b, pen))) return { msg: say("", `${josa(pen, "은", "는")} 이미 달린 문패예요. 다른 주소를 찾아요.`) };
      if (midiOf(pen) === m.target) {
        const board = S.board.concat([pen]), left = m.board0.length + m.todo - board.length;
        if (left <= 0) return toNext(m, S, { board });
        return { board, pen: { h: null, a: null }, tries: 0, mine: null, msg: say("good", `${T(pen)} 문패를 달았어요. 주소가 ${left}개 더 있어요.`), fx: [{ t: "stamp" }] };
      }
      if (tries >= 2) {
        const ans = m.rest.find((n) => !S.board.some((b) => sameSpell(b, n)));
        return { tries, flawed: true, pen: { h: midiOf(anchorOf(ans)), a: ans.a }, mine: null,
                 msg: say("warn", `두 칸 안의 흰 집에서 출발하면 돼요. ${josa(ans, "을", "를")} 적어 두었어요. [문패 달기]를 눌러요.`), fx: NOPE };
      }
      return { tries, flawed: true, mine: { from: S.pen.h, to: midiOf(pen) }, msg: say("warn", `${josa(pen, "은", "는")} ${walkKo(pen)}. 다른 집에 도착해요.`), fx: NOPE };
    }
    if (S.phase === "sort") {
      if (!S.picks.some(Boolean)) return { msg: say("", "편지를 하나 이상 골라요.") };
      const wrong = S.picks.map((v, i) => (v && !m.right[i] ? i : -1)).filter((i) => i >= 0);
      const need = m.right.filter(Boolean).length, got = S.picks.filter((v, i) => v && m.right[i]).length;
      if (!wrong.length && got === need) return toNext(m, S, { board: m.board0.concat(m.cards.filter((c, i) => m.right[i])) });
      if (tries >= 2) {
        const list = m.cards.filter((c, i) => m.right[i]);
        return { tries, flawed: true, picks: m.right.slice(), off: m.right.map((r, i) => (r ? -1 : i)).filter((i) => i >= 0), mine: null,
                 msg: say("warn", `같은 집으로 가는 편지는 ${list.map(T).join(", ")}${JONG[mod(list[list.length - 1].o, 10)] ? "이에요" : "예요"}. 골라 두었어요. [확정]을 눌러요.`), fx: NOPE };
      }
      if (wrong.length) {
        const c = m.cards[wrong[0]];
        return { tries, flawed: true, picks: S.picks.map((v, i) => v && m.right[i]), off: S.off.concat(wrong),
                 mine: { from: midiOf(anchorOf(c)), to: midiOf(c) }, msg: say("warn", sortErr(m, c)), fx: NOPE };
      }
      return { tries, flawed: true, msg: say("warn", `같은 집으로 가는 편지는 ${need}통이에요. 지금은 ${got}통 골랐어요.`), fx: NOPE };
    }
    if (S.phase === "deliver") return { advance: true };
    return null;
  },
};
```

조각 2/3 · 넣을 자리: `// -- 3 끝 --` 줄 바로 위 (구획 3 JOBS)
```js
// ═══ 배달 씨앗 ═══
// 씨앗에는 방식(ask), 주소(note), 도움 설정만 적는다. 도착 집, 문패, 정답, 문구는 엔진과 배달 모델이 만든다.
// ask: hop 걸음 연습 · walk 걸어서 배달 · drop 바로 배달 · sort 우편 분류 · fix 반송 편지
// show: "staff"이면 주소를 악보로만 보여 준다 · plate: 배달 뒤에 쓸 문패(1 또는 "all") · with: 이미 달린 문패
// preview: 문패를 쓸 때 걸음을 미리 보여 준다 · final: 마감 배달 · steps: 걸음 연습의 걸음 수 · err: 반송의 까닭
const DAYS = [
  { id: "d0", name: "첫 배달", signs: [0], jobs: [
    { id: "d0-01", ask: "drop", note: "C4" },
    { id: "d0-02", ask: "drop", note: "A4" },
    { id: "d0-03", ask: "drop", note: "C5" },
    { id: "d0-04", ask: "drop", note: "B3" },
    { id: "d0-05", ask: "hop", note: "E4", steps: 1 },
    { id: "d0-06", ask: "hop", note: "C4", steps: 1 },
    { id: "d0-07", ask: "hop", note: "C5", steps: -1, final: true },
  ] },
  { id: "d1", name: "검은 집의 두 주소", signs: [0, 1, -1], jobs: [
    { id: "d1-01", ask: "walk", note: "C#4" },
    { id: "d1-02", ask: "walk", note: "Db4", with: ["C#4"] },
    { id: "d1-03", ask: "walk", note: "F#4", plate: 1, preview: true },
    { id: "d1-04", ask: "drop", note: "Ab4", plate: 1, preview: true },
    { id: "d1-05", ask: "drop", note: "Eb4", show: "staff", plate: 1, preview: true },
    { id: "d1-06", ask: "sort", note: "Db4", cards: ["C#4", "D#4", "C4", "Eb4"] },
    { id: "d1-07", ask: "drop", note: "A#4", show: "staff", plate: 1, final: true },
  ] },
  { id: "d2", name: "흰 집의 숨은 주소", signs: [0, 1, -1], jobs: [
    { id: "d2-01", ask: "walk", note: "E#4" },
    { id: "d2-02", ask: "walk", note: "Fb4" },
    { id: "d2-03", ask: "walk", note: "B#3" },
    { id: "d2-04", ask: "drop", note: "Cb4", show: "staff" },
    { id: "d2-05", ask: "drop", note: "F4", plate: 1, preview: true },
    { id: "d2-06", ask: "drop", note: "C4", plate: 1, preview: true },
    { id: "d2-07", ask: "sort", note: "C4", cards: ["B#3", "B#4", "Cb4", "B3"] },
    { id: "d2-08", ask: "drop", note: "Cb5", show: "staff", final: true },
  ] },
  { id: "d3", name: "두 칸 특급: 더블샵", signs: [0, 1, -1, 2], jobs: [
    { id: "d3-01", ask: "walk", note: "Cx4" },
    { id: "d3-02", ask: "walk", note: "Fx4" },
    { id: "d3-03", ask: "drop", note: "Ex4", plate: "all", preview: true },
    { id: "d3-04", ask: "drop", note: "Dx4", show: "staff" },
    { id: "d3-05", ask: "drop", note: "A4", plate: 1, preview: true },
    { id: "d3-06", ask: "fix", note: "Ax4", err: "count" },
    { id: "d3-07", ask: "sort", note: "E4", cards: ["Dx4", "Fb4", "D#4", "Ex4"] },
    { id: "d3-08", ask: "drop", note: "B4", plate: "all", final: true },
  ] },
  { id: "d4", name: "두 칸 특급: 더블플랫", signs: [0, 1, -1, 2, -2], jobs: [
    { id: "d4-01", ask: "walk", note: "Ebb4" },
    { id: "d4-02", ask: "walk", note: "Bbb4" },
    { id: "d4-03", ask: "drop", note: "Fbb4", plate: "all", preview: true },
    { id: "d4-04", ask: "drop", note: "Abb4", show: "staff" },
    { id: "d4-05", ask: "drop", note: "D4", plate: "all", preview: true },
    { id: "d4-06", ask: "fix", note: "Gbb4", err: "dir" },
    { id: "d4-07", ask: "sort", note: "A4", cards: ["Gx4", "Bbb4", "Ab4", "Bbb3"] },
    { id: "d4-08", ask: "drop", note: "C4", plate: "all", final: true },
  ] },
  { id: "d5", name: "옥타브 경계 검문소", signs: [0, 1, -1, 2, -2], jobs: [
    { id: "d5-01", ask: "walk", note: "Bx3" },
    { id: "d5-02", ask: "walk", note: "Cbb4" },
    { id: "d5-03", ask: "drop", note: "C#4", plate: "all", preview: true },
    { id: "d5-04", ask: "sort", note: "C#4", cards: ["Db4", "Db5", "C#5", "D4"] },
    { id: "d5-05", ask: "fix", note: "B#4", err: "octave" },
    { id: "d5-06", ask: "drop", note: "Bb3", show: "staff", plate: "all", preview: true },
    { id: "d5-07", ask: "drop", note: "G#4", plate: "all" },
    { id: "d5-08", ask: "drop", note: "Cb5", show: "staff", plate: "all", final: true },
  ] },
];
// 스파이크의 하루: 조작마다 하나씩 아홉 건
const SPIKE = { id: "sp", name: "배달 스파이크", signs: [0, 1, -1, 2, -2], jobs: [
  { id: "sp-1", ask: "drop", note: "G4" },
  { id: "sp-2", ask: "walk", note: "C#4" },
  { id: "sp-3", ask: "walk", note: "Db4", with: ["C#4"] },
  { id: "sp-4", ask: "drop", note: "F#4", plate: 1, preview: true },
  { id: "sp-5", ask: "drop", note: "E#4", show: "staff" },
  { id: "sp-6", ask: "walk", note: "Cx4", plate: "all", preview: true },
  { id: "sp-7", ask: "sort", note: "D4", cards: ["Cx4", "Ebb4", "Db4", "D5"] },
  { id: "sp-8", ask: "walk", note: "B#3" },
  { id: "sp-9", ask: "fix", note: "Cb4", err: "octave", final: true },
] };
```

조각 3/3 · 넣을 자리: `// -- 11 끝 --` 줄 바로 위 (구획 11 TESTS)
```js

// ── JB 씨앗, FL 흐름: 조작을 흉내 내어 끝까지 간다 ──
const tDays = () => DAYS.concat([SPIKE]);
let tModelMemo = null, tTextMemo = null;
const tModels = () => tModelMemo || (tModelMemo = Object.fromEntries(tDays().flatMap((d) => d.jobs.map((j) => [j.id, jobModel(j, d)]))));
const tTokens = (text) => [...text.matchAll(/⟦([^⟧]+)⟧/g)].every((t) => { try { parse(t[1]); return true; } catch (e) { return false; } });
const tSeen = [];                                                        // 흉내 내는 동안 나온 문구
let tLastFx = [];                                                        // 마지막 조작이 낸 소리 지시
const tApply = (S, patch) => { if (!patch) return S; if (patch.msg) tSeen.push(patch.msg.text); tLastFx = patch.fx || []; const o = Object.assign({}, S, patch); delete o.fx; delete o.advance; return o; };
function tNote(S, ok) { tSeen.push(S.msg.text); ok(S.msg.text.length > 0 && tTokens(S.msg.text), "문구 " + S.msg.text); }
function tSolve(m, S) {                                                  // 지금 단계를 바르게 푼다
  const ph = S.phase;
  if (ph === "start") S = tApply(S, F.move(m, S, m.from));
  else if (ph === "walk") { while (S.pos !== m.target) S = tApply(S, F.nudge(m, S, Math.sign(m.target - S.pos))); }
  else if (ph === "drop") S = tApply(S, F.move(m, S, m.target));
  else if (ph === "plate") {
    const ans = m.rest.find((n) => !S.board.some((b) => sameSpell(b, n)));
    S = tApply(S, F.move(m, S, midiOf(anchorOf(ans)))); S = tApply(S, F.sign(m, S, ans.a));
  } else if (ph === "sort") m.right.forEach((r, i) => { if (r !== S.picks[i]) S = tApply(S, F.pick(m, S, i)); });
  else if (ph === "diag") return tApply(S, F.cause(m, S, m.cause));
  return tApply(S, F.confirm(m, S));
}
function tSpoil(m, S) {                                                  // 지금 단계에서 한 번 틀린다. 틀릴 수 없으면 null
  const ph = S.phase;
  if (ph === "start") { const w = m.from + (m.from + 2 <= winHi(m.win) ? 2 : -2); S = tApply(S, F.move(m, S, isWhite(w) ? w : w - 1)); }
  else if (ph === "walk") { if (S.pos === m.target) S = tApply(S, F.nudge(m, S, m.steps > 0 ? -1 : 1)); }
  else if (ph === "drop") S = tApply(S, F.move(m, S, m.target + (m.target + 1 <= winHi(m.win) ? 1 : -1)));
  else if (ph === "plate") {
    const ans = m.rest.find((n) => !S.board.some((b) => sameSpell(b, n))), bad = ans.a > -MAXA && m.day.signs.includes(ans.a - 1) ? ans.a - 1 : ans.a + 1;
    S = tApply(S, F.move(m, S, midiOf(anchorOf(ans)))); S = tApply(S, F.sign(m, S, bad));
  } else if (ph === "sort") {
    const i = m.right.findIndex((r, k) => !r && !S.off.includes(k));
    if (i >= 0) { if (!S.picks[i]) S = tApply(S, F.pick(m, S, i)); }
    else if (!S.picks.some(Boolean)) return null;
    else { const j = S.picks.findIndex(Boolean); if (m.right.filter(Boolean).length < 2) return null; S = tApply(S, F.pick(m, S, j)); if (!S.picks.some(Boolean)) return null; }
  } else if (ph === "diag") { const c = CAUSES.find((x) => x !== m.cause && !S.off.includes(x)); return tApply(S, F.cause(m, S, c)); }
  return tApply(S, F.confirm(m, S));
}
function tPlay(m, wrongs, ok) {                                          // 단계마다 wrongs번 틀린 뒤 푼다. 끝 상태와 지난 단계들
  let S = fresh(m), guard = 0;
  const seen = [S.phase];
  tNote(S, ok);
  while (S.phase !== "deliver" && guard++ < 60) {
    const ph = S.phase, boardLen = S.board.length;
    for (let k = 0; k < wrongs && S.phase === ph && S.board.length === boardLen; k++) { const S2 = tSpoil(m, S); if (!S2) break; S = S2; tNote(S, ok); }
    if (S.phase === ph) { S = tSolve(m, S); tNote(S, ok); }
    if (S.phase !== seen[seen.length - 1]) seen.push(S.phase);
  }
  return { S, seen };
}
function tProbe(m) {                                                     // 채점하지 않는 입력이 내는 문구들
  const out = [], hear = (p) => { if (p && p.msg) out.push(p.msg.text); };
  let S = fresh(m), guard = 0;
  while (S.phase !== "deliver" && guard++ < 20) {
    const ph = S.phase;
    if (ph === "start" || ph === "drop" || ph === "sort") hear(F.confirm(m, S));
    if (ph === "walk") hear(F.move(m, S, m.from));
    if (ph === "sort" && m.right.filter(Boolean).length > 1) hear(F.confirm(m, Object.assign({}, S, { picks: S.picks.map((v, k) => k === m.right.indexOf(true)) })));   // 덜 골랐다
    if (ph === "plate") {
      const black = [m.target - 1, m.target, m.target + 1].find((x) => !isWhite(x) && inWindow(m, x)), b = S.board[0];
      hear(F.confirm(m, S));
      if (black !== undefined) hear(F.move(m, S, black));
      hear(F.confirm(m, Object.assign({}, S, { pen: { h: midiOf(anchorOf(b)), a: b.a } })));
    }
    S = tSolve(m, S);
  }
  return out;
}
function tSlips(m) {                                                     // 단계마다 한 번 틀렸을 때(그리고 이어서 한 번 더) 나올 수 있는 문구 전부. 틀린 집, 카드, 주소, 까닭을 모두 넣어 본다
  const out = [], hear = (p) => { if (p && p.msg) out.push(p.msg.text); return p; };
  let S = fresh(m), guard = 0;
  while (S.phase !== "deliver" && guard++ < 20) {
    const ph = S.phase, lo = winLo(m.win), hi = winHi(m.win);
    if (ph === "start" || ph === "drop") for (let x = lo; x <= hi; x++) { const at = Object.assign({}, S, { pos: x, picked: true }), p = hear(F.confirm(m, at)); if (p && p.tries) hear(F.confirm(m, Object.assign({}, at, p))); }
    if (ph === "walk") for (let d = -MAXA - 1; d <= MAXA + 1; d++) if (inWindow(m, m.from + d)) hear(F.confirm(m, Object.assign({}, S, { pos: m.from + d })));
    if (ph === "sort") m.cards.forEach((c, i) => hear(F.confirm(m, Object.assign({}, S, { picks: m.cards.map((x, k) => k === i) }))));
    if (ph === "plate") for (let h = lo; h <= hi; h++) if (isWhite(h)) for (const a of m.day.signs) hear(F.confirm(m, Object.assign({}, S, { pen: { h, a } })));
    if (ph === "diag") for (const c of CAUSES) { hear(F.cause(m, S, c)); hear(F.cause(m, Object.assign({}, S, { tries: 1 }), c)); }
    S = tSolve(m, S);
  }
  return out;
}
function tTexts() {                                                      // 배달 전부에서 나올 수 있는 문구(편지 카드, 판독 줄, 듣기)
  if (tTextMemo) return tTextMemo;
  const quiet = () => {}, mark = tSeen.length, out = [];
  for (const m of Object.values(tModels())) {
    out.push(cardText(m).text);
    tProbe(m).forEach((t) => out.push(t));
    tSlips(m).forEach((t) => out.push(t));
    for (const w of [0, 1, 2]) { const r = tPlay(m, w, quiet); if (w === 0 && r.S.board.length > 1) { out.push(sameKo(r.S.board)); for (let k = 0; k <= r.S.board.length; k++) out.push(listenLabel(r.S.board, k)); } }
  }
  if (typeof SCENES !== "undefined") for (const sc of SCENES) { out.push(sc.title); sceneModel(sc, DAYS.find((d) => d.jobs.some((j) => j.id === sc.after))).lines.forEach((t) => out.push(t)); }   // 발견 장면이 생긴 뒤에는 그 문장도
  return (tTextMemo = [...new Set(out.concat(tSeen.slice(mark)))]);
}
test("JB-01", "출제 제약", (ok, eq) => {
  for (const [id, m] of Object.entries(tModels())) {
    eq(checkJob(m), [], "제약 " + id);
    if (m.ask === "fix") { const c = diagnose(m.note, m.mis.to); ok(CAUSES.includes(m.cause) && m.cause === (c === "stay" ? "count" : c), "반송 편지의 까닭이 엔진의 진단과 같다 " + id); }
  }
});
test("JB-02", "배달일의 구성", (ok, eq) => {
  const days = tDays();
  eq(DAYS.map((d) => d.jobs.length), [7, 7, 8, 8, 8, 8], "배달 수");
  for (const d of days) ok(d.jobs.filter((j) => j.final).length === 1 && d.jobs[d.jobs.length - 1].final, "마감 배달은 마지막 " + d.id);
  ok(new Set(days.flatMap((d) => d.jobs.map((j) => j.id))).size === days.reduce((s, d) => s + d.jobs.length, 0), "번호가 겹치지 않는다");
  for (const d of DAYS) for (const j of d.jobs) ok(!(j.final && j.preview), "마감 배달에는 미리 보기가 없다 " + j.id);
});
test("JB-03", "문패 28개", (ok, eq) => {
  const got = new Set(), perDay = {};
  for (const d of DAYS) {
    perDay[d.id] = [];
    for (const j of d.jobs) for (const p of platesOf(tModels()[j.id])) { const k = LETTERS[p.L] + ACC[p.a + MAXA]; if (!got.has(k)) { got.add(k); perDay[d.id].push(k); } }
  }
  ok(got.size === 28, "문패 28개: " + got.size);
  eq(Object.values(perDay).map((x) => x.length), [0, 10, 4, 6, 6, 2], "배달일별 새 문패");
});
test("JB-04", "새 기호는 걸어서 배운다", (ok) => {
  for (let i = 1; i < DAYS.length; i++) {
    for (const a of DAYS[i].signs.filter((x) => !DAYS[i - 1].signs.includes(x))) {
      const first = DAYS[i].jobs.find((j) => parse(j.note).a === a);
      ok(first && first.ask === "walk", "새 기호 " + a + "의 첫 배달은 걸어서 " + DAYS[i].id);
    }
  }
});
test("FL-01", "한 번에 맞히면 ●", (ok, eq) => {
  for (const [id, m] of Object.entries(tModels())) {
    const r = tPlay(m, 0, ok);
    ok(r.S.phase === "deliver" && r.S.done === "full" && !r.S.flawed, "● " + id + " " + r.S.phase + " " + r.S.done);
    eq(r.seen, phasesOf(m), "단계 순서 " + id);
    ok(r.S.board.length === m.board0.length + (m.ask === "sort" ? m.right.filter(Boolean).length : m.todo), "문패 수 " + id);
    ok(r.S.board.every((b) => midiOf(b) === m.target), "문패는 모두 같은 집 " + id);
    ok(F.confirm(m, r.S).advance === true, "다음 배달로 " + id);
  }
});
test("FL-02", "한 번 틀리면 ◐, 안내를 받는다", (ok) => {
  for (const [id, m] of Object.entries(tModels())) { const r = tPlay(m, 1, ok); ok(r.S.phase === "deliver" && r.S.done === "half", "◐ " + id + " " + r.S.phase + " " + r.S.done); }
});
test("FL-03", "두 번 틀리면 고쳐 주고 ◐", (ok, eq) => {
  for (const [id, m] of Object.entries(tModels())) {
    const r = tPlay(m, 2, ok);
    ok(r.S.phase === "deliver" && r.S.done === "half", "◐◐ " + id + " " + r.S.phase + " " + r.S.done);
    eq(r.seen, phasesOf(m), "단계 순서 " + id);
  }
});
test("FL-04", "채점하지 않는 입력", (ok, eq) => {
  const models = tModels(), m = models["sp-6"];
  let S = fresh(m);
  S = tSolve(m, S); S = tSolve(m, S);                                    // 출발, 걸음 → 문패 쓰기
  ok(S.phase === "plate" && !S.flawed, "문패 쓰기로");
  S = tApply(S, F.confirm(m, S)); ok(!S.flawed && S.tries === 0 && /모두 골라요/.test(S.msg.text), "덜 고르고 확정");
  S = tApply(S, F.move(m, S, 61)); ok(!S.flawed && S.pen.h === null && /흰 집/.test(S.msg.text), "검은 집을 눌렀다");
  S = tApply(S, F.move(m, S, 60)); S = tApply(S, F.sign(m, S, 2)); S = tApply(S, F.confirm(m, S));
  ok(!S.flawed && S.tries === 0 && /이미 달린/.test(S.msg.text), "이미 달린 문패");
  S = tApply(S, F.move(m, S, 62)); S = tApply(S, F.sign(m, S, 0)); S = tApply(S, F.confirm(m, S));
  ok(S.phase === "plate" && S.board.length === 2 && /1개 더/.test(S.msg.text), "하나를 달면 남은 수를 말한다");
  S = tApply(S, F.move(m, S, 64)); S = tApply(S, F.sign(m, S, -2)); S = tApply(S, F.confirm(m, S));
  ok(S.phase === "deliver" && S.done === "full" && S.board.length === 3, "세 주소를 다 달았다");
  eq(tK(S.board), ["Cx4", "D4", "Ebb4"], "문패 판");
  const w = models["sp-2"];
  let W = fresh(w);
  ok(!tApply(W, F.confirm(w, W)).flawed && /먼저 골라/.test(tApply(W, F.confirm(w, W)).msg.text), "고르지 않고 출발");
  const dj = models["sp-5"], D0 = fresh(dj);
  ok(D0.pos === dj.target && !tApply(D0, F.confirm(dj, D0)).flawed && tApply(D0, F.confirm(dj, D0)).phase === "drop", "처음 자리가 도착 집이어도 고르지 않으면 넘어가지 않는다");
  ok(F.nudge(w, tApply(W, F.move(w, W, 59)), -1) === null, "창 밖으로 나가지 않는다");
  W = tSolve(w, W); ok(W.phase === "walk" && /걸어서/.test(tApply(W, F.move(w, W, 66)).msg.text), "걸음 단계에서는 집을 눌러도 옮기지 않는다");
  let far = W;
  for (let k = 0; k < 6; k++) far = tApply(far, F.nudge(w, far, 1));
  ok(far.pos - w.from === MAXA + 1, "걸음은 세 칸까지");
  const s = models["sp-7"];
  let Q = fresh(s);
  Q = tApply(Q, F.confirm(s, Q)); ok(!Q.flawed && /하나 이상/.test(Q.msg.text), "고르지 않고 확정");
  Q = tApply(Q, F.pick(s, Q, 0)); Q = tApply(Q, F.confirm(s, Q)); ok(Q.flawed && /2통/.test(Q.msg.text) && /1통/.test(Q.msg.text), "덜 고르면 수를 말한다");
  ok(F.sign(models["d1-03"], Object.assign(fresh(models["d1-03"]), { phase: "plate" }), 2) === null, "아직 배우지 않은 기호는 듣지 않는다");
});
test("FL-05", "문구", (ok, eq) => {
  for (const [id, m] of Object.entries(tModels())) { const c = cardText(m); ok(c.chip.length > 0 && tTokens(c.text), "카드 " + id); }
  for (const m of Object.values(tModels())) tPlay(m, 0, ok);
  ok(tTexts().every((t) => t.length > 0 && tTokens(t)), "모든 문구의 주소 토큰");
  eq(sameKo(["C#4", "Db4"].map(tN)), "⟦C#4⟧는 도에서 반음 위, ⟦Db4⟧는 레에서 반음 아래. 같은 집이에요.", "두 주소의 한 문장");
  eq([pitchKo(tN("Cx4")), pitchKo(tN("Ebb4")), pitchKo(tN("G4"))], ["도에서 두 반음 위", "미에서 두 반음 아래", "4구역의 솔 집"], "높낮이로 말하기");
  eq([signKo(1), signKo(-1), signKo(2), signKo(-2), walkKo(tN("Cx4")), walkKo(tN("G4")), sayKo(tN("Bbb3"))], ["샵", "플랫", "더블샵", "더블플랫", "도에서 오른쪽으로 두 칸", "4구역의 솔 집", "B 더블플랫 3"], "낱말");
  eq(JONG, [..."영일이삼사오육칠팔구"].map((c) => ((c.charCodeAt(0) - 0xAC00) % 28 > 0 ? 1 : 0)), "숫자를 읽은 소리의 받침");
});
test("ST-01", "단계 전환은 흐름 그림에 있는 것뿐이다", (ok) => {
  const NEXT = { start: ["walk"], walk: ["plate", "deliver"], drop: ["plate", "deliver"], plate: ["deliver"], sort: ["deliver"], diag: ["drop"] }, quiet = () => {};
  for (const [id, m] of Object.entries(tModels())) for (const wrongs of [0, 1, 2]) {
    const seen = tPlay(m, wrongs, quiet).seen;
    for (let i = 1; i < seen.length; i++) ok((NEXT[seen[i - 1]] || []).includes(seen[i]), `${id} ${seen[i - 1]} → ${seen[i]}`);
    ok(seen[seen.length - 1] === "deliver", id + " 끝은 듣기");
  }
});
test("TH-12", "이론 값이 소스에 글자로 적혀 있지 않다", (ok, eq) => {
  const src = appSource(), KEYS = ["id", "ask", "note", "steps", "show", "plate", "with", "cards", "err", "preview", "final"];
  ok(!/\b\d{3}\.\d+/.test(src), "주파수의 소수가 없다");
  eq((src.match(/\b440\b/g) || []).length, 1, "440은 공식 한 곳에만 있다");
  ok(!/0,\s*2,\s*4,\s*5,\s*7,\s*9,\s*11/.test(src), "자연음 반음값 표가 없다");
  ok(!/["'`][A-G](?:#|x|b{1,2})?\d["'`]\s*:/.test(src), "주소를 열쇠로 쓴 표가 없다");
  for (const d of tDays()) for (const j of d.jobs) ok(Object.keys(j).every((k) => KEYS.includes(k)), "씨앗의 열쇠 " + j.id);
});
test("CT-01", "문구의 주소는 토큰으로만 적힌다", (ok) => {
  const texts = tTexts();
  ok(texts.length > 200, "문구를 모았다: " + texts.length);
  for (const t of texts) {
    ok(tTokens(t), "토큰이 주소로 읽힌다: " + t);
    ok(!/[A-G](?:#|x|b{1,2})?\d/.test(t.replace(/⟦[^⟧]+⟧/g, "")), "토큰 밖에 씨앗 글자가 없다: " + t);
    if (typeof rich === "function") ok(!/[⟦⟧]/.test(rich(t)) && !/[A-G](?:#|x|b{1,2})\d/.test(rich(t).replace(/<[^>]+>/g, "")), "화면에 토큰과 씨앗 글자가 남지 않는다: " + t);
  }
});
test("CT-03", "금지 표현이 없다", (ok) => {
  const html = document.documentElement.outerHTML, a = html.indexOf("\n// == 11 TESTS =="), b = html.indexOf("\n// == 12 BOOT =="), page = html.slice(0, a) + html.slice(b);
  for (const bad of ["병행조", "언제나 같은 주파수", "항상 같은 주파수"]) {
    ok(!page.includes(bad), "페이지에 없다: " + bad);
    ok(!tTexts().some((t) => t.includes(bad)), "문구에 없다: " + bad);
  }
});
```

하지 말 것:
- 씨앗에 정답을 적지 않는다(도착 집, 문패, 맞는 카드, 반송 길). 열쇠를 더하지 않는다.
- 흐름 함수 안에서 상태를 바꾸거나 화면과 소리를 만지지 않는다.
- 문구를 손보지 않는다. 문구는 320px 폭에서 두 줄에 들어가는지 잰 것이다.
- 배달의 순서와 수를 바꾸지 않는다.

보고: index.html#test의 첫 줄(글자 그대로), 콘솔 오류 수, 넣은 조각 수, 조각에서 바꾼 글자(없어야 한다).
````

**완료 기준.**

- `index.html#test`의 첫 줄: `자가검사 36/36 (전체 47개 중 36개 작성) · TH 12/12 · CH 4/4 · SC 3/3 · JB 4/4 · FL 5/5 · ST 2/2 · SV 4/4 · CT 2/2`
- 콘솔 오류 0, 외부 요청 0.
- 콘솔에서 `DAYS.map((d) => d.jobs.length)` → `[7, 7, 8, 8, 8, 8]`. 배달 46건에 검사용 하루(`SPIKE`) 9건이 따로 있다.
- `cardText(jobModel(DAYS[1].jobs[0], DAYS[1])).text` → `"⟦C#4⟧ 편지를 배달해 주세요."`. 문구 속 주소는 토큰이다.
- `tTexts().length` → `400`. 배달 55건이 낼 수 있는 문구(편지 카드, 판독 줄, 듣기)의 가짓수다. 틀린 집, 카드, 주소, 까닭을 하나씩 모두 넣어 본 문구까지 모은다.
- `phasesOf(jobModel(SPIKE.jobs[5], SPIKE))` → `["start", "walk", "plate", "deliver"]`.
- 화면은 여전히 빈 틀이다.

### P05 [점검] 게이트 GPO1

코드를 더하지 않는다. AI는 소스를 읽어 보고하고, 사람은 콘솔에서 정답표를 대조한다.

````text
[P05 · 점검] 게이트 GPO1: 이론 엔진과 배달 모델

코드를 더하거나 고치지 않는다. index.html을 읽고 아래를 확인해 보고한다. 어긋난 것을 찾으면 고치지 말고 줄 번호와 함께 보고한다.

1. index.html#test의 첫 줄이 아래와 같은가.
   자가검사 36/36 (전체 47개 중 36개 작성) · TH 12/12 · CH 4/4 · SC 3/3 · JB 4/4 · FL 5/5 · ST 2/2 · SV 4/4 · CT 2/2
2. 구획 1과 2에 window, document, localStorage, AudioContext를 부르는 줄이 없는가.
3. 구획 1~3에 이론 값이 글자로 적힌 곳이 없는가. 찾을 것: 주파수의 소수(277.18 같은 수), 0 2 4 5 7 9 11 꼴의 반음값 표, 딴이름 쌍을 적은 목록, 주소를 열쇠로 쓴 표.
4. 구획 3의 씨앗에 id ask note steps show plate with cards err preview final 말고 다른 열쇠가 없는가. 씨앗에 집 번호나 정답이 적혀 있지 않은가.
5. samePc가 쓰이는 곳을 모두 적는다. 쓰여도 되는 곳은 sortErr 한 곳이다(오답의 문구를 고른다. 판정이 아니다).
6. 흐름 함수 F.* 안에 S.x = … 꼴의 대입이나 setState 호출이 없는가.
7. 가이드 문서의 P03, P04 조각과 index.html의 해당 부분을 견줘 다른 글자가 있으면 모두 적는다.

보고: 항목 1~7의 결과를 하나씩. 그리고 부록 A의 게이트 보고 블록(gate: GPO1). 돌리지 못한 항목은 NOT_RUN으로 적는다.
````

**사람이 볼 것.** `index.html`을 열고 콘솔에 친다. 결과가 오른쪽과 같아야 한다.

| 콘솔에 치는 것 | 결과 |
|---|---|
| `spellingsAt(61).map(nameTxt)` | `["C♯4", "D♭4", "B𝄪3"]` |
| `isEnharmonic(parse("C#4"), parse("Db5"))` | `false` |
| `[...Array(12)].map((x, i) => spellingsAt(60 + i).length)` | `[3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3]` (합 35) |
| `hz(57).toFixed(2)` | `"220.00"` |
| `diagnose(parse("C#4"), 59)` | `"dir"` (C♯4를 B3에 배달했다: 반대쪽으로 걸었다) |
| `misroute(parse("B#4"), "octave")` | `{ from: 59, to: 60 }` (B3 → C4. 숫자를 도착 집의 구역으로 착각한 길) |
| `scale(parse("F#4")).map(keyOf)` | `["F#4", "G#4", "A#4", "B4", "C#5", "D#5", "E#5"]` (일곱째 음은 F가 아니라 E♯) |
| `triad(parse("D#4"), "maj").map(keyOf)` | `["D#4", "Fx4", "A#4"]` |
| `jobModel(DAYS[3].jobs[2], DAYS[3]).rest.map(nameTxt)` | `["F♯4", "G♭4"]` (d3-03의 E𝄪4 집에 더 쓸 주소) |
| `checkJob(jobModel({ id: "x", ask: "sort", note: "C#4", cards: ["Bx3", "Db5"] }, DAYS[5]))` | `["한 창에 들어가지 않는다", "출발 집이나 도착 집이 창 밖이다"]` |

부록 E의 배달 표에서 아무 줄이나 셋을 골라 `jobModel`의 값(`from`, `target`, `win`)과 견줘 본다.

**게이트 GPO1.** 검사 36/36, 위 표가 모두 맞음, AI의 항목 2~7에 위반 없음. 버전 v0.1. `docs/post-gate-report.md`에 블록을 더한다.

---

## 4. PO2 길과 악보

목표는 배달 하나의 모든 장면이 화면에 그려지는 것이다. 아직 누를 수는 없다. 바로가기(`#sp-2`, `#sp-6!`)로 장면을 열어 본다.

### P06 [그대로] 길과 편지 카드

| 항목 | 내용 |
|---|---|
| 단계 | PO2 |
| 시작 전 `#test` | `자가검사 36/36 (전체 47개 중 36개 작성) · TH 12/12 · CH 4/4 · SC 3/3 · JB 4/4 · FL 5/5 · ST 2/2 · SV 4/4 · CT 2/2` |
| 끝난 뒤 `#test` | 같다(검사를 더하지 않는다) |
| 조각 | 3개(구획 4, 구획 5, 스타일) |

**무엇이 들어가는가.**

- **배달 열기(구획 4).** `BOOK`은 검사용 하루와 배달일 여섯이다. `queueOf(n, requeue)`가 그날의 줄을 만든다(첫 번째 배달들, 다시 낼 배달들, 마감 배달). `runPatch`가 배달 하나를 여는 데 드는 값 전부를 만들고, `openRun`이 **모델을 먼저 만든 뒤 상태를 한 번에** 넣는다. 주소 끝의 `#d3`, `#d3-2`, `#sp`를 읽는 바로가기와 점검용 창구 `window.__twn`도 여기 있다.
- **기호와 주소 글자(구획 5).** 샵, 플랫, 더블샵, 더블플랫, 음자리표, 음표 머리의 도형. `signSvg(a)`는 글줄 안에 넣는 기호 그림(높이와 폭을 em으로 적는다), `nameHtml(주소)`는 글자 + 기호 그림 + 숫자에 화면 읽기용 글("C 샵 4")을 함께 넣는다. `rich(문구)`가 문구 속의 토큰 `⟦C#4⟧`를 그것으로 바꾼다.
- **길.** `buildStreet`가 흰 집 아홉 채와 그 사이의 검은 집, 구역 띠를 만든다. 창이 바뀔 때만 다시 만든다.
- **그리기 셋.** 진행 점(순서 20), 편지 카드(30), 길의 표시와 우체부(40). 집의 상태는 클래스(`is-here`, `is-goal`, `is-from`, `is-near`)로만 바꾼다.

````text
[P06 · 그대로] 길과 편지 카드

P00의 W1~W5를 지킨다.

시작 전: index.html#test의 첫 줄이 아래와 같은지 확인한다. 다르면 멈추고 보고한다.
  자가검사 36/36 (전체 47개 중 36개 작성) · TH 12/12 · CH 4/4 · SC 3/3 · JB 4/4 · FL 5/5 · ST 2/2 · SV 4/4 · CT 2/2

할 일: 아래 조각 3개를 적힌 자리에 글자 그대로 넣는다. 자리는 마커 줄의 바로 위다. 마커 줄은 그대로 둔다.

조각 1/3 · 넣을 자리: `// -- 4 끝 --` 줄 바로 위 (구획 4 STATE)
```js

// ── 배달 열기 ──
const BOOK = [SPIKE].concat(DAYS);                                       // 검사용 하루("sp")와 v1.0의 배달일 여섯
const dayOf = (id) => BOOK.find((d) => d.id === id);
const dayNow = () => dayOf(S.day);
function queueOf(n, requeue) {                                           // 그날의 줄: 첫 번째 배달들, 다시 낼 배달들, 마감 배달. 값은 배달의 번호
  const q = [];
  for (let i = 0; i < n - 1; i++) q.push(i);
  return q.concat(requeue, [n - 1]);
}
const queueNow = () => queueOf(dayNow().jobs.length, S.requeue);
function runPatch(day, idx, requeue, results) {                          // 배달 하나를 여는 데 드는 값 전부. 모델을 먼저 만든다
  const d = dayOf(day), m = jobModel(d.jobs[queueOf(d.jobs.length, requeue)[idx]], d);
  return { m, patch: Object.assign({ screen: "run", day, idx, requeue, results, scene: null }, fresh(m)) };
}
function openRun(day, idx, requeue, results, extra) {                    // 배달을 연다. 상태는 한 번에 넣는다
  emit("leave");
  const r = runPatch(day, idx || 0, requeue || [], results || []);
  M = r.m;
  setState(Object.assign(r.patch, extra));
}
let goHome = () => openRun("d0", 0);                                     // 처음 화면. 지도가 생기면 갈아 끼운다
atBoot(50, () => {                                                       // 주소 끝에 #d3, #d3-2, #sp를 붙여 열면 그 배달에서 시작한다. 개발용이고 저장하지 않는다
  const hash = /^#(sp|d\d)(?:-(\d+))?!?$/.exec(location.hash), d = hash && dayOf(hash[1]);
  if (!d) return goHome();
  store.hold = true;
  openRun(d.id, Math.min(d.jobs.length, hash[2] ? +hash[2] : 1) - 1, [], [], { dev: true });
});
atBoot(90, () => { window.__twn = { S, model: () => M, BOOK, F, store, openDay: (i, idx) => { store.hold = true; openRun(BOOK[i].id, idx || 0, [], [], { dev: true }); } }; });   // 점검용
```

조각 2/3 · 넣을 자리: `// -- 5 끝 --` 줄 바로 위 (구획 5 VIEW)
```js

// ── 기호와 음표 그림: 글꼴에 기대지 않고 직접 그린다. 단위는 오선 한 칸 = 10 ──
const G_SHARP = '<path class="gs" stroke-width="1.1" d="M-2.2 -12V14M2.2 -14V12"/><path class="gl" d="M-4.6 -4.3L4.6 -6.7V-3.7L-4.6 -1.3ZM-4.6 3.7L4.6 1.3V4.3L-4.6 6.7Z"/>';
const G_FLAT = '<path class="gs" stroke-width="1.2" d="M-2.8 -17V6.4"/><path class="gl" fill-rule="evenodd" d="M-2.8 -2.2C-0.5 -6.2 5.4 -6 5 -1.6C4.6 2.2 0.2 4.4 -2.8 6.6ZM-2.2 -0.4C-0.4 -3.4 3 -3.6 2.8 -1.2C2.6 1.2 -0.4 3 -2.2 4.5Z"/>';
const G_DSHARP = '<path class="gs" stroke-width="1.7" d="M-3.4 -3.4L3.4 3.4M-3.4 3.4L3.4 -3.4"/><path class="gl" d="M-5.4 -5.4h3.2v3.2h-3.2zM2.2 -5.4h3.2v3.2h-3.2zM-5.4 2.2h3.2v3.2h-3.2zM2.2 2.2h3.2v3.2h-3.2z"/>';
const G_DFLAT = `<g transform="translate(-3.9 0)">${G_FLAT}</g><g transform="translate(3.6 0)">${G_FLAT}</g>`;
const GLYPH = { "1": G_SHARP, "-1": G_FLAT, "2": G_DSHARP, "-2": G_DFLAT };
const BOX = { "1": [-5.5, -15, 11, 30], "-1": [-4.6, -18, 11, 26], "2": [-6.5, -6.5, 13, 13], "-2": [-8.6, -18, 19, 26] };   // 기호의 상자
const EM = { "1": 1.05, "-1": 1.05, "2": 0.72, "-2": 1 };                // 글줄 안에서의 높이(em)
const ACC_DX = { "1": 1.8, "-1": 1.65, "2": 1.95, "-2": 2.2 };            // 음표 머리 가운데에서 기호 가운데까지(오선 칸)
const G_CLEF = '<path d="M1.5 5.5C-3.5 6.5 -6 1.5 -2.5 -2.5C0.5 -6 7 -4.5 7.5 2C8 8.5 1.5 12.5 -4 10.5C-10.5 8 -11.5 -3 -5.5 -11C-0.5 -18.5 6.5 -25 6 -35C5.7 -41 2.8 -45.5 0.4 -43C-2.6 -40 -2.2 -31 -0.8 -22C0.6 -12.5 2.2 2 3 11C3.6 17.5 2.5 21.5 -0.5 22.5C-3.5 23.5 -6.2 21.5 -5.8 18.8"/><circle cx="-4.2" cy="18.6" r="2"/>';
const G_HEAD = '<ellipse class="hd" rx="7.6" ry="5.3"/><ellipse class="hole" rx="3.6" ry="4.5" transform="rotate(-28)"/>';
const signSvg = (a) => { const b = BOX[a], h = EM[a]; return `<svg class="sg sg${a > 0 ? a : "m" + -a}" viewBox="${b.join(" ")}" style="height:${h}em;width:${((b[2] / b[3]) * h).toFixed(3)}em" aria-hidden="true">${GLYPH[a]}</svg>`; };
const nameHtml = (p) => `<span class="nm"><span aria-hidden="true">${LETTERS[p.L]}${p.a ? signSvg(p.a) : ""}<span class="oc">${p.o}</span></span><span class="sr">${sayKo(p)}</span></span>`;
const TOKEN = /⟦([^⟧]+)⟧/g;
const rich = (text) => text.replace(TOKEN, (x, k) => nameHtml(parse(k)));   // 문구 속 주소 토큰을 그림으로

// ── 길 ──
function buildStreet() {                                                 // 창이 바뀔 때만 집을 다시 만든다
  const s = M.win;
  let h = "", z = "";
  for (let i = 0; i < WIN; i++) {
    const p = whiteOfStep(s + i);
    h += `<button type="button" class="house wh${p.L === 0 && i ? " is-edge" : ""}" data-m="${midiOf(p)}" style="left:${(i / WIN) * 100}%;width:${100 / WIN}%" aria-label="${p.o}구역 ${SOL[p.L]} ${LETTERS[p.L]} 집"><b>${LETTERS[p.L]}</b><span>${SOL[p.L]}</span></button>`;
  }
  for (let m = winLo(s); m <= winHi(s); m++) if (!isWhite(m)) h += `<button type="button" class="house bk" data-m="${m}" style="left:${(xOf(m, s) - 0.31 / WIN) * 100}%;width:${(0.62 / WIN) * 100}%" aria-label="${zoneOf(m)}구역 검은 집. ${LETTERS[whiteAt(m - 1).L]}와 ${LETTERS[whiteAt(m + 1).L]} 사이"></button>`;
  $("houses").innerHTML = h;
  for (let i = 0; i < WIN;) {
    const o = whiteOfStep(s + i).o;
    let j = i;
    while (j < WIN && whiteOfStep(s + j).o === o) j++;
    z += `<span style="left:${(i / WIN) * 100}%;width:${((j - i) / WIN) * 100}%">${j - i > 1 ? o + "구역" : o}</span>`;
    i = j;
  }
  $("zones").innerHTML = z;
}
const pinMidi = () => (S.phase === "sort" ? null : S.phase === "plate" ? S.pen.h : S.phase === "deliver" ? M.target : S.pos);
const fromMidi = () => (S.phase === "walk" ? M.from : S.phase === "diag" ? M.mis.from : S.goal ? S.goal.from : S.mine ? S.mine.from : null);
onPaint(20, () => {                                                      // 진행 점: 그날의 배달 하나에 점 하나. 다시 낸 배달도 제 점에서 한다
  if (!M) return;
  const jobs = dayNow().jobs, first = {};
  if (built.day !== S.day) { built.day = S.day; $("dots").innerHTML = jobs.map(() => "<i></i>").join(""); }
  S.results.forEach((r) => { if (!(r.id in first)) first[r.id] = r.done; });
  const now = S.screen === "run" ? queueNow()[S.idx] : -1;
  $("dots").querySelectorAll("i").forEach((el, i) => { const d = first[jobs[i].id]; el.className = (d ? "is-" + d : "") + (i === now ? " is-now" : ""); });
});
onPaint(30, () => {                                                      // 편지 카드: 배달이 바뀔 때만 다시 쓴다
  if (!M) return;
  const key = S.screen + "|" + M.job.id + "|" + S.idx;                   // 같은 자리라도 배달이 다르면 다시 쓴다
  if (built.card === key) return;
  built.card = key;
  const c = M.card || cardText(M);
  $("chip").textContent = c.chip;
  $("ask").innerHTML = rich(c.text);
});
onPaint(40, () => {                                                      // 길: 집은 창이 바뀔 때만 다시 만들고 표시는 클래스로만 바꾼다
  if (!M) return;
  if (built.win !== M.win) { built.win = M.win; buildStreet(); }
  const ph = S.phase, here = pinMidi(), from = fromMidi(), goalOn = ph === "plate" || ph === "sort" || ph === "deliver", idle = (ph === "start" || ph === "drop") && !S.picked;   // idle: 아직 고르지 않았다
  $("houses").querySelectorAll(".house").forEach((el) => {
    const x = +el.dataset.m;
    el.classList.toggle("is-here", x === here && !idle);
    el.classList.toggle("is-goal", goalOn && x === M.target);
    el.classList.toggle("is-from", x === from);
    el.classList.toggle("is-near", !!M.glow && M.glow.includes(x));
  });
  $("pin").hidden = here === null;
  $("pin").classList.toggle("is-idle", idle);
  if (here !== null) $("pin").style.left = xOf(here, M.win) * 100 + "%";
});
```

조각 3/3 · 넣을 자리: `/* -- 스타일 끝 -- */` 줄 바로 위 (스타일의 끝)
```css
.wh.is-near{box-shadow:inset 0 -6px 0 var(--lit)}
```

하지 말 것:
- 기호를 글자(♯ ♭ 𝄪 𝄫)로 바꾸지 않는다. 도형의 좌표를 다듬지 않는다.
- 집을 그릴 때마다 길을 다시 만들지 않는다. 길은 창이 바뀔 때만 만든다.
- openRun에서 setState를 두 번 부르거나 모델보다 먼저 부르지 않는다.
- 입력을 붙이지 않는다. 입력은 P13이다.

보고: index.html#test의 첫 줄, index.html#sp-2를 열었을 때 보이는 것(편지 카드의 글, 집의 수), 콘솔 오류 수, 조각에서 바꾼 글자(없어야 한다).
````

**완료 기준.**

- `index.html#test`의 첫 줄: `자가검사 36/36 (전체 47개 중 36개 작성) · TH 12/12 · CH 4/4 · SC 3/3 · JB 4/4 · FL 5/5 · ST 2/2 · SV 4/4 · CT 2/2`
- 콘솔 오류 0, 외부 요청 0.
- `index.html#sp-2`: 편지 카드에 머리표 "걸어서 배달"과 "C♯4 편지를 배달해 주세요."가 보인다. 샵은 그림이다(글자가 아니다).
- 길에 흰 집 9채(B3~C5)와 검은 집 5채가 있고 구역 띠에 "3", "4구역", "5"가 적힌다.
- 진행 점이 9개이고 둘째 점이 지금 배달이다. 우체부는 창의 가운데(F4) 위에 속이 빈 모양으로 서 있다.
- `#sp-7`: 창이 C4~D5로 옮겨진다. 검은 집이 6채가 되고 구역 띠는 "4구역", "5구역"이다.
- 다섯 줄의 높이가 P01과 같고 스크롤이 없다.

### P07 [그대로] 악보 창, 봉투, 판독 줄

| 항목 | 내용 |
|---|---|
| 단계 | PO2 |
| 시작 전 `#test` | `자가검사 36/36 (전체 47개 중 36개 작성) · TH 12/12 · CH 4/4 · SC 3/3 · JB 4/4 · FL 5/5 · ST 2/2 · SV 4/4 · CT 2/2` |
| 끝난 뒤 `#test` | 같다 |
| 조각 | 1개(구획 5) |

**무엇이 들어가는가.**

- **악보 창.** `staffNotes()`가 "지금 그릴 음표들"을 정한다. 보통은 편지의 음표 하나, 쓰기 단계에서는 문패 판의 음표들과 쓰는 중인 점선 음표, 듣기 단계에서는 문패 판의 음표들이다. `drawStaff`가 오선 다섯 줄, 음자리표, 음표 자리 셋, 덧줄, 기호를 그린다. 음표의 세로 자리는 `stepOf`(글자 자리)로 정한다. 집 번호로 정하지 않는다.
- **봉투.** `drawEnvelope`가 꼬리표("주소", "출발 집", "쓰는 주소", "악보 편지"), 주소, 기호의 읽기를 적는다. 악보 편지는 주소를 "?"로 숨긴다.
- **그리기 둘.** 봉투와 악보(순서 50), 판독 줄(70). 악보는 내용이나 폭이 바뀔 때만 다시 그린다. 판독 줄은 노드를 두고 글만 바꾸며 문장을 한 겹 감싸서 넣는다.

````text
[P07 · 그대로] 악보 창, 봉투, 판독 줄

P00의 W1~W5를 지킨다.

시작 전: index.html#test의 첫 줄이 아래와 같은지 확인한다. 다르면 멈추고 보고한다.
  자가검사 36/36 (전체 47개 중 36개 작성) · TH 12/12 · CH 4/4 · SC 3/3 · JB 4/4 · FL 5/5 · ST 2/2 · SV 4/4 · CT 2/2

할 일: 아래 조각 1개를 적힌 자리에 글자 그대로 넣는다. 자리는 마커 줄의 바로 위다. 마커 줄은 그대로 둔다.

조각 1/1 · 넣을 자리: `// -- 5 끝 --` 줄 바로 위 (구획 5 VIEW)
```js

// ── 악보 창과 봉투 ──
function staffNotes() {                                                  // 악보에 그릴 음표들
  const ph = S.phase;
  if (ph === "plate") {
    const out = S.board.map((p) => ({ k: keyOf(p), c: "" }));
    if (S.pen.h !== null) { const w = whiteAt(S.pen.h); out.push({ k: keyOf(P(w.L, S.pen.a || 0, w.o)), c: "is-ghost" }); }
    return out;
  }
  if (ph === "deliver" && !M.hop) return S.board.map((p, i) => ({ k: keyOf(p), c: S.lit === i || S.lit === S.board.length ? "is-lit" : "" }));
  return [{ k: keyOf(M.note), c: "" }];
}
function drawStaff(notes) {
  const el = $("staff"), W = el.clientWidth || 200, sp = SP, top = 1.9 * sp, bottom = top + 4 * sp;
  const yOf = (step) => bottom - ((step - STAFF_BOTTOM) * sp) / 2;
  let g = "";
  for (let i = 0; i < 5; i++) g += `<line class="ln" x1="0" x2="${W}" y1="${top + i * sp}" y2="${top + i * sp}"/>`;
  g += `<g class="clef" transform="translate(${1.5 * sp} ${bottom - sp}) scale(${sp / 10})">${G_CLEF}</g>`;
  const x0 = 3.4 * sp, slot = Math.min(7 * sp, (W - x0 - 0.4 * sp) / 3);  // 자리는 늘 셋. 음표가 늘어도 앞의 음표가 움직이지 않는다
  notes.forEach((n, i) => {
    const p = parse(n.k), x = x0 + slot * i + slot * 0.64, y = yOf(stepOf(p));
    for (const k of ledgers(p)) g += `<line class="ln" x1="${x - 1.25 * sp}" x2="${x + 1.25 * sp}" y1="${yOf(k)}" y2="${yOf(k)}"/>`;
    g += `<g class="note ${n.c}" data-k="${n.k}">`;
    if (p.a) g += `<g class="acc" transform="translate(${x - ACC_DX[p.a] * sp} ${y}) scale(${sp / 10})">${GLYPH[p.a]}</g>`;
    g += `<g class="head" transform="translate(${x} ${y}) scale(${sp / 10})">${G_HEAD}</g></g>`;
  });
  el.setAttribute("viewBox", `0 0 ${W} ${9.6 * sp}`);
  el.setAttribute("aria-label", "악보: " + notes.map((n) => sayKo(parse(n.k))).join(", "));
  el.innerHTML = g;
}
function drawEnvelope() {                                                // 봉투: 주소를 크게, 기호의 읽기를 아래에
  const ph = S.phase, p = M.note;
  let label = M.hop ? "출발 집" : "주소", name = p ? nameHtml(p) : "", note = p && p.a && !M.hop ? signKo(p.a) : "";
  if (M.env) { label = M.env.label; name = M.env.name; note = M.env.note; }   // 발견 장면은 제 봉투를 갖는다
  else if (ph === "plate") {
    const w = S.pen.h === null ? null : whiteAt(S.pen.h), a = S.pen.a;
    label = "쓰는 주소";
    name = `<span class="nm">${w ? LETTERS[w.L] : "?"}${a === null ? "?" : a ? signSvg(a) : ""}<span class="oc">${w ? w.o : ""}</span></span>`;
    note = a === null ? "" : signKo(a);
  } else if (M.show === "staff" && ph !== "deliver") { label = "악보 편지"; name = "?"; note = "악보를 읽어요"; }
  const html = label + "|" + name + "|" + note;
  if ($("envelope").dataset.h === html) return;
  $("envelope").dataset.h = html;
  $("envLabel").textContent = label; $("envName").innerHTML = name; $("envNote").textContent = note;
}
onPaint(50, () => {                                                      // 봉투와 악보. 악보는 내용이나 폭이 바뀔 때만 다시 그린다
  if (!M) return;
  drawEnvelope();
  const notes = staffNotes(), key = SP + "|" + $("staff").clientWidth + "|" + JSON.stringify(notes);
  if (key !== built.staff) { built.staff = key; drawStaff(notes); }
});
onPaint(70, () => {                                                      // 판독 줄: 노드는 그대로 두고 글만 바꾼다
  const r = $("readout");
  r.className = S.msg.tone ? "is-" + S.msg.tone : "";
  if (r.dataset.t !== S.msg.text) { r.dataset.t = S.msg.text; r.innerHTML = "<span>" + rich(S.msg.text) + "</span>"; }
});
```

하지 말 것:
- 음표의 세로 자리를 집 번호로 계산하지 않는다(E♯4는 E의 자리다).
- 음표에 기둥을 붙이지 않는다. 조표와 제자리표를 그리지 않는다.
- 판독 줄의 노드를 지웠다 다시 만들지 않는다.

보고: index.html#test의 첫 줄, index.html#sp-5를 열었을 때 봉투와 악보에 보이는 것, 콘솔 오류 수, 조각에서 바꾼 글자(없어야 한다).
````

**완료 기준.**

- `index.html#test`의 첫 줄: `자가검사 36/36 (전체 47개 중 36개 작성) · TH 12/12 · CH 4/4 · SC 3/3 · JB 4/4 · FL 5/5 · ST 2/2 · SV 4/4 · CT 2/2`
- 콘솔 오류 0, 외부 요청 0.
- `#sp-2`: 봉투에 "주소", C♯4, "샵"이 세로로 적히고 악보에 C♯4 음표 하나가 덧줄, 샵 그림과 함께 그려진다.
- 판독 줄: "글자 C의 흰 집에 서요. 숫자 4는 4구역이에요."
- `#sp-5`(악보 편지): 봉투가 "악보 편지", "?", "악보를 읽어요"로 주소를 숨긴다. 악보에는 E♯4가 그려진다.
- `#sp-1`: 판독 줄 "집을 고르고 [배달]을 눌러요."

### P08 [그대로] 걸음, 문패 판, 조작부

| 항목 | 내용 |
|---|---|
| 단계 | PO2 |
| 시작 전 `#test` | `자가검사 36/36 (전체 47개 중 36개 작성) · TH 12/12 · CH 4/4 · SC 3/3 · JB 4/4 · FL 5/5 · ST 2/2 · SV 4/4 · CT 2/2` |
| 끝난 뒤 `#test` | 같다 |
| 조각 | 2개(구획 5, 구획 11) |

**무엇이 들어가는가.**

- **걸음.** `routeList()`가 길 위에 그릴 걸음들을 정한다. 걷는 중의 길(`live`), 내 길(`mine`, 점선), 바른 길(`goal`), 쓰기의 미리 보기, 배달을 마친 길(`done`). `drawRoutes`가 한 칸에 호 하나를 그린다. 호의 수가 걸음 수다. 걷지 않은 길은 출발 집 위의 점 하나다.
- **문패 판.** `drawBoard`가 도착 집 위에 문패와 빈칸을 그린다. 줄 밖으로 나가지 않게 당긴다.
- **조작부.** 기호 단추 다섯과 까닭 단추 넷은 시작할 때 한 번만 만든다(`atBoot` 순서 10). 그리기(순서 80)는 단계에 맞는 묶음 하나만 보이고, 주 단추의 이름을 정하고, 배우지 않은 기호 단추와 꺼진 카드·까닭 단추를 끈다.
- **점검용(구획 11).** 주소 끝이 `!`면 그 배달을 풀린 상태로 연다. `window.__twn`에 `open`, `solve`, `texts`, `cards`를 더한다.

````text
[P08 · 그대로] 걸음, 문패 판, 조작부

P00의 W1~W5를 지킨다.

시작 전: index.html#test의 첫 줄이 아래와 같은지 확인한다. 다르면 멈추고 보고한다.
  자가검사 36/36 (전체 47개 중 36개 작성) · TH 12/12 · CH 4/4 · SC 3/3 · JB 4/4 · FL 5/5 · ST 2/2 · SV 4/4 · CT 2/2

할 일: 아래 조각 2개를 적힌 자리에 글자 그대로 넣는다. 자리는 마커 줄의 바로 위다. 마커 줄은 그대로 둔다.

조각 1/2 · 넣을 자리: `// -- 5 끝 --` 줄 바로 위 (구획 5 VIEW)
```js

// ── 걸음과 문패 판 ──
function routeList() {                                                   // 길 위에 그릴 걸음들
  const ph = S.phase, out = [];
  if (M.hops) return M.hops.map((h, i) => ({ from: h[0], to: h[0] + h[1], cls: "done" + (S.lit >= 0 && Math.floor(S.lit / 2) === i ? " is-lit" : "") }));   // 발견 장면: 걸음만 그린다
  if (ph === "walk") out.push({ from: M.from, to: S.pos, cls: "live" });
  if (ph === "diag") out.push({ from: M.mis.from, to: M.mis.to, cls: "mine" });
  if (S.mine) out.push({ from: S.mine.from, to: S.mine.to, cls: "mine" });
  if (S.goal) out.push({ from: S.goal.from, to: S.goal.to, cls: "goal" });
  if (ph === "plate" && M.preview && !S.mine && S.pen.h !== null && S.pen.a !== null) out.push({ from: S.pen.h, to: S.pen.h + S.pen.a, cls: "live" });
  if (ph === "deliver" && M.hop) out.push({ from: M.from, to: M.target, cls: "done" });
  if (ph === "deliver" && !M.hop) S.board.forEach((b, k) => out.push({ from: midiOf(anchorOf(b)), to: midiOf(b), cls: "done" + (S.lit === k || S.lit === S.board.length ? " is-lit" : "") }));
  return out;
}
function drawRoutes() {
  const el = $("routes"), W = el.clientWidth, base = 24, list = routeList(), key = W + "|" + M.win + "|" + JSON.stringify(list);
  if (key === built.routes) return;
  built.routes = key;
  let g = "";
  for (const r of list) {
    const sg = Math.sign(r.to - r.from), lift = r.cls === "goal" ? 12 : r.cls === "mine" ? 7 : 10, xe = xOf(r.to, M.win) * W;
    if (!sg) { g += `<g class="r-${r.cls}"><circle cx="${xe.toFixed(1)}" cy="${base - 6}" r="4"/></g>`; continue; }    // 걷지 않았다: 출발 집에 점 하나
    let d = "";
    for (let a = r.from; a !== r.to; a += sg) {                           // 한 칸에 호 하나. 호의 수가 걸음 수다
      const x1 = xOf(a, M.win) * W, x2 = xOf(a + sg, M.win) * W;
      d += `M${x1.toFixed(1)} ${base}Q${((x1 + x2) / 2).toFixed(1)} ${base - lift * 2} ${x2.toFixed(1)} ${base}`;
    }
    g += `<g class="r-${r.cls}" data-hops="${Math.abs(r.to - r.from)}"><path d="${d}"/><polygon points="${(xe - 4).toFixed(1)},${base - 6} ${(xe + 4).toFixed(1)},${base - 6} ${xe.toFixed(1)},${base + 1}"/></g>`;
  }
  el.setAttribute("viewBox", `0 0 ${W} 26`);
  el.innerHTML = g;
}
function drawBoard(on) {                                                 // 도착 집 위의 문패 판
  const el = $("board");
  el.hidden = !on || M.hop || !!M.hops;                                  // 걸음만 보여 주는 장면에는 문패 판이 없다
  if (el.hidden) { built.board = ""; return; }
  const left = S.phase === "plate" ? M.board0.length + M.todo - S.board.length : 0;
  const W = $("boardRow").clientWidth, key = W + "|" + M.win + "|" + S.board.map(keyOf).join() + "|" + left + "|" + S.lit;
  if (key === built.board) return;
  built.board = key;
  el.innerHTML = S.board.map((p, i) => `<span class="plate${S.lit === i || S.lit === S.board.length ? " is-lit" : ""}">${nameHtml(p)}</span>`).join("") + '<span class="slot">?</span>'.repeat(left);
  const w = el.offsetWidth;
  el.style.left = Math.max(0, Math.min(W - w, xOf(M.target, M.win) * W - w / 2)) + "px";
}
onPaint(60, () => {
  if (!M) return;
  drawRoutes();
  drawBoard(S.phase === "plate" || S.phase === "sort" || S.phase === "deliver");
});

// ── 조작부 ──
const MAIN = { start: "여기서 출발", walk: "배달", drop: "배달", plate: "문패 달기", sort: "확정", diag: "까닭을 골라요" };
atBoot(10, () => {                                                       // 기호 단추와 까닭 단추는 한 번만 만든다
  $("setSign").innerHTML = [-2, -1, 0, 1, 2].map((a) => `<button type="button" data-a="${a}" aria-label="${signKo(a)}" aria-pressed="false">${a ? signSvg(a) : '<span class="sg0">–</span>'}<i>${a ? signKo(a) : "없음"}</i></button>`).join("");
  $("setCause").innerHTML = CAUSES.map((c) => `<button type="button" data-c="${c}">${CAUSE_KO[c]}</button>`).join("");
});
onPaint(80, () => {                                                      // 조작부: 묶음 다섯은 미리 있고 보이기만 바꾼다
  if (!M) return;
  const ph = S.phase, scene = S.screen === "scene";
  const sets = { setMove: ph === "start" || ph === "walk" || ph === "drop", setSign: ph === "plate", setCards: ph === "sort", setCause: ph === "diag", setListen: ph === "deliver" };
  for (const id in sets) $(id).hidden = !sets[id];
  $("again").textContent = scene ? "들어 보기" : "다시 듣기";
  $("main").textContent = scene ? (S.scene.line + 1 < M.lines.length ? "다음" : "알겠어요") : ph === "deliver" ? (S.idx === queueNow().length - 1 ? "마감하기" : "다음 배달") : MAIN[ph];
  $("main").disabled = ph === "diag";
  if (built.cards !== built.card) {                                      // 카드 단추는 배달이 바뀔 때만 다시 만든다
    built.cards = built.card;
    $("setCards").innerHTML = (M.cards || []).map((c, i) => `<button type="button" data-i="${i}" aria-pressed="false">${nameHtml(c)}</button>`).join("");
  }
  $("setSign").querySelectorAll("button").forEach((b) => { const a = +b.dataset.a; b.disabled = !M.day.signs.includes(a); b.setAttribute("aria-pressed", String(ph === "plate" && S.pen.a === a)); });
  $("setCards").querySelectorAll("button").forEach((b, i) => { const off = S.off.includes(i); b.disabled = off; b.classList.toggle("is-off", off); b.setAttribute("aria-pressed", String(!!S.picks[i])); });
  $("setCause").querySelectorAll("button").forEach((b) => { const off = ph === "diag" && S.off.includes(b.dataset.c); b.disabled = off; b.classList.toggle("is-off", off); });
});
```

조각 2/2 · 넣을 자리: `// -- 11 끝 --` 줄 바로 위 (구획 11 TESTS)
```js

// ── 점검용: 풀린 상태를 띄운다 ──
function tOpen(id, wrongs) {                                             // 배달을 번호로 연다. wrongs를 주면 그만큼 틀리고 푼 끝 상태까지 간다
  const d = tDays().find((x) => x.jobs.some((j) => j.id === id));
  store.hold = true;
  openRun(d.id, d.jobs.findIndex((j) => j.id === id), [], [], { dev: true });
  if (wrongs !== undefined) setState(tPlay(M, wrongs, () => {}).S);
}
atBoot(55, () => { if (/!$/.test(location.hash) && M) setState(tPlay(M, 0, () => {}).S); });   // 주소 끝이 !면 풀린 상태로 연다(#d3-2!)
atBoot(91, () => { Object.assign(window.__twn, { open: tOpen, solve: (wrongs) => setState(tPlay(M, wrongs || 0, () => {}).S), texts: tTexts, cards: () => Object.values(tModels()).map((m) => cardText(m).text) }); });
```

하지 말 것:
- 조작부의 묶음을 단계마다 새로 만들지 않는다. 다섯 묶음은 틀에 이미 있고 hidden만 바꾼다.
- 조작부의 높이가 내용에 따라 달라지게 하지 않는다(104px 고정).
- 화살표나 기록 표시를 글자(◀ ●)로 넣지 않는다.
- 입력을 붙이지 않는다. 입력은 P13이다.

보고: index.html#test의 첫 줄, index.html#sp-6!을 열었을 때 문패 판과 조작부에 보이는 것, 콘솔 오류 수, 조각에서 바꾼 글자(없어야 한다).
````

**완료 기준.**

- `index.html#test`의 첫 줄: `자가검사 36/36 (전체 47개 중 36개 작성) · TH 12/12 · CH 4/4 · SC 3/3 · JB 4/4 · FL 5/5 · ST 2/2 · SV 4/4 · CT 2/2`
- 콘솔 오류 0, 외부 요청 0.
- `#sp-2`: 주 단추가 [여기서 출발]이다. 윗줄에 [왼쪽 한 칸] [오른쪽 한 칸]이 있다.
- `#sp-6!`(주소 끝의 `!`는 풀린 상태로 연다): 문패 판에 C𝄪4, D4, E𝄫4가 달리고 걸음 셋과 음표 셋이 그려진다. 조작부는 [다시 듣기]와 [다음 배달]이다.
- `#sp-7`: 윗줄에 카드 넷이 한 줄로 놓이고 주 단추는 [확정]이다.
- `#sp-9`: 잘못 걸은 길(점선)이 보이고 까닭 단추 넷(출발 집, 방향, 걸음 수, 구역)이 있다. 주 단추는 "까닭을 골라요"라고 적힌 채 꺼져 있다.
- `#sp-9!`: 마지막 배달의 주 단추는 [마감하기]다.
- 아직 입력이 없다. 집이나 단추를 눌러도 상태가 바뀌지 않는다(입력은 P13).

### P09 [점검] 게이트 GPO2, 화면 점검 도구

이 프롬프트에서 저장소에 `tools/check.mjs`가 생긴다. `index.html`에는 코드를 더하지 않는다.

````text
[P09 · 점검] 게이트 GPO2: 길과 악보

index.html에는 코드를 더하거나 고치지 않는다.

할 일 1. 가이드 문서의 부록 D에 있는 코드를 글자 그대로 tools/check.mjs로 저장한다. Playwright가 없으면 설치한다(npm i -D playwright, npx playwright install chromium). package.json과 node_modules는 저장소에 생겨도 되지만 node_modules는 커밋하지 않는다(.gitignore에 적는다).

할 일 2. 아래 명령을 돌리고 출력의 끝(화면별 줄 여덟, 문구 줄 넷, 합계, 실패 수)을 그대로 보고한다.
   node tools/check.mjs index.html layout text
   기대: 화면 여덟 줄 모두 "장면 730 … 문제 0", 문구 네 줄 모두 "문구 400 … 넘침 0 카드 55 넘침 0", "실패 0".
   돌릴 수 없으면 NOT_RUN이라고 적고 까닭을 적는다. 결과를 지어내지 않는다.

할 일 3. index.html을 읽고 아래를 확인해 보고한다. 어긋난 것은 고치지 말고 줄 번호와 함께 보고한다.
   가. 구획 5의 그리기 함수가 상태를 바꾸지 않는가(setState를 부르지 않는가).
   나. 길을 만드는 buildStreet가 불리는 곳이 "창이 바뀔 때" 한 곳뿐인가.
   다. 화면에 나가는 글에 ♯ ♭ 𝄪 𝄫 글자나 이모지, ◀ ▶ ● ◐ 같은 도형 글자가 있는가(주석과 검사 구획, 화면 읽기용 글은 빼고 본다).
   라. 음표의 세로 자리가 stepOf로 계산되는가.
   마. 가이드 문서의 P06~P08 조각과 index.html의 해당 부분을 견줘 다른 글자가 있으면 모두 적는다.

보고: 할 일 1~3의 결과. 그리고 부록 A의 게이트 보고 블록(gate: GPO2, viewports에 도구가 본 화면을 적는다).
````

**사람이 볼 것.** 개발자 도구의 기기 모드로 320×545, 320×568, 360×640, 390×844에서 아래 주소를 열어 본다.

| 주소 끝 | 볼 것 |
|---|---|
| `#sp-2` | 편지 카드, 봉투, 악보의 C♯4, 길, 우체부. 샵 그림이 글자와 같은 줄에 놓이고 흐릿하지 않다 |
| `#sp-6!` | 문패 셋이 도착 집(D4) 위에 놓인다. 걸음 셋의 호가 겹쳐도 구별된다. 음표 셋이 겹치지 않는다 |
| `#sp-7` | 카드 넷이 한 줄이다. 더블샵과 더블플랫 그림이 카드 안에서 읽힌다 |
| `#sp-9` | 잘못 걸은 길이 점선이다. 까닭 단추 넷이 한 줄이다 |
| `#d5-6!` | 창이 A3~B4로 옮겨진다. 문패 B♭3, A♯3, C𝄫4가 줄 밖으로 나가지 않는다 |

**도구 없이 보는 법.** 위 표의 다섯 주소를 네 화면에서 열어 스크롤이 생기지 않는지, 글자와 그림이 잘리지 않는지 본다. 도구가 본 것(화면마다 730장면)의 일부만 보는 것이므로 게이트 보고의 `open_issues`에 "화면 점검 도구 NOT_RUN"을 적는다.

**게이트 GPO2.** 검사 36/36, 도구의 `layout`과 `text`가 실패 0, 위 표를 눈으로 봄. 설계서의 결정 D2(길), D8(악보), D9(기호 그림)를 권장안으로 확정한다. 기호 그림이 작은 화면에서 읽히는지는 실기기에서 다시 본다(P14). 버전 v0.2.

---

## 5. PO3 소리

목표는 집의 소리와 듣기가 정해진 시각에 예약되고, 멈추면 멈췄다고 말하는 것이다. 이 단계의 검사 AU는 기록만 하는 가짜 컨텍스트로 돈다. 실제 소리를 내지 않으므로 **검사가 통과해도 소리를 들은 것은 아니다.** 귀로 듣는 일은 P12에 있다.

### P10 [그대로] 소리: 컨텍스트, 집의 소리, 효과음, 언락

| 항목 | 내용 |
|---|---|
| 단계 | PO3 |
| 시작 전 `#test` | `자가검사 36/36 (전체 47개 중 36개 작성) · TH 12/12 · CH 4/4 · SC 3/3 · JB 4/4 · FL 5/5 · ST 2/2 · SV 4/4 · CT 2/2` |
| 끝난 뒤 `#test` | `자가검사 39/39 (전체 47개 중 39개 작성) · TH 12/12 · CH 4/4 · SC 3/3 · JB 4/4 · FL 5/5 · AU 3/3 · ST 2/2 · SV 4/4 · CT 2/2` |
| 조각 | 3개(구획 6, 구획 8, 구획 11에 검사 3개) |

**무엇이 들어가는가.**

- **컨텍스트(구획 6).** `audio()`가 컨텍스트를 돌려준다. 없으면 만들고 멈춰 있으면 깨운다. 쓸 수 없으면 `null`이다. 만들기 전에 `navigator.audioSession.type = "playback"`을 준다(있는 브라우저에서만. iPhone의 무음 스위치 대응이고 실기기에서 확인하지 않았다). `wire`가 마스터 게인, 음색(1~6배음), 잡음 버퍼를 건다. `soundUi`가 "소리 켜기" 단추를 보이고 숨긴다.
- **소리.** `tone(묶음, 집 번호, 시각, 길이, 크기)`가 집의 소리를 예약한다. 주파수는 `hz(집 번호)`뿐이다. `burst`가 잡음으로 효과음을 낸다. 음높이가 없다. 예약한 음은 묶음(`hop`, `listen`, `fx`)에 담아 두고 `silence(묶음)`으로 한꺼번에 끊는다.
- **소리 지시.** `runFx(fx)`가 흐름 함수가 낸 지시를 실행한다. `hop`은 걸음 소리(앞의 걸음 소리를 끊고 0.24초), `stamp`는 도장, `nope`는 아니에요, `listen`은 듣기를 시작하라는 알림이다.
- **언락(구획 8).** `click`, `touchstart`, `keydown` 세 곳에 `audio()`를 건다. "소리 켜기" 단추도 같은 일을 한다.
- **검사 3개.** AU-05(걸음 소리), AU-06(효과음은 발진기를 만들지 않는다), AU-08(소스에 `setInterval`이 없고 `setTimeout`은 한 곳). 가짜 컨텍스트 `tAudio`와 끼워 넣는 도우미 `tWithAudio`가 함께 들어간다.

````text
[P10 · 그대로] 소리: 컨텍스트, 집의 소리, 효과음, 언락

P00의 W1~W5를 지킨다.

시작 전: index.html#test의 첫 줄이 아래와 같은지 확인한다. 다르면 멈추고 보고한다.
  자가검사 36/36 (전체 47개 중 36개 작성) · TH 12/12 · CH 4/4 · SC 3/3 · JB 4/4 · FL 5/5 · ST 2/2 · SV 4/4 · CT 2/2

할 일: 아래 조각 3개를 적힌 자리에 글자 그대로 넣는다. 자리는 마커 줄의 바로 위다. 마커 줄은 그대로 둔다.

조각 1/3 · 넣을 자리: `// -- 6 끝 --` 줄 바로 위 (구획 6 AUDIO)
```js
// 합성음만 쓴다. 오디오 클록에 한 번에 예약하고 묶음으로 취소한다.
let ctx = null, master = null, wave = null, noiseBuf = null, noAudio = false;
const live = { hop: new Set(), listen: new Set(), fx: new Set() };       // 울리고 있거나 예약된 음들. 묶음마다 한꺼번에 끊는다
function soundUi() { const ok = !!ctx && ctx.state === "running"; $("soundChip").hidden = ok; $("hud").classList.toggle("is-nosound", !ok); }
function onAudioState() { soundUi(); emit("audio"); }                    // 컨텍스트의 상태가 바뀌었다
function wire(c) {                                                       // 컨텍스트에 마스터, 음색, 잡음을 건다
  ctx = c;
  master = c.createGain(); master.gain.value = 0.8; master.connect(c.destination);
  wave = c.createPeriodicWave(new Float32Array(7), new Float32Array([0, 1, 0.5, 0.3, 0.16, 0.08, 0.04]));   // 1~6배음. 폰 스피커에서도 높이가 들리게
  noiseBuf = c.createBuffer(1, c.sampleRate, c.sampleRate);
  const d = noiseBuf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  c.addEventListener("statechange", onAudioState);
}
function audio() {                                                       // 컨텍스트를 돌려준다. 없으면 만들고 멈춰 있으면 깨운다. 쓸 수 없으면 null
  if (noAudio) return null;
  try {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      if (navigator.audioSession) { try { navigator.audioSession.type = "playback"; } catch (e) { /* 바꿀 수 없으면 그대로 간다 */ } }   // iPhone의 무음 스위치
      wire(new AC());
    }
    if (ctx.state !== "running") { const p = ctx.resume(); if (p && p.catch) p.catch(() => {}); }
    soundUi();
    return ctx;
  } catch (e) { return null; }
}
const keep = (group, node) => { live[group].add(node); node.addEventListener("ended", () => live[group].delete(node)); };
const silence = (group) => { live[group].forEach((x) => { try { x.stop(); } catch (e) { /* 이미 끝남 */ } }); live[group].clear(); };
function tone(group, midi, when, dur, peak) {                            // 집의 소리. 주소가 달라도 집이 같으면 같은 함수, 같은 값이다
  const o = ctx.createOscillator(), g = ctx.createGain();
  o.setPeriodicWave(wave); o.frequency.setValueAtTime(hz(midi), when);
  g.gain.setValueAtTime(0.0001, when); g.gain.linearRampToValueAtTime(peak, when + 0.012);
  g.gain.setValueAtTime(peak, when + Math.max(0.03, dur - 0.12)); g.gain.linearRampToValueAtTime(0.0001, when + dur);
  o.connect(g); g.connect(master); o.start(when); o.stop(when + dur + 0.03); keep(group, o);
}
function burst(when, dur, freq, q, peak) {                               // 효과음은 잡음으로 만든다. 음높이가 없다
  const s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
  s.buffer = noiseBuf; f.type = "bandpass"; f.frequency.value = freq; f.Q.value = q;
  g.gain.setValueAtTime(peak, when); g.gain.exponentialRampToValueAtTime(0.0001, when + dur);
  s.connect(f); f.connect(g); g.connect(master); s.start(when); s.stop(when + dur + 0.02); keep("fx", s);
}
function runFx(fx) {                                                     // 흐름이 낸 소리 지시를 실행한다
  if (fx.t === "listen") return emit("listen");
  const a = audio();
  if (!a || a.state !== "running") return;
  const t = a.currentTime + 0.01;
  if (fx.t === "hop") { silence("hop"); tone("hop", fx.midi, t, 0.24, 0.28); }
  else if (fx.t === "stamp") { burst(t, 0.05, 2400, 1.2, 0.22); burst(t + 0.02, 0.12, 180, 0.8, 0.5); }
  else if (fx.t === "nope") { burst(t, 0.07, 520, 2, 0.2); burst(t + 0.11, 0.07, 420, 2, 0.2); }
}
const Snd = {                                                            // 검사가 가짜 컨텍스트를 끼우는 자리
  swap(fake) {                                                           // fake: 컨텍스트를 흉내 낸 것. null이면 "소리를 쓸 수 없다". 되돌리는 함수를 돌려준다
    const was = { ctx, master, wave, noiseBuf, noAudio };
    for (const g in live) silence(g);
    if (fake) { noAudio = false; wire(fake); } else { ctx = null; noAudio = true; }
    soundUi();
    return () => { for (const g in live) silence(g); ctx = was.ctx; master = was.master; wave = was.wave; noiseBuf = was.noiseBuf; noAudio = was.noAudio; soundUi(); };
  },
};
atBoot(25, soundUi);
```

조각 2/3 · 넣을 자리: `// -- 8 끝 --` 줄 바로 위 (구획 8 INPUT)
```js
$("soundChip").addEventListener("click", () => audio());
["click", "touchstart", "keydown"].forEach((ev) => window.addEventListener(ev, () => { audio(); }, { passive: true, capture: true }));   // 첫 손짓에 소리를 연다
```

조각 3/3 · 넣을 자리: `// -- 11 끝 --` 줄 바로 위 (구획 11 TESTS)
```js

// ── AU 소리: 기록만 하는 가짜 컨텍스트로 본다 ──
function tAudio() {
  const log = { osc: [], bursts: 0 };
  let last = null;
  const node = (extra) => Object.assign({ connect() {}, addEventListener() {} }, extra);
  const c = { currentTime: 10, state: "running", sampleRate: 8, baseLatency: 0, destination: node(),
    createPeriodicWave: () => ({}), createBuffer: (ch, len) => ({ getChannelData: () => new Float32Array(len) }),
    createBiquadFilter: () => node({ frequency: {}, Q: {} }),
    createBufferSource() { log.bursts++; return node({ start() {}, stop() {} }); },
    createGain() {
      const e = last;                                                    // 발진기 바로 뒤에 만든 게인이 그 음의 크기다
      last = null;
      return node({ gain: { value: 0, setValueAtTime() {}, exponentialRampToValueAtTime() {}, linearRampToValueAtTime(v) { if (e) e.peak = Math.max(e.peak, v); } } });
    },
    createOscillator() {
      const e = { freq: null, startAt: null, stopAt: null, calledAt: null, peak: 0, cancels: [] };
      last = e;
      return node({ setPeriodicWave() {}, frequency: { setValueAtTime(v) { e.freq = Math.round(v * 100) / 100; } },
        start(w) { e.startAt = w; e.calledAt = c.currentTime; log.osc.push(e); }, stop(w) { if (w === undefined) e.cancels.push(c.currentTime); else e.stopAt = w; } });
    },
    resume: () => Promise.resolve(), addEventListener() {} };
  return { c, log };
}
function tWithAudio(fn, none) {                                          // 가짜 컨텍스트를 끼우고(none이면 소리 없음) 끝나면 상태, 모델, 저장을 되돌린다
  const a = tAudio(), keepS = Object.assign({}, S), keepM = M, keepHold = store.hold, keepData = JSON.stringify(store.data);
  painting = false;
  const back = Snd.swap(none ? null : a.c);
  try { fn(a.c, a.log); } finally {
    emit("leave"); back();
    M = keepM; setState(keepS); store.hold = keepHold; store.data = JSON.parse(keepData);
    painting = true;
  }
}
const tRound = (x) => Math.round(x * 1000) / 1000;
test("AU-05", "걸음 소리는 한 걸음에 한 음이고 새 걸음이 앞의 소리를 끊는다", (ok, eq) => {
  tWithAudio((c, log) => {
    runFx({ t: "hop", midi: 61 });
    eq(log.osc.map((e) => [e.freq, tRound(e.startAt - c.currentTime), tRound(e.stopAt - e.startAt), e.peak]), [[277.18, 0.01, 0.27, 0.28]], "한 음: 주파수, 시작, 발진기 길이(0.24 + 0.03), 크기");
    c.currentTime += 0.1;
    runFx({ t: "hop", midi: 62 });
    eq(log.osc.length, 2, "두 번째 걸음"); eq(log.osc[0].cancels.length, 1, "앞의 걸음 소리를 끊는다"); eq(log.osc[1].cancels.length, 0, "새 소리는 남는다");
    eq(log.osc[1].freq, Math.round(hz(62) * 100) / 100, "주파수는 hz(집 번호)");
  });
});
test("AU-06", "효과음은 잡음이다. 틀렸을 때 집의 소리를 내지 않는다", (ok, eq) => {
  tWithAudio((c, log) => {
    runFx({ t: "stamp" }); runFx({ t: "nope" });
    eq(log.osc.length, 0, "발진기를 만들지 않는다"); eq(log.bursts, 4, "잡음 넷");
  });
  let graded = 0;
  for (const [id, m] of Object.entries(tModels())) {
    const S2 = tSpoil(m, fresh(m));
    if (!S2 || !tLastFx.some((f) => f.t === "nope")) continue;
    graded++;
    ok(tLastFx.every((f) => f.t === "nope"), "채점한 오답은 아니에요 소리만 낸다 " + id);
  }
  ok(graded >= 50, "채점한 오답을 봤다: " + graded);
});
test("AU-08", "타이머로 소리를 잇지 않는다", (ok, eq) => {
  const src = appSource();
  eq((src.match(/\bsetInterval\b/g) || []).length, 0, "setInterval이 없다");
  eq((src.match(/\bsetTimeout\b/g) || []).length, 1, "setTimeout은 한 곳뿐이다");
  ok(/resizeTimer = setTimeout\(/.test(src), "그 한 곳은 화면 크기 변화의 디바운스다");
});
```

하지 말 것:
- 주소나 집마다 주파수를 적은 표를 두지 않는다. 발진기의 주파수는 hz(집 번호)로만 준다.
- 오디오 파일을 쓰지 않는다. 효과음에 발진기를 쓰지 않는다.
- 페이지를 불러올 때 컨텍스트를 만들지 않는다. 첫 손짓에 만든다.
- setTimeout이나 setInterval로 소리를 잇지 않는다.

보고: index.html#test의 첫 줄, 콘솔 오류 수, 넣은 조각 수, 조각에서 바꾼 글자(없어야 한다). 소리를 직접 들었는지 아닌지도 적는다(듣지 않았으면 "듣지 않음").
````

**완료 기준.**

- `index.html#test`의 첫 줄: `자가검사 39/39 (전체 47개 중 39개 작성) · TH 12/12 · CH 4/4 · SC 3/3 · JB 4/4 · FL 5/5 · AU 3/3 · ST 2/2 · SV 4/4 · CT 2/2`
- 콘솔 오류 0, 외부 요청 0.
- HUD에 "소리 켜기"가 보인다. 화면 아무 곳이나 한 번 누르면 사라진다.
- (소리가 켜진 뒤) 콘솔에서 `runFx({ t: "hop", midi: 60 })`을 치면 `live.hop.size`가 1이 된다. 도(C4)의 소리 하나가 예약된 것이다. 실제로 들리는지는 귀로 확인한다.
- 콘솔에서 `ctx.suspend()`를 치면 "소리 켜기"가 다시 보이고, 그 단추를 누르면 사라진다.

### P11 [그대로] 듣기

| 항목 | 내용 |
|---|---|
| 단계 | PO3 |
| 시작 전 `#test` | `자가검사 39/39 (전체 47개 중 39개 작성) · TH 12/12 · CH 4/4 · SC 3/3 · JB 4/4 · FL 5/5 · AU 3/3 · ST 2/2 · SV 4/4 · CT 2/2` |
| 끝난 뒤 `#test` | `자가검사 44/44 (전체 47개 중 44개 작성) · TH 12/12 · CH 4/4 · SC 3/3 · JB 4/4 · FL 5/5 · AU 8/8 · ST 2/2 · SV 4/4 · CT 2/2` |
| 조각 | 3개(구획 7, 구획 8, 구획 11에 검사 5개) |

**무엇이 들어가는가.**

- **예약(구획 7).** `beginListen()`이 문패 판의 주소들을 한 번에 예약한다. t0은 지금 + 0.15초, k번째 주소는 t0 + 0.8k초에 0.62초, 주소가 둘 이상이면 t0 + 0.8n초에 모두 함께 1.1초(각 크기 0.3 ÷ n)다. 걸음 연습은 출발 집과 도착 집 둘이고 함께가 없다. 시작할 때 앞선 듣기와 남은 걸음 소리를 끊는다.
- **프레임.** `frame()`이 소리 시계(`ctx.currentTime`에서 출력 지연을 뺀 값)를 읽어 "지금 몇 번째 주소인가"를 정하고, 그 순번이 바뀔 때만 `setState`를 부른다. 끝나면 판독 줄에 한 문장을 적는다.
- **멈춤.** 소리를 쓸 수 없거나 시작 1.2초 뒤에도 소리 시계가 움직이지 않으면 화면 시계로 이어 간다. 듣는 도중 소리 시계가 0.8초 넘게 서 있거나, 컨텍스트가 `running`이 아니게 되거나, 화면이 가려지면 `abortRun`이 듣기를 멈추고 까닭을 판독 줄에 적는다.
- **입력(구획 8).** [다시 듣기] 단추와 `visibilitychange`.
- **검사 5개.** AU-01(주파수), AU-02(예약 시각), AU-03(함께 낼 때의 크기), AU-04(다시 시작하거나 넘어가면 앞선 묶음을 끊는다), AU-07(정지와 복구, 소리 없는 환경).

````text
[P11 · 그대로] 듣기

P00의 W1~W5를 지킨다.

시작 전: index.html#test의 첫 줄이 아래와 같은지 확인한다. 다르면 멈추고 보고한다.
  자가검사 39/39 (전체 47개 중 39개 작성) · TH 12/12 · CH 4/4 · SC 3/3 · JB 4/4 · FL 5/5 · AU 3/3 · ST 2/2 · SV 4/4 · CT 2/2

할 일: 아래 조각 3개를 적힌 자리에 글자 그대로 넣는다. 자리는 마커 줄의 바로 위다. 마커 줄은 그대로 둔다.

조각 1/3 · 넣을 자리: `// -- 7 끝 --` 줄 바로 위 (구획 7 RUN)
```js
// 듣기: 주소를 차례로, 그리고 함께. 모든 음을 한 번에 예약하고 화면은 소리 시계를 읽어 따라간다.
let run = null, raf = 0;
let nowMs = () => performance.now();                                     // 화면 시계. 검사가 갈아 끼운다
const STEP = 0.8;                                                        // 듣기에서 주소 하나가 차지하는 초
const clock = () => ctx.currentTime - (ctx.outputLatency || ctx.baseLatency || 0);   // 지금 들리는 시각
function beginListen() {
  stopRun();
  const a = audio(), plan = M.tune || (M.hop ? { mids: [M.from, M.target], together: false } : { mids: S.board.map(midiOf), together: S.board.length > 1 });   // M.tune: 발견 장면이 정한 음
  const mids = plan.mids, n = mids.length, together = plan.together;
  const t0 = (a ? a.currentTime : nowMs() / 1000) + 0.15;
  if (a) {
    silence("hop");
    mids.forEach((x, k) => tone("listen", x, t0 + k * STEP, 0.62, 0.3));
    if (together) mids.forEach((x) => tone("listen", x, t0 + n * STEP, 1.1, 0.3 / n));     // 같은 집이면 함께 내도 한 소리다
  }
  run = { t0, n, together, end: t0 + n * STEP + (together ? 1.3 : 0.1), perf: !a, c0: a ? a.currentTime : 0, p0: nowMs(), lastNow: -1, lastAt: nowMs() };
  raf = requestAnimationFrame(frame);
}
function frame() {
  const r = run;
  if (!r) return;
  if (!r.perf && nowMs() - r.p0 > 1200 && ctx.currentTime === r.c0) {    // 소리 시계가 움직이지 않으면 화면 시계로 이어 간다
    const shift = nowMs() / 1000 + 0.1 - r.t0;
    r.perf = true; r.t0 += shift; r.end += shift; silence("listen");
  }
  const now = r.perf ? nowMs() / 1000 : clock();
  if (!r.perf) {                                                         // 시작한 뒤에 소리 시계가 0.8초 넘게 서 있으면 멈춘다
    if (now !== r.lastNow) { r.lastNow = now; r.lastAt = nowMs(); }
    else if (ctx.currentTime !== r.c0 && nowMs() - r.lastAt > 800) return abortRun("stall");
  }
  if (now >= r.end) {
    run = null; raf = 0;
    return setState({ lit: -1, msg: M.lines ? say("", M.lines[S.scene.line]) : say("good", r.together ? sameKo(S.board) : reason(M, S.board)) });
  }
  if (!M.hop) {
    const k = now < r.t0 ? -1 : Math.min(r.together ? r.n : r.n - 1, Math.floor((now - r.t0) / STEP));
    if (k !== S.lit) setState(r.together && k >= 0 ? { lit: k, msg: say("good", listenLabel(S.board, k)) } : { lit: k });
  }
  raf = requestAnimationFrame(frame);
}
function stopRun() { cancelAnimationFrame(raf); raf = 0; run = null; silence("listen"); }
const abortText = (why, btn) => (why === "hidden" ? `화면을 떠나서 듣기를 멈췄어요. ${btn}를 눌러요.` : `소리가 멈춰서 듣기를 멈췄어요. 소리를 켜고 ${btn}를 눌러요.`);
function abortRun(why) {                                                 // 듣기를 멈추고 까닭을 알린다
  stopRun();
  setState({ lit: -1, msg: say("warn", abortText(why, S.screen === "scene" ? "[들어 보기]" : "[다시 듣기]")) });
}
on("listen", beginListen);                                               // 배달이 듣기 단계에 들어섰다
on("leave", stopRun);                                                    // 무대의 내용이 바뀐다
on("audio", () => { if (ctx.state !== "running" && run && !run.perf) abortRun("stall"); });
```

조각 2/3 · 넣을 자리: `// -- 8 끝 --` 줄 바로 위 (구획 8 INPUT)
```js
$("again").addEventListener("click", () => { if (M && S.phase === "deliver" && (S.screen === "run" || S.screen === "scene")) beginListen(); });
document.addEventListener("visibilitychange", () => { if (document.hidden && run) abortRun("hidden"); });
```

조각 3/3 · 넣을 자리: `// -- 11 끝 --` 줄 바로 위 (구획 11 TESTS)
```js
const tRel = (log, t0) => log.osc.map((e) => [tRound(e.startAt - t0), tRound(e.stopAt - e.startAt)]);
test("AU-01", "주파수는 집 번호 하나에서 나온다", (ok, eq) => {
  tWithAudio((c, log) => {
    tOpen("sp-3", 0); beginListen();                                     // C♯4 문패가 달린 집에 D♭4를 배달했다
    eq(log.osc.map((e) => e.freq), [277.18, 277.18, 277.18, 277.18], "C#4와 Db4의 주파수가 같은 수다");
  });
  for (const [id, m] of Object.entries(tModels())) tWithAudio((c, log) => {
    tOpen(id, 0); beginListen();
    const want = m.hop ? [m.from, m.target] : S.board.map(() => m.target).concat(S.board.length > 1 ? S.board.map(() => m.target) : []);
    eq(log.osc.map((e) => e.freq), want.map((x) => Math.round(hz(x) * 100) / 100), "듣기의 주파수는 hz(집 번호) " + id);
  });
});
test("AU-02", "듣기는 한 번에 예약한다", (ok, eq) => {
  const cases = { "sp-1": [[0, 0.65]], "sp-3": [[0, 0.65], [0.8, 0.65], [1.6, 1.13], [1.6, 1.13]], "sp-6": [[0, 0.65], [0.8, 0.65], [1.6, 0.65], [2.4, 1.13], [2.4, 1.13], [2.4, 1.13]], "d0-05": [[0, 0.65], [0.8, 0.65]] };
  for (const id of Object.keys(cases)) tWithAudio((c, log) => {
    tOpen(id, 0); beginListen();
    eq(tRel(log, c.currentTime + 0.15), cases[id], "시작과 발진기 길이 " + id);
    ok(log.osc.every((e) => e.calledAt === c.currentTime), "모두 한 번에 예약했다 " + id);
    eq(tRound(run.end - run.t0), tRound(cases[id].length > 2 ? cases[id][cases[id].length - 1][0] + 1.3 : cases[id].length * 0.8 + 0.1), "듣기의 끝 " + id);
  });
});
test("AU-03", "함께 낼 때는 크기를 주소 수로 나눈다", (ok, eq) => {
  tWithAudio((c, log) => { tOpen("sp-3", 0); beginListen(); eq(log.osc.map((e) => tRound(e.peak)), [0.3, 0.3, 0.15, 0.15], "주소 둘"); });
  tWithAudio((c, log) => { tOpen("sp-6", 0); beginListen(); eq(log.osc.map((e) => tRound(e.peak)), [0.3, 0.3, 0.3, 0.1, 0.1, 0.1], "주소 셋"); });
});
test("AU-04", "새 듣기와 떠나기는 앞선 묶음을 끊는다", (ok, eq) => {
  tWithAudio((c, log) => {
    tOpen("sp-3", 0);
    runFx({ t: "hop", midi: 61 }); beginListen();
    eq(log.osc[0].cancels.length, 1, "듣기가 시작되면 걸음 소리를 끊는다");
    c.currentTime += 0.5; beginListen();
    const first = log.osc.slice(1, 5), second = log.osc.slice(5);
    ok(first.length === 4 && first.every((e) => e.cancels.length === 1), "다시 듣기는 앞선 묶음의 모든 음을 끊는다");
    eq(first.filter((e) => e.cancels[0] < e.startAt).length, 3, "아직 시작하지 않은 음 셋은 시작 전에 취소된다");
    ok(second.length === 4 && second.every((e) => e.cancels.length === 0), "새 묶음은 남는다");
    openRun("sp", 3, [], [], { dev: true });
    ok(second.every((e) => e.cancels.length === 1) && run === null, "다른 배달로 가면 남은 음을 끊는다");
  });
});
test("AU-07", "소리가 멈추면 듣기를 멈추고 알린다", (ok, eq) => {
  const real = nowMs;
  let ms = 5000;
  nowMs = () => ms;
  try {
    tWithAudio((c, log) => {
      tOpen("sp-3", 0); beginListen();
      c.state = "suspended"; onAudioState();
      ok(run === null && S.lit === -1 && /소리가 멈춰서/.test(S.msg.text), "컨텍스트가 멈추면 듣기를 멈추고 알린다");
      ok($("soundChip").hidden === false, "소리 켜기가 보인다");
      c.state = "running"; onAudioState();
      ok($("soundChip").hidden === true, "돌아오면 소리 켜기가 숨는다");
      beginListen(); abortRun("hidden");
      ok(run === null && /화면을 떠나서/.test(S.msg.text), "화면을 떠나면 멈추고 알린다");
      beginListen(); c.currentTime += 0.2; frame(); ms += 900; frame();
      ok(run === null && /소리가 멈춰서/.test(S.msg.text), "들리는 시각이 0.8초 넘게 그대로면 멈춘다");
      beginListen(); ms += 1300; frame();
      ok(run && run.perf && log.osc.slice(-4).every((e) => e.cancels.length === 1), "소리 시계가 움직이지 않으면 예약을 끊고 화면 시계로 이어 간다");
    });
    tWithAudio((c, log) => {                                             // 소리를 쓸 수 없을 때: 화면 시계로 끝까지 돈다
      tOpen("sp-3", 0); beginListen();
      const lits = [];
      for (const t of [0.1, 0.9, 1.7]) { ms = (run.t0 + t) * 1000; frame(); lits.push(S.lit); }
      eq(lits, [0, 1, 2], "문패가 차례로, 그리고 함께 밝아진다");
      ms = (run.t0 + 3) * 1000; frame();
      ok(run === null && S.lit === -1 && /같은 집이에요/.test(S.msg.text), "끝나면 한 문장으로 맺는다");
      eq(log.osc.length, 0, "소리는 예약하지 않았다");
    }, true);
  } finally { nowMs = real; }
});
```

하지 말 것:
- 듣기의 음을 하나씩 타이머로 내지 않는다. 한 번의 호출 안에서 모두 예약한다.
- 프레임마다 setState를 부르지 않는다. 순번이 바뀔 때만 부른다.
- 간격(0.8초), 길이(0.62초, 1.1초), 크기(0.3, 0.3 ÷ n)를 바꾸지 않는다. 바꾸는 것은 P12에서 귀로 들은 뒤다.
- 소리가 멈췄을 때 조용히 넘어가지 않는다. 멈추고 알린다.

보고: index.html#test의 첫 줄, 콘솔 오류 수, 넣은 조각 수, 조각에서 바꾼 글자(없어야 한다). 소리를 직접 들었는지 아닌지도 적는다.
````

**완료 기준.**

- `index.html#test`의 첫 줄: `자가검사 44/44 (전체 47개 중 44개 작성) · TH 12/12 · CH 4/4 · SC 3/3 · JB 4/4 · FL 5/5 · AU 8/8 · ST 2/2 · SV 4/4 · CT 2/2`
- 콘솔 오류 0, 외부 요청 0.
- `#sp-3!`에서 [다시 듣기]: 문패가 첫째, 둘째, 둘 다(함께)의 차례로 밝아진다. 판독 줄이 걸음을 말하다가 "함께 내면 한 소리로 들려요."가 된다.
- 듣기가 끝나면 판독 줄이 "D♭4는 레에서 반음 아래, C♯4는 도에서 반음 위. 같은 집이에요."가 되고 밝던 문패가 꺼진다.
- 듣는 도중에 다른 탭으로 가면(화면이 가려지면) 듣기가 멈추고 "화면을 떠나서 듣기를 멈췄어요. [다시 듣기]를 눌러요."가 뜬다.

### P12 [점검] 게이트 GPO3, 귀로 듣기

이 문서를 만들면서 소리는 한 번도 귀로 듣지 않았다. 이 게이트가 처음 듣는 자리다. 폰으로 들으려면 주소가 필요하므로 14장의 1~3번(저장소를 Vercel에 잇기)을 먼저 해 두고 미리보기 주소로 연다.

````text
[P12 · 점검] 게이트 GPO3: 소리

코드를 더하거나 고치지 않는다. index.html을 읽고 아래를 확인해 보고한다. 어긋난 것은 고치지 말고 줄 번호와 함께 보고한다.

1. index.html#test의 첫 줄이 아래와 같은가.
   자가검사 44/44 (전체 47개 중 44개 작성) · TH 12/12 · CH 4/4 · SC 3/3 · JB 4/4 · FL 5/5 · AU 8/8 · ST 2/2 · SV 4/4 · CT 2/2
2. 발진기를 만드는 곳(createOscillator)이 tone 한 곳뿐인가. 주파수를 주는 곳이 hz(midi) 한 곳뿐인가.
3. 효과음(burst)이 발진기를 쓰지 않는가.
4. 구획 11을 뺀 소스에 setInterval이 없고 setTimeout이 화면 크기 변화의 한 곳뿐인가.
5. 컨텍스트를 만드는 곳이 audio() 안의 한 곳이고, 페이지를 불러올 때는 불리지 않는가(atBoot에서 audio()를 부르지 않는가).
6. frame() 안의 setState가 "순번이 바뀔 때"와 "끝났을 때"에만 불리는가.
7. beginListen이 시작할 때 앞선 듣기(stopRun)와 걸음 소리(silence("hop"))를 끊는가.
8. 가이드 문서의 P10, P11 조각과 index.html의 해당 부분을 견줘 다른 글자가 있으면 모두 적는다.

보고: 항목 1~8의 결과. 그리고 부록 A의 게이트 보고 블록(gate: GPO3). listening_check는 사람이 채운다. 너는 NOT_RUN으로 둔다.
````

**사람이 들을 것.** 폰 두 대 이상(iPhone Safari, Android Chrome)에서 한다. 화면을 한 번 눌러 "소리 켜기"가 사라진 뒤에 한다. 콘솔이 필요한 항목은 PC의 브라우저에서 먼저 듣는다.

| # | 하는 일 | 들을 것 |
|---|---|---|
| 1 | `#sp-3!`에서 [다시 듣기] | 같은 음이 두 번 차례로 난 뒤 함께 난다. 함께 낸 소리가 앞의 한 음과 **같은 크기의 한 소리**로 들리는가. 크기가 튀면 0.3 ÷ n을 다시 본다 |
| 2 | `#sp-6!`에서 [다시 듣기] | 세 번 차례로, 그리고 함께. 0.8초 간격이 급하거나 늘어지지 않는가 |
| 3 | `#sp-1!`에서 [다시 듣기] | 한 음(G4)만 난다 |
| 4 | 콘솔: `for (let m = 57, t = 0; m <= 76; m++, t += 0.35) tone("listen", m, ctx.currentTime + t, 0.3, 0.3)` | A3부터 E5까지 스무 집이 차례로 난다. 낮은 집(A3, 220Hz)이 폰 스피커에서도 높이가 들리는가. 고르게 들리는가 |
| 5 | 콘솔: `runFx({ t: "stamp" })`, `runFx({ t: "nope" })` | 도장과 아니에요가 집의 소리와 헷갈리지 않는가. 음높이가 느껴지지 않는가 |
| 6 | iPhone의 무음 스위치를 켜고 1번을 한다 | 소리가 나는가. 나지 않으면 기종과 iOS 버전을 적는다. P20의 소리 확인 장이 이 경우를 받는다 |
| 7 | 듣는 도중 홈 화면으로 나갔다 돌아온다 | "화면을 떠나서 듣기를 멈췄어요. [다시 듣기]를 눌러요."가 보이는가. 다시 누르면 나는가 |
| 8 | 이어폰을 뽑거나 전화가 온 뒤 | "소리 켜기"가 다시 보이는가. 누르면 돌아오는가 |

걸음 소리(0.24초)는 걸을 수 있게 된 뒤(P14)에 듣는다.

**고칠 수 있는 값.** 들어 보고 고칠 값은 구획 6의 배음 세기(`createPeriodicWave`의 둘째 배열), 마스터 크기(0.8), 구획 7의 `STEP`(0.8)과 길이(0.62, 1.1), 크기(0.3)다. 고치면 `docs/decisions.md`에 값과 까닭, 들은 기종을 적는다. `STEP`이나 길이를 바꾸면 검사 AU-02와 CT-02의 기대값도 그 값으로 고쳐야 한다. 이것은 조용히 고치는 것이 아니라 결정 기록과 함께 고치는 것이다.

**게이트 GPO3.** 검사 44/44와 AI의 항목 2~8에 위반이 없으면 `PARTIAL`로 넘길 수 있다. 위 표의 1~7을 폰 두 대로 듣고 기록하면 `PASS`다. `PARTIAL`이면 `open_issues`에 "귀로 듣기: GPO6 전에"를 적는다. GPO6은 GPO3이 `PASS`여야 넘긴다. 결정 D10(음색과 듣기)을 확정한다. 버전 v0.3.

---

## 6. PO4 읽기 조작

목표는 0단과 1단의 걸어서 배달을 손으로 끝까지 하는 것이다. 이 단계에서 처음으로 누를 수 있다.

### P13 [그대로] 읽기 조작과 임시 마감

| 항목 | 내용 |
|---|---|
| 단계 | PO4 |
| 시작 전 `#test` | `자가검사 44/44 (전체 47개 중 44개 작성) · TH 12/12 · CH 4/4 · SC 3/3 · JB 4/4 · FL 5/5 · AU 8/8 · ST 2/2 · SV 4/4 · CT 2/2` |
| 끝난 뒤 `#test` | `자가검사 45/45 (전체 47개 중 45개 작성) · TH 12/12 · CH 4/4 · SC 3/3 · JB 4/4 · FL 5/5 · AU 8/8 · ST 3/3 · SV 4/4 · CT 2/2` |
| 조각 | 5개(구획 4, 구획 8, 구획 10, 화면 틀, 구획 11에 검사 1개) |

**무엇이 들어가는가.**

- **조작을 상태로(구획 4).** `act(patch)`가 흐름 함수가 돌려준 값을 `setState`에 넘기고 `fx`의 소리를 낸다. 채점한 오답이면 `wrong`을, 듣기 단계에 들어섰으면 `done`을 알린다. 듣기 단계의 주 단추(`advance`)에서는 `next`를 물어 아무도 처리하지 않으면 `nextJob()`으로 다음 배달을 연다. 줄이 끝났으면 `leave`와 `finish`를 알리고 마감 화면으로 간다. `causeOf`가 오답의 까닭 코드를 정한다.
- **입력(구획 8).** 집 누르기(`F.move`), 한 칸 단추(`F.nudge`), 주 단추(`F.confirm`), 키보드의 좌우 화살표와 Enter. 단추에 포커스가 있을 때의 Enter는 그 단추의 것이다. [다시 배달]도 여기 있다.
- **임시 마감(구획 10, 화면 틀).** 마감 화면 `#closing`은 "한 번에 배달한 편지 n/n"과 배달별 기록을 보여 준다. 겹쳐 뜨는 화면이 떠 있는 동안 뒤의 배달 화면은 `inert`다. 통과와 도장은 P17에서 더한다.
- **검사 1개.** ST-04(듣는 도중에 다음 배달, 배달일 바꾸기, 마감으로 가면 듣기 객체가 비고 남은 프레임 함수가 상태를 바꾸지 않는다).

쓰기, 분류, 반송의 단추는 아직 듣지 않는다. 그래서 문패를 쓰는 배달(d1-03부터)은 쓰기 단계에서 멈춘다. P15에서 잇는다.

````text
[P13 · 그대로] 읽기 조작과 임시 마감

P00의 W1~W5를 지킨다.

시작 전: index.html#test의 첫 줄이 아래와 같은지 확인한다. 다르면 멈추고 보고한다.
  자가검사 44/44 (전체 47개 중 44개 작성) · TH 12/12 · CH 4/4 · SC 3/3 · JB 4/4 · FL 5/5 · AU 8/8 · ST 2/2 · SV 4/4 · CT 2/2

할 일: 아래 조각 5개를 적힌 자리에 글자 그대로 넣는다. 자리는 마커 줄의 바로 위다. 마커 줄은 그대로 둔다.

조각 1/5 · 넣을 자리: `// -- 4 끝 --` 줄 바로 위 (구획 4 STATE)
```js

// ── 조작을 상태로 ──
function causeOf(m, S0) {                                                // 채점한 오답의 까닭 코드. 저장과 복습 배달의 재료
  const ph = S0.phase, d = S0.pos - m.from;
  if (ph === "start") return diagStart(m.note, S0.pos);
  if (ph === "walk" && m.hop) return d === 0 ? "stay" : Math.sign(d) !== Math.sign(m.steps) ? "dir" : "count";
  if (ph === "walk" || ph === "drop") return diagnose(m.note, S0.pos);
  return ph === "plate" ? "plate" : ph === "sort" ? "sort" : "cause";
}
function act(patch) {                                                    // 흐름이 돌려준 값을 상태에 넣고 소리를 낸다
  if (!patch) return;
  if (patch.advance) { if (!emit("next").some(Boolean)) nextJob(); return; }
  const p = Object.assign({}, patch), fx = p.fx || [];
  delete p.fx;
  if (fx.some((f) => f.t === "nope")) emit("wrong", causeOf(M, S));     // 채점한 오답
  if (p.done) Object.assign(p, ...emit("done", p.done));                // 배달이 듣기 단계에 들어섰다
  setState(p);
  fx.forEach(runFx);
}
function nextJob() {                                                     // 다음 배달. 줄이 끝났으면 그날을 마친다
  if (S.idx + 1 < queueNow().length) return openRun(S.day, S.idx + 1, S.requeue, S.results);
  emit("leave");
  setState(Object.assign({ screen: "close" }, ...emit("finish")));
}
on("done", (done) => ({ results: S.results.concat([{ id: M.job.id, done }]) }));
```

조각 2/5 · 넣을 자리: `// -- 8 끝 --` 줄 바로 위 (구획 8 INPUT)
```js
$("houses").addEventListener("click", (e) => { const b = e.target.closest(".house"); if (b) act(F.move(M, S, +b.dataset.m)); });
$("goLeft").addEventListener("click", () => act(F.nudge(M, S, -1)));
$("goRight").addEventListener("click", () => act(F.nudge(M, S, 1)));
$("main").addEventListener("click", () => act(F.confirm(M, S)));
const typing = (e) => !M || (S.screen !== "run" && S.screen !== "scene") || e.metaKey || e.ctrlKey || e.altKey;   // 키보드를 받지 않을 때
window.addEventListener("keydown", (e) => {
  if (typing(e)) return;
  const k = e.key, el = document.activeElement, onControl = el && el.tagName === "BUTTON" && !el.classList.contains("house");
  if (k === "ArrowLeft" || k === "ArrowRight") { e.preventDefault(); act(F.nudge(M, S, k === "ArrowLeft" ? -1 : 1)); }
  else if (k === "Enter" && !onControl) { e.preventDefault(); if (!$("main").disabled) act(F.confirm(M, S)); }
});
$("restart").addEventListener("click", () => openRun(S.day, 0, [], [], { gained: [], report: null }));
```

조각 3/5 · 넣을 자리: `// -- 10 끝 --` 줄 바로 위 (구획 10 SCREENS)
```js
onPaint(10, () => {                                                      // 겹쳐 뜨는 화면이 떠 있는 동안 뒤의 배달 화면은 쓸 수 없게 둔다
  $("closing").hidden = S.screen !== "close";
  $("app").inert = S.screen !== "run" && S.screen !== "scene";
});
onPaint(90, () => {                                                      // 마감: 그날의 배달마다 첫 번째 결과
  if (S.screen !== "close") return;
  const jobs = dayNow().jobs, first = {};
  S.results.forEach((r) => { if (!(r.id in first)) first[r.id] = r.done; });
  $("closeSum").textContent = `한 번에 배달한 편지 ${jobs.filter((j) => first[j.id] === "full").length}/${jobs.length}`;
  $("closeList").innerHTML = jobs.map((j, i) => `<li><i class="rec is-${first[j.id] || "none"}"></i>${i + 1}. ${rich(cardText(jobModel(j, dayNow())).text)}</li>`).join("");
});
```

조각 4/5 · 넣을 자리: `<!-- -- 화면 끝 -- -->` 줄 바로 위 (화면 틀의 끝)
```html
<div class="sheet" id="closing" hidden>
  <h2>배달을 마쳤어요</h2>
  <p id="closeSum"></p>
  <p id="closeNote"></p>
  <ol id="closeList"></ol>
  <button type="button" id="restart">다시 배달</button>
  <button type="button" id="toMap" class="is-plain" hidden>지도로</button>
</div>
```

조각 5/5 · 넣을 자리: `// -- 11 끝 --` 줄 바로 위 (구획 11 TESTS)
```js
test("ST-04", "듣는 도중에 떠나면 듣기가 남지 않는다", (ok, eq) => {
  tWithAudio((c, log) => {
    tOpen("sp-3", 0); beginListen(); c.currentTime += 1; frame();
    ok(run !== null && S.lit === 1, "듣는 중: 둘째 주소");
    act(F.confirm(M, S));                                                // 주 단추: 다음 배달
    ok(run === null && S.lit === -1 && M.job.id === "sp-4" && S.phase === "drop", "다음 배달로 가면 듣기가 빈다");
    ok(log.osc.every((e) => e.cancels.length === 1), "남은 음을 끊는다");
    const before = JSON.stringify(S);
    frame();
    eq(JSON.stringify(S), before, "남은 프레임 함수가 상태를 바꾸지 않는다");
    tOpen("sp-3", 0); beginListen(); openRun("d1", 0, [], [], { dev: true });
    ok(run === null && S.lit === -1 && S.day === "d1", "배달일을 바꿔도 듣기가 빈다");
    tOpen("sp-9", 0); beginListen(); act(F.confirm(M, S));               // 마지막 배달 뒤
    ok(run === null && S.screen === "close", "마감으로 가면 듣기가 빈다");
  });
});
```

하지 말 것:
- 입력 처리 안에서 상태를 직접 바꾸지 않는다. 입력은 흐름 함수를 부르고 그 결과를 act에 넘길 뿐이다.
- 집을 누를 때 채점하지 않는다. 채점은 주 단추다.
- 오답에서 집의 소리를 내지 않는다. 벌점, 목숨, 제한 시간을 넣지 않는다.
- 다음 배달로 넘어가는 데 타이머를 쓰지 않는다. 듣는 도중에도 주 단추로 넘어갈 수 있다.

보고: index.html#test의 첫 줄, index.html#d0에서 일곱 건을 끝까지 했는지와 마감 화면의 글, 콘솔 오류 수, 조각에서 바꾼 글자(없어야 한다).
````

**완료 기준.**

- `index.html#test`의 첫 줄: `자가검사 45/45 (전체 47개 중 45개 작성) · TH 12/12 · CH 4/4 · SC 3/3 · JB 4/4 · FL 5/5 · AU 8/8 · ST 3/3 · SV 4/4 · CT 2/2`
- 콘솔 오류 0, 외부 요청 0.
- `#d0`: C4 집을 누르면 우체부가 옮겨 간다. 채점하지 않는다. [배달]을 누르면 듣기 단계가 되고 진행 점이 채워진다. (소리가 켜져 있으면 집을 누를 때 그 집의 소리가, 배달할 때 도장 소리가 난다. 이것은 귀로 확인한다.)
- [다음 배달]로 d0-02가 열린다. 아무 집도 고르지 않고 [배달]을 누르면 "집을 먼저 골라 주세요. 집을 누르거나 단추로 옮겨요."만 뜨고 틀린 것으로 세지 않는다.
- d0-02(A4)에서 B4에 배달하면 1차 안내(내 길과 까닭), 한 번 더 누르면 우체부를 옮겨 주고 확정을 기다린다. 그대로 [배달]을 누르면 기록이 ◐다.
- 나머지 다섯 건을 끝까지 하면 마지막 주 단추가 [마감하기]이고, 누르면 "배달을 마쳤어요"와 "한 번에 배달한 편지 6/7", 배달 일곱 줄이 뜬다. [다시 배달]로 첫 배달로 돌아간다.
- `#d1`에서 키보드만으로: 왼쪽 화살표 다섯 번으로 C4, Enter로 출발, 오른쪽 화살표 한 번, Enter로 배달. d1-01이 ●로 끝난다.

### P14 [점검] 게이트 GPO4

실기기에서 처음 손으로 해 보는 게이트다. 이 게임의 가장 큰 위험(좁은 집을 손가락으로 고를 수 있는가)을 여기서 잰다.

````text
[P14 · 점검] 게이트 GPO4: 읽기 조작

코드를 더하거나 고치지 않는다. index.html을 읽고 아래를 확인해 보고한다. 어긋난 것은 고치지 말고 줄 번호와 함께 보고한다.

1. index.html#test의 첫 줄이 아래와 같은가.
   자가검사 45/45 (전체 47개 중 45개 작성) · TH 12/12 · CH 4/4 · SC 3/3 · JB 4/4 · FL 5/5 · AU 8/8 · ST 3/3 · SV 4/4 · CT 2/2
2. 구획 8의 입력 처리에서 setState를 직접 부르는 곳이 있는가. 있으면 모두 적는다(없어야 한다. 입력은 act(F.…)나 openRun을 부른다).
3. 집을 누르는 처리(F.move)가 tries나 flawed를 바꾸는 값을 돌려주는 경우가 있는가(없어야 한다).
4. F.confirm이 고르지 않은 확정(start, drop 단계에서 picked가 false)을 채점하지 않고 안내만 돌려주는가.
5. nextJob이 줄의 끝에서 emit("leave")를 부른 뒤에 마감으로 가는가.
6. 키보드 처리: 단추에 포커스가 있을 때 Enter가 주 단추의 일을 겹쳐 하지 않는가. 마감 화면이 떠 있는 동안 화살표와 Enter를 받지 않는가.
7. 가이드 문서의 P13 조각과 index.html의 해당 부분을 견줘 다른 글자가 있으면 모두 적는다.

보고: 항목 1~7의 결과. 그리고 부록 A의 게이트 보고 블록(gate: GPO4). device_check는 사람이 채운다.
````

**사람이 해 볼 것.** PC의 브라우저에서 먼저 하고, 폰에서 한 번 더 한다. 판독 줄의 글이 표와 같아야 한다(주소의 기호는 그림으로 보인다).

| 주소 끝 | 하는 일 | 판독 줄 |
|---|---|---|
| `#sp-1` | 아무 집도 고르지 않고 [배달] | 집을 먼저 골라 주세요. 집을 누르거나 단추로 옮겨요. |
| | A4 집을 누르고 [배달] | 기호가 없으면 글자 집이 도착 집이에요. 지금은 오른쪽으로 두 칸 옆집이에요. (내 길이 점선으로 그려진다) |
| | 한 번 더 [배달] | G4는 4구역의 솔 집이에요. 옮겨 두었어요. [배달]을 눌러요. (바른 길이 나란히 그려지고 우체부가 G4로 간다) |
| | [배달] | G4는 4구역의 솔 집이에요. (진행 점이 반만 찬다) |
| `#sp-2` | 검은 집을 누르고 [여기서 출발] | 출발 집은 늘 흰 집이에요. 글자 C의 집을 찾아요. |
| | C4를 누르고 [여기서 출발] | 샵은 오른쪽으로 한 칸이에요. 아래 단추로 걸어요. |
| | 아무 집이나 누른다 | 걸어서 가요. 아래 단추를 눌러요. (우체부가 옮겨지지 않는다) |
| | [왼쪽 한 칸], [배달] | 샵은 오른쪽이에요. 지금은 왼쪽으로 걸었어요. |
| | [오른쪽 한 칸] 두 번, [배달] | (걸음 호가 하나 그려지고 듣기로 간다) |
| `#sp-3` | 끝까지 한 번에 | 주소 2개가 한 집에 모였어요. 차례로 듣고, 함께 들어요. → 듣기가 끝나면: D♭4는 레에서 반음 아래, C♯4는 도에서 반음 위. 같은 집이에요. |
| `#sp-5` | 악보를 읽고 F4에 배달 | E♯4는 미에서 반음 위예요. F4와 같은 집이에요. |
| `#sp-8` | 4구역의 B(오른쪽 B)에서 [여기서 출발] | 글자는 맞아요. 이 집은 4구역이에요. 편지의 숫자는 3이에요. |
| | 3구역의 B에서 출발해 오른쪽으로 한 칸, [배달] | B♯3은 시에서 반음 위예요. C4와 같은 집이에요. |
| `#d0` | 일곱 건을 탭만으로 끝까지 | 마감 화면: 한 번에 배달한 편지 n/7 |
| `#d0` | 일곱 건을 키보드만으로(좌우 화살표, Enter) | 같다 |
| `#d1` | d1-01, d1-02를 탭만으로, 그리고 키보드만으로 | d1-02의 듣기에서 문패 둘이 차례로 밝아진다 |

**실기기에서 잴 것.** 폰 한 대 이상에서 0단을 처음부터 끝까지 한다.

- **누르려던 집과 다른 집이 골라진 횟수**를 적는다(설계서 12.3절 1번). 일곱 건에서 흰 집을 일곱 번쯤, 검은 집은 1단에서 누르게 된다. 1단의 d1-01, d1-02도 해서 검은 집 옆의 흰 집을 누를 때를 본다.
- 틀리게 골라졌을 때 [왼쪽 한 칸] [오른쪽 한 칸]으로 고치는 것이 자연스러운가.
- 걸음 소리(한 칸에 한 음, 0.24초)가 짧지도 거슬리지도 않는가. 빠르게 걸을 때 앞의 소리가 끊기는 것이 이상하지 않은가(P12에서 미룬 항목).
- 샵과 플랫 그림이 봉투와 편지 카드에서 읽히는가.

다른 집이 자주 골라지면(다섯 번에 한 번 이상) 설계서 13장의 대응을 본다. 흰 집의 글자를 아래쪽에 둔 배치, 한 칸 단추, "누르기는 확정이 아니다"가 받치고 있는데도 불편하면 D2(창의 집 수)를 다시 정한다. 이 문서의 어떤 수치도 이 문제에 답하지 못한다.

**게이트 GPO4.** 검사 45/45, 위 표를 PC에서 확인, 실기기 한 대 이상에서 0단을 끝까지 하고 횟수를 기록. 결정 D1(코어 조작)과 D2(길)를 확정한다. 버전 v0.4.

---

## 7. PO5 쓰기 · 분류 · 반송

목표는 배달 방식 여섯이 모두 도는 것이다. 이 단계가 끝나면 배달 46건을 하나씩 끝까지 할 수 있다.

### P15 [그대로] 쓰기, 분류, 반송

| 항목 | 내용 |
|---|---|
| 단계 | PO5 |
| 시작 전 `#test` | `자가검사 45/45 (전체 47개 중 45개 작성) · TH 12/12 · CH 4/4 · SC 3/3 · JB 4/4 · FL 5/5 · AU 8/8 · ST 3/3 · SV 4/4 · CT 2/2` |
| 끝난 뒤 `#test` | 같다(검사를 더하지 않는다. 흐름은 P04의 FL 검사가 이미 본다) |
| 조각 | 1개(구획 8) |

**무엇이 들어가는가.** 단계의 그림과 규칙은 P04(흐름 함수)와 P07, P08(그리기)에 이미 있다. 이 조각은 남은 입력을 잇는다.

- 기호 단추(`F.sign`), 카드(`F.pick`), 까닭 단추(`F.cause`)의 탭.
- 키보드: 쓰기 단계에서 위아래 화살표로 기호를 한 단계씩 바꾼다(처음 누르면 "기호 없음"부터). 숫자 키 1~5는 단계에 따라 기호(1 더블플랫, 2 플랫, 3 없음, 4 샵, 5 더블샵), 카드, 까닭 단추를 고른다.

이것으로 쓰기(흰 집 + 기호 단추 → [문패 달기]), 분류(카드 고르기 → [확정]), 반송(까닭 고르기 → 고쳐서 배달)이 끝까지 된다.

````text
[P15 · 그대로] 쓰기, 분류, 반송

P00의 W1~W5를 지킨다.

시작 전: index.html#test의 첫 줄이 아래와 같은지 확인한다. 다르면 멈추고 보고한다.
  자가검사 45/45 (전체 47개 중 45개 작성) · TH 12/12 · CH 4/4 · SC 3/3 · JB 4/4 · FL 5/5 · AU 8/8 · ST 3/3 · SV 4/4 · CT 2/2

할 일: 아래 조각 1개를 적힌 자리에 글자 그대로 넣는다. 자리는 마커 줄의 바로 위다. 마커 줄은 그대로 둔다.

조각 1/1 · 넣을 자리: `// -- 8 끝 --` 줄 바로 위 (구획 8 INPUT)
```js
$("setSign").addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) act(F.sign(M, S, +b.dataset.a)); });
$("setCards").addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) act(F.pick(M, S, +b.dataset.i)); });
$("setCause").addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) act(F.cause(M, S, b.dataset.c)); });
window.addEventListener("keydown", (e) => {                              // 위아래 화살표로 기호를, 숫자 1~5로 기호·카드·까닭을 고른다
  if (typing(e) || S.screen !== "run") return;
  const k = e.key;
  if ((k === "ArrowUp" || k === "ArrowDown") && S.phase === "plate") {
    e.preventDefault();
    act(F.sign(M, S, S.pen.a === null ? 0 : S.pen.a + (k === "ArrowUp" ? 1 : -1)));
  } else if (/^[1-5]$/.test(k)) {
    const i = +k - 1;
    if (S.phase === "sort" && i < M.cards.length) act(F.pick(M, S, i));
    else if (S.phase === "diag" && i < CAUSES.length) act(F.cause(M, S, CAUSES[i]));
    else if (S.phase === "plate") act(F.sign(M, S, i - MAXA));
  }
});
```

하지 말 것:
- 쓰기에서 숫자(옥타브)를 고르는 단추를 만들지 않는다. 숫자는 고른 흰 집에서 저절로 나온다.
- 쓰기의 정답을 하나로 좁히지 않는다. 도착 집의 주소이고 아직 판에 없으면 어느 것이든 받는다.
- 까닭 단추를 눌렀을 때 주 단추까지 누르게 하지 않는다. 까닭 단추가 곧 확정이다.

보고: index.html#test의 첫 줄, index.html#sp에서 아홉 건을 끝까지 했는지와 마감 화면의 글, 콘솔 오류 수, 조각에서 바꾼 글자(없어야 한다).
````

**완료 기준.**

- `index.html#test`의 첫 줄: `자가검사 45/45 (전체 47개 중 45개 작성) · TH 12/12 · CH 4/4 · SC 3/3 · JB 4/4 · FL 5/5 · AU 8/8 · ST 3/3 · SV 4/4 · CT 2/2`
- 콘솔 오류 0, 외부 요청 0.
- `#sp-4`: F♯4에 배달하면 쓰기 단계가 되고 문패 판에 빈칸 하나가 생긴다. G 집과 [플랫] 단추를 고르면 봉투가 "쓰는 주소", G♭4, "플랫"이 되고 악보에 점선 음표가, 길에 걸음 미리 보기가 그려진다.
- [문패 달기]를 누르면 문패가 둘(F♯4, G♭4)이 되고 듣기로 간다. 기록은 ●다.
- `#sp-7`: 카드 C𝄪4와 E𝄫4를 고르고 [확정]을 누르면 문패 셋이 달린다.
- `#sp-9`: 까닭 [방향]을 누르면 그 단추가 꺼지고 기록이 ◐가 된다. [구역]을 누르면 "숫자 4는 출발 집의 구역이에요. 4구역의 C 집에서 출발해요."가 뜨고 고르기 단계로 간다.
- `#d3-3`(E𝄪4, 주소를 모두 쓴다): 배달하면 빈칸이 둘 생긴다. 기호 단추 다섯 가운데 [더블플랫]만 꺼져 있다(3단에서는 아직 배우지 않았다).
- `#sp`: 검사용 하루 아홉 건을 단추만 눌러 끝까지 하면 "한 번에 배달한 편지 9/9"다.
- `#sp-6`에서 키보드만으로: 쓰기 단계에서 좌우 화살표로 흰 집을, 위아래 화살표나 숫자 키 1~5로 기호를 고른다. 숫자 키 3은 "기호 없음"이다.

### P16 [점검] 게이트 GPO5, 자동 완주

화면 점검 도구가 손짓을 흉내 내어 검사용 하루를 끝까지 한다. 흐름, 키보드, 소리 예약, 화면 크기를 한 번에 본다.

````text
[P16 · 점검] 게이트 GPO5: 쓰기, 분류, 반송

코드를 더하거나 고치지 않는다.

할 일 1. 아래 명령을 돌리고 출력의 "── 합계 ──" 아래 두 줄과 FAIL로 시작하는 줄을 모두 그대로 보고한다.
   node tools/check.mjs index.html layout text flow keys audio resize
   기대: 화면 여덟 줄 모두 "장면 730 … 문제 0", 문구 네 줄 모두 "문구 404 … 넘침 0 카드 55 넘침 0",
        합계에 "flow:pass":52, "keys:pass":22, "audio:pass":19, "resize:pass":7, 그리고 "실패 0".
   돌릴 수 없으면 NOT_RUN이라고 적고 까닭을 적는다. 결과를 지어내지 않는다.

할 일 2. index.html을 읽고 아래를 확인해 보고한다. 어긋난 것은 고치지 말고 줄 번호와 함께 보고한다.
   가. 쓰기에서 숫자를 따로 입력받는 곳이 없는가(pen은 흰 집 h와 변화량 a뿐이다).
   나. 쓰기의 판정이 "집 번호가 도착 집과 같고 아직 판에 없다"인가. 특정 주소 하나와 견주지 않는가.
   다. 배우지 않은 기호의 단추가 꺼져 있고(M.day.signs), F.sign이 그 기호를 받지 않는가.
   라. 분류에서 틀린 카드가 꺼지고 맞게 고른 카드는 남는가.
   마. 반송에서 까닭을 틀리면 그 단추만 꺼지고, 두 번 틀리면 알려 주고 고르기 단계로 가는가.
   바. 가이드 문서의 P15 조각과 index.html의 해당 부분을 견줘 다른 글자가 있으면 모두 적는다.

보고: 할 일 1, 2의 결과. 그리고 부록 A의 게이트 보고 블록(gate: GPO5).
````

**사람이 해 볼 것.** 폰에서 `#sp`를 처음부터 끝까지 한다. 그리고 아래를 따로 본다.

| 주소 끝 | 하는 일 | 볼 것 |
|---|---|---|
| `#sp-4` | F♯4에 배달한 뒤 아무것도 고르지 않고 [문패 달기] | "흰 집과 기호를 모두 골라요." 틀린 것으로 세지 않는다 |
| | 검은 집을 누른다 | "글자는 흰 집에 있어요. 흰 집을 골라요." |
| | F 집과 [샵], [문패 달기] | "F♯4는 이미 달린 문패예요. 다른 주소를 찾아요." 세지 않는다 |
| | G 집과 [샵], [문패 달기] | "G♯4는 솔에서 오른쪽으로 한 칸. 다른 집에 도착해요." 내 길이 그려진다 |
| | [플랫], [문패 달기] | 문패 F♯4, G♭4. 기록은 ◐ |
| `#sp-6` | 걸어서 배달한 뒤 문패 둘을 쓴다 | 하나를 달면 "… 문패를 달았어요. 주소가 1개 더 있어요." |
| `#sp-7` | 아무것도 고르지 않고 [확정] | "편지를 하나 이상 골라요." |
| | C𝄪4와 D5를 고르고 [확정] | "D5는 5구역의 집이에요. 구역이 다르면 다른 소리예요." D5 카드가 꺼진다 |
| `#sp-9` | [방향] | 그 단추가 꺼진다. "길을 다시 보세요. 출발 집의 글자와 구역, 방향, 걸음 수를 차례로 견줘요." |
| | [구역] | "맞아요. 숫자 4는 출발 집의 구역이에요. 4구역의 C 집에서 출발해요." 그리고 B3에 배달 |
| `#d3-3` | E𝄪4에 배달한 뒤 | [더블플랫]이 꺼져 있다. F♯4와 G♭4를 쓴다 |
| `#d5-6` | 악보 편지 B♭3 | 창이 A3~B4다. A♯3과 C𝄫4를 쓴다. C𝄫4는 4구역의 C 집과 [더블플랫]이다 |

- 320px 폭의 폰에서 기호 단추 다섯과 카드 넷이 한 줄에 놓이고 누를 만한가.
- 더블샵 그림이 샵과 헷갈리지 않는가(작은 화면에서). 헷갈리면 설계서 9.2절의 대응(오선 한 칸의 바닥을 11px로, 봉투의 읽기를 굵게)을 `docs/decisions.md`에 적고 고친다.

**도구 없이 보는 법.** 위 표와 P14의 표를 네 화면에서 손으로 한다. `open_issues`에 "화면 점검 도구 NOT_RUN"을 적는다.

**게이트 GPO5.** 검사 45/45, 도구의 여섯 묶음이 실패 0, 위 표를 폰에서 확인. 버전 v0.5.

---

## 8. PO6 배달일과 진행

목표는 처음 켠 사람이 0단부터 혼자 해 나가고, 다시 켜면 이어지는 것이다. P19까지가 [그대로]이고 그 뒤에 첫 배포가 있다.

### P17 [그대로] 배달일의 흐름, 저장, 이어하기

| 항목 | 내용 |
|---|---|
| 단계 | PO6 |
| 시작 전 `#test` | `자가검사 45/45 (전체 47개 중 45개 작성) · TH 12/12 · CH 4/4 · SC 3/3 · JB 4/4 · FL 5/5 · AU 8/8 · ST 3/3 · SV 4/4 · CT 2/2` |
| 끝난 뒤 `#test` | `자가검사 46/46 (전체 47개 중 46개 작성) · TH 12/12 · CH 4/4 · SC 3/3 · JB 4/4 · FL 5/5 · AU 8/8 · ST 4/4 · SV 4/4 · CT 2/2` |
| 조각 | 3개(구획 4, 구획 10, 구획 11에 검사 1개) |

**무엇이 들어가는가.**

- **다시 내기.** 첫 번째에 ◐로 끝난 배달은 마감 배달 앞에 한 번 더 나온다. `done` 갈고리가 그 배달의 번호를 `requeue`에 넣는다. 마감 배달과 다시 낸 배달은 다시 내지 않는다.
- **통과와 도장.** `dayReport`가 배달마다 **첫 번째 결과만** 세어 그날의 결과를 만든다. 한 번에 배달한 편지가 `passNeed(n)`(배달 수의 80%, 올림) 이상이면 통과다. 도장은 통과 1, 모두 한 번에 배달 2다. `dayOpen(id)`는 앞 배달일을 통과했는가를 본다.
- **문패.** 배달을 ●로 마치면 그 배달의 문패(`platesOf`)를 얻는다. 다시 낸 배달을 ●로 마쳐도 얻는다. 이번에 얻은 것은 `S.gained`에 모인다.
- **저장.** 배달 하나가 듣기 단계에 들어설 때마다 저장한다. 하던 배달일(`active`)에는 배달일, 다음에 열 자리, 지금까지의 결과(1은 ●, 2는 ◐), 다시 낼 배달, 얻은 문패가 들어간다. 채점한 오답은 까닭 코드마다 센다(`causes`). 그날을 마치면 배달일 기록(`days`)에 통과, 도장, 횟수, 최고 기록을 적고 `active`를 비운다.
- **이어하기.** `resumePlan`이 저장된 `active`를 믿어도 되는지 본다(결과에서 다시 낼 배달을 다시 계산해 견준다). `resume()`이 그 자리의 배달을 연다. 마지막 배달까지 마치고 나갔으면 바로 마감한다.
- **임시 규칙.** 지도가 아직 없으므로 처음 화면은 "하던 배달일, 없으면 통과하지 않은 첫 배달일"이다. P19가 이 세 줄을 지운다.
- **마감 화면의 결과 줄(구획 10).** 통과와 도장, 새 문패.
- **검사 1개.** ST-03. 어느 배달에서 시작해도 한 번만 그리고 그릴 때 모델과 상태가 이미 그 배달의 것인가, 이어하기, 믿을 수 없는 저장, 그날의 줄, 통과 계산, 도장, 문패, 까닭 누계, 바로가기의 무기록을 본다.

바로가기(`#d1`, `#sp`)로 연 배달은 다시 내기와 마감까지는 똑같이 돌지만 아무것도 기록하지 않는다.

````text
[P17 · 그대로] 배달일의 흐름, 저장, 이어하기

P00의 W1~W5를 지킨다.

시작 전: index.html#test의 첫 줄이 아래와 같은지 확인한다. 다르면 멈추고 보고한다.
  자가검사 45/45 (전체 47개 중 45개 작성) · TH 12/12 · CH 4/4 · SC 3/3 · JB 4/4 · FL 5/5 · AU 8/8 · ST 3/3 · SV 4/4 · CT 2/2

할 일: 아래 조각 3개를 적힌 자리에 글자 그대로 넣는다. 자리는 마커 줄의 바로 위다. 마커 줄은 그대로 둔다.

조각 1/3 · 넣을 자리: `// -- 4 끝 --` 줄 바로 위 (구획 4 STATE)
```js

// ── 배달일의 흐름: 다시 내기, 통과, 문패, 이어하기 ──
const passNeed = (n) => Math.ceil(n * 0.8);                              // 통과 기준: 한 번에 배달한 편지가 배달 수의 80% 이상(올림)
const plateKey = (p) => LETTERS[p.L] + p.a;                              // 문패의 열쇠: 글자와 변화량. "C1", "D-1"
function dayReport(day, results) {                                       // 그날의 결과. 배달마다 첫 번째 결과만 센다
  const jobs = dayOf(day).jobs, first = {};
  results.forEach((r) => { if (!(r.id in first)) first[r.id] = r.done; });
  const full = jobs.filter((j) => first[j.id] === "full").length, need = passNeed(jobs.length), passed = full >= need;
  return { n: jobs.length, full, need, passed, stamp: !passed ? 0 : full === jobs.length ? 2 : 1 };   // 도장: 통과 1, 모두 한 번에 배달 2
}
const dayOpen = (id) => { const k = DAYS.findIndex((d) => d.id === id); return k <= 0 || !!(store.data.days[DAYS[k - 1].id] || {}).passed; };   // 앞 배달일을 통과해야 열린다
on("wrong", (code) => {                                                  // 채점한 오답: 까닭 누계. 저장은 듣기 단계에서 한다
  if (!S.dev) store.data.causes = Object.assign({}, store.data.causes, { [code]: (store.data.causes[code] || 0) + 1 });
});
on("done", (done) => {                                                   // 듣기 단계에 들어섰다: 다시 낼지 정하고, 문패를 얻고, 여기까지 저장한다
  const n = dayNow().jobs.length, again = done === "half" && S.idx < n - 1;   // 줄의 앞 n-1 자리가 첫 번째 배달이다. 마감 배달과 다시 낸 배달은 다시 내지 않는다
  const requeue = again ? S.requeue.concat([queueNow()[S.idx]]) : S.requeue;
  if (S.dev) return { requeue };
  const d = store.data, got = done === "full" ? platesOf(M).map(plateKey).filter((k, i, a) => a.indexOf(k) === i && !d.plates.includes(k)) : [];
  const gained = S.gained.concat(got), results = S.results.concat([{ id: M.job.id, done }]);
  d.plates = d.plates.concat(got);
  d.stats = { jobs: d.stats.jobs + 1, clean: d.stats.clean + (done === "full" ? 1 : 0) };
  d.active = { day: S.day, index: S.idx + 1, results: results.map((r) => (r.done === "full" ? 1 : 2)), requeue, gained };
  store.save();
  return { requeue, gained };
});
on("finish", () => {                                                     // 그날을 마쳤다: 통과와 도장을 적는다
  const report = dayReport(S.day, S.results);
  if (!S.dev) {
    const d = store.data, was = d.days[S.day] || { passed: false, stamp: 0, runs: 0, best: 0 };
    d.days = Object.assign({}, d.days, { [S.day]: { passed: was.passed || report.passed, stamp: Math.max(was.stamp, report.stamp), runs: was.runs + 1, best: Math.max(was.best, report.full) } });
    d.active = null;
    store.save();
  }
  return { report };
});
function resumePlan(a) {                                                 // 저장된 '하던 배달일'에서 이어 열 값을 만든다. 믿을 수 없는 값이면 null
  const d = a && DAYS.find((x) => x.id === a.day);
  if (!d || !Array.isArray(a.results) || !Array.isArray(a.requeue) || !a.results.every((v) => v === 1 || v === 2)) return null;
  const n = d.jobs.length, want = a.results.slice(0, n - 1).map((v, i) => (v === 2 ? i : -1)).filter((i) => i >= 0);   // 다시 낼 배달은 첫 번째 결과에서 정해진다
  const q = queueOf(n, want);
  if (JSON.stringify(a.requeue) !== JSON.stringify(want) || a.index !== a.results.length || a.index > q.length) return null;
  return { day: d.id, index: a.index, requeue: want, gained: Array.isArray(a.gained) ? a.gained.filter((k) => typeof k === "string") : [],
           results: a.results.map((v, i) => ({ id: d.jobs[q[i]].id, done: v === 1 ? "full" : "half" })) };
}
function resume() {                                                      // 하던 배달일을 이어서 연다. 이을 것이 없으면 false
  const p = resumePlan(store.data.active);
  if (!p) { if (store.data.active) { store.data.active = null; store.save(); } return false; }
  const last = queueOf(dayOf(p.day).jobs.length, p.requeue).length - 1;
  openRun(p.day, Math.min(p.index, last), p.requeue, p.results, { dev: false, gained: p.gained, report: null });
  if (p.index > last) nextJob();                                         // 마지막 배달까지 마치고 나갔으면 바로 마감한다
  return true;
}
const startDay = (id) => openRun(id, 0, [], [], { dev: false, gained: [], report: null });
goHome = () => {                                                         // 지도가 생기기 전의 임시 규칙: 하던 배달일을 잇고, 없으면 아직 통과하지 않은 첫 배달일을 연다
  if (!resume()) startDay((DAYS.find((d) => !(store.data.days[d.id] || {}).passed) || DAYS[DAYS.length - 1]).id);
};
```

조각 2/3 · 넣을 자리: `// -- 10 끝 --` 줄 바로 위 (구획 10 SCREENS)
```js
const plateHtml = (k) => { const a = +k.slice(1); return `<span class="nm"><span aria-hidden="true">${k[0]}${a ? signSvg(a) : ""}</span><span class="sr">${k[0]}${a ? " " + signKo(a) : ""}</span></span>`; };   // 문패: 글자와 기호
onPaint(91, () => {                                                      // 마감: 통과와 도장, 새 문패
  if (S.screen !== "close" || !S.report) return;
  const r = S.report;
  const line = r.stamp === 2 ? "모두 한 번에 배달했어요. 한 번에 배달 도장을 받았어요." : r.passed ? "통과했어요. 도장을 받았어요."
    : `한 번에 배달한 편지가 ${r.need}통이면 다음 배달일이 열려요.`;
  $("closeNote").innerHTML = line + (S.gained.length ? `<br>새 문패 ${S.gained.length}개: ${S.gained.map(plateHtml).join(" ")}` : "") + (S.dev ? "<br>바로가기로 열어서 기록하지 않았어요." : "");
});
```

조각 3/3 · 넣을 자리: `// -- 11 끝 --` 줄 바로 위 (구획 11 TESTS)
```js
function tDay(id, halves) {                                              // 하루를 끝까지 한다. halves: 첫 번째에 ◐로 끝낼 배달의 번호들. 배달이 나온 차례를 돌려준다
  const order = [];
  openRun(id, 0, [], [], { dev: false, gained: [], report: null });
  for (let guard = 0; S.screen !== "close" && guard < 80; guard++) {
    if (S.screen === "run") {
      const first = !order.includes(M.job.id);
      order.push(M.job.id);
      act(Object.assign({}, tPlay(M, first && halves.includes(queueNow()[S.idx]) ? 1 : 0, () => {}).S, { fx: [] }));   // 듣기 단계의 값을 그대로 넣는다
    }
    act({ advance: true });                                              // 다음 배달로. 발견 장면이면 다음 문장으로
  }
  return order;
}
test("ST-03", "중간 배달로 들어가도 모델을 먼저 만들고 상태를 한 번에 넣는다", (ok, eq) => {
  tWithAudio(() => {
    const seen = [], spy = [-1, () => seen.push(M.job.id + " " + S.day + " " + S.idx + " " + S.phase)], blank = (extra) => Object.assign(blankSave(), extra);
    const every = location.hash === "#test";                             // 배달 전부를 그려 보는 것은 검사 화면(#test)에서만 한다. 평소에는 배달일마다 첫 배달만 그린다
    store.hold = true;
    PAINT.unshift(spy);
    painting = true;                                                     // 이 검사는 화면을 실제로 그려 본다
    try {
      for (const d of BOOK) d.jobs.forEach((job, i) => {                 // 바로가기: 어느 배달에서 시작해도 한 번만 그리고, 그릴 때 모델과 상태가 이미 그 배달의 것이다
        const r = runPatch(d.id, i, [], []), want = fresh(r.m);
        ok(r.m.job.id === job.id && r.patch.idx === i && Object.keys(want).every((k) => JSON.stringify(r.patch[k]) === JSON.stringify(want[k])), "배달 하나를 여는 값 " + job.id);
        if (!every && i > 0) return;
        seen.length = 0;
        openRun(d.id, i, [], [], { dev: true });
        eq(seen, [job.id + " " + d.id + " " + i + " " + want.phase], "한 번 그린다 " + job.id);
        ok(M.job.id === job.id && S.results.length === 0 && $("ask").textContent.length > 0 && $("houses").children.length > 0, "처음 그린 화면 " + job.id);
      });
      store.data = blank({ active: { day: "d1", index: 7, results: [1, 2, 1, 1, 2, 1, 1], requeue: [1, 4], gained: ["C1"] } });   // 이어하기: 다시 낸 배달 둘 가운데 둘째
      seen.length = 0;
      ok(resume() === true, "하던 배달일을 잇는다");
      eq(seen, ["d1-05 d1 7 drop"], "이어하기도 한 번만 그린다");
      eq([S.day, S.idx, S.requeue, S.results.length, S.results[6], S.gained, S.dev], ["d1", 7, [1, 4], 7, { id: "d1-02", done: "full" }, ["C1"], false], "이어서 연 상태");
    } finally { PAINT.splice(PAINT.indexOf(spy), 1); painting = false; for (const k in built) delete built[k]; }   // 검사가 그린 것은 다음 그리기에서 모두 다시 그린다
    for (const bad of [{ day: "zz", index: 0, results: [], requeue: [] }, { day: "d1", index: 3, results: [1, 1], requeue: [] }, { day: "d1", index: 2, results: [1, 2], requeue: [] },
                       { day: "d1", index: 2, results: [1, 3], requeue: [] }, { day: "d1", index: 1, results: [1] }]) {
      store.data = blank({ active: bad });
      ok(resume() === false && store.data.active === null, "믿을 수 없는 저장은 잇지 않고 지운다 " + JSON.stringify(bad));
    }
    store.data = blank({ active: { day: "d0", index: 7, results: [1, 1, 1, 1, 1, 1, 1], requeue: [], gained: [] } });
    ok(resume() === true && S.screen === "close" && S.report.stamp === 2 && store.data.active === null && store.data.days.d0.passed, "마지막 배달까지 마치고 나갔으면 바로 마감한다");
    // 그날의 줄: 다시 내기와 통과
    eq(queueOf(7, []), [0, 1, 2, 3, 4, 5, 6], "다시 낼 배달이 없는 줄");
    eq(queueOf(7, [2, 4]), [0, 1, 2, 3, 4, 5, 2, 4, 6], "다시 낼 배달은 마감 배달 앞에 선다");
    eq([passNeed(7), passNeed(8), passNeed(9)], [6, 7, 8], "통과 기준은 배달 수의 80%(올림)");
    store.data = blankSave();
    eq(tDay("d0", [1, 3]), ["d0-01", "d0-02", "d0-03", "d0-04", "d0-05", "d0-06", "d0-02", "d0-04", "d0-07"], "◐로 끝난 배달은 마감 배달 앞에 한 번 더 나온다");
    eq([S.report.full, S.report.need, S.report.passed, S.report.stamp], [5, 6, false, 0], "다시 낸 배달의 결과는 통과 계산에 넣지 않는다");
    ok(dayOpen("d0") && !dayOpen("d1"), "통과하지 못하면 다음 배달일이 열리지 않는다");
    eq(tDay("d0", [6]).length, 7, "마감 배달은 다시 내지 않는다");
    eq([S.report.full, S.report.passed, S.report.stamp, dayOpen("d1"), dayOpen("d2")], [6, true, 1, true, false], "일곱 건에 여섯이면 통과하고 다음 배달일만 열린다");
    tDay("d0", []);
    eq(store.data.days.d0, { passed: true, stamp: 2, runs: 3, best: 7 }, "배달일 기록: 통과, 도장, 횟수, 최고 기록");
    // 문패, 하던 배달일, 까닭 누계
    store.data = blankSave();
    openRun("d1", 0, [], [], { dev: false, gained: [], report: null });
    act(Object.assign({}, tPlay(M, 0, () => {}).S, { fx: [] }));
    eq(store.data.active, { day: "d1", index: 1, results: [1], requeue: [], gained: ["C1"] }, "듣기 단계에 들어서면 여기까지 적는다");
    store.data = blankSave();
    openRun("d1", 2, [], [], { dev: false, gained: [], report: null });
    act(Object.assign({}, tPlay(M, 1, () => {}).S, { fx: [] }));
    eq([store.data.plates, S.gained, S.requeue], [[], [], [2]], "◐로 끝난 배달은 문패를 주지 않고 다시 낼 배달에 넣는다");
    store.data = blankSave();
    eq(tDay("d1", [2]).length, 8, "1단에서 하나를 다시 낸다");
    eq([store.data.plates.length, S.gained.length, store.data.active, store.data.stats], [10, 10, null, { jobs: 8, clean: 7 }], "다시 낸 배달을 한 번에 마치면 그 문패를 얻는다");
    tDay("d1", []);
    eq([store.data.plates.length, S.gained.length], [10, 0], "이미 얻은 문패는 다시 세지 않는다");
    openRun("d0", 0, [], [], { dev: false, gained: [], report: null });
    act(F.move(M, S, 62)); act(F.confirm(M, S));
    eq(store.data.causes, { extra: 1 }, "채점한 오답의 까닭을 센다");
    const before = JSON.stringify(store.data);
    tOpen("d1-01", 0); act(F.move(M, S, 62)); act(F.confirm(M, S)); act(Object.assign({}, tPlay(M, 0, () => {}).S, { fx: [] })); act({ advance: true });
    eq(JSON.stringify(store.data), before, "바로가기로 연 배달은 기록하지 않는다");
  }, true);
});
```

하지 말 것:
- 다시 낸 배달의 결과를 통과 계산에 넣지 않는다. 마감 배달을 다시 내지 않는다.
- 저장된 값을 확인 없이 믿고 배달을 열지 않는다. 이어하기는 resumePlan을 거친다.
- 듣는 도중이나 프레임 함수 안에서 저장하지 않는다. 저장은 듣기 단계에 들어설 때와 그날을 마칠 때다.
- 통과하지 못했다고 꾸짖는 글을 넣지 않는다. 벌점을 주지 않는다.

보고: index.html#test의 첫 줄, 주소 끝에 아무것도 붙이지 않고 0단을 끝까지 했을 때 마감 화면의 글, 새로고침한 뒤의 첫 배달, 콘솔 오류 수, 조각에서 바꾼 글자(없어야 한다).
````

**완료 기준.** 저장된 기록이 없는 상태에서 시작한다(개발자 도구의 Application → Local Storage에서 `twn_save_v1`을 지운다).

- `index.html#test`의 첫 줄: `자가검사 46/46 (전체 47개 중 46개 작성) · TH 12/12 · CH 4/4 · SC 3/3 · JB 4/4 · FL 5/5 · AU 8/8 · ST 4/4 · SV 4/4 · CT 2/2`
- 콘솔 오류 0, 외부 요청 0.
- 주소 끝에 아무것도 붙이지 않고 열면 0단의 첫 배달에서 시작한다. 배달 하나를 듣기 단계까지 하면 `localStorage`의 `twn_save_v1`에 하던 배달일(`active`)이 `{ day: "d0", index: 1, results: [1], requeue: [], gained: [] }`로 적힌다.
- d0-02를 한 번 틀리면 ◐가 되고, 여섯째 배달 뒤에 d0-02가 한 번 더 나온다. 그다음이 마감 배달 d0-07이다.
- 마감 화면에 "한 번에 배달한 편지 6/7"과 "통과했어요. 도장을 받았어요."가 뜬다. 다시 낸 배달은 세지 않는다.
- 새로고침하면 1단의 첫 배달에서 시작한다(지도가 생기기 전의 임시 규칙: 통과하지 않은 첫 배달일). 배달 셋을 마친다.
- 다시 새로고침하면 넷째 배달(d1-04)에서 이어진다. 진행 점 셋이 채워져 있고 앞에서 얻은 문패(C♯, D♭, F♯, G♭)가 남아 있다.
- 1단을 넷째, 다섯째, 여섯째 배달에서 한 번씩 틀리며 마치면 "한 번에 배달한 편지 4/7"과 "한 번에 배달한 편지가 6통이면 다음 배달일이 열려요.", "새 문패 10개"가 뜬다. 새로고침하면 다시 1단의 첫 배달이다.
- `#d1`처럼 바로가기로 열면 기록하지 않는다. 끝까지 해도 `twn_save_v1`이 생기지 않고 마감 화면에 "바로가기로 열어서 기록하지 않았어요."가 붙는다.

### P18 [그대로] 발견 장면

| 항목 | 내용 |
|---|---|
| 단계 | PO6 |
| 시작 전 `#test` | `자가검사 46/46 (전체 47개 중 46개 작성) · TH 12/12 · CH 4/4 · SC 3/3 · JB 4/4 · FL 5/5 · AU 8/8 · ST 4/4 · SV 4/4 · CT 2/2` |
| 끝난 뒤 `#test` | `자가검사 47/47 (전체 47개 중 47개 작성) · TH 12/12 · CH 4/4 · SC 3/3 · JB 4/4 · FL 5/5 · AU 8/8 · ST 4/4 · SV 4/4 · CT 3/3` |
| 조각 | 4개(구획 2, 구획 3, 구획 4, 구획 11에 검사 1개) |

**무엇이 들어가는가.** 발견 장면은 배달 사이에 끼는 비교 화면이다. 채점하지 않는다. 배달 화면의 다섯 줄을 그대로 쓴다.

- **장면의 모델(구획 2).** `sceneModel(씨앗, 배달일)`이 무대에 그릴 것을 만든다. 배달 모델과 같은 꼴이어서 길, 악보, 걸음, 문패 판의 그리기가 그대로 그린다. 편지 카드 자리에는 머리표 "발견"과 제목, 봉투에는 "주소 n개 / 한 집"(S1은 "한 칸 / 반음")이 들어간다. 문장은 `SCENE_LINES`의 함수가 만든다. "셋", "둘", "열두", "35", "미와 파, 시와 도" 같은 수와 낱말은 엔진이 센 값이다.
- **씨앗(구획 3).** `SCENES` 여섯. `after`는 그 배달을 마친 뒤에 끼운다는 뜻이다. S1은 d0-04, S2는 d1-02, S3은 d2-01, S4는 d2-03, S5는 d4-05, S6은 d5-07 뒤다.
- **끼어들기(구획 4).** `next` 갈고리가 듣기 단계의 주 단추를 받아, 방금 마친 배달 뒤에 아직 보지 않은 장면이 있으면 연다. 첫 번째 배달 뒤에만 끼어든다. 장면 안에서는 주 단추가 문장을 하나씩 넘기고([다음]), 마지막 문장에서 [알겠어요]가 되어 다음 배달로 간다. 본 장면은 저장의 `scenes`에 적힌다. [들어 보기]는 무대의 주소들을 듣기와 같은 규칙으로 낸다. S1은 걸음마다 두 집을 차례로 낸다.
- **검사 1개.** CT-02. 배달 46건, 장면 여섯의 자리, 주소 35 = 7 + 28, 주소가 둘인 집은 하나, 장면의 문패와 문장, 끼어들기와 들어 보기.

| 장면 | 자리 | 무대 | 문장 |
|---|---|---|---|
| S1 한 칸이 반음 | d0-04 뒤 | 한 칸 걸음 넷(도→검은 집, 미→파, 라→검은 집, 시→도). 미·파·시·도 집이 밝다 | 집과 집 사이 한 칸이 반음이에요. / 미와 파, 시와 도 사이에는 검은 집이 없어요. / 그래도 한 칸이에요. |
| S2 두 주소, 한 집 | d1-02 뒤 | 문패 C♯4, D♭4 | 주소는 다른데 집이 같아요. / 이런 이름들을 딴이름한소리라고 해요. / 피아노처럼 조율한 악기에서는 소리도 같아요. |
| S3 기호가 붙어도 흰 집 | d2-01 뒤 | 문패 E♯4, F4 | 샵은 "검은 집"이 아니라 "오른쪽으로 한 칸"이에요. / 미의 오른쪽은 바로 파예요. |
| S4 숫자는 글자를 따라가요 | d2-03 뒤 | 문패 B♯3, C4. 걸음이 구역 경계를 넘는다 | B♯3의 3은 출발 집의 구역이에요. / 걸어서 경계를 넘으면 4구역의 집에 닿아요. |
| S5 세 주소 | d4-05 뒤 | 문패 D4, C𝄪4, E𝄫4. 도·레·미 집이 밝다 | 이 집에서 두 칸 안에 흰 집이 셋이에요. / 흰 집마다 주소가 하나씩 나와요. |
| S6 이 집만 둘 | d5-07 뒤 | 문패 G♯4, A♭4. 솔·라 집이 밝다 | 두 칸 안의 흰 집이 솔과 라 둘뿐이에요. / 열두 집 가운데 이 집만 주소가 둘이라서 주소는 모두 35개예요. |

````text
[P18 · 그대로] 발견 장면

P00의 W1~W5를 지킨다.

시작 전: index.html#test의 첫 줄이 아래와 같은지 확인한다. 다르면 멈추고 보고한다.
  자가검사 46/46 (전체 47개 중 46개 작성) · TH 12/12 · CH 4/4 · SC 3/3 · JB 4/4 · FL 5/5 · AU 8/8 · ST 4/4 · SV 4/4 · CT 2/2

할 일: 아래 조각 4개를 적힌 자리에 글자 그대로 넣는다. 자리는 마커 줄의 바로 위다. 마커 줄은 그대로 둔다.

조각 1/4 · 넣을 자리: `// -- 2 끝 --` 줄 바로 위 (구획 2 FLOW)
```js

// ── 발견 장면: 배달 화면의 무대를 그대로 쓰는 모델. 채점하지 않는다 ──
const COUNT_KO = ["", "하나", "둘", "셋"];
const jong = (word) => (word.charCodeAt(word.length - 1) - 0xAC00) % 28 > 0;   // 한글 낱말이 받침으로 끝나는가
const solOf = (midi) => SOL[whiteAt(midi).L];
const andKo = (a, b) => `${a}${jong(a) ? "과" : "와"} ${b}`;
const SCENE_LINES = {                                                    // 장면의 문장. 수와 낱말은 모델과 엔진에서 가져온다. 판독 줄에 하나씩 보인다
  S1: (m) => { const pairs = []; for (let i = 0; i < m.glow.length; i += 2) pairs.push(andKo(solOf(m.glow[i]), solOf(m.glow[i + 1]))); return ["집과 집 사이 한 칸이 반음이에요.", `${pairs.join(", ")} 사이에는 검은 집이 없어요.`, "그래도 한 칸이에요."]; },
  S2: () => ["주소는 다른데 집이 같아요.", "이런 이름들을 딴이름한소리라고 해요.", "피아노처럼 조율한 악기에서는 소리도 같아요."],
  S3: (m) => { const p = m.board0[0], to = solOf(m.target); return [`${signKo(p.a)}은 "검은 집"이 아니라 "${hopsKo(p.a)}"이에요.`, `${SOL[p.L]}의 ${dirKo(p.a)}은 바로 ${to}${jong(to) ? "이에요" : "예요"}.`]; },
  S4: (m) => { const p = m.board0[0]; return [`${T(p)}의 ${numJosa(p.o, "은", "는")} 출발 집의 구역이에요.`, `걸어서 경계를 넘으면 ${zoneOf(m.target)}구역의 집에 닿아요.`]; },
  S5: (m) => { const n = COUNT_KO[m.glow.length]; return [`이 집에서 ${NUM_KO[MAXA]} 칸 안에 흰 집이 ${n}${jong(n) ? "이에요" : "예요"}.`, "흰 집마다 주소가 하나씩 나와요."]; },
  S6: (m) => {
    const n = COUNT_KO[m.glow.length], houses = MAJOR.reduce((s, x) => s + x, 0);                       // 한 구역의 집 수
    let total = 0;
    for (let i = 0; i < houses; i++) total += spellingsAt(m.target + i).length;                        // 한 구역의 주소 수
    return [`${NUM_KO[MAXA]} 칸 안의 흰 집이 ${andKo(solOf(m.glow[0]), solOf(m.glow[1]))} ${n}뿐이에요.`,
            `${houses >= 10 ? "열" : ""}${NUM_KO[houses % 10]} 집 가운데 이 집만 주소가 ${n}${jong(n) ? "이라서" : "라서"} 주소는 모두 ${total}개예요.`];
  },
};
function sceneModel(sc, day) {                                           // 장면 씨앗과 그 장면이 끼어드는 배달일에서 모델을 만든다
  const names = sc.house ? spellingsAt(midiOf(parse(sc.house)), day.signs) : (sc.names || []).map(parse);
  const hops = sc.hops ? sc.hops.map((h) => [midiOf(parse(h[0])), h[1]]) : null;
  const target = names.length ? midiOf(names[0]) : null, white = target === null ? null : whiteAt(target);
  const board = sc.names && names.length === 1 && names[0].a && white ? names.concat([white]) : names;   // 주소 하나만 보여 줄 때는 도착한 흰 집의 제 이름을 곁에 단다
  const anchors = board.map((p) => midiOf(anchorOf(p))), needs = hops ? hops.flatMap((h) => [h[0], h[0] + h[1]]) : anchors.concat([target]);
  const m = { job: { id: sc.id }, day, ask: "scene", show: "both", hop: false, note: null, steps: 0, from: needs[0], target, names: board, board0: board, rest: [], todo: 0,
              preview: false, final: false, win: windowFor(needs), card: { chip: "발견", text: sc.title } };
  if (hops) {
    m.hops = hops;                                                       // 걸음만 그린다
    m.glow = hops.filter((h) => isWhite(h[0]) && isWhite(h[0] + h[1])).flatMap((h) => [h[0], h[0] + h[1]]);   // 검은 집 없이 이웃한 흰 집들을 밝힌다
    m.tune = { mids: hops.flatMap((h) => [h[0], h[0] + h[1]]), together: false };                      // 들어 보기: 걸음마다 두 집을 차례로
    m.env = { label: "한 칸", name: "반음", note: "" };
  } else {
    if (sc.house) m.glow = anchors;                                      // 두 칸 안의 흰 집들을 밝힌다
    m.env = { label: `주소 ${board.length}개`, name: "한 집", note: "" };
  }
  m.lines = SCENE_LINES[sc.id](m);
  return m;
}
```

조각 2/4 · 넣을 자리: `// -- 3 끝 --` 줄 바로 위 (구획 3 JOBS)
```js
// 발견 장면 씨앗. after: 이 배달을 마친 뒤에 끼운다 · names: 걸음과 문패를 그릴 주소 · house: 그 집의 주소 전부를 그린다 · hops: 걸음만 그린다(출발 집, 걸음 수)
const SCENES = [
  { id: "S1", title: "한 칸이 반음", after: "d0-04", hops: [["C4", 1], ["E4", 1], ["A4", 1], ["B4", 1]] },
  { id: "S2", title: "두 주소, 한 집", after: "d1-02", names: ["C#4", "Db4"] },
  { id: "S3", title: "기호가 붙어도 흰 집", after: "d2-01", names: ["E#4"] },
  { id: "S4", title: "숫자는 글자를 따라가요", after: "d2-03", names: ["B#3"] },
  { id: "S5", title: "세 주소", after: "d4-05", house: "D4" },
  { id: "S6", title: "이 집만 둘", after: "d5-07", house: "G#4" },
];
```

조각 3/4 · 넣을 자리: `// -- 4 끝 --` 줄 바로 위 (구획 4 STATE)
```js

// ── 발견 장면 ──
const sceneDay = (sc) => DAYS.find((d) => d.jobs.some((j) => j.id === sc.after));
function openScene(sc, from) {                                           // 장면을 연다. 모델을 먼저 만들고 상태를 한 번에 넣는다. from: 닫은 뒤 돌아갈 곳
  emit("leave");
  M = sceneModel(sc, sceneDay(sc));
  setState({ screen: "scene", scene: { id: sc.id, line: 0, from }, phase: "deliver", pos: M.from, picked: false, tries: 0, flawed: false, pen: { h: null, a: null },
             board: M.board0.slice(), picks: [], off: [], mine: null, goal: null, lit: -1, done: "", msg: say("", M.lines[0]) });
}
function closeScene() {                                                  // 마지막 문장에서 [알겠어요]: 본 장면을 적고 돌아간다
  if (!S.dev && !store.data.scenes.includes(S.scene.id)) { store.data.scenes = store.data.scenes.concat([S.scene.id]); store.save(); }
  if (S.scene.from === "run") nextJob(); else goHome();
}
on("next", () => {                                                       // 주 단추가 '다음'을 냈다. 여기서 처리했으면 true
  if (S.screen === "scene") {
    const line = S.scene.line + 1;
    if (line >= M.lines.length) { closeScene(); return true; }
    emit("leave");                                                       // 듣던 것을 멈춘다
    setState({ scene: Object.assign({}, S.scene, { line }), lit: -1, msg: say("", M.lines[line]) });
    return true;
  }
  const first = S.screen === "run" && S.idx < dayNow().jobs.length - 1;    // 첫 번째 배달 뒤에만 끼어든다. 다시 낸 배달 뒤에는 끼어들지 않는다
  const sc = first && SCENES.find((x) => x.after === M.job.id && (S.dev || !store.data.scenes.includes(x.id)));
  if (!sc) return false;
  openScene(sc, "run");
  return true;
});
atBoot(51, () => {                                                       // 주소 끝에 #S2를 붙여 열면 그 장면에서 시작한다. 개발용이고 저장하지 않는다
  const sc = SCENES.find((x) => "#" + x.id === location.hash), d = sc && sceneDay(sc);
  if (!sc) return;
  store.hold = true;
  openRun(d.id, d.jobs.findIndex((j) => j.id === sc.after), [], [], { dev: true });
  openScene(sc, "run");
});
```

조각 4/4 · 넣을 자리: `// -- 11 끝 --` 줄 바로 위 (구획 11 TESTS)
```js
test("CT-02", "내용의 수가 엔진의 값과 같다", (ok, eq) => {
  eq(DAYS.reduce((s, d) => s + d.jobs.length, 0), 46, "배달 46건");
  eq(SCENES.map((sc) => sc.id + " " + sc.after), ["S1 d0-04", "S2 d1-02", "S3 d2-01", "S4 d2-03", "S5 d4-05", "S6 d5-07"], "발견 장면 여섯의 자리");
  const houses = [...Array(12)].map((x, i) => spellingsAt(60 + i)), total = houses.reduce((s, x) => s + x.length, 0), two = houses.filter((x) => x.length === 2);
  eq([total, houses.filter((x) => x.some((p) => p.a === 0)).length, total - 7], [35, 7, 28], "주소 35개 = 글자 문패 7 + 얻는 문패 28");
  eq([two.length, tK(two[0])], [1, ["G#4", "Ab4"]], "주소가 둘인 집은 하나뿐이다");
  const ms = {};
  for (const sc of SCENES) {
    const d = sceneDay(sc), m = ms[sc.id] = sceneModel(sc, d), ends = m.hops ? m.hops.flatMap((h) => [h[0], h[0] + h[1]]) : m.board0.flatMap((p) => [midiOf(anchorOf(p)), midiOf(p)]);
    ok(!!d && !d.jobs.find((j) => j.id === sc.after).final, "마감 배달이 아닌 배달 뒤에 온다 " + sc.id);
    ok(Object.keys(sc).every((k) => ["id", "title", "after", "names", "house", "hops"].includes(k)), "장면 씨앗의 열쇠 " + sc.id);
    ok(m.win !== null && ends.every((x) => x >= winLo(m.win) && x <= winHi(m.win)), "그릴 것이 한 창에 들어온다 " + sc.id);
    ok(m.lines.length >= 2 && m.lines.length <= 3 && m.lines.every((t) => t.length > 0 && tTokens(t)), "문장은 둘이나 셋 " + sc.id);
    ok(m.board0.every((p) => midiOf(p) === m.target && d.signs.includes(p.a)), "문패는 모두 한 집의 주소이고 배운 기호다 " + sc.id);
  }
  eq([ms.S1.hops, ms.S1.glow, ms.S1.tune.mids], [[[60, 1], [64, 1], [69, 1], [71, 1]], [64, 65, 71, 72], [60, 61, 64, 65, 69, 70, 71, 72]], "S1: 한 칸 걸음 넷, 검은 집 없이 이웃한 흰 집 두 쌍");
  eq(ms.S1.lines[1], "미와 파, 시와 도 사이에는 검은 집이 없어요.", "S1의 흰 집 이름");
  ok(isEnharmonic(ms.S2.board0[0], ms.S2.board0[1]) && /딴이름한소리/.test(ms.S2.lines[1]), "S2: 두 주소가 딴이름한소리다");
  eq([tK(ms.S2.board0), tK(ms.S3.board0), tK(ms.S4.board0), tK(ms.S5.board0), tK(ms.S6.board0)], [["C#4", "Db4"], ["E#4", "F4"], ["B#3", "C4"], ["D4", "Cx4", "Ebb4"], ["G#4", "Ab4"]], "장면의 문패");
  eq(ms.S3.lines, ['샵은 "검은 집"이 아니라 "오른쪽으로 한 칸"이에요.', "미의 오른쪽은 바로 파예요."], "S3의 문장");
  eq(ms.S4.lines, ["⟦B#3⟧의 3은 출발 집의 구역이에요.", "걸어서 경계를 넘으면 4구역의 집에 닿아요."], "S4의 문장: 숫자와 구역");
  eq([ms.S5.glow, ms.S5.lines[0]], [[62, 60, 64], "이 집에서 두 칸 안에 흰 집이 셋이에요."], "S5: 흰 집 셋");
  eq([ms.S6.glow, ms.S6.lines], [[67, 69], ["두 칸 안의 흰 집이 솔과 라 둘뿐이에요.", "열두 집 가운데 이 집만 주소가 둘이라서 주소는 모두 35개예요."]], "S6: 흰 집 둘, 열두 집, 35개");
  eq([COUNT_KO[ms.S5.board0.length], COUNT_KO[ms.S6.board0.length], MAJOR.reduce((s, x) => s + x, 0)], ["셋", "둘", 12], "문장 속의 수는 엔진이 센 값이다");
  tWithAudio((c, log) => {                                               // 끼어들기와 들어 보기
    const play = () => act(Object.assign({}, tPlay(M, 0, () => {}).S, { fx: [] })), next = () => act({ advance: true });
    store.hold = true; store.data = blankSave();
    openRun("d0", 3, [], [], { dev: false, gained: [], report: null }); play(); next();
    ok(S.screen === "scene" && S.scene.id === "S1" && S.scene.line === 0 && S.msg.text === M.lines[0] && S.idx === 3 && S.results.length === 1, "d0-04 뒤에 S1이 끼어든다");
    beginListen();
    eq([log.osc.length, tRound(log.osc[7].startAt - log.osc[0].startAt), new Set(log.osc.map((e) => e.startAt)).size], [8, 5.6, 8], "S1의 들어 보기: 여덟 집을 0.8초마다 차례로");
    next();
    ok(S.scene.line === 1 && run === null && S.msg.text === M.lines[1] && log.osc.every((e) => e.cancels.length === 1), "다음 문장으로 가면 듣던 것을 멈춘다");
    next(); ok(S.screen === "scene" && S.scene.line === 2 && store.data.scenes.length === 0, "문장을 하나씩 넘긴다");
    next(); ok(S.screen === "run" && S.scene === null && M.job.id === "d0-05" && S.idx === 4, "마지막 문장 뒤에 다음 배달로 간다");
    eq(store.data.scenes, ["S1"], "본 장면을 적는다");
    openRun("d0", 3, [], [], { dev: false, gained: [], report: null }); play(); next();
    ok(S.screen === "run" && M.job.id === "d0-05", "본 장면은 다시 끼어들지 않는다");
    openRun("d1", 6, [1], [], { dev: false, gained: [], report: null }); play(); next();
    ok(M.job.id === "d1-07" && S.screen === "run" && !store.data.scenes.includes("S2"), "다시 낸 배달 뒤에는 끼어들지 않는다");
    openScene(SCENES[1], "run"); log.osc.length = 0; beginListen();
    eq(log.osc.map((e) => [e.freq, tRound(e.startAt - log.osc[0].startAt), e.peak]), [[277.18, 0, 0.3], [277.18, 0.8, 0.3], [277.18, 1.6, 0.15], [277.18, 1.6, 0.15]], "S2의 들어 보기: 두 주소를 차례로, 그리고 함께");
  });
});
atBoot(92, () => { window.__twn.scene = (id, line) => { store.hold = true; openScene(SCENES.find((sc) => sc.id === id), "run"); if (line) setState({ scene: Object.assign({}, S.scene, { line }), msg: say("", M.lines[line]) }); }; });   // 점검용
```

하지 말 것:
- 장면의 문장에 수나 계이름을 글자로 적어 넣지 않는다. 엔진이 센 값으로 조립한다.
- 문장을 한꺼번에 보여 주지 않는다. 판독 줄에 한 번에 하나다(320px 폭에서 두 줄을 넘지 않게).
- 장면에서 채점하지 않는다. 장면을 건너뛸 수 없게 막지도 않는다(주 단추로 바로 넘어간다).
- "언제나 같은 주파수" 같은 말을 쓰지 않는다. S2의 셋째 문장은 그대로 둔다.

보고: index.html#test의 첫 줄, index.html#S2를 열었을 때 보이는 것과 [다음]을 눌러 본 결과, 콘솔 오류 수, 조각에서 바꾼 글자(없어야 한다).
````

**완료 기준.** 저장된 기록이 없는 상태에서 시작한다.

- `index.html#test`의 첫 줄: `자가검사 47/47 (전체 47개 중 47개 작성) · TH 12/12 · CH 4/4 · SC 3/3 · JB 4/4 · FL 5/5 · AU 8/8 · ST 4/4 · SV 4/4 · CT 3/3`
- 콘솔 오류 0, 외부 요청 0.
- `#S2`: 편지 카드에 머리표 "발견"과 "두 주소, 한 집", 문패 판에 C♯4와 D♭4, 봉투에 "주소 2개", "한 집", 판독 줄에 "주소는 다른데 집이 같아요."가 보인다. 조작부는 [들어 보기]와 [다음]이다.
- [다음]을 두 번 누르면 "피아노처럼 조율한 악기에서는 소리도 같아요."가 보이고 주 단추가 [알겠어요]가 된다. 누르면 다음 배달 d1-03으로 간다.
- `#S1`: 문패 판과 우체부 없이 한 칸 걸음 넷이 그려지고 미, 파, 시, 도 집의 아래쪽이 밝다. [들어 보기]를 누르면 걸음이 차례로 굵어진다. 판독 줄의 문장은 그대로다.
- `#S5`: 문패 D4, C𝄪4, E𝄫4가 달리고 도, 레, 미 집의 아래쪽이 밝다. 판독 줄: "이 집에서 두 칸 안에 흰 집이 셋이에요."
- 주소 끝에 아무것도 붙이지 않고 0단을 하면 d0-04를 마친 뒤 S1이 끼어든다. 문장 셋을 넘기면 d0-05로 가고 `twn_save_v1`의 `scenes`에 `"S1"`이 적힌다.
- 그 0단을 마치고 새로고침하면 1단이다. 1단의 d1-02 뒤에는 S2가 끼어든다. 0단을 다시 하면 S1은 끼어들지 않는다.

### P19 [그대로] 임시 지도

| 항목 | 내용 |
|---|---|
| 단계 | PO6 |
| 시작 전 `#test` | `자가검사 47/47 (전체 47개 중 47개 작성) · TH 12/12 · CH 4/4 · SC 3/3 · JB 4/4 · FL 5/5 · AU 8/8 · ST 4/4 · SV 4/4 · CT 3/3` |
| 끝난 뒤 `#test` | 같다 |
| 조각 | 6개(지울 것 하나, 화면 틀, 스타일, 구획 4, 구획 10, 구획 8) |

**무엇이 들어가는가.**

- **지울 것.** P17의 임시 규칙 세 줄(`goHome = () => { … };`). 이 문서에서 이미 있는 줄을 지우는 것은 이 조각 하나뿐이다.
- **지도(구획 4, 구획 10, 화면 틀).** `showMap(note)`가 지도를 연다. 처음 화면이 지도가 된다. 지도에는 배달일 여섯 줄이 있고 줄마다 이름과 한 줄 상태가 적힌다. 잠긴 배달일에는 까닭("0단을 통과하면 열려요"), 아직 하지 않은 배달일에는 "배달 7건", 해 본 배달일에는 "한 번에 배달 6/7"과 도장이 적힌다. 하던 배달일이 있으면 [이어서 배달: 1단 3번째 편지]가 뜬다. 저장을 읽지 못했거나 저장할 수 없으면 그 사실을 한 줄로 알린다. 맨 아래에 "자가검사 47/47"이 있다.
- **나가기(구획 8).** HUD의 [지도]는 묻지 않고 지도로 간다. 저장된 것이 있으면 "여기까지 저장했어요. [이어서 배달]로 돌아와요."를 보인다. 마감 화면의 [지도로]도 지도로 간다. 바로가기로 연 창에는 두 단추가 없다.

이 지도는 임시다. 글과 단추만 있다. 타이틀과 정식 지도는 P20에서 만든다.

````text
[P19 · 그대로] 임시 지도

P00의 W1~W5를 지킨다. 이 프롬프트의 첫 조각은 넣는 것이 아니라 지우는 것이다.

시작 전: index.html#test의 첫 줄이 아래와 같은지 확인한다. 다르면 멈추고 보고한다.
  자가검사 47/47 (전체 47개 중 47개 작성) · TH 12/12 · CH 4/4 · SC 3/3 · JB 4/4 · FL 5/5 · AU 8/8 · ST 4/4 · SV 4/4 · CT 3/3

할 일: 아래 조각 6개를 차례로 한다. "지울 것"은 그 글자를 찾아 그 줄들만 지운다(한 군데에만 있다). "넣을 자리"는 마커 줄의 바로 위에 글자 그대로 넣는다. 마커 줄은 그대로 둔다.

조각 1/6 · 지울 것: 아래 글자를 찾아 그 줄들만 지운다
```js
goHome = () => {                                                         // 지도가 생기기 전의 임시 규칙: 하던 배달일을 잇고, 없으면 아직 통과하지 않은 첫 배달일을 연다
  if (!resume()) startDay((DAYS.find((d) => !(store.data.days[d.id] || {}).passed) || DAYS[DAYS.length - 1]).id);
};
```

조각 2/6 · 넣을 자리: `<!-- -- 화면 끝 -- -->` 줄 바로 위 (화면 틀의 끝)
```html
<div class="sheet" id="mapScreen" hidden>
  <h2>두 이름의 음악 마을</h2>
  <p id="mapNote"></p>
  <button type="button" id="mapResume" hidden></button>
  <ol id="mapList"></ol>
  <p id="mapTests"></p>
</div>
```

조각 3/6 · 넣을 자리: `/* -- 스타일 끝 -- */` 줄 바로 위 (스타일의 끝)
```css
#mapScreen{justify-content:flex-start;overflow:auto;gap:10px;background:var(--counter)}
#mapList{width:100%;max-width:340px;display:flex;flex-direction:column;gap:6px}
#mapList button{width:100%;height:auto;min-height:48px;padding:5px 14px;display:flex;flex-direction:column;align-items:flex-start;justify-content:center;gap:1px;text-align:left;font-size:15px;line-height:1.3}
#mapList button small{font-size:12px;font-weight:400}
#mapList button:disabled{background:var(--panel);color:var(--ink-2);border:1.5px dashed var(--ink-2)}
#mapTests{font-size:12px;color:var(--ink-2)}
```

조각 4/6 · 넣을 자리: `// -- 4 끝 --` 줄 바로 위 (구획 4 STATE)
```js

// ── 지도 ──
function showMap(note) {                                                 // 지도를 연다. note: 지도 위에 적을 한 줄
  emit("leave");
  setState({ screen: "map", scene: null, note: note || "" });
}
goHome = () => showMap("");                                              // 처음 화면은 지도다
```

조각 5/6 · 넣을 자리: `// -- 10 끝 --` 줄 바로 위 (구획 10 SCREENS)
```js
onPaint(12, () => {                                                      // 임시 지도: 배달일 여섯과 하던 배달일. 정식 지도가 생기면 이 그리기를 갈아 끼운다
  $("mapScreen").hidden = S.screen !== "map";
  $("exitBtn").hidden = $("toMap").hidden = S.dev;                       // 바로가기로 연 창에서는 지도로 가지 않는다
  if (S.screen !== "map") return;
  const a = resumePlan(store.data.active), tests = window.__tests || [];
  $("mapNote").textContent = S.note || (store.why ? "저장된 기록을 읽지 못해 새로 시작했어요. 원본은 따로 남겨 두었어요." : !store.persistent ? "이 기기에서는 기록이 저장되지 않아요." : "배달일을 골라요.");
  $("mapResume").hidden = !a;
  if (a) {
    const d = dayOf(a.day), over = a.index >= queueOf(d.jobs.length, a.requeue).length;
    $("mapResume").textContent = `이어서 배달: ${DAYS.indexOf(d)}단 ${over ? "마감하기" : a.index + 1 + "번째 편지"}`;
  }
  $("mapList").innerHTML = DAYS.map((d, k) => {
    const rec = store.data.days[d.id], n = d.jobs.length, open = dayOpen(d.id);
    const status = !open ? `${k - 1}단을 통과하면 열려요` : !rec ? `배달 ${n}건` : `한 번에 배달 ${rec.best}/${n}` + (rec.stamp === 2 ? " · 한 번에 배달 도장" : rec.stamp === 1 ? " · 도장" : ` · ${passNeed(n)}통부터 통과`);
    return `<li><button type="button" data-d="${d.id}"${open ? "" : " disabled"}><b>${k}단 ${d.name}</b><small>${status}</small></button></li>`;
  }).join("");
  $("mapTests").textContent = `자가검사 ${tests.filter((t) => t.pass).length}/${tests.length}`;
});
```

조각 6/6 · 넣을 자리: `// -- 8 끝 --` 줄 바로 위 (구획 8 INPUT)
```js
$("mapList").addEventListener("click", (e) => { const b = e.target.closest("button"); if (b && !b.disabled) startDay(b.dataset.d); });
$("mapResume").addEventListener("click", () => { if (!resume()) showMap(""); });
$("exitBtn").addEventListener("click", () => showMap(store.data.active && store.persistent ? "여기까지 저장했어요. [이어서 배달]로 돌아와요." : ""));   // 배달 도중에 나간다. 묻지 않는다
$("toMap").addEventListener("click", () => showMap(""));
```

하지 말 것:
- 첫 조각 말고 다른 줄을 지우지 않는다. startDay와 resume은 남긴다.
- 지도에 그림이나 장식을 넣지 않는다. 이 지도는 임시다.
- 나갈 때 "정말 나갈까요?"를 묻지 않는다. 묻지 않고 저장한다.
- 브라우저의 주소 기록(history)을 쓰지 않는다. 화면 전환은 상태로만 한다.

보고: index.html#test의 첫 줄, 주소 끝에 아무것도 붙이지 않고 열었을 때 지도에 보이는 것, 콘솔 오류 수, 지운 줄 수(3줄), 조각에서 바꾼 글자(없어야 한다).
````

**완료 기준.** 저장된 기록이 없는 상태에서 시작한다.

- `index.html#test`의 첫 줄: `자가검사 47/47 (전체 47개 중 47개 작성) · TH 12/12 · CH 4/4 · SC 3/3 · JB 4/4 · FL 5/5 · AU 8/8 · ST 4/4 · SV 4/4 · CT 3/3`
- 콘솔 오류 0, 외부 요청 0.
- 처음 화면은 지도다. 배달일 여섯 줄 가운데 0단만 누를 수 있고 1단에는 "0단을 통과하면 열려요"가 적혀 있다. 맨 아래에 "자가검사 47/47"이 보인다.
- 0단을 눌러 한 번도 틀리지 않고 마치면 마감 화면에 "모두 한 번에 배달했어요. 한 번에 배달 도장을 받았어요."가 뜬다. [지도로]를 누르면 0단에 "한 번에 배달 7/7 · 한 번에 배달 도장"이 적히고 1단이 열린다.
- 1단에서 배달 둘을 마치고 HUD의 [지도]를 누르면 묻지 않고 지도로 간다. "여기까지 저장했어요. [이어서 배달]로 돌아와요."와 [이어서 배달: 1단 3번째 편지]가 보인다.
- 새로고침해도 지도에 [이어서 배달: 1단 3번째 편지]가 있다. 누르면 d1-03에서 이어진다.
- `#d3`처럼 바로가기로 연 창에는 HUD의 [지도]가 없고 마감 화면에 [지도로]가 없다.
- 스크립트에서 `goHome`에 값을 넣는 곳은 처음 선언과 지도, 두 곳뿐이다. P17의 임시 규칙은 지워졌다.

**여기까지가 [그대로]다.** `index.html`은 2,122줄, 153,276바이트다. 화면 점검 도구를 통째로 돌려 본다.

```
node tools/check.mjs index.html
```

기대하는 합계는 이렇다. 화면 여덟 줄이 모두 `장면 769 … 문제 0`, 문구 네 줄이 모두 `문구 424 … 넘침 0 카드 61 넘침 0`, 그리고 `"flow:pass":53`, `"keys:pass":22`, `"audio:pass":19`, `"resize:pass":7`, `"days:pass":45`, `실패 0`.

### P20 [설계] 타이틀, 정식 지도와 마감, 소리 확인

여기서부터 [설계]다. 요구와 완료 기준만 있고 결과물은 확인하지 못했다. AI에게 먼저 계획을 받아 읽고 나서 만들게 한다.

````text
[P20 · 설계] 타이틀, 정식 지도와 마감 화면, 소리 확인 장, 오류 화면

P00의 규칙 전부를 지킨다. 특히 W6~W11. 근거는 docs/의 설계서 7.5절, 8.5절, 8.8절, 9.4절, 10.7절이다.

시작 전: index.html#test의 첫 줄이 "자가검사 47/47 …"인지 확인한다. 아니면 멈추고 보고한다.

먼저 계획을 말한다(코드를 쓰기 전). 더할 화면 틀의 id, 상태 S에 더할 값, 쓸 갈고리와 순서, 저장에 쓸 필드를 적고 확인을 받는다.

만들 것:
1. 타이틀 화면(#titleScreen). 제목 "두 이름의 음악 마을", [배달 시작](#startBtn), [주소록], [자유 마을], [설정]. 뒤의 셋은 아직 화면이 없으므로 꺼 둔 채 자리만 둔다(P22, P25, P26에서 켠다).
   - 처음 화면이 타이틀이다. S.screen에 "title"을 더한다. goHome이 타이틀을 연다.
   - 하던 배달일이 있으면(resumePlan(store.data.active)) [배달 시작]이 [이어서 배달]이 되고 누르면 resume()으로 그 배달에서 시작한다. 없으면 지도로 간다.
   - 소리는 전역 언락이 첫 손짓에 연다. 타이틀에서 따로 할 일은 없다.
2. 정식 마을 지도. P19의 임시 지도(#mapScreen과 구획 10의 onPaint(12, …))를 갈아 끼운다. 이 부분은 W6의 예외로 고쳐도 된다.
   - 배달일 0~5단. 단마다 이름, 도장(그림. 통과 1, 한 번에 배달 2), 한 번에 배달한 편지의 최고 기록, 잠긴 까닭.
   - 6단과 7단의 자리에는 "준비 중"을 적는다. 누를 수 없다.
   - 아래 id와 글은 그대로 지킨다. 화면 점검 도구가 읽는다: #mapList 안의 단추마다 data-d="d0"…, 잠긴 단추는 disabled, 잠긴 까닭의 글 "n단을 통과하면 열려요", 기록의 글 "한 번에 배달 6/7", #mapResume, #mapNote, #mapTests, #toMap, #exitBtn.
   - [뒤로]는 타이틀로 간다. 브라우저의 주소 기록은 쓰지 않는다.
3. 정식 마감 화면. #closing의 내용을 다듬는다: 한 번에 배달한 수, 도장 그림, 새 문패(문패 모양으로), 배달별 기록, [다시 배달] [지도로]. #closeSum, #closeNote, #restart, #toMap의 id와 P17이 적는 글은 지킨다.
4. 소리 확인 장(#soundCheck). 기록이 없는 사람이 0단을 처음 시작할 때 한 번 뜬다(store.data.settings.soundChecked).
   - 집의 소리 하나(A4)를 들려주고 "소리가 들리나요?"를 묻는다. [들려요](#soundYes), [안 들려요](#soundNo), [다시 듣기].
   - [안 들려요]: "폰의 음량과 무음 스위치를 확인해 주세요. 소리 없이도 배달할 수 있어요."를 보이고 [다시 듣기]와 [그냥 시작]을 둔다.
   - 소리는 tone()으로 낸다. 새 발진기 코드를 쓰지 않는다.
5. 오류 화면(#errorScreen). window의 error와 unhandledrejection을 한 번만 받아 "문제가 생겼어요."와 [새로고침]을 보인다. 오류를 삼키지 않는다(콘솔에는 그대로 남는다).

지킬 것:
- 새 화면은 구획 10에 onPaint로 그리고, 입력은 구획 8에, 상태를 바꾸는 함수는 구획 4에 둔다. 조각은 마커 줄 위에 덧붙인다.
- 화면 전환은 setState({ screen: … }) 하나로 한다. 화면을 떠날 때는 emit("leave")를 먼저 부른다(듣기가 멈춘다).
- 겹쳐 뜨는 화면이 떠 있는 동안 #app은 inert다(구획 10의 onPaint(10, …)가 한다. "title"에서도 그렇게 되는지 확인한다).
- 바로가기로 연 창(S.dev)에서는 타이틀과 지도로 가지 않는다.
- 글은 해요체, 두 문장 이내. 이모지와 도형 글자를 쓰지 않는다. 도장과 문패는 SVG나 CSS로 그린다.
- 타이머로 화면을 넘기지 않는다.

완료 기준:
- index.html#test가 47/47 그대로다.
- 주소 끝에 아무것도 없이 열면 타이틀 → [배달 시작] → 지도 → 0단 → (처음이면 소리 확인 장) → 배달 → 마감 → [지도로] → 지도의 순서로 돈다.
- 배달 도중 새로고침하면 타이틀에 [이어서 배달]이 있고, 누르면 그 배달에서 시작한다.
- 소리 확인 장은 한 번 답한 뒤에는 다시 뜨지 않는다. 새로고침해도 그렇다.
- 320×545, 320×568, 360×640, 390×844에서 타이틀, 지도, 마감, 소리 확인 장에 가로 스크롤이 없고 글자 12px, 단추 44px 이상이다.
- node tools/check.mjs index.html 이 실패 0이다(days 묶음은 타이틀과 소리 확인 장을 알아서 지나간다. #titleScreen, #startBtn, #soundCheck, #soundYes의 id가 위와 같아야 한다).

보고: 계획과 달라진 점, 더한 id와 상태 값, #test의 첫 줄, 네 화면에서 본 결과(직접 보지 못했으면 NOT_RUN), 도구의 합계 줄.
````

**사람이 볼 것.**

- 타이틀에서 지도, 지도에서 배달로 가는 데 탭이 몇 번인가. 처음 켠 사람이 무엇을 누를지 망설이지 않는가.
- 소리 확인 장에서 [안 들려요]를 눌렀을 때 막히지 않고 시작할 수 있는가. iPhone의 무음 스위치를 켠 채로 해 본다.
- 일부러 오류를 내 본다(콘솔에서 `setTimeout(() => { throw new Error("x"); })`). 오류 화면이 한 번 뜨고 [새로고침]으로 돌아오는가.

### P21 [점검] 게이트 GPO6, 첫 배포

````text
[P21 · 점검] 게이트 GPO6: 0~2단과 진행

코드를 더하거나 고치지 않는다.

할 일 1. 아래 명령을 돌리고 "── 합계 ──" 아래 두 줄과 FAIL로 시작하는 줄을 모두 그대로 보고한다.
   node tools/check.mjs index.html
   기대: "실패 0". days 묶음의 줄이 모두 ok다.
   돌릴 수 없으면 NOT_RUN이라고 적는다. 결과를 지어내지 않는다.

할 일 2. index.html을 읽고 아래를 확인해 보고한다. 어긋난 것은 고치지 말고 줄 번호와 함께 보고한다.
   가. index.html#test의 첫 줄이 "자가검사 47/47 (전체 47개 중 47개 작성) …"인가.
   나. localStorage를 직접 부르는 곳이 makeStore에 넘기는 한 곳뿐인가.
   다. store.data를 바꾸는 곳을 모두 적는다. 바로가기(S.dev)일 때 바뀌는 곳이 있는가(없어야 한다).
   라. 통과 계산(dayReport)이 배달마다 첫 번째 결과만 세는가. 마감 배달과 다시 낸 배달이 requeue에 들어가는 길이 있는가(없어야 한다).
   마. 화면을 바꾸는 곳마다 emit("leave")가 먼저 불리는가(openRun, openScene, showMap, nextJob의 마감, 그리고 P20에서 더한 화면).
   바. 구획 11을 뺀 소스에 setInterval이 없고 setTimeout이 한 곳뿐인가. P20에서 타이머를 더하지 않았는가.
   사. 화면에 나가는 글에 금지 표현, 이모지, 도형 글자가 있는가.
   아. P20에서 [그대로] 코드를 고친 곳을 모두 적는다(허락한 곳은 임시 지도의 틀과 그리기, #closing의 내용).

보고: 할 일 1, 2의 결과. 그리고 부록 A의 게이트 보고 블록(gate: GPO6).
````

**사람이 해 볼 것.**

1. 저장을 지우고 0단부터 2단 마감까지 처음부터 끝까지 한다. 중간에 한 번 새로고침해서 같은 배달에서 이어지는지 본다.
2. 1단에서 일부러 여러 번 틀려 한 번에 배달한 편지가 5통 이하가 되게 한다. 2단이 열리지 않고, 다시 낸 배달을 한 번에 마쳐도 수가 올라가지 않는지 본다.
3. 발견 장면 S1~S4가 제자리에 나오고, 다시 하면 나오지 않는지 본다. 문장이 어색하지 않은지 읽어 본다.
4. 14장의 순서로 배포한다. 배포 주소에서 **실기기 한 대 이상으로 1단을 끝까지** 한다.
5. P12의 귀로 듣기를 아직 하지 않았으면 지금 한다. GPO3이 `PASS`여야 이 게이트를 넘긴다.
6. 저장이 막힌 환경에서 열어 본다(PC의 Chrome에서 이 사이트의 쿠키와 사이트 데이터를 차단하면 `localStorage`가 오류를 던진다). 지도에 "이 기기에서는 기록이 저장되지 않아요."가 보이고 배달은 끝까지 되는지 본다. 폰의 사생활 보호 모드에서도 열어 보고 결과를 적는다.

**게이트 GPO6.** 검사 47/47, 도구 실패 0, 위 1~6. 결정 D5(범위), D6(겹임시표의 날), D13(통과 기준)을 확정한다. 버전 v0.6으로 첫 배포를 한다. 3~5단은 지도에서 열리지만 이 게이트에서는 0~2단까지만 본다. 3~5단의 완주는 GPO7에서 본다.

---

## 9. PO7 주소록과 복습

목표는 주소 35개가 주소록에 모이고, 틀린 까닭에 맞춘 복습이 나오는 것이다. 전부 [설계]다. 설계서 PO7의 작업 1(3~5단의 24건과 발견 장면 S5, S6)은 P04와 P18에서 이미 들어갔다.

[설계] 프롬프트를 줄 때의 순서는 같다. AI가 계획을 먼저 말하게 하고, 읽고, 만들게 한다. 계획에 [그대로] 코드를 고치겠다는 말이 있으면 갈고리로 할 수 없는지 되묻는다.

### 이미 있는 코드와 만나는 자리

P22~P26이 공통으로 알아야 할 것이다. 프롬프트마다 다시 적지 않고 여기에 모은다. AI에게 이 표를 함께 준다.

| 자리 | 지금의 동작 | [설계]에서 조심할 것 |
|---|---|---|
| `S.screen` | `"map"`, `"run"`, `"scene"`, `"close"`(P20 뒤에는 `"title"`도) | 새 화면은 값을 하나 더한다(`"book"`, `"free"`, `"settings"`). 구획 10의 `onPaint(10, …)`가 `run`과 `scene`이 아닐 때 `#app`을 `inert`로 둔다. 무대를 그대로 쓰는 화면(자유 마을)은 이 조건에 걸리지 않게 계획에서 다룬다 |
| `dayOf(id)` | `BOOK`에서 찾는다 | 복습 배달의 하루를 열려면 `BOOK`에 넣어야 한다(`BOOK`은 배열이다. 같은 id가 있으면 바꾼다) |
| 기록 갈고리 `wrong`, `done`, `finish` | `S.dev`가 아니면 `store.data`에 적는다. `finish`는 `days[S.day]`를 만든다 | 복습 배달과 자유 마을이 배달일 기록을 만들지 않게 한다 |
| `resumePlan` | `DAYS`의 배달일만 잇는다 | 복습 배달은 이어하기 대상이 아니다 |
| `on("next", …)`의 장면 끼어들기 | `SCENES`의 `after`가 방금 마친 배달의 id와 같을 때 | 복습 배달의 씨앗 id는 `DAYS`의 id와 겹치지 않게 짓는다 |
| `closeScene()` | `from`이 `"run"`이면 다음 배달, 아니면 `goHome()` | 주소록에서 연 장면이 주소록으로 돌아가게 하려면 이 갈래를 나눈다. 이 한 곳은 고쳐도 된다 |
| 구획 10의 `onPaint(12, …)` | `S.dev`이면 HUD의 [지도]와 마감의 [지도로]를 숨긴다 | 새 화면에서 돌아갈 단추를 계획에 적는다 |
| 문패의 열쇠 | `"C1"`, `"D-1"`처럼 글자와 변화량. 숫자는 없다 | 주소록의 칸은 4구역의 열두 집으로 그리되 얻었는지는 이 열쇠로 본다 |
| 검사 | `TOTAL_TESTS`는 47 | 검사를 더하지 않는다. 프롬프트가 말한 검사에 단언을 더한다 |

### P22 [설계] 주소록

````text
[P22 · 설계] 주소록

P00의 규칙 전부를 지킨다. 근거는 docs/의 설계서 8.5절, 9.4절이다. 가이드 9장의 "이미 있는 코드와 만나는 자리" 표를 먼저 읽는다.

시작 전: index.html#test의 첫 줄이 "자가검사 47/47 …"인지 확인한다. 아니면 멈추고 보고한다.

먼저 계획을 말한다(코드를 쓰기 전). 화면 틀의 id, 상태에 더할 값, 쓸 갈고리와 순서, 걸음을 그리는 방법을 적고 확인을 받는다.

만들 것:
1. 주소록 화면(S.screen "book"). 타이틀의 [주소록]을 켠다.
2. 열두 집을 건반 모양으로 늘어놓고 집마다 문패 칸을 둔다. 칸은 엔진이 센다: 4구역의 열두 집(집 번호 60~71)마다 spellingsAt이 돌려준 주소 하나에 칸 하나. 열한 채는 세 칸, G♯/A♭ 한 채는 두 칸, 모두 35칸이다. 수를 글자로 적지 않는다.
3. 흰 집의 글자 문패 일곱(기호 없는 주소)은 처음부터 달려 있다. 나머지 28칸은 store.data.plates에 그 열쇠(plateKey)가 있으면 달린 것이다.
4. 아직 얻지 못한 칸은 비워 두되 "몇 단에서 얻는지"를 적는다. 그 단은 엔진으로 찾는다(DAYS를 차례로 돌며 platesOf에 그 열쇠가 처음 나오는 배달일).
5. 달린 문패를 누르면 그 주소의 걸음이 그려지고(출발 집에서 도착 집까지, 한 칸에 호 하나) 집의 소리가 난다. 소리는 runFx({ t: "hop", midi })나 tone()으로 낸다.
6. 위에 "문패 n/35"를 적는다. n은 7 + 얻은 문패 수다.
7. [뒤로]는 타이틀로 간다.

지킬 것:
- 주소의 그림은 nameHtml, 기호는 signSvg로 그린다. 글자(♯ ♭)를 쓰지 않는다.
- 얻지 못한 문패의 주소를 가리지는 않는다(칸에 흐리게 적어도 된다). 색만으로 구별하지 않는다(테두리를 점선으로).
- 주소록은 기록을 바꾸지 않는다.
- 320px 폭에서 열두 집과 35칸이 가로 스크롤 없이 보인다. 한 화면에 다 들어가지 않으면 세로로 민다(주소록은 세로 스크롤을 허용한다).

검사: CT-02에 단언을 더한다. "주소록이 그리는 칸의 수가 35이고, 처음부터 달린 칸이 7이며, 여섯 배달일의 platesOf를 모두 얻은 것으로 치면 35칸이 모두 달린다." 검사 수는 47 그대로다.

완료 기준:
- index.html#test가 47/47 그대로다.
- 기록이 없을 때 "문패 7/35", 1단을 모두 한 번에 마친 뒤 "문패 17/35"다.
- 달린 문패를 누르면 걸음이 그려지고 소리가 난다. B♯ 문패의 걸음이 구역 경계를 넘는다.
- 네 화면(320×545, 320×568, 360×640, 390×844)에서 가로 스크롤 0, 글자 12px, 단추 44px 이상.

보고: 계획과 달라진 점, 더한 id와 상태 값, #test의 첫 줄, 네 화면에서 본 결과(보지 못했으면 NOT_RUN), [그대로] 코드를 고친 곳(없어야 한다).
````

### P23 [설계] 알아 두기와 발견 장면 다시 보기

````text
[P23 · 설계] 알아 두기 카드, 발견 장면 다시 보기, S6의 주소록 보기

P00의 규칙 전부를 지킨다. 근거는 docs/의 설계서 7.6절, 8.4절, 8.5절이다. 가이드 9장의 "이미 있는 코드와 만나는 자리" 표를 먼저 읽는다.

시작 전: index.html#test의 첫 줄이 "자가검사 47/47 …"인지 확인한다.

먼저 계획을 말하고 확인을 받는다.

만들 것:
1. 주소록에 "알아 두기" 카드 셋.
   가. "피아노처럼 조율한 악기에서는 소리도 같아요. 다른 조율이나 실제 연주에서는 아주 조금 다르게 낼 때도 있어요."
   나. "구역은 옥타브예요. 4구역은 C4부터 B4까지예요." (주소는 토큰으로 적고 rich()로 그린다)
   다. 기호의 다른 이름: 샵은 올림표, 플랫은 내림표, 더블샵은 겹올림표, 더블플랫은 겹내림표. 기호마다 그림(signSvg)과 두 이름을 나란히 적는다.
2. 주소록에 "발견 장면 다시 보기". 본 장면(store.data.scenes)만 제목으로 늘어놓는다. 누르면 openScene(sc, "book")으로 연다. 마지막 문장의 [알겠어요]는 주소록으로 돌아온다(closeScene의 갈래를 나눈다. 이 한 곳은 고쳐도 된다). 다시 볼 때는 scenes에 다시 적지 않아도 된다.
3. 아직 보지 못한 장면은 제목 대신 "n단에서 만나요"를 적는다(그 단은 SCENES의 after에서 찾는다).
4. S6의 마지막 문장("…주소는 모두 35개예요.")에서 조작부 윗줄에 [주소록 보기]를 더한다. 누르면 주소록의 35칸을 보여 주고 닫으면 장면으로 돌아온다. 저절로 띄우지 않는다(타이머를 쓰지 않는다).

지킬 것:
- "언제나 같은 주파수", "항상 같은 주파수"를 쓰지 않는다(CT-03이 본다).
- 알아 두기의 글도 CT-01과 CT-03이 보게 한다. 구획 11의 tTexts()가 모으는 문구에 이 글들을 더한다(검사 구획의 도우미는 고쳐도 된다).
- 카드의 글은 320px 폭에서 네 줄을 넘지 않는다.

완료 기준:
- index.html#test가 47/47 그대로다.
- 0단만 마친 기록에서는 "다시 보기"에 S1만 제목으로 보이고 나머지는 "n단에서 만나요"다.
- 주소록에서 S2를 열고 문장 셋을 넘기면 주소록으로 돌아온다. 배달 도중의 장면은 전처럼 다음 배달로 간다(검사 CT-02가 그대로 통과한다).
- 네 화면에서 가로 스크롤 0.

보고: 계획과 달라진 점, #test의 첫 줄, 네 화면에서 본 결과, [그대로] 코드를 고친 곳(closeScene의 갈래 하나여야 한다).
````

### P24 [설계] 복습 배달

````text
[P24 · 설계] 복습 배달

P00의 규칙 전부를 지킨다. 근거는 docs/의 설계서 6.3절, 6.5절, 8.6절이다. 가이드 9장의 "이미 있는 코드와 만나는 자리" 표를 먼저 읽는다.

시작 전: index.html#test의 첫 줄이 "자가검사 47/47 …"인지 확인한다.

먼저 계획을 말하고 확인을 받는다. 특히 (가) 복습 배달의 하루를 어떻게 열 것인가, (나) 배달일 기록과 하던 배달일(active)에 섞이지 않게 무엇을 할 것인가, (다) 난수의 씨앗을 무엇으로 정할 것인가를 적는다.

만들 것:
1. 주소록에 [복습 배달] 단추. 누르면 배달 여섯 건의 하루가 열린다. 끝나면 마감 화면을 거쳐 주소록으로 돌아온다.
2. 재료: 길(A3~E5) 안에서 출발 집과 도착 집이 모두 들어오는 주소. 엔진으로 만든다(글자 7 × 기호 5 × 숫자 3~5 가운데 조건에 맞는 것). 설계서의 계산으로는 56개다. 이 수가 다르게 나오면 멈추고 보고한다. 열린 배달일까지 배운 기호(DAYS의 signs)만 쓴다.
3. 고르는 법: store.data.causes에서 누계가 가장 많은 까닭 두 가지에 세 건씩 배정한다. 한 가지뿐이면 그것에 여섯 건.
   octave        → 숫자가 갈리는 주소(B♯, B𝄪, C♭, C𝄫)의 악보 편지와 구역 반송
   dir, count    → 그 기호의 주소를 걸어서 배달, 이어서 바로 배달과 방향·걸음 수 반송
   stay, extra   → 기호 있는 주소와 없는 주소를 섞은 바로 배달
   letter, black → 걸어서 배달(출발 단계가 있다)
   plate         → 주소를 모두 쓰는 배달(plate: "all")
   sort          → 우편 분류
   cause         → 반송 편지
4. 씨앗은 함수가 만든다. 만든 씨앗마다 checkJob(jobModel(씨앗, 하루))이 빈 목록인 것만 낸다. 씨앗의 열쇠는 id ask note steps show plate with cards err preview final뿐이다.
5. 난수는 씨앗이 있는 것을 쓴다(Math.random을 쓰지 않는다). 씨앗은 날짜(연월일)와 까닭 누계에서 만든다. 같은 날 같은 누계로 다시 열면 같은 여섯 건이 나온다.
6. 복습 배달을 ●로 마치면 그 배달에 배정된 까닭의 누계를 하나 줄인다(0 아래로 내려가지 않는다). 통과, 도장, 배달일 기록, 문패에는 영향이 없다.
7. 누계가 모두 0이면 [복습 배달] 대신 "복습할 것이 없어요."를 적고, 통과한 배달일의 마감 배달 가운데 하나를 권한다(누르면 그 배달을 바로가기처럼 연다. 기록하지 않는다).

지킬 것:
- 복습 배달에서도 오답의 규칙은 같다(1차 안내, 2차 고쳐 줌, 벌점 없음). 다시 내기는 하지 않아도 된다.
- 복습 배달 도중에는 발견 장면이 끼어들지 않는다. 씨앗의 id를 "rv-1"처럼 지어 DAYS의 id와 겹치지 않게 한다.
- 배달일 기록(store.data.days)과 하던 배달일(active)에 복습 배달이 적히지 않는다.
- 복습 배달에서 틀린 것은 까닭 누계에 더한다(다음 복습의 재료다).

검사: JB-01에 단언을 더한다. "까닭 열 가지(stay dir count extra octave letter black plate sort cause) 각각에 누계를 주고, 배달일 여섯의 signs 각각으로, 날짜 씨앗 셋으로 여섯 건을 만들면 모든 씨앗이 checkJob을 통과하고 열쇠가 정해진 것뿐이며, 같은 입력은 같은 여섯 건을 낸다." 검사 수는 47 그대로다.

완료 기준:
- index.html#test가 47/47 그대로다.
- 콘솔에서 까닭 누계를 { octave: 3, dir: 1 }로 놓고 열면 구역 쪽 배달 셋과 방향 쪽 배달 셋이 나온다. 페이지를 새로 열어 같은 날 다시 열면 같은 여섯 건이다.
- 한 건을 ●로 마치면 그 까닭의 누계가 하나 줄어 저장된다.
- 복습 배달을 마친 뒤 지도의 기록과 도장이 그대로다.
- 1단까지만 연 기록에서는 더블샵과 더블플랫이 나오지 않는다.

보고: 계획과 달라진 점, 재료의 수(56이어야 한다), #test의 첫 줄, 완료 기준을 직접 본 결과, [그대로] 코드를 고친 곳.
````

### P25 [설계] 자유 마을

````text
[P25 · 설계] 자유 마을

P00의 규칙 전부를 지킨다. 근거는 docs/의 설계서 8.7절이다. 가이드 9장의 "이미 있는 코드와 만나는 자리" 표를 먼저 읽는다.

시작 전: index.html#test의 첫 줄이 "자가검사 47/47 …"인지 확인한다.

먼저 계획을 말하고 확인을 받는다. 배달 화면의 무대(길, 악보 창, 걸음, 문패 판)를 그대로 쓸 것인지, 쓴다면 어떤 모델을 M에 넣을 것인지 적는다. 발견 장면이 쓰는 방법(sceneModel이 배달 모델과 같은 꼴을 만든다)을 참고한다.

만들 것:
1. 자유 마을 화면(S.screen "free"). 타이틀의 [자유 마을]을 켠다. 판정이 없다. 기록하지 않는다.
2. 집을 누르면 그 집의 주소 전부(spellingsAt, 기호 다섯 모두)가 문패 판에 뜨고, 주소마다의 걸음이 모두 그려지고, 악보에 음표가 그려지고, 집의 소리가 난다.
3. 윗줄에 [들어 보기]: 그 집의 주소들을 듣기와 같은 규칙으로 낸다(차례로, 그리고 함께).
4. "써 보기": 흰 집과 기호 단추를 골라 아무 주소나 쓰면 그 걸음이 어디에 닿는지 그려진다. 맞고 틀림이 없다. 판독 줄이 그 주소와 걸음을 한 문장으로 말한다(예: C 더블샵 4를 쓰면 "…는 도에서 오른쪽으로 두 칸이에요." 주소는 토큰으로 적어 그림으로 보이게 하고 조사와 낱말은 엔진의 josa, walkKo로 만든다).
5. 창을 좌우로 한 채씩 옮기는 단추. 범위는 A3~E5다. 창을 옮기면 길을 다시 만든다(이때만).
6. [뒤로]는 타이틀로 간다.

지킬 것:
- 수업에서 화면을 띄워 설명하는 용도를 겸한다. 800×600에서도 같은 배치가 넓어질 뿐이다.
- 채점, 기록, 도장이 없다. store.data를 바꾸지 않는다.
- 조작부의 높이(104px)와 다섯 줄의 자리를 지킨다.
- 걸음 소리와 듣기의 예약, 취소 규칙을 그대로 쓴다. 새 소리 코드를 쓰지 않는다.

완료 기준:
- index.html#test가 47/47 그대로다.
- D4 집을 누르면 문패 셋(D4, C𝄪4, E𝄫4)과 걸음 셋이, G♯4 집을 누르면 문패 둘이 뜬다.
- 창을 오른쪽 끝(…E5)까지, 왼쪽 끝(A3…)까지 옮길 수 있고 그 밖으로는 가지 않는다.
- 자유 마을에 들어갔다 나온 뒤 store.data가 그대로다.
- 네 화면에서 스크롤 0, 다섯 줄의 높이가 배달 화면과 같다.

보고: 계획과 달라진 점, #test의 첫 줄, 네 화면에서 본 결과, [그대로] 코드를 고친 곳.
````

### P26 [설계] 설정

````text
[P26 · 설계] 설정

P00의 규칙 전부를 지킨다. 근거는 docs/의 설계서 9.4절, 9.7절, 10.4절, 10.5절이다. 가이드 9장의 "이미 있는 코드와 만나는 자리" 표를 먼저 읽는다.

시작 전: index.html#test의 첫 줄이 "자가검사 47/47 …"인지 확인한다.

먼저 계획을 말하고 확인을 받는다.

만들 것:
1. 설정 화면(S.screen "settings"). 타이틀의 [설정]을 켠다. 지도와 배달 화면의 HUD에서도 연다. 닫으면 열었던 화면으로 돌아간다.
2. 소리 크기(store.data.settings.volume, 0~1)와 음소거(muted). 마스터 게인(master.gain.value)에 넣는다. 컨텍스트가 생긴 직후와 설정을 바꾼 때에 넣는다. 크기를 바꿀 때 집의 소리 하나(A4)를 들려준다.
3. 동작 줄이기(motion: "system" | "reduced" | "full"). #app에 표시를 달고 스타일이 그것을 본다. "system"은 prefers-reduced-motion을 따른다. 실제로 줄일 연출은 P29에서 만든다.
4. 튜토리얼 다시 보기(tutorialSeen을 비운다. 튜토리얼은 P30)와 소리 확인 다시 하기(soundChecked를 false로).
5. 자가검사 결과: window.__testLine을 적고 실패한 검사가 있으면 그 번호와 이름을 적는다.
6. 저장 상태: 저장할 수 없으면 "이 기기에서는 기록이 저장되지 않아요."를 적는다.
7. 데이터 초기화. 되돌릴 수 없으므로 한 번 묻는다("기록을 모두 지울까요? 문패와 도장이 사라져요."). [지우기]를 누르면 store.reset()을 하고 타이틀로 간다.
8. 버전을 적는다(v0.8).

지킬 것:
- 설정을 바꾸면 바로 저장한다(store.save()).
- HUD에 [설정]을 더한 뒤에도 320px 폭에서 [지도], 진행 점 여덟, "소리 켜기", [설정]이 한 줄에 들어가고 겹치지 않는다. 들어가지 않으면 [설정]을 그림 단추(44×44px, 화면 읽기용 이름 "설정")로 만든다.
- 음소거여도 "소리 켜기" 표시의 규칙은 그대로다(컨텍스트의 상태를 보여 준다). 음소거는 설정 화면과 HUD에 따로 표시한다.
- 검사를 다시 돌리는 단추를 만든다면 돌린 뒤 redraw()를 불러 화면을 다시 그린다(검사 ST-03이 화면을 그려 보기 때문이다).

완료 기준:
- index.html#test가 47/47 그대로다.
- 소리 크기를 0으로 내리면 소리가 나지 않고, 새로고침해도 그 값이 남는다.
- 데이터 초기화 뒤 지도에 0단만 열려 있고 주소록이 "문패 7/35"다.
- 배달 도중 HUD에서 설정을 열었다 닫으면 그 배달의 그 단계로 돌아온다(쓰던 주소가 남아 있다).
- node tools/check.mjs index.html 이 실패 0이다(HUD에 단추가 늘었으므로 layout을 다시 본다).

보고: 계획과 달라진 점, #test의 첫 줄, 도구의 합계 줄, 네 화면에서 본 결과, [그대로] 코드를 고친 곳.
````

### P27 [점검] 게이트 GPO7

````text
[P27 · 점검] 게이트 GPO7: 3~5단과 주소록

코드를 더하거나 고치지 않는다.

할 일 1. node tools/check.mjs index.html 을 돌리고 "── 합계 ──" 아래 두 줄과 FAIL로 시작하는 줄을 모두 그대로 보고한다. 돌릴 수 없으면 NOT_RUN.

할 일 2. index.html을 읽고 아래를 확인해 보고한다. 어긋난 것은 고치지 말고 줄 번호와 함께 보고한다.
   가. index.html#test의 첫 줄이 "자가검사 47/47 (전체 47개 중 47개 작성) …"인가. TOTAL_TESTS가 47 그대로인가.
   나. P22~P26에서 [그대로] 코드를 고친 곳을 모두 적는다(허락한 곳: closeScene의 갈래, 검사 구획의 도우미와 CT-02·JB-01의 단언).
   다. 주소록의 칸 수, 복습 배달의 재료 수, 발견 장면과 알아 두기의 수가 글자로 적혀 있지 않고 엔진에서 나오는가.
   라. 복습 배달이 Math.random을 쓰지 않는가. 씨앗이 checkJob을 거치는가.
   마. 복습 배달과 자유 마을이 store.data.days와 active를 바꾸는 길이 있는가(없어야 한다).
   바. 새 화면마다 화면을 떠날 때 emit("leave")가 불리는가.
   사. 구획 11을 뺀 소스에 setInterval이 없고 setTimeout이 한 곳뿐인가.
   아. 새로 더한 글에 금지 표현, 이모지, 도형 글자, ASCII 씨앗 글자(C#4)가 화면에 그대로 나가는 곳이 있는가.

보고: 할 일 1, 2의 결과. 그리고 부록 A의 게이트 보고 블록(gate: GPO7).
````

**사람이 해 볼 것.**

1. 3단, 4단, 5단을 폰에서 처음부터 끝까지 한다. 발견 장면 S5와 S6이 제자리에 나오는지 본다. 더블샵과 더블플랫 그림이 봉투, 카드, 기호 단추, 문패에서 읽히는지 본다.
2. 여섯 배달일을 모두 마친 뒤 주소록이 "문패 35/35"인지 본다. 한 칸이라도 비면 그 문패를 주는 배달을 부록 E에서 찾아 본다.
3. 일부러 구역을 여러 번 틀린 뒤 복습 배달을 연다. 구역 쪽 배달이 나오는지, 같은 날 다시 열면 같은 여섯 건인지 본다.
4. 자유 마을을 800×600(수업용 화면)에서 열어 설명하는 흉내를 내 본다. 강사가 "이 집의 이름을 모두 보여 줄게요"를 할 수 있는가.
5. 창이 옮겨지는 배달(d4-07, d5-02, d5-06은 A3~B4, d5-04는 C4~D5)에서 길이 바뀌는 것이 어색하지 않은지 본다.

**게이트 GPO7.** 검사 47/47, 도구 실패 0, 위 1~5. 결정 D18(복습 배달)을 확정한다. 버전 v0.8.

---

## 10. PO8 그림 · 연출 · 튜토리얼

목표는 길이 건반이 아니라 마을로 보이는 것이다. 건반의 구조(집의 자리와 폭, 미–파와 시–도 사이에 검은 집이 없는 것)는 그대로다. 전부 [설계]다. 시작하기 전에 결정 D12(제목)와 D14(그림 방향)를 확정한다.

### P28 [설계] 그림

````text
[P28 · 설계] 그림: 집, 문패, 우체부, 걸음, 표지판, 봉투, 아이콘, 배경

P00의 규칙 전부를 지킨다. 특히 R13~R17, R19. 근거는 docs/의 설계서 9.2절, 9.3절, 9.5절, 9.6절이다.

시작 전: index.html#test의 첫 줄이 "자가검사 47/47 …"인지 확인한다. node tools/check.mjs index.html layout 의 화면 여덟 줄을 적어 둔다(그림을 입힌 뒤에 견준다).

먼저 계획을 말하고 확인을 받는다. 에셋마다 어디에(스타일, 화면 틀, 구획 5의 어느 함수) 무엇을 그릴지, 무엇을 고치고 무엇을 고치지 않을지 적는다. 에셋 하나를 먼저 그려 보이고(흰 집과 검은 집) 확인을 받은 뒤 나머지를 한다.

만들 것(모두 인라인 SVG나 CSS. 그림 파일을 따로 두지 않는다):
1. 흰 집과 검은 집: 지붕과 문이 있는 집. 검은 집은 뒤쪽 골목의 집처럼 작고 어둡게.
2. 문패와 문패 판: 나무 문패 꼴. 빈칸은 못 자국만.
3. 우체부: 캐릭터 하나. 표정 넷(기본, 기쁨, 갸웃, 걷는 중). 발끝이 선 집의 가운데를 가리킨다. 고르기 전의 우체부는 속이 빈 모양이라는 구별을 지킨다.
4. 걸음: 발자국이나 깡충 뛰는 호. 한 칸에 하나. 수를 셀 수 있어야 한다.
5. 구역 표지판: B와 C 사이. 굵은 경계선을 대신하지 않고 그 위에 얹는다.
6. 봉투와 편지 카드: 봉투 꼴의 주소 칸, 방식별 머리표 그림(걸어서, 바로, 악보, 분류, 반송).
7. 음자리표를 다시 그린다(지금 것은 굵기가 고른 선 하나의 임시 그림이다). 기호 넷은 상자 크기를 지킨 채 다듬어도 된다.
8. 도장과 한 번에 배달 도장, 지도와 타이틀과 주소록의 그림.
9. 아이콘: 소리, 설정, 다시 듣기, 뒤로, 화살표.
10. 배경: 마을의 하늘과 길 한 장면. 무대의 글자 대비를 해치지 않는다.

지킬 것(어기면 그림이 아니라 버그다):
- 집의 자리, 폭, 누르는 자리를 바꾸지 않는다. 흰 집의 폭은 길 ÷ 9, 검은 집은 흰 집 폭의 62%이고 두 흰 집의 경계에 놓인다. 구획 5의 buildStreet가 주는 left와 width를 그대로 둔다.
- 미–파와 시–도 사이에 검은 집이 없는 것이 그림에서도 보여야 한다. 원근을 넣어 한 칸의 폭이 달라 보이게 하지 않는다.
- 다섯 줄의 높이, 조작부 104px, 글자 12px, 단추 44px, 주 단추 52px.
- 상태의 표시를 색만으로 하지 않는다. 도착 집은 줄무늬, 내 길은 점선, 기록은 꽉 찬 원과 반 원.
- 그림은 한 번 만들고 상태는 클래스로 바꾼다. 걸을 때마다 집을 다시 만들지 않는다.
- 글꼴은 시스템 글꼴만. 외부 요청 0. 이모지 0.
- index.html은 300KB를 넘지 않는다.
- 색을 바꾸면 대비를 다시 계산해 표로 보고한다. 글자는 4.5:1, 글자가 아닌 부품은 3:1 이상.

완료 기준:
- index.html#test가 47/47 그대로다.
- node tools/check.mjs index.html 이 실패 0이다. 화면 여덟 줄의 "흰 집", "검은 집" 치수가 그림을 입히기 전과 같다.
- 화면에 임시 도형(이름 없는 원과 네모)과 이모지가 없다.
- 바뀐 색의 대비 표.

보고: 계획과 달라진 점, 고친 함수와 스타일의 목록, #test의 첫 줄, 도구의 화면 여덟 줄(앞뒤 비교), 대비 표, 파일 크기.
````

**사람이 볼 것.** 그림을 입힌 화면을 320×568과 390×844에서 캡처해 나란히 놓고 본다. 집이 건반으로도 읽히는가(피아노를 아는 사람에게 보여 준다). 우체부가 선 집이 한눈에 보이는가. 걸음의 수를 셀 수 있는가.

### P29 [설계] 연출과 동작 줄이기

````text
[P29 · 설계] 연출 시간표와 동작 줄이기

P00의 규칙 전부를 지킨다. 특히 S10(타이머 금지), R17. 근거는 docs/의 설계서 9.7절이다.

시작 전: index.html#test의 첫 줄이 "자가검사 47/47 …"인지 확인한다.

먼저 계획을 말하고 확인을 받는다.

만들 것: 아래 연출을 CSS의 transition과 animation으로 만든다. 움직이는 속성은 transform과 opacity뿐이다.
  우체부가 옮겨 감 120ms / 걸음 호가 그려짐 120ms / 창이 옮겨 감(배달이 바뀔 때) 300ms / 문패가 달림 200ms /
  내 길과 바른 길이 나타남 200ms / 악보 편지의 봉투가 열림 250ms / 도장 250ms /
  문패, 음표, 걸음이 밝아짐(듣기): 그 주소가 울리는 동안(지금처럼 클래스로)

지킬 것:
- setTimeout과 setInterval로 연출을 잇지 않는다. 연출이 끝나기를 기다렸다가 상태를 바꾸는 코드를 쓰지 않는다. 상태는 바로 바뀌고 연출은 따라온다.
- 연출 도중에도 입력을 막지 않는다. 연달아 눌러도 상태가 꼬이지 않는다.
- 듣기 도중에는 무대의 배치를 바꾸는 연출을 하지 않는다.
- 동작 줄이기(기기의 prefers-reduced-motion 또는 설정의 motion: "reduced")에서는 연출 시간을 모두 0으로 한다. 설정이 "full"이면 기기 설정보다 설정을 따른다.
- 깜박임을 만들지 않는다.

완료 기준:
- index.html#test가 47/47 그대로다(AU-08이 타이머를 본다).
- node tools/check.mjs index.html 이 실패 0이다. 연출 때문에 도구의 확인이 흔들리면(연출 도중의 값을 읽어서) 도구가 아니라 연출을 고친다. 상태는 연출보다 먼저 바뀌어 있어야 한다.
- 동작 줄이기에서 모든 연출이 사라지고 기능은 같다.

보고: 계획과 달라진 점, 더한 스타일의 목록, #test의 첫 줄, 도구의 합계 줄, 동작 줄이기에서 본 결과.
````

### P30 [설계] 튜토리얼

````text
[P30 · 설계] 플레이형 튜토리얼

P00의 규칙 전부를 지킨다. 근거는 docs/의 설계서 8.8절이다.

시작 전: index.html#test의 첫 줄이 "자가검사 47/47 …"인지 확인한다.

먼저 계획을 말하고 확인을 받는다. 일곱 자리 각각에서 무엇을 밝히고 판독 줄에 무엇을 적을지 표로 적는다.

만들 것: 글로 된 안내 창을 쓰지 않는다. 배달 안에서 한 번씩 손으로 해 보게 한다.
  자리                 밝히는 것 하나            배우는 것
  0단을 시작할 때       (P20의 소리 확인 장)       소리 확인
  d0-01               집 하나, 그다음 [배달]      누르기는 확정이 아니다. [배달]이 확정이다
  d0-05               [오른쪽 한 칸]            한 칸씩 걷는다
  d1-01               출발 집, 그다음 한 칸 단추   주소를 글자와 기호로 나눠 읽는다
  d1-03의 쓰기         흰 집, 그다음 기호 단추      주소를 쓴다
  d1-06               카드                     분류
  d3-06               까닭 단추                 반송 편지

- 각 자리에서 눌러야 할 것 하나만 밝게 하고(테두리와 모양으로. 색만으로 하지 않는다) 판독 줄이 한 문장으로 말한다.
- 한 번 지나가면 다시 나오지 않는다(store.data.settings.tutorialSeen에 자리의 이름을 적는다). 설정의 "튜토리얼 다시 보기"가 비운다.
- 튜토리얼 도중에도 다른 것을 누를 수 있다. 막지 않는다. 다른 것을 누르면 표시만 사라진다.
- 다시 낸 배달과 바로가기(S.dev)에서는 나오지 않는다.

지킬 것:
- 튜토리얼의 문장도 두 줄 이내다. tTexts()가 모으는 문구에 더해 CT-01, CT-03과 화면 점검의 text 묶음이 보게 한다.
- 튜토리얼이 채점을 바꾸지 않는다. 튜토리얼 문장은 그 단계의 안내(guide)를 대신할 뿐이다.
- 타이머를 쓰지 않는다. 손짓에 따라 넘어간다.

완료 기준:
- index.html#test가 47/47 그대로다.
- 기록이 없는 상태에서 0단을 하면 d0-01과 d0-05에서 표시가 나오고, 다시 하면 나오지 않는다.
- node tools/check.mjs index.html 이 실패 0이다(text 묶음의 문구 수가 튜토리얼 문장만큼 늘어난다. 넘침 0).

보고: 일곱 자리의 표(밝히는 것, 문장), #test의 첫 줄, 도구의 합계 줄, [그대로] 코드를 고친 곳.
````

### P31 [설계] 접근성

````text
[P31 · 설계] 접근성: 화면 읽기로 걷기, 겹쳐 뜨는 화면의 포커스, 글자 확대

P00의 규칙 전부를 지킨다. 근거는 docs/의 설계서 9.5절, 9.8절, 9.9절이다.

시작 전: index.html#test의 첫 줄이 "자가검사 47/47 …"인지 확인한다.

먼저 지금 상태를 조사해 보고한다(고치기 전). 화면 읽기에 주는 이름이 없는 단추, role과 aria-live의 쓰임, 겹쳐 뜨는 화면을 열고 닫을 때의 포커스, 색 대비가 기준에 못 미치는 쌍. 그다음 계획을 말하고 확인을 받는다.

만들 것:
1. 화면 읽기로 걷기: 우체부가 옮겨 갈 때 선 집을 읽어 준다("4구역 도 C 집", "4구역 검은 집. C와 D 사이"). 판독 줄(role="status")과 겹쳐 읽히지 않게 따로 둔 숨은 알림 칸을 쓴다. 걸을 때마다 판독 줄의 글을 바꾸지는 않는다.
2. 겹쳐 뜨는 화면의 포커스: 타이틀, 지도, 마감, 주소록, 설정, 소리 확인 장을 열면 그 화면의 첫 단추(또는 제목)로 포커스를 옮기고, 닫으면 연 단추로 돌려준다. 떠 있는 동안 뒤의 화면은 inert다(이미 그렇다). Esc로 닫을 수 있는 화면은 닫는다.
3. 발견 장면: 문장이 바뀔 때 읽힌다. [들어 보기] 도중 문패가 밝아지는 것을 말로도 알린다(판독 줄이 이미 말한다. 확인만 한다).
4. 글자 확대 130%: 판독 줄 세 줄, 편지 카드 세 줄까지 넘치지 않게 한다. 넘치면 그 줄의 높이를 확대일 때만 늘리는 방법을 계획에 적는다(다섯 줄이 단계마다 움직이지 않는다는 규칙은 지킨다).
5. 색 대비를 지금의 색(P28 뒤)으로 다시 계산해 표로 만든다. 못 미치는 쌍을 고친다.
6. 포커스 표시가 모든 단추와 집에서 보인다(outline을 지우지 않는다).

지킬 것:
- 기호 그림은 화면 읽기에 읽히지 않게 두고(aria-hidden) 말("C 샵 4")을 따로 준다. 이미 있는 nameHtml의 방식을 따른다.
- 판독 줄의 노드를 지웠다 만들지 않는다.
- 키보드 조작(좌우 화살표, 위아래 화살표, 숫자 키, Enter)을 바꾸지 않는다.

완료 기준:
- index.html#test가 47/47 그대로다. node tools/check.mjs index.html 이 실패 0이다(keys 묶음).
- 키보드만으로 타이틀에서 시작해 0단을 마치고 지도로 돌아올 수 있다. 포커스가 보이지 않는 곳으로 가지 않는다.
- 대비 표에 4.5:1(글자), 3:1(부품)에 못 미치는 쌍이 없다.

보고: 조사 결과, 계획과 달라진 점, 대비 표, #test의 첫 줄, 도구의 합계 줄. 화면 읽기(VoiceOver, TalkBack)로 직접 들어 보지 못했으면 NOT_RUN이라고 적는다.
````

**사람이 할 것.** 화면 읽기는 AI가 확인할 수 없다. iPhone의 VoiceOver와 Android의 TalkBack을 켜고 d0-01, d0-05, d1-01을 해 본다. 선 집, 편지의 주소, 판독 줄이 읽히는지, 같은 말이 두 번 읽히지 않는지 적는다. 정식 확인은 P33이다.

### P32 [점검] 게이트 GPO8

````text
[P32 · 점검] 게이트 GPO8: 그림, 연출, 튜토리얼, 접근성

코드를 더하거나 고치지 않는다.

할 일 1. node tools/check.mjs index.html 을 돌리고 "── 합계 ──" 아래 두 줄과 FAIL로 시작하는 줄을 모두 그대로 보고한다. 화면 여덟 줄의 "흰 집"과 "검은 집" 치수를 P28을 시작할 때 적어 둔 값과 견준다. 돌릴 수 없으면 NOT_RUN.

할 일 2. node tools/check.mjs index.html shots 로 캡처를 만들고 파일 목록을 보고한다. 사람이 본다.

할 일 3. index.html을 읽고 아래를 확인해 보고한다. 어긋난 것은 고치지 말고 줄 번호와 함께 보고한다.
   가. index.html#test의 첫 줄이 "자가검사 47/47 (전체 47개 중 47개 작성) …"인가.
   나. 외부 주소(http, //로 시작하는 src·href·url)가 있는가. 글꼴을 밖에서 가져오는가(없어야 한다).
   다. 이모지와 도형 글자가 화면에 나가는 곳이 있는가.
   라. 구획 11을 뺀 소스에 setInterval이 없고 setTimeout이 한 곳뿐인가. 연출이 끝나기를 기다리는 코드(transitionend, animationend에서 상태를 바꾸는 곳)를 모두 적는다.
   마. transform과 opacity 말고 다른 속성을 움직이는 transition, animation을 모두 적는다.
   바. 그림을 그리는 함수가 걸음마다 길을 다시 만드는가(없어야 한다).
   사. 파일 크기(바이트). 300KB 이하인가.
   아. P28~P31에서 [그대로] 코드를 고친 곳을 모두 적는다.

보고: 할 일 1~3의 결과. 그리고 부록 A의 게이트 보고 블록(gate: GPO8).
````

**사람이 볼 것.** 화면 여덟 종(타이틀, 지도, 배달, 발견 장면, 마감, 주소록, 자유 마을, 설정) × 세 화면(320×568, 390×844, 800×600)의 캡처를 눈으로 본다. 도구의 `shots`는 배달 화면만 찍으므로 나머지는 직접 찍는다.

- 임시 도형과 이모지가 없는가.
- 그림을 입힌 뒤에도 미–파와 시–도 사이에 검은 집이 없는 것이 보이는가. 한 칸의 폭이 고르게 보이는가.
- 폰에서 빠르게 걷기, 듣기, 창이 옮겨지는 배달(d5-02, d5-04)에서 눈에 띄는 끊김이 없는가.
- 글자 확대 130%에서 넘치는 글자가 없는가.

**게이트 GPO8.** 검사 47/47, 도구 실패 0, 집의 치수가 그림 앞뒤로 같음, 캡처를 눈으로 봄. 결정 D12(제목)와 D14(그림 방향)를 확정한 기록이 있다. 버전 v0.9.

---

## 11. PO9 기기 확인과 정리

코드를 쓰는 단계가 아니다. 사람이 폰과 사람으로 확인하고, AI는 문서를 정리한다. 이 문서가 처음부터 비워 둔 것들(실기기, 귀, 강사, 학습자)이 여기서 채워진다.

### P33 [점검] 게이트 GPO9

````text
[P33 · 점검] 게이트 GPO9: 기기 확인과 정리

index.html의 기능을 더하지 않는다. 사람이 확인하며 찾은 문제를 고칠 때는 하나씩, 고칠 때마다 #test와 node tools/check.mjs index.html 을 다시 돌린다.

할 일 1. 문서를 정리한다.
   가. docs/decisions.md: 결정 D1~D15와 D18의 확정값, 확정한 날, 근거(게이트와 확인 기록)를 표로 만든다. 비어 있는 것은 "미확정"이라고 적는다. 채워 넣지 않는다.
   나. docs/post-gate-report.md: GPO0~GPO8의 블록이 모두 있는지, status가 PASS가 아닌 것과 그 open_issues를 모아 적는다.
   다. docs/device-check.md: 사람이 적을 표의 틀을 만든다(설계서 12.3절의 열두 항목 × 기종). 값은 비워 둔다.
   라. 부록 E의 배달 표와 발견 장면 표를 지금의 코드에서 다시 만들어(jobModel, sceneModel의 값으로) 가이드의 표와 다른 줄을 보고한다.

할 일 2. 아래를 돌리고 결과를 그대로 보고한다.
   가. index.html#test의 첫 줄.
   나. node tools/check.mjs index.html 의 합계 두 줄과 FAIL 줄.
   다. index.html의 크기(바이트), 외부 주소의 수.

할 일 3. 설계서 12.4절의 완료 조건 열 가지를 하나씩 "증거가 있는 것 / 없는 것"으로 나눠 표로 만든다. 증거는 docs/의 기록에서만 찾는다. 기록이 없는 것을 "됐을 것이다"라고 쓰지 않는다.

보고: 할 일 1~3의 결과. 그리고 부록 A의 게이트 보고 블록(gate: GPO9).
````

**사람이 할 것.** 기종, 브라우저, 날짜와 함께 `docs/device-check.md`에 적는다. iPhone Safari와 Android Chrome 각 한 대 이상에서 한다.

| # | 항목 | 방법 | 기준(제안) |
|---|---|---|---|
| 1 | 집 고르기 | 0단과 1단을 하며 "다른 집이 골라진 횟수 ÷ 집을 누른 횟수"를 센다. 엄지와 검지 각각 | 열 번에 한 번 이하 |
| 2 | 첫 소리 | 처음 연 뒤 첫 탭에서 소리가 나는가. 무음 스위치를 켠 iPhone에서는 어떤가 | 두 운영체제 모두. 나지 않으면 소리 확인 장이 안내한다 |
| 3 | 복귀 | 다른 앱에 다녀온 뒤, 화면을 잠갔다 푼 뒤, 이어폰을 꽂고 뺀 뒤에 듣기 | 소리가 나거나 "소리 켜기"가 보인다 |
| 4 | 귀 | P12의 표를 한 번 더(스피커와 이어폰) | 함께 낸 소리가 한 소리로 들린다 |
| 5 | 기호 그림 | 판독 줄, 문패, 악보에서 더블샵과 샵, 더블플랫과 플랫을 팔 길이 거리에서 가려 읽는다 | 헷갈리지 않는다 |
| 6 | 문구의 줄 수 | 가장 긴 문구가 나오는 자리 셋(d3-05의 쓰기를 두 번 틀린다, d4-07의 분류를 두 번 틀린다, d5-05의 까닭을 두 번 틀린다)을 320~390px 폭의 폰에서 | 두 줄 이내. 폰의 글꼴은 헤드리스와 다르다 |
| 7 | 화면 높이 | 주소창이 보이는 상태에서 배달 화면이 한 화면에 들어오는가 | 545px 이상이거나 [그래도 계속하기]로 쓸 수 있다 |
| 8 | 저장 | 새로고침, 탭을 닫고 다시 열기, 사생활 보호 모드 | 이어지거나 "저장되지 않아요"가 보인다 |
| 9 | 끊김 | 빠르게 걷기, 듣기, 창이 옮겨지는 배달 | 눈에 띄는 끊김이 없다 |
| 10 | 화면 읽기 | VoiceOver와 TalkBack으로 0단과 1단 | 선 집, 주소, 판독 줄이 읽힌다 |
| 11 | 글자 확대 | 브라우저 글자 확대 130% | 넘치는 글자가 없다 |
| 12 | 학습자 | 대상 나이의 두 명 이상이 0단과 1단을 설명 없이 한다. 막힌 곳, "구역"·"문패"·걸음 호를 알아보는지 적는다 | 1단의 마감 배달까지 간다 |

**강사 검수.** 강사 한 명 이상에게 아래를 보여 주고 고칠 말을 받는다.

- 화면의 말: 샵, 플랫, 더블샵, 더블플랫, 딴이름한소리, 구역(D4).
- 12평균율 문장: "피아노처럼 조율한 악기에서는 소리도 같아요."(D15)
- 배달의 순서와 걸어서 배달의 수(부록 E). 수업에서 쓰는 순서와 어긋나는 곳.
- 발견 장면 여섯의 문장. 주소록의 알아 두기.
- 기호 그림과 음자리표.

말을 바꾸면 그 말은 엔진의 낱말 함수(구획 1의 `signKo` 같은 것)나 문구 함수(구획 2)에 있다. 바꾼 뒤 `#test`(FL-05, CT-01~03이 문구를 본다)와 도구의 `text` 묶음(두 줄에 들어가는가)을 다시 돌리고, 검사의 기대 글을 결정 기록과 함께 고친다.

**게이트 GPO9 = v1.0의 완료 조건.** 설계서 12.4절의 열 가지가 모두 참이어야 한다.

1. 검사 47/47. 화면 점검 E-01~E-10 통과.
2. 여섯 배달일을 탭만으로, 키보드만으로 완주하고 문패 35칸이 찬다.
3. 위 표의 열두 항목을 두 운영체제에서 확인하고 적었다.
4. 소리를 폰 두 대 이상에서 듣고 적었다.
5. 강사 한 명 이상의 검수.
6. 학습자 두 명 이상이 0단과 1단을 설명 없이 했다.
7. 임시 도형과 이모지 0, 외부 요청 0, `index.html` 300KB 이하.
8. D1~D15와 D18의 확정값이 결정 기록에 있다.
9. 게이트 보고 GPO0~GPO9가 모두 `PASS`다.
10. 배포 주소에서 처음부터 끝까지 한 번 했다.

이 문서가 저장된 것, [그대로] 14개가 도는 것은 제작 완료가 아니다.

---

## 12. 새 세션 복원 프롬프트

대화가 길어져 AI가 앞의 내용을 잊었거나 다른 날 이어서 할 때, 다음 프롬프트를 주기 전에 이것을 먼저 준다.

````text
[복원] 『두 이름의 음악 마을』 작업을 이어서 한다

저장소에 index.html, docs/, tools/가 있다. 파일을 고치기 전에 아래를 하고 보고한다.

1. docs/두이름의음악마을_바이브코딩_프롬프트가이드.md의 1장(P00 헌법)을 읽는다. 읽을 수 없으면 그렇게 말한다.
2. index.html#test의 첫 줄을 글자 그대로 적는다.
3. git log에서 최근 커밋 다섯 개의 메시지를 적고, 마지막으로 끝낸 프롬프트 번호(P01~P33)를 적는다.
4. docs/post-gate-report.md의 마지막 블록(gate, status, open_issues)을 적는다.
5. 아래 표에서 2번의 첫 줄에 맞는 자리를 찾아, 3번의 번호와 어긋나지 않는지 본다.
     검사 없음 → P01 / 5/5 → P02 / 23/23 → P03 / 36/36 → P04~P09 / 39/39 → P10 / 44/44 → P11, P12
     45/45 → P13~P16 / 46/46 → P17 / 47/47 → P18과 그 뒤
6. 구획 머리 12개("// == N 이름 ==")와 끝 마커 12개("// -- N 끝 --"), "/* -- 스타일 끝 -- */", "<!-- -- 화면 끝 -- -->"이 모두 한 번씩 있는지 센다.

보고: 1~6의 결과와 "다음에 할 프롬프트는 Pnn"이라는 한 줄. 이 보고를 확인받기 전에는 아무 파일도 고치지 않는다.

잊지 말 것(헌법의 줄임):
- [그대로] 프롬프트의 조각은 글자 그대로, 마커 줄 바로 위에 넣는다. 고치지 않는다. 마커를 지우지 않는다.
- 상태는 setState로만 바꾼다. 타이머로 상태나 소리를 바꾸지 않는다.
- 이론 값, 주소, 주파수, 문구 속 낱말을 손으로 적지 않는다. 엔진을 부른다. "같은 집"은 집 번호의 일치다.
- 집을 누르는 것은 확정이 아니다. 채점은 주 단추다. 오답은 1차 안내, 2차 고쳐 줌, 기록 ◐. 벌점이 없다.
- 기호와 화살표와 기록 표시는 그림이다. 이모지와 외부 요청이 없다.
- 검사를 조용히 고치지 않는다. 보지 않은 것을 봤다고 쓰지 않는다.
````

## 13. 문제 해결 프롬프트 모음

증상을 찾아 "줄 말"을 아래 틀의 첫 줄에 넣어 준다.

````text
[문제 해결] 증상: (여기에 증상과 "줄 말"을 적는다)

고치기 전에 원인을 먼저 보고한다. 순서는 이렇다.
1. index.html#test의 첫 줄, 실패한 검사의 번호와 이름, 결과표에 적힌 실패 문장을 글자 그대로 적는다.
2. 가이드 문서에서 지금까지 넣은 [그대로] 프롬프트의 조각과 index.html의 해당 부분을 견줘 다른 글자를 모두 적는다. 마커 줄의 수도 센다.
3. 다른 글자가 있으면 조각대로 되돌리고 #test를 다시 본다. 대개 여기서 끝난다.
4. 다른 글자가 없는데도 증상이 남으면 원인으로 보이는 줄과 근거를 보고하고 멈춘다. 확인을 받은 뒤에 고친다.

하지 말 것: 검사의 기대값을 고친다. 증상을 가리는 코드(try로 감싸기, 조건으로 건너뛰기)를 더한다. 조각을 "개선"한다.
````

**조립하다 생기는 문제.**

| 증상 | 원인 | 줄 말 |
|---|---|---|
| `#test`의 수가 기대보다 적다(예: 36이어야 하는데 30) | 조각의 일부가 빠졌거나 검사 조각을 줄여 넣었다 | "구획 11의 `test(` 호출을 세고 가이드의 조각과 견줘 빠진 검사를 적어 줘" |
| `#test`가 아예 뜨지 않는다. 화면이 빈 틀에서 멈춘다 | 스크립트 문법 오류. 조각이 중간에 잘렸거나 마커가 조각 안으로 들어갔다 | "콘솔의 첫 오류와 그 줄을 적어 줘. 그 줄이 어느 조각의 것인지, 조각과 무엇이 다른지 적어 줘" |
| "마커가 없다"고 한다 | 앞의 프롬프트에서 마커 줄을 지웠다 | "구획 머리와 끝 마커를 세어 줘. 빠진 마커를 그 구획의 맨 끝에 되살려 줘. 다른 줄은 건드리지 마" |
| 조각을 넣었는데 `X is not defined` | 조각을 다른 구획에 넣었거나 순서를 건너뛰었다 | "그 이름이 가이드의 어느 조각에서 정의되는지 찾고, index.html에서는 어느 구획에 있는지 적어 줘" |
| AI가 조각을 "정리"해서 넣었다(줄을 나눴다, 이름을 바꿨다) | W1 위반 | "방금 넣은 조각을 가이드의 글자 그대로 다시 넣어 줘. 한 글자도 바꾸지 마" |
| ST-02가 실패한다 | 어딘가에서 `S.x = …`로 상태를 직접 바꿨다 | "검사 구획을 뺀 소스에서 `S.`에 값을 넣는 줄을 모두 찾아 줘. setState로 바꿀 계획을 먼저 말해 줘" |
| AU-08이 실패한다 | `setTimeout`이나 `setInterval`을 더했다 | "더한 타이머를 모두 찾아 줘. 타이머 없이 하는 방법(상태를 바로 바꾸고 CSS가 따라오게, 소리는 오디오 클록에 예약)을 먼저 말해 줘" |
| TH-12가 실패한다 | 주파수의 소수, 반음값 표, 주소를 열쇠로 쓴 표, 씨앗의 모르는 열쇠 | "TH-12의 실패 문장을 그대로 적고 걸린 줄을 찾아 줘. 그 값을 엔진 함수로 바꿀 계획을 말해 줘" |
| CT-01이나 CT-03이 실패한다 | 문구에 `C#4` 같은 씨앗 글자가 그대로 나갔거나 금지 표현을 썼다 | "실패 문장에 나온 문구가 어디서 만들어지는지 찾아 줘. 주소는 `T()`나 `josa()`로 토큰을 만들어야 해" |
| 바로가기(`#d3-2`)가 빈 화면이다 | 배달 모델 없이 그렸다. `openRun`을 고쳤다 | "openRun이 모델을 먼저 만들고 setState를 한 번만 부르는지 봐 줘(ST-03)" |

**이론과 흐름.**

| 증상 | 원인 | 줄 말 |
|---|---|---|
| C♯4와 D♭5가 같은 집으로 판정된다 | 12로 나눈 나머지로 견줬다 | "판정에 `samePc`나 `% 12`를 쓰는 곳을 모두 찾아 줘. 같은 집은 집 번호의 일치로만 판정해(R4)" |
| B♯3이 C3에 배달된다 | 숫자를 도착 집의 구역으로 읽었다 | "`midiOf`와 `anchorOf`를 가이드의 조각과 견줘 줘. 집 번호 = 12 × (숫자 + 1) + 자연음 반음값 + 변화량이야" |
| 더블샵이 한 칸이나 세 칸으로 간다 | 기호를 앞의 기호에 더했거나 샵과 같은 값으로 뒀다 | "변화량은 +2야. 늘 글자의 흰 집에서 세(R5). `parse`와 `ACC`를 조각과 견줘 줘" |
| E♯4의 음표가 F의 자리에 그려진다 | 집 번호로 오선의 자리를 정했다 | "음표의 세로 자리는 `stepOf`(7 × 숫자 + 글자)로 정해. `drawStaff`를 조각과 견줘 줘" |
| 누르지 않았는데 정답이 된다 | 우체부의 처음 자리가 도착 집이다 | "`F.confirm`의 첫 갈래(고르지 않은 확정은 채점하지 않는다)를 조각과 견줘 줘(R9)" |
| 쓰기에서 맞는 주소인데 틀렸다고 한다 | 정답을 주소 하나로 좁혔다 | "쓰기의 판정은 `midiOf(pen) === m.target`이고 판에 없으면 받는 거야(R7). 조각과 견줘 줘" |
| 집이 창 밖에 있다. 화면이 깨진다 | 씨앗의 집들이 흰 집 아홉 채에 들어오지 않는다 | "그 씨앗으로 `checkJob(jobModel(씨앗, 배달일))`을 돌려 결과를 적어 줘. 빈 목록이 아니면 씨앗을 바꿔야 해" |
| "C♯4은", "B♯3는"처럼 조사가 틀린다 | 글자를 보고 조사를 골랐다 | "주소 뒤의 조사는 `josa(주소, 받침 있을 때, 없을 때)`로 붙여. 숫자를 읽은 소리의 받침으로 골라" |
| 다시 낸 배달이 통과에 들어간다. 마감 배달이 다시 나온다 | `dayReport`나 `done` 갈고리를 고쳤다 | "P17의 조각과 견줘 줘. 첫 번째 결과만 세고, 줄의 앞 n−1 자리만 다시 내(ST-03)" |
| 새로고침하면 처음부터다 | 저장이 막혔거나 `active`를 믿을 수 없어 지웠다 | "`store.persistent`, `store.why`, `localStorage`의 `twn_save_v1`을 적어 줘. `resumePlan(store.data.active)`의 결과도" |

**화면.**

| 증상 | 원인 | 줄 말 |
|---|---|---|
| 단계가 바뀔 때 화면이 들썩인다 | 조작부의 높이가 내용에 따라 바뀐다 | "조작부는 104px 고정이고 묶음 다섯은 미리 있어. `hidden`만 바꿔야 해(R14, R17). 스타일을 P01의 조각과 견줘 줘" |
| 가로 스크롤이 생긴다 | 새로 넣은 요소가 320px을 넘는다 | "320×568에서 `document.documentElement.scrollWidth`와 가장 넓은 요소를 찾아 줘" |
| 판독 줄이 세 줄이 된다 | 문구가 길다. 두 주소의 걸음을 한 문장에 다 말했다 | "그 문구를 줄여 줘. 듣기가 끝난 뒤의 문장은 높낮이 말(`pitchKo`)로 써. 고친 뒤 도구의 text 묶음을 돌려 줘" |
| 판독 줄에서 주소와 문장이 두 단으로 갈린다 | 문장을 감싸지 않고 넣었다 | "판독 줄에는 `<span>` 한 겹으로 감싸 넣어. P07의 조각과 견줘 줘" |
| 걸을 때 키보드 포커스가 사라진다 | 길을 통째로 다시 그렸다 | "`buildStreet`가 불리는 곳을 모두 찾아 줘. 창이 바뀔 때 한 곳이어야 해(R17)" |
| 기호 그림의 폭이 브라우저마다 다르다 | SVG에 높이만 줬다 | "`signSvg`가 높이와 폭을 em으로 함께 적는지 봐 줘" |
| 화살표나 기록 표시가 기기마다 다르게 보인다 | 글자(◀ ●)를 썼다 | "도형 글자를 SVG와 CSS로 바꿔 줘(R16)" |
| 한글이 낱말 중간에서 줄바꿈된다 | 기본 줄바꿈 | "`word-break: keep-all`이 빠졌는지 P01의 스타일과 견줘 줘" |
| 높은 화면에서 집이 길쭉하다 | 무대가 남는 높이를 다 가졌다 | "`measure`를 조각과 견줘 줘. 집의 높이는 72~150px이야" |
| 겹쳐 뜨는 화면 뒤의 단추가 눌린다 | `inert`가 빠졌다 | "구획 10의 `onPaint(10, …)`가 새 화면에서도 `#app`을 `inert`로 두는지 봐 줘" |

**소리.**

| 증상 | 원인 | 줄 말 |
|---|---|---|
| 아이폰에서 첫 탭에 소리가 없다 | 언락이 재생 단추에만 걸려 있다. 또는 무음 스위치 | "언락이 `click`, `touchstart`, `keydown` 세 곳에 걸려 있는지 봐 줘. 무음 스위치는 P20의 소리 확인 장이 받아" |
| 듣기의 첫 음이 걸음 소리와 겹친다 | 걸음 소리를 끊지 않았다 | "`beginListen`이 시작할 때 `silence(\"hop\")`을 부르는지 봐 줘(AU-04)" |
| 빨리 누르면 음이 겹친다 | 앞선 예약을 취소하지 않았다 | "새 재생 전에 묶음을 취소하는지(`stopRun`, `silence`) 조각과 견줘 줘(R11)" |
| 함께 낼 때 소리가 갑자기 커진다 | 음마다 같은 크기로 냈다 | "함께 낼 때의 크기는 0.3 ÷ n이야(AU-03)" |
| 듣기가 끝나지 않고 문패가 밝은 채로 굳는다 | 소리 시계가 멈췄는데 감시가 없다 | "`frame`의 정지 감시와 `abortRun`, `on(\"audio\", …)`을 P11의 조각과 견줘 줘(AU-07)" |
| 다른 화면으로 갔는데 소리가 이어진다 | 화면을 바꿀 때 `emit(\"leave\")`를 부르지 않았다 | "화면을 바꾸는 곳마다 `emit(\"leave\")`가 먼저 불리는지 모두 찾아 줘(ST-04)" |
| 틀렸을 때 음이 난다 | 오답에 집의 소리를 냈다 | "채점한 오답에서는 `nope` 효과음만 나야 해(R12, AU-06)" |

## 14. 배포

새 GitHub 저장소와 Vercel을 쓴다(D11). 빌드 단계가 없다. 화면의 이름은 서비스가 바꿀 수 있으므로 하는 일만 적는다.

1. **저장소.** GitHub에 새 저장소를 만든다. 넣는 것은 `index.html`, `docs/`(설계서, 이 문서, `decisions.md`, `post-gate-report.md`, `device-check.md`), `tools/check.mjs`, `.gitignore`(`node_modules`)다.
2. **잇기.** Vercel에서 그 저장소를 가져온다. 프레임워크는 "없음(정적)"으로, 빌드 명령은 비우고, 내보낼 폴더는 저장소의 맨 위로 둔다.
3. **미리보기.** 브랜치에 올리면 미리보기 주소가 생긴다. P12와 P14에서 폰으로 확인할 때 이 주소를 쓴다.
4. **배포할 것만.** `docs/`와 `tools/`가 배포 주소로 열리지 않게 `.vercelignore`에 `docs`, `tools`, `node_modules`, `package.json`, `package-lock.json`을 적는다. 배포되는 것은 `index.html` 하나다.
5. **배포 전 확인.** `index.html#test`가 그 단계의 수와 같다. `node tools/check.mjs index.html`이 실패 0이다. 콘솔 오류 0, 외부 요청 0.
6. **첫 배포는 GPO6(v0.6)** 이다. 기본 브랜치에 합치면 배포 주소가 바뀐다. 배포 주소에서 폰으로 1단을 끝까지 한다.
7. **배포 뒤.** 배포 주소의 `#test`를 한 번 연다. 폰에서 옛 화면이 보이면 탭을 닫고 다시 연다.

버전은 게이트를 넘긴 때에만 올린다.

| 게이트 | GPO0 | GPO1 | GPO2 | GPO3 | GPO4 | GPO5 | GPO6 | GPO7 | GPO8 | GPO9 |
|---|---|---|---|---|---|---|---|---|---|---|
| 버전 | v0.0 | v0.1 | v0.2 | v0.3 | v0.4 | v0.5 | v0.6 | v0.8 | v0.9 | v1.0 |
| 프롬프트 | P02 | P05 | P09 | P12 | P14 | P16 | P21 | P27 | P32 | P33 |

기기 밖으로 보내는 데이터가 없다. 분석 스크립트, 광고, 외부 글꼴을 넣지 않는다. 어린 학습자가 쓰므로 뒤에 사용 통계를 넣으려면 따로 정한다.

---

## 부록 A. 게이트 보고 양식

[점검] 프롬프트가 끝날 때마다 아래 블록을 `docs/post-gate-report.md`의 끝에 더한다. AI가 채울 수 있는 것은 `tests`, `viewports`(도구가 본 화면), `external_requests`, `file_bytes`다. `device_check`와 `listening_check`는 사람이 채운다. 돌리지 못한 항목은 `NOT_RUN`으로 적는다.

```yaml
GATE_REPORT:
  gate: GPO4
  date: 2026-00-00
  status: PASS              # 또는 PARTIAL / FAIL
  tests: { TH: 12/12, CH: 4/4, SC: 3/3, JB: 4/4, FL: 5/5, AU: 8/8, ST: 3/3, SV: 4/4, CT: 2/2 }
  check_tool: "layout 5840장면 문제 0 · text 404/55 넘침 0 · 실패 0"   # 돌리지 못했으면 NOT_RUN
  viewports: [320x545, 320x568, 360x640, 390x844]
  external_requests: 0
  file_bytes: 0
  device_check: NOT_RUN     # 실기기로 확인했으면 기종, 브라우저, 날짜
  listening_check: NOT_RUN  # 귀로 들었으면 기종과 날짜, P12의 표에서 들은 항목
  changed_verbatim: []      # [그대로] 조각에서 바꾼 곳. 있으면 까닭과 함께
  open_issues: []           # PARTIAL이면 남은 일과 그 일을 닫을 게이트
```

- `PARTIAL`로 넘기려면 `open_issues`에 남은 일과 그 일을 닫을 게이트를 적는다.
- 버전은 게이트를 넘긴 때에만 올린다(14장의 표).
- 결정을 확정하거나 값을 바꾼 때는 `docs/decisions.md`에 날짜, 결정 번호, 값, 근거를 적는다.

## 부록 B. 검사 47개와 화면 점검 10개

### B.1 페이지 안에서 도는 검사

`index.html#test`가 보여 주는 검사다. 단언 수는 골든 빌드에서 `#test`로 열었을 때의 값이고 모두 더하면 10,039개다. ST-03은 평소 주소로 열면 그리기를 줄여 단언이 더 적다(0.7절 6번).

| 검사 | 이름 | 들어오는 프롬프트 | 단언 수(`#test`) |
|---|---|---|---|
| TH-01 | 자연음 반음값과 집 번호 | P03 | 2 |
| TH-02 | 주소는 출발 집에서 기호만큼 걷는다 | P03 | 1,575 |
| TH-03 | 한 집의 주소 수 | P03 | 354 |
| TH-04 | 주소는 모두 35가지 | P03 | 7 |
| TH-05 | 구역 숫자가 갈리는 집 | P03 | 84 |
| TH-06 | 초안의 예시 | P03 | 56 |
| TH-07 | 주파수 | P03 | 2 |
| TH-08 | 오선의 자리 | P03 | 2 |
| TH-09 | 오답의 까닭 | P03 | 3,257 |
| TH-10 | 반송 길 | P03 | 114 |
| TH-11 | 창 | P03 | 81 |
| TH-12 | 이론 값이 소스에 글자로 적혀 있지 않다 | P04 | 59 |
| CH-01 | 음정 | P03 | 2 |
| CH-02 | 3화음은 글자를 하나씩 건너뛴다 | P03 | 355 |
| CH-03 | 초안의 화음 | P03 | 9 |
| CH-04 | 딴이름 화음 | P03 | 187 |
| SC-01 | 음계는 글자를 한 번씩 쓴다 | P03 | 173 |
| SC-02 | 마지막 올림표는 이끎음 | P03 | 7 |
| SC-03 | 문맥에 맞는 주소 | P03 | 6 |
| JB-01 | 출제 제약 | P04 | 59 |
| JB-02 | 배달일의 구성 | P04 | 55 |
| JB-03 | 문패 28개 | P04 | 2 |
| JB-04 | 새 기호는 걸어서 배운다 | P04 | 4 |
| FL-01 | 한 번에 맞히면 ● | P04 | 432 |
| FL-02 | 한 번 틀리면 ◐, 안내를 받는다 | P04 | 314 |
| FL-03 | 두 번 틀리면 고쳐 주고 ◐ | P04 | 467 |
| FL-04 | 채점하지 않는 입력 | P04 | 15 |
| FL-05 | 문구 | P04 | 217 |
| AU-01 | 주파수는 집 번호 하나에서 나온다 | P11 | 56 |
| AU-02 | 듣기는 한 번에 예약한다 | P11 | 12 |
| AU-03 | 함께 낼 때는 크기를 주소 수로 나눈다 | P11 | 2 |
| AU-04 | 새 듣기와 떠나기는 앞선 묶음을 끊는다 | P11 | 5 |
| AU-05 | 걸음 소리는 한 걸음에 한 음이고 새 걸음이 앞의 소리를 끊는다 | P10 | 5 |
| AU-06 | 효과음은 잡음이다. 틀렸을 때 집의 소리를 내지 않는다 | P10 | 58 |
| AU-07 | 소리가 멈추면 듣기를 멈추고 알린다 | P11 | 9 |
| AU-08 | 타이머로 소리를 잇지 않는다 | P10 | 3 |
| ST-01 | 단계 전환은 흐름 그림에 있는 것뿐이다 | P04 | 444 |
| ST-02 | 상태를 바꾸는 곳은 setState 하나다 | P02 | 3 |
| ST-03 | 중간 배달로 들어가도 모델을 먼저 만들고 상태를 한 번에 넣는다 | P17 | 190 |
| ST-04 | 듣는 도중에 떠나면 듣기가 남지 않는다 | P13 | 6 |
| SV-01 | 저장을 쓰고 읽으면 같은 값이다 | P02 | 7 |
| SV-02 | 빠진 필드만 기본값으로 채운다 | P02 | 8 |
| SV-03 | 깨진 저장과 더 높은 버전은 기본값으로 시작하고 원본을 남긴다 | P02 | 10 |
| SV-04 | 저장소가 오류를 던지면 메모리에 둔다 | P02 | 5 |
| CT-01 | 문구의 주소는 토큰으로만 적힌다 | P04 | 1,261 |
| CT-02 | 내용의 수가 엔진의 값과 같다 | P18 | 52 |
| CT-03 | 금지 표현이 없다 | P04 | 6 |

묶음마다 보는 것은 이렇다.

| 묶음 | 보는 것 |
|---|---|
| TH 이론 | 자연음 반음값과 집 번호, 주소 315개의 걸음, 한 집의 주소 수(88건반), 한 구역 35가지, 숫자가 갈리는 집, 초안의 예시 16쌍, 주파수, 오선의 자리와 덧줄, 오답의 까닭, 반송 길, 창, 소스에 이론 값이 글자로 없음 |
| CH 화음 | 음정, 3화음(장 31, 단 31, 감 29, 증 27), 초안의 화음, 딴이름 화음. 화면은 v1.1 |
| SC 음계 | 음계 84가지가 글자를 한 번씩, 마지막 올림표는 이끎음, 문맥에 맞는 주소. 화면은 v1.2 |
| JB 씨앗 | 출제 제약과 반송의 까닭, 배달일의 구성(7, 7, 8, 8, 8, 8), 문패 28개(0, 10, 4, 6, 6, 2), 새 기호는 걸어서 배운다 |
| FL 흐름 | 배달 55건을 한 번에, 한 번 틀리고, 두 번 틀리고 끝까지. 채점하지 않는 입력. 문구와 낱말 |
| AU 소리 | 주파수, 예약 시각, 함께 낼 때의 크기, 묶음 취소, 걸음 소리, 효과음, 정지와 복구, 타이머 없음. 가짜 컨텍스트로 돈다 |
| ST 상태 | 단계 전환, `setState` 하나, 중간 배달로 들어가기와 배달일의 흐름, 듣는 도중에 떠나기 |
| SV 저장 | 쓰고 읽기, 빠진 필드 채우기, 깨진 저장과 높은 버전, 막힌 저장소 |
| CT 내용 | 문구의 주소는 토큰, 내용의 수가 엔진과 같음(46건, 장면 여섯, 35 = 7 + 28), 금지 표현 |

**검사가 보지 못하는 것.** 실제로 소리가 났는지, 음색과 크기, 손가락으로 집을 고를 수 있는지, 그림이 읽히는지, 문장이 자연스러운지. 검사 47/47은 "규칙대로 계산하고 규칙대로 예약한다"까지다.

### B.2 화면 점검

페이지 밖에서 `tools/check.mjs`(부록 D)와 눈으로 본다. 여덟 화면은 320×545, 320×568, 360×600, 360×640, 390×664, 390×844, 430×932, 800×600이다.

| 점검 | 내용 | 도구의 묶음 | 처음 보는 때 |
|---|---|---|---|
| E-01 | 여덟 화면 × 모든 장면에서 가로·세로 스크롤 0, 무대와 조작부 밖으로 나간 요소 0 | `layout` | P09 |
| E-02 | 다섯 줄의 높이가 한 화면 안에서 장면 내내 같다 | `layout` | P09 |
| E-03 | 가장 작은 글자 12px, 단추 44px, 주 단추 52px. 글자가 넘친 단추 0 | `layout` | P09 |
| E-04 | 악보: 음표·기호·음자리표가 악보 창 안에 있고 서로 겹치지 않는다 | `layout` | P09 |
| E-05 | 길: 문패 판이 줄 안, 우체부가 길 안, 구역 글자와 집 글자가 넘치지 않는다. 집의 치수가 화면별 표와 같다 | `layout` | P09 |
| E-06 | 문구 전부와 편지 카드 전부가 320×545, 320×568, 360×600, 390×664에서 두 줄 이내 | `text` | P09 |
| E-07 | 화면 크기 바꾸기: 모드가 바뀌고 쓰던 주소가 남는다. 545px 미만에서 안내, [그래도 계속하기] | `resize` | P16 |
| E-08 | 키보드만으로 완주한다. 집을 누른 뒤 포커스가 남는다 | `keys` | P16 |
| E-09 | 콘솔 오류 0, 외부 요청 0 | 모든 묶음 | P09 |
| E-10 | 화면 캡처 세트를 눈으로 본다 | `shots` | P32 |

도구에는 이 밖에 `flow`(검사용 하루 아홉 건의 오답 경로와 문구), `audio`(진짜 오디오 컨텍스트의 발진기를 가로채 주파수, 예약 시각, 취소를 본다), `days`(저장, 다시 내기, 발견 장면, 이어하기, 통과와 잠금, 여섯 배달일의 완주)가 있다.

화면별 집의 치수(E-05). 그림을 입힌 뒤에도 이 값이어야 한다.

| 화면 | 모드 | 다섯 줄의 높이 | 흰 집(폭 × 높이) | 검은 집(폭 × 높이) | 악보 창(폭 × 높이) |
|---|---|---|---|---|---|
| 320×545 | 좁음 | 44 / 50 / 271 / 40 / 104 | 31.8 × 83 | 19.7 × 49.8 | 190 × 96 |
| 320×568 | 좁음 | 44 / 50 / 294 / 40 / 104 | 31.8 × 106 | 19.7 × 63.6 | 190 × 96 |
| 360×600 | 좁음 | 44 / 50 / 326 / 40 / 104 | 36.2 × 138 | 22.5 × 82.8 | 230 × 96 |
| 360×640 | 기본 | 44 / 56 / 347.6 / 40 / 104 | 36.2 × 150 | 22.5 × 90 | 230 × 105.6 |
| 390×664 | 기본 | 44 / 56 / 347.6 / 40 / 104 | 39.5 × 150 | 24.5 × 90 | 260 × 105.6 |
| 390×844 | 넉넉 | 44 / 56 / 357.2 / 40 / 104 | 39.5 × 150 | 24.5 × 90 | 260 × 115.2 |
| 430×932 | 넉넉 | 44 / 56 / 357.2 / 40 / 104 | 44 × 150 | 27.3 × 90 | 300 × 115.2 |
| 800×600 | 좁음 | 44 / 50 / 326 / 40 / 104 | 76.2 × 138 | 47.3 × 82.8 | 590 × 96 |

## 부록 C. 프롬프트와 설계서 대응표

| 프롬프트 | 설계서의 절 | 코드의 출처 |
|---|---|---|
| P00 | 0장(용어), 3.5절, 4.2절, 5.10절, 6.2절, 7.3절, 11.0절, 부록 B, 부록 D(질문) | |
| P01 | 9.1절, 9.5절, 9.8절, 10.1절 | 부록 C.5(스타일), C.6(틀). 구획과 갈고리는 가이드에서 새로 썼다 |
| P02 | 10.4절, 10.5절 | 가이드에서 새로 썼다 |
| P03 | 6.1~6.3절, 6.6절, 6.7절 | 부록 C.1 그대로. 검사는 설계서의 Node 검사를 옮겼다 |
| P04 | 5.2~5.11절, 6.4절, 6.5절, 8.3절 | 부록 C.2, C.3 그대로 |
| P05 | 11장 PO1, 부록 B | |
| P06 | 9.3절, 10.2절, 10.3절 | 부록 C.4의 기호·주소 글자·길. 배달 열기는 새로 썼다 |
| P07 | 9.2절 | 부록 C.4의 악보와 봉투 |
| P08 | 9.1절, 9.3절 | 부록 C.4의 걸음, 문패 판. 조작부 그리기는 나눠 다시 썼다 |
| P09 | 11장 PO2, 12.1절 | 부록 D(스파이크의 점검 도구를 제품용으로 고쳤다) |
| P10 | 7.1~7.3절, 7.5절 | 부록 C.4의 소리. 컨텍스트 걸기와 가짜 컨텍스트 끼우기는 새로 썼다 |
| P11 | 7.3~7.5절 | 부록 C.4의 듣기 |
| P12 | 7.7절, 12.2절, 12.3절 | |
| P13 | 5.3~5.5절, 5.9절, 5.10절 | 부록 C.4의 입력. `act`와 갈고리는 새로 썼다 |
| P14 | 11장 PO4, 12.3절 1번 | |
| P15 | 5.6~5.8절, 3.2절(키보드) | 부록 C.4의 입력 |
| P16 | 11장 PO5 | |
| P17 | 8.2절, 8.5절, 10.2절, 10.4절 | 가이드에서 새로 썼다 |
| P18 | 8.4절 | 가이드에서 새로 썼다 |
| P19 | 9.4절 | 가이드에서 새로 썼다(임시) |
| P20 | 7.5절, 8.8절, 9.4절, 10.7절 | [설계] |
| P21 | 11장 PO6, 10.8절 | |
| P22 | 8.5절, 9.4절 | [설계] |
| P23 | 7.6절, 8.4절, 8.5절 | [설계] |
| P24 | 6.3절, 6.5절, 8.6절 | [설계] |
| P25 | 8.7절 | [설계] |
| P26 | 9.4절, 10.4절, 10.5절 | [설계] |
| P27 | 11장 PO7 | |
| P28 | 9.2절, 9.3절, 9.5절, 9.6절 | [설계] |
| P29 | 9.7절 | [설계] |
| P30 | 8.8절 | [설계] |
| P31 | 9.8절, 9.9절 | [설계] |
| P32 | 11장 PO8 | |
| P33 | 12.3절, 12.4절, 11장 PO9 | |

설계서의 부록 C.4는 화면, 소리, 입력을 한 덩어리로 담은 스파이크의 코드다. 가이드는 그것을 구획 4~8로 나누고 갈고리로 이었다. 나눈 뒤의 코드가 스파이크와 같은 동작을 하는지는 스파이크의 점검(흐름, 키보드, 소리, 화면 크기)을 제품용으로 옮긴 도구로 확인했다.

## 부록 D. 화면 점검 도구 `tools/check.mjs`

P09에서 저장소에 넣는다. Playwright로 `index.html`을 헤드리스 브라우저에 띄워 잰다. 페이지를 고치지 않는다.

```
npm i -D playwright
npx playwright install chromium
node tools/check.mjs index.html                  # shots를 뺀 전부
node tools/check.mjs index.html layout text      # 묶음을 골라서
node tools/check.mjs index.html --out docs/check-report.json
```

단계마다 기대하는 합계다. 골든 빌드의 단계 파일에서 돌린 값이다.

| 끝난 프롬프트 | 돌릴 묶음 | 화면마다 장면(`layout`) | 문구 / 편지 카드(`text`) | `flow` | `keys` | `audio` | `resize` | `days` |
|---|---|---|---|---|---|---|---|---|
| P08 | layout text | 730 | 400 / 55 |  |  |  |  |  |
| P15 | layout text flow keys audio resize | 730 | 404 / 55 | 52 | 22 | 19 | 7 |  |
| P17 | 전부 | 730 | 404 / 55 | 53 | 22 | 19 | 7 | 30 |
| P18 | 전부 | 769 | 424 / 61 | 53 | 22 | 19 | 7 | 34 |
| P19 | 전부 | 769 | 424 / 61 | 53 | 22 | 19 | 7 | 45 |

모든 줄에서 `실패 0`이다. 화면 여덟 개 모두 같은 수의 장면을 본다.

- `layout`은 손짓 없이 상태를 넣어 장면을 넘긴다. 배달 55건을 바른 길과 두 번씩 틀리는 길로 지나며 장면마다 잰다. P18부터는 발견 장면도 잰다.
- `flow`, `keys`, `audio`, `resize`는 검사용 하루(`#sp`)를 진짜 탭과 키로 한다. P15 뒤에 쓴다.
- `days`는 저장이 빈 새 창에서 0단과 1단을 하며 저장, 다시 내기, 발견 장면, 이어하기, 통과와 잠금을 보고, 여섯 배달일을 탭만으로 완주한다. P17 뒤에 쓴다. 타이틀(`#titleScreen`, `#startBtn`)과 소리 확인 장(`#soundCheck`, `#soundYes`)이 생기면 알아서 지나간다.
- 도구는 페이지의 전역 이름(`S`, `M`, `run`, `ctx`, 엔진 함수, 검사 구획의 `t`로 시작하는 도우미)을 읽는다. [설계]에서 이 이름들을 바꾸면 도구도 함께 고쳐야 한다.
- 헤드리스 Chrome은 자동 재생 제한을 끈 채 돈다. 브라우저가 첫 재생을 막는 상황은 보지 못한다.

```js
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
```

## 부록 E. 배달 46건과 발견 장면 6개

씨앗에서 엔진이 계산한 값이다. 표와 화면이 어긋나면 코드가 틀린 것이다. "새 문패"는 그 배달을 ●로 마쳤을 때 처음 얻는 문패다.

### E.1 배달일의 구성

| 단 | 배달일 | 배달 | 통과(● 수) | 쓰는 기호 | 새 문패 | 수 |
| --- | --- | --- | --- | --- | --- | --- |
| 0단 | 첫 배달 | 7 | 6 | 없음 | 없음 | 0 |
| 1단 | 검은 집의 두 주소 | 7 | 6 | ♯ ♭ | C♯ D♭ F♯ G♭ A♭ G♯ E♭ D♯ A♯ B♭ | 10 |
| 2단 | 흰 집의 숨은 주소 | 8 | 7 | ♯ ♭ | E♯ F♭ B♯ C♭ | 4 |
| 3단 | 두 칸 특급: 더블샵 | 8 | 7 | ♯ ♭ 𝄪 | C𝄪 F𝄪 E𝄪 D𝄪 G𝄪 A𝄪 | 6 |
| 4단 | 두 칸 특급: 더블플랫 | 8 | 7 | ♯ ♭ 𝄪 𝄫 | E𝄫 B𝄫 F𝄫 A𝄫 G𝄫 D𝄫 | 6 |
| 5단 | 옥타브 경계 검문소 | 8 | 7 | ♯ ♭ 𝄪 𝄫 | B𝄪 C𝄫 | 2 |

| 단 | 배달 | 통과 | 걸음 연습 | 걸어서 배달 | 바로 배달 | 그 가운데 악보 편지 | 우편 분류 | 반송 편지 | 쓰기가 붙는 배달 | 기본 창 밖의 배달 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 0단 | 7 | 6 | 3 | 0 | 4 | 0 | 0 | 0 | 0 | 없음 |
| 1단 | 7 | 6 | 0 | 3 | 3 | 2 | 1 | 0 | 4 | 없음 |
| 2단 | 8 | 7 | 0 | 3 | 4 | 2 | 1 | 0 | 2 | 없음 |
| 3단 | 8 | 7 | 0 | 2 | 4 | 1 | 1 | 1 | 3 | 없음 |
| 4단 | 8 | 7 | 0 | 2 | 4 | 1 | 1 | 1 | 3 | d4-07(A3~B4) |
| 5단 | 8 | 7 | 0 | 2 | 4 | 2 | 1 | 1 | 4 | d5-02(A3~B4), d5-04(C4~D5), d5-06(A3~B4) |
| 합계 | 46 | 40 | 3 | 12 | 23 | 8 | 5 | 3 | 16 | B3~C5 42건, A3~B4 3건, C4~D5 1건 |

### E.2 0단: 첫 배달

| 배달 | 방식 | 주소 | 보여 주기 | 창 | 출발 집 → 도착 집 | 걸음 | 더 하는 일 | 새 문패 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| d0-01 | 바로 배달 | C4 | 글자와 악보 | B3~C5 | C4 → C4 | 없음 |  |  |
| d0-02 | 바로 배달 | A4 | 글자와 악보 | B3~C5 | A4 → A4 | 없음 |  |  |
| d0-03 | 바로 배달 | C5 | 글자와 악보 | B3~C5 | C5 → C5 | 없음 |  |  |
| d0-04 | 바로 배달 | B3 | 글자와 악보 | B3~C5 | B3 → B3 | 없음 |  |  |
| d0-05 | 걸음 연습 | E4 | 글자 | B3~C5 | E4 → F4 | 오른쪽으로 한 칸 |  |  |
| d0-06 | 걸음 연습 | C4 | 글자 | B3~C5 | C4 → C♯4/D♭4 | 오른쪽으로 한 칸 |  |  |
| d0-07 마감 | 걸음 연습 | C5 | 글자 | B3~C5 | C5 → B4 | 왼쪽으로 한 칸 |  |  |

### E.3 1단: 검은 집의 두 주소

| 배달 | 방식 | 주소 | 보여 주기 | 창 | 출발 집 → 도착 집 | 걸음 | 더 하는 일 | 새 문패 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| d1-01 | 걸어서 배달 | C♯4 | 글자와 악보 | B3~C5 | C4 → C♯4/D♭4 | 오른쪽으로 한 칸 |  | C♯ |
| d1-02 | 걸어서 배달 | D♭4 | 글자와 악보 | B3~C5 | D4 → C♯4/D♭4 | 왼쪽으로 한 칸 | 이미 달린 문패 C♯4 | D♭ |
| d1-03 | 걸어서 배달 | F♯4 | 글자와 악보 | B3~C5 | F4 → F♯4/G♭4 | 오른쪽으로 한 칸 | 문패 G♭4 (하나) | F♯ G♭ |
| d1-04 | 바로 배달 | A♭4 | 글자와 악보 | B3~C5 | A4 → G♯4/A♭4 | 왼쪽으로 한 칸 | 문패 G♯4 (하나) | A♭ G♯ |
| d1-05 | 악보 편지 | E♭4 | 악보만 | B3~C5 | E4 → D♯4/E♭4 | 왼쪽으로 한 칸 | 문패 D♯4 (하나) | E♭ D♯ |
| d1-06 | 우편 분류 | D♭4 | 글자와 악보 | B3~C5 | D4 → C♯4/D♭4 | 왼쪽으로 한 칸 | 카드 C♯4 ○, D♯4 ×(D♯4/E♭4), C4 ×(C4), E♭4 ×(D♯4/E♭4) |  |
| d1-07 마감 | 악보 편지 | A♯4 | 악보만 | B3~C5 | A4 → A♯4/B♭4 | 오른쪽으로 한 칸 | 문패 B♭4 (하나). 미리 보기 끔 | A♯ B♭ |

### E.4 2단: 흰 집의 숨은 주소

| 배달 | 방식 | 주소 | 보여 주기 | 창 | 출발 집 → 도착 집 | 걸음 | 더 하는 일 | 새 문패 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| d2-01 | 걸어서 배달 | E♯4 | 글자와 악보 | B3~C5 | E4 → F4 | 오른쪽으로 한 칸 |  | E♯ |
| d2-02 | 걸어서 배달 | F♭4 | 글자와 악보 | B3~C5 | F4 → E4 | 왼쪽으로 한 칸 |  | F♭ |
| d2-03 | 걸어서 배달 | B♯3 | 글자와 악보 | B3~C5 | B3 → C4 | 오른쪽으로 한 칸 |  | B♯ |
| d2-04 | 악보 편지 | C♭4 | 악보만 | B3~C5 | C4 → B3 | 왼쪽으로 한 칸 |  | C♭ |
| d2-05 | 바로 배달 | F4 | 글자와 악보 | B3~C5 | F4 → F4 | 없음 | 문패 E♯4 (하나) |  |
| d2-06 | 바로 배달 | C4 | 글자와 악보 | B3~C5 | C4 → C4 | 없음 | 문패 B♯3 (하나) |  |
| d2-07 | 우편 분류 | C4 | 글자와 악보 | B3~C5 | C4 → C4 | 없음 | 카드 B♯3 ○, B♯4 ×(C5), C♭4 ×(B3), B3 ×(B3) |  |
| d2-08 마감 | 악보 편지 | C♭5 | 악보만 | B3~C5 | C5 → B4 | 왼쪽으로 한 칸 |  |  |

### E.5 3단: 두 칸 특급, 더블샵

| 배달 | 방식 | 주소 | 보여 주기 | 창 | 출발 집 → 도착 집 | 걸음 | 더 하는 일 | 새 문패 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| d3-01 | 걸어서 배달 | C𝄪4 | 글자와 악보 | B3~C5 | C4 → D4 | 오른쪽으로 두 칸 |  | C𝄪 |
| d3-02 | 걸어서 배달 | F𝄪4 | 글자와 악보 | B3~C5 | F4 → G4 | 오른쪽으로 두 칸 |  | F𝄪 |
| d3-03 | 바로 배달 | E𝄪4 | 글자와 악보 | B3~C5 | E4 → F♯4/G♭4 | 오른쪽으로 두 칸 | 문패 F♯4, G♭4 (모두) | E𝄪 |
| d3-04 | 악보 편지 | D𝄪4 | 악보만 | B3~C5 | D4 → E4 | 오른쪽으로 두 칸 |  | D𝄪 |
| d3-05 | 바로 배달 | A4 | 글자와 악보 | B3~C5 | A4 → A4 | 없음 | 문패 G𝄪4 (하나) | G𝄪 |
| d3-06 | 반송 편지 | A𝄪4 | 글자와 악보 | B3~C5 | A4 → B4 | 오른쪽으로 두 칸 | 잘못 간 길 A4 → A♯4/B♭4. 까닭: 걸음 수 | A𝄪 |
| d3-07 | 우편 분류 | E4 | 글자와 악보 | B3~C5 | E4 → E4 | 없음 | 카드 D𝄪4 ○, F♭4 ○, D♯4 ×(D♯4/E♭4), E𝄪4 ×(F♯4/G♭4) |  |
| d3-08 마감 | 바로 배달 | B4 | 글자와 악보 | B3~C5 | B4 → B4 | 없음 | 문패 C♭5, A𝄪4 (모두). 미리 보기 끔 |  |

### E.6 4단: 두 칸 특급, 더블플랫

| 배달 | 방식 | 주소 | 보여 주기 | 창 | 출발 집 → 도착 집 | 걸음 | 더 하는 일 | 새 문패 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| d4-01 | 걸어서 배달 | E𝄫4 | 글자와 악보 | B3~C5 | E4 → D4 | 왼쪽으로 두 칸 |  | E𝄫 |
| d4-02 | 걸어서 배달 | B𝄫4 | 글자와 악보 | B3~C5 | B4 → A4 | 왼쪽으로 두 칸 |  | B𝄫 |
| d4-03 | 바로 배달 | F𝄫4 | 글자와 악보 | B3~C5 | F4 → D♯4/E♭4 | 왼쪽으로 두 칸 | 문패 D♯4, E♭4 (모두) | F𝄫 |
| d4-04 | 악보 편지 | A𝄫4 | 악보만 | B3~C5 | A4 → G4 | 왼쪽으로 두 칸 |  | A𝄫 |
| d4-05 | 바로 배달 | D4 | 글자와 악보 | B3~C5 | D4 → D4 | 없음 | 문패 C𝄪4, E𝄫4 (모두) |  |
| d4-06 | 반송 편지 | G𝄫4 | 글자와 악보 | B3~C5 | G4 → F4 | 왼쪽으로 두 칸 | 잘못 간 길 G4 → A4. 까닭: 방향 | G𝄫 |
| d4-07 | 우편 분류 | A4 | 글자와 악보 | A3~B4 | A4 → A4 | 없음 | 카드 G𝄪4 ○, B𝄫4 ○, A♭4 ×(G♯4/A♭4), B𝄫3 ×(A3) |  |
| d4-08 마감 | 바로 배달 | C4 | 글자와 악보 | B3~C5 | C4 → C4 | 없음 | 문패 B♯3, D𝄫4 (모두). 미리 보기 끔 | D𝄫 |

### E.7 5단: 옥타브 경계 검문소

| 배달 | 방식 | 주소 | 보여 주기 | 창 | 출발 집 → 도착 집 | 걸음 | 더 하는 일 | 새 문패 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| d5-01 | 걸어서 배달 | B𝄪3 | 글자와 악보 | B3~C5 | B3 → C♯4/D♭4 | 오른쪽으로 두 칸 |  | B𝄪 |
| d5-02 | 걸어서 배달 | C𝄫4 | 글자와 악보 | A3~B4 | C4 → A♯3/B♭3 | 왼쪽으로 두 칸 |  | C𝄫 |
| d5-03 | 바로 배달 | C♯4 | 글자와 악보 | B3~C5 | C4 → C♯4/D♭4 | 오른쪽으로 한 칸 | 문패 D♭4, B𝄪3 (모두) |  |
| d5-04 | 우편 분류 | C♯4 | 글자와 악보 | C4~D5 | C4 → C♯4/D♭4 | 오른쪽으로 한 칸 | 카드 D♭4 ○, D♭5 ×(C♯5/D♭5), C♯5 ×(C♯5/D♭5), D4 ×(D4) |  |
| d5-05 | 반송 편지 | B♯4 | 글자와 악보 | B3~C5 | B4 → C5 | 오른쪽으로 한 칸 | 잘못 간 길 B3 → C4. 까닭: 구역 |  |
| d5-06 | 악보 편지 | B♭3 | 악보만 | A3~B4 | B3 → A♯3/B♭3 | 왼쪽으로 한 칸 | 문패 A♯3, C𝄫4 (모두) |  |
| d5-07 | 바로 배달 | G♯4 | 글자와 악보 | B3~C5 | G4 → G♯4/A♭4 | 오른쪽으로 한 칸 | 문패 A♭4 (모두). 미리 보기 끔 |  |
| d5-08 마감 | 악보 편지 | C♭5 | 악보만 | B3~C5 | C5 → B4 | 왼쪽으로 한 칸 | 문패 B4, A𝄪4 (모두). 미리 보기 끔 |  |

### E.8 발견 장면

P18의 표와 같다. 문장은 엔진이 조립한다.

| 장면 | 제목 | 끼어드는 자리 | 문패 | 문장 수 |
|---|---|---|---|---|
| S1 | 한 칸이 반음 | d0-04 뒤(0단) | 없음(걸음 넷) | 3 |
| S2 | 두 주소, 한 집 | d1-02 뒤(1단) | C♯4, D♭4 | 3 |
| S3 | 기호가 붙어도 흰 집 | d2-01 뒤(2단) | E♯4, F4 | 2 |
| S4 | 숫자는 글자를 따라가요 | d2-03 뒤(2단) | B♯3, C4 | 2 |
| S5 | 세 주소 | d4-05 뒤(4단) | D4, C𝄪4, E𝄫4 | 2 |
| S6 | 이 집만 둘 | d5-07 뒤(5단) | G♯4, A♭4 | 2 |

### E.9 한 집의 주소 35가지

4구역의 열두 집이다. 주소록(P22)의 칸이 이 표와 같아야 한다.

| 집 번호 | 집 | 기호 없음 | ♯ (오른쪽 한 칸) | ♭ (왼쪽 한 칸) | 𝄪 (오른쪽 두 칸) | 𝄫 (왼쪽 두 칸) | 주소 수 | 주파수 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 60 | 흰 집 | C4 | B♯3 |  |  | D𝄫4 | 3 | 261.63Hz |
| 61 | 검은 집 |  | C♯4 | D♭4 | B𝄪3 |  | 3 | 277.18Hz |
| 62 | 흰 집 | D4 |  |  | C𝄪4 | E𝄫4 | 3 | 293.66Hz |
| 63 | 검은 집 |  | D♯4 | E♭4 |  | F𝄫4 | 3 | 311.13Hz |
| 64 | 흰 집 | E4 |  | F♭4 | D𝄪4 |  | 3 | 329.63Hz |
| 65 | 흰 집 | F4 | E♯4 |  |  | G𝄫4 | 3 | 349.23Hz |
| 66 | 검은 집 |  | F♯4 | G♭4 | E𝄪4 |  | 3 | 369.99Hz |
| 67 | 흰 집 | G4 |  |  | F𝄪4 | A𝄫4 | 3 | 392.00Hz |
| 68 | 검은 집 |  | G♯4 | A♭4 |  |  | 2 | 415.30Hz |
| 69 | 흰 집 | A4 |  |  | G𝄪4 | B𝄫4 | 3 | 440.00Hz |
| 70 | 검은 집 |  | A♯4 | B♭4 |  | C𝄫5 | 3 | 466.16Hz |
| 71 | 흰 집 | B4 |  | C♭5 | A𝄪4 |  | 3 | 493.88Hz |

### E.10 숫자가 갈리는 주소

출발 집과 도착 집의 구역이 다른 주소다. 반송 편지의 "구역" 길은 이 주소들에서만 만들어진다.

| 주소 | 출발 집 | 걸음 | 도착 집 | 도착 집의 구역 | 주소의 숫자 |
| --- | --- | --- | --- | --- | --- |
| B♯3 | B3 | 오른쪽으로 한 칸 | C4 | 4 | 3 |
| B𝄪3 | B3 | 오른쪽으로 두 칸 | C♯4/D♭4 | 4 | 3 |
| C♭4 | C4 | 왼쪽으로 한 칸 | B3 | 3 | 4 |
| C𝄫4 | C4 | 왼쪽으로 두 칸 | A♯3/B♭3 | 3 | 4 |
| B♯4 | B4 | 오른쪽으로 한 칸 | C5 | 5 | 4 |
| B𝄪4 | B4 | 오른쪽으로 두 칸 | C♯5/D♭5 | 5 | 4 |
| C♭5 | C5 | 왼쪽으로 한 칸 | B4 | 4 | 5 |
| C𝄫5 | C5 | 왼쪽으로 두 칸 | A♯4/B♭4 | 4 | 5 |
