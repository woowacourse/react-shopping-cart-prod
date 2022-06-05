# 🚩 step2 기능 요구사항

## 필수 요구 사항

- [ ] msw의 기존의 장바구니 관련 api 로직 교체하기
- [ ] 로컬 기반의 장바구니를 서버 기반으로 변경
- [ ] API 호스트를 변경해 모든 백엔드 크루들의 API를 테스트할 수 있어야한다.

## 1단계 반영 사항들

- [x] color Palette 색깔 사이트 참조하여 바꿔보기
- [ ] react-persist 사용해서 userId 새로고침해도 날아가지 않도록 하기
- [ ] 로그인 성공 후 내 정보 조회 호출하여 userId 받아오기
- [ ] 중첩 Route를 활용해서 Router 방법 바꿔보기 (Outlet)
- [x] actions/cart 에서의 foundExistProduct vs cartItem vs targetProduct 네이밍 수정하기
- [x] actions/products 에서의 삼항연산자 사용해보기
- [ ] pages/SignUp 에서 삼항연산자 사용해서 snackbar message 보여주기
- [ ] -> if 문으로 된 곳들 삼항 연산자들 사용해보기
- [ ] pages/Cart에서의 checkBox reduce 또는 map 사용해보기

## 추가 기능

- [ ] confirm -> modal
- [ ] 잘못된 url로 접근시 home으로 이동시키기

# 🚩 step1 기능 요구사항

## 컴포넌트 구현

- [x] Input 컴포넌트 구현
- [x] 로그인 페이지 컴포넌트 구현
- [x] Icon 컴포넌트 구현
- [x] ErrorMessage 컴포넌트 구현
- [x] 회원가입 페이지 컴포넌트 구현
- [x] 본인확인 페이지 컴포넌트 구현
- [x] 회원 정보 수정 페이지 컴포넌트 구현
- [x] 비밀번호 변경 페이지 컴포넌트 구현
- [x] 스피너 컴포넌트 구현

## API

- [x] MSW를 활용한 API mocking
- [x] Token기반의 로그인
- [x] 회원가입
- [x] 회원 정보 수정
- [x] 회원탈퇴
- [x] 비밀번호 수정

## 기능

- [x] 비밀번호 확인 후, 회원정보 수정 페이지로 이동
- [x] 로그아웃
- [x] 로그인 시, 유저 아이디를 받아와서 redux에서 관리

  - [x] 로그아웃 시 logout action 호출 (Redux 데이터 삭제)
  - [x] 회원 탈퇴 시 logout action 호출

- [x] alert -> snackbar

- [x] 서버 응답 대기시 스피너 애니메이션 띄워주기
  - [x] redux에서 isPending 상태로 관리하기
