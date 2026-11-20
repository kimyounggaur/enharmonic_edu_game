# 단계별 게이트와 최종 검증 기록

날짜: 2026-11-20 (한국 시간). 대상: `index.html` **205,244바이트**.

이 보고는 통합 제품에서 확인한 증거를 단계별로 연결한 것이다. 각 프롬프트 완료 시점의 화면을 모두 별도로 재실행했다는 기록이 아니다. **구현은 PO8 범위까지 들어 있으나, 사람·실기기 검수가 필요한 PO9는 PARTIAL이다.** 배포 결과는 이 보고 작성 시 대기 중이며 성공을 주장하지 않는다.

## 실행한 검사

브라우저 `#test`의 최종 첫 줄:

```text
자가검사 47/47 (전체 47개 중 47개 작성) · TH 12/12 · CH 4/4 · SC 3/3 · JB 4/4 · FL 5/5 · AU 8/8 · ST 4/4 · SV 4/4 · CT 3/3
```

- 실제 제품 소스를 Node VM에 넣은 독립 순수 검사: **37/37, 단언 11,753개 통과**. [기록](engine-check-report.json).
- 복습 생성 독립 검사: 재료 **56개**, 까닭 10종×기호 단계 6종×날짜 3종=180조합, **1,080문제**, 차이·제약 위반 0. `{octave:3,dir:1}`은 3+3 배정. [기록](review-generator-audit.json).
- 제품 엔진에서 배달 46건·발견 6개·주소 35개 표 재생성. 원본 부록 E의 배달 46행에서 방식·주소·창·걸음을 비교해 차이 0. [계산 표](content-from-engine.md), [대조 기록](appendix-comparison.json).
- JavaScript 문법 검사 통과. 최종 소스의 외부 리소스 속성·CSS URL·외부 script 0, `setInterval` 0, `setTimeout`은 크기 변경 디바운스 1곳. [정적 감사](static-audit.json).
- 주요 글자·상태·조작부 색 조합 13쌍이 글자 4.5:1, 부품 3:1 기준 통과. 화면 전체의 모든 픽셀을 인증한 결과는 아니다. [대비 표](contrast-audit.json).

원본 `node tools/check.mjs index.html` 전체 실행은 **NOT_RUN**이다. 따라서 이 도구의 합계 줄이나 E-01~E-10 전체 통과 결과를 만들어 적지 않는다. 아래 수동 브라우저 검사와 이를 구분한다.

## 실제 브라우저 조작·화면 증거

정확한 그림 전후·타이틀 치수는 [브라우저 배치 기록](browser-layout-report.json), 대표 화면은 [미리보기](preview.jpg)에 보존했다.

주 작업자가 관리형 브라우저에서 직접 클릭·키 입력·읽기 전용 DOM 관찰로 확인했다. 최종 앱 출처의 콘솔 오류는 **0건**이다. 앱과 무관한 Chrome 확장 프로그램 오류는 이 수에서 제외했다. 전체 네트워크 요청 계측은 하지 않았으며, 외부 앱 리소스가 없는 것은 정적 검사로 확인했다.

| 화면 크기 | 배달 화면 가로·세로 스크롤 | 집 이외 단추 | 주 단추 | 그림 전후 집 위치·폭 | 타이틀 넘침 |
|---|---|---|---|---|---|
| 320×545 | 0 / 0 | 44px 이상 | 52px | 동일 | 없음 |
| 320×568 | 0 / 0 | 44px 이상 | 52px | 동일 | 없음 |
| 360×600 | 0 / 0 | 44px 이상 | 52px | 동일 | 없음 |
| 360×640 | 0 / 0 | 44px 이상 | 52px | 동일 | 없음 |
| 390×664 | 0 / 0 | 44px 이상 | 52px | 동일 | 없음 |
| 390×844 | 0 / 0 | 44px 이상 | 52px | 동일 | 없음 |
| 430×932 | 0 / 0 | 44px 이상 | 52px | 동일 | 없음 |
| 800×600 | 0 / 0 | 44px 이상 | 52px | 동일 | 없음 |

