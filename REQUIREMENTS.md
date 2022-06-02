# 🚩 기능 요구사항

## 컴포넌트 구현

- [x] Input 컴포넌트 구현
- [x] 로그인 페이지 컴포넌트 구현
- [x] Icon 컴포넌트 구현
- [x] ErrorMessage 컴포넌트 구현
- [x] 회원가입 페이지 컴포넌트 구현
- [x] 본인확인 페이지 컴포넌트 구현
- [x] 회원 정보 수정 페이지 컴포넌트 구현
- [x] 비밀번호 변경 페이지 컴포넌트 구현

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

- [ ] 서버 요청이 실패하였을 때에, 서버에서 받아오는 error.message 활용하기
- [ ] alert -> snackbar
- [ ] confirm -> modal
- [ ] 서버 응답 대기시 스피너 애니메이션 띄워주기
  - [ ] redux에서 isPending 상태로 관리하기
