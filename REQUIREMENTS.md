<p align="middle" >
  <img src="https://techcourse-storage.s3.ap-northeast-2.amazonaws.com/3e6c6f30b11d4b098b5a3e81be19ce3a" width="400">
</p>
<h2 align="middle">Level2 - 장바구니</h2>
<p align="middle">React & Redux 데스크탑 장바구니 애플리케이션</p>
</p>

## 1단계 요구사항

- [x] MSW를 활용한 API mocking
- [x] Token 기반의 로그인
  - [x] JWT를 사용한다.
- [x] 회원 가입
  - [x] 헤더 혹은 로그인 페이지의 회원 가입 버튼을 누르면 회원 가입 페이지로 이동한다.
  - [x] 약관 동의, 정보 입력, 가입 완료 총 3단계로 이루어진다.
    - [x] 1단계 약관 동의 (체크 박스 형식)
    - [ ] 2단계 정보 입력
      - [x] 이메일 (중복확인 버튼) - input
      - [x] 패스워드 - input
      - [x] 패스워드 확인 - input
      - [x] 이름 - input
      - [x] 성별 - select box
      - [x] 생년월일 - date
      - [x] 전화번호 - input 3개
      - [x] 주소 - **daum api** 사용
    - [x] 3단계 가입 완료
      - [x] `회원이 되신 것을 축하드립니다` 안내 메세지
      - [x] `주문하러 가기 버튼` 클릭 후 → 상품 리스트 페이지로
      - [x] 로그인은 된 상태이다.
- [x] 회원 정보 수정
  - [x] 회원 가입 폼과 동일하되 수정 불가능 필드는 수정할 수 없다. _(수정 불가능 필드: 이메일, 생일)_
- [x] 회원 탈퇴
  - [x] 회원 정보 수정 페이지의 `계정 삭제하기 버튼`을 누르면 계정 삭제이 삭제된다.