320×568 배달 화면 다섯 줄은 44 / 50 / 294 / 40 / 104px였다. 타이틀 주 단추는 56px, 보조 단추는 48px였다. 320×545 주소록은 35칸·문패 7/35·가로 스크롤 0, 자유 마을은 가로·세로 스크롤 0을 확인했다. 이 표는 대표 배달 상태와 화면의 검사이며 원본 도구가 훑는 모든 장면의 전수 결과가 아니다.

| 실제 조작 경로 | 확인 결과 |
|---|---|
| 코어 0단 전부 | 7/7 배달, 발견 S1, 마감 화면 도달 |
| 타이틀→지도→소리 확인 | 안 들려요→그냥 시작→0단 튜토리얼 진행 |
| 배달 도중 설정 | C4를 고른 상태로 열고 닫아 선택 유지 |
| 설정·새로고침 | 소리 크기 0과 동작 줄이기 저장·복원 |
| 첫 편지 완료→새로고침 | 타이틀의 이어하기 및 진행 복원 |
| 자유 마을 D4 | 문패 3개 표시 |
| 자유 마을 G샵 집 | 문패 2개 표시 |
| 자유 마을 C더블샵 쓰기 | 계산한 도착 집·걸음 표시 |

여섯 배달일을 UI의 탭만으로 전부 완주, 키보드만으로 전부 완주, UI에서 문패 35/35 수집은 **NOT_RUN**이다. 순수 흐름 검사의 완주와 혼동하지 않는다.

## 게이트 보고

GPO0·GPO1은 통합 제품의 상위 검사로 필요한 코드 조건을 확인했다. GPO2 이후 원본 화면 도구 또는 사람의 확인을 요구하는 게이트는 PARTIAL로 둔다.

```yaml
GATE_REPORT:
  gate: GPO0
  date: 2026-11-20
  status: PASS
  evidence: "단일 HTML·12구획·저장/폴백·기본 틀, 통합 SV 4/4 및 8화면 확인"
  check_tool: NOT_RUN
  device_check: NOT_RUN
  open_issues: []
---
GATE_REPORT:
  gate: GPO1
  date: 2026-11-20
  status: PASS
  evidence: "TH 12/12·CH 4/4·SC 3/3·JB 4/4, 엔진 생성 표 및 부록 46행 대조 차이 0"
  check_tool: NOT_RUN
  device_check: NOT_RUN
  open_issues: []
---
GATE_REPORT:
  gate: GPO2
  date: 2026-11-20
  status: PARTIAL
  evidence: "길·악보 구현, 8개 크기 대표 화면 스크롤 0·누르는 영역 유지"
  check_tool: NOT_RUN
  device_check: NOT_RUN
  open_issues: ["E-01~E-10 전수 화면 검사", "실기기 기호 판독 — GPO9"]
---
GATE_REPORT:
  gate: GPO3
  date: 2026-11-20
  status: PARTIAL
  evidence: "AU 8/8: 가짜 컨텍스트의 주파수·예약·취소·중단 복구 검사"
  check_tool: NOT_RUN
  listening_check: NOT_RUN
  open_issues: ["iOS·Android 첫 소리 및 복귀 — GPO9", "폰 두 대 스피커·이어폰 청음 — GPO9"]
---
GATE_REPORT:
  gate: GPO4
  date: 2026-11-20
  status: PARTIAL
  evidence: "FL·ST 통합 검사, 0단 7/7 실제 조작 및 마감"
  check_tool: NOT_RUN
  device_check: NOT_RUN
  open_issues: ["전체 배달 탭·키보드 UI 완주", "실기기 집 선택 오차 — GPO9"]
---
GATE_REPORT:
  gate: GPO5
  date: 2026-11-20
  status: PARTIAL
  evidence: "쓰기·분류·반송 순수 흐름 및 오답 1·2회 경로 검사 통과"
  check_tool: NOT_RUN
  device_check: NOT_RUN
  open_issues: ["쓰기·분류·반송 전체 UI 경로", "가장 긴 오답 문구 실기기 두 줄 확인 — GPO9"]
---
GATE_REPORT:
  gate: GPO6
  date: 2026-11-20
  status: PARTIAL
  evidence: "46배달·6발견 구현, 타이틀/지도/소리 확인/0단 마감/이어하기 실제 확인"
  check_tool: NOT_RUN
  device_check: NOT_RUN
  open_issues: ["1·2단 UI 완주 및 잠금·도장 전수 확인", "배포 URL 완주 — GPO9"]
---
GATE_REPORT:
  gate: GPO7
  date: 2026-11-20
  status: PARTIAL
  evidence: "주소록 35칸·처음 7/35, 복습 재료 56 및 1,080생성 검사, 자유 마을 3주소/2주소/쓰기 확인"
  check_tool: NOT_RUN
  device_check: NOT_RUN
  open_issues: ["3~5단 UI 완주와 35/35 수집", "복습 UI 끝까지·정규 기록 불변 확인"]
---
GATE_REPORT:
  gate: GPO8
  date: 2026-11-20
  status: PARTIAL
  evidence: "인라인 마을 그림·모션·7자리 안내·포커스 구현, 8화면 집 기하 유지, 0단 안내 및 설정 저장 확인"
  check_tool: NOT_RUN
  device_check: NOT_RUN
  open_issues: ["모든 화면·문구 전수 검사", "130% 글자 확대 실기기 — GPO9", "VoiceOver·TalkBack — GPO9"]
---
GATE_REPORT:
  gate: GPO9
  date: 2026-11-20
  status: PARTIAL
  tests: {TH: 12/12, CH: 4/4, SC: 3/3, JB: 4/4, FL: 5/5, AU: 8/8, ST: 4/4, SV: 4/4, CT: 3/3}
  file_bytes: 205244
  app_console_errors: 0
  external_asset_refs: 0
  external_requests: NOT_RUN
  check_tool: NOT_RUN
  device_check: NOT_RUN
  listening_check: NOT_RUN
  deployment: PENDING
  open_issues: ["iOS·Android 12항목", "두 폰 청음", "강사 1명", "학습자 2명", "전체 탭/키보드 완주·35/35", "배포 주소 완주"]
```

## 완료 조건별 판정

| 설계서 12.4 조건 | 증거가 있는 부분 | 아직 증거가 없는 부분 |
|---|---|---|
| 1 자가검사·E-01~E-10 | 최종 47/47, 대표 8크기 | 원본 화면 도구 전수 실행 |
| 2 6단 탭·키보드·주소록 | 순수 흐름, 실제 0단 완주, 주소록 35칸 생성 | 6단 UI 양쪽 입력 완주·35/35 수집 |
| 3 실기기 12항목 | 작성할 표 준비 | iPhone Safari·Android Chrome 결과 전부 |
| 4 두 폰 청음 | 예약 값 자동 검사 | 실제 스피커·이어폰 평가 |
| 5 강사 | 검수 항목 정리 | 강사 한 명 이상의 기록 |
| 6 학습자 | 관찰 표 준비 | 두 명의 설명 없는 진행 기록 |
| 7 그림·용량·외부 요청 | SVG 마을·205,244바이트·외부 리소스 참조 0·대표 화면 관찰 | 모든 화면 전수 시각 검수·요청 로그 계측 |
| 8 결정 | D1~D15·D18 구현값·이유 기록 | 사람 검수가 필요한 선택의 최종 확정 |
| 9 모든 게이트 PASS | GPO0·GPO1의 코드 조건 | GPO2~GPO9의 남은 항목 |
| 10 배포 URL 완주 | 실행용 소스 준비 | 배포 성공 확인·배포 URL에서 전체 완주 |

[실기기·청음·수업 기록표](device-check.md)에 근거를 채운 뒤 관련 open_issues를 닫는다. 자동 검사 성공만으로 GPO9를 PASS 또는 최종 v1.0 검수 완료로 표시하지 않는다.
