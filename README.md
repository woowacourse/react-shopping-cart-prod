![example workflow](https://github.com/hyeryongchoi/react-shopping-cart-prod/actions/workflows/deploy.yml/badge.svg)

<p align="middle" >
  <img src="https://techcourse-storage.s3.ap-northeast-2.amazonaws.com/3e6c6f30b11d4b098b5a3e81be19ce3a" width="200px" alt="">
</p>
<h2 align="middle">Level2 - 장바구니</h2>
<p align="middle">React & Recoil 장바구니 협업 미션</p>
</p>

---

## [🛒 장바구니 페이지 링크](https://hyeryongchoi.github.io/react-shopping-cart-prod/) | [📕 스토리북 페이지 링크](https://hyeryongchoi.github.io/react-shopping-cart-prod/storybook)

> 📢 MSW서버로 테스트할 경우 로컬스토리지를 비워주세요.

## 📍 학습 목표

- 네트워크와 비동기 처리
- 타입스크립트를 이용한 데이터 포맷 설정
- 프론트엔드 배포
- 네트워크 상황, 비동기 처리에 따른 UI/UX 설계
- 실제로 동작하는 서비스를 만들기 위한 클라이언트, 서버 간의 간단한 협업을 경험한다.

## 🚀 Getting Started

- 백엔드 개발자와 협업하기 위한 커뮤니케이션을 경험한다.
- API를 모킹하고 갈아끼울 수 있는 형태로 대비한다.
- 백엔드 크루들과 `API`설계 논의부터 협업하여 서버와 연동이 되는 주문 기능을 구현한다.

## 🚀 Step1 - 클라이언트 - 서버 연동

### 🙏 페어(페어프로그래밍)

<table>
  <tr>
    <td align="center" width="150px">
      <a href="https://github.com/HyeryongChoi" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/24777828?v=4" alt="첵스(최혜령) 프로필" />
      </a>
    </td>
    <td align="center" width="150px">
      <a href="https://github.com/geuntaek1013" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/95906910?v=4" alt="아인(안근택) 프로필" />
      </a>
    </td>
  </tr>
  <tr>
    <td align="center">
      <a href="https://github.com/HyeryongChoi" target="_blank">
        첵스(최혜령)
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/geuntaek1013" target="_blank">
        아인(안근택)
      </a>
    </td>
  </tr>
</table>

### 📝 기능 요구사항

- 클라이언트 - 서버 연동을 통해 상품 목록을 보여준다.
- 사용자 별 장바구니 기능이 정상적으로 동작하게 만든다.
  - 장바구니에 담긴 아이템 목록을 확인할 수 있다. (장바구니 아이템 목록 조회)
  - 상품을 장바구니에 추가할 수 있다. (장바구니 아이템 추가)
  - 장바구니에 담긴 아이템의 수량을 변경할 수 있다. (장바구니 아이템 수량 변경)
  - 장바구니에 담긴 아이템을 삭제할 수 있다. (장바구니 아이템 삭제)
- 사용자는 **여러 서버 중 하나**를 선택할 수 있다.
- 사용자 인증 정보를 저장한다.

## 🚀 Step2 - 주문 기능 구현

### 📝 기능 요구사항

- 장바구니에 담은 상품을 주문할 수 있다.
- 상품 주문 시 현실 세계의 쇼핑 서비스가 제공하는 재화 관련 요소를 최소 1가지 이상 추가한다.
  - 재화 관련 요소: 쿠폰, 포인트, 할인 등
  - 예) 5만원 이상 주문 시 전체 금액에서 10% 할인이 된다.
- 사용자 별로 주문 목록을 확인할 수 있다.
- 특정 주문의 상세 정보를 확인할 수 있다.

> 주어진 요구사항 외의 내용은 팀에서 논의하여 정책을 결정하고 구현한다.

### 🎟 쿠폰 명세

#### 쿠폰 종류

- **5%:** 가입 시 쿠폰발급
- **10%**: **삼백만원** 이상 구매 시 쿠폰발급
- **30%**: **천만원** 이상 구매 시 쿠폰발급
- **50%**: **이천만원** 이상 구매 시 쿠폰발급
- **90%**: **오천만원** 이상 구매 시 쿠폰발급

#### 쿠폰 사용 제한

- 상품 구매 가격에 따른 쿠폰 지급
- **유효기간 O**(유효한 쿠폰만 서버에서 전송)
- **최소 주문금액 이상 구매 시** 사용 가능
- 주문당 **쿠폰 1개** 사용 가능

### ⚠️ API ErrorCode 명세

```json

API Status / HTTP Status


권한 관련 1000
- (잘못된 로그인 정보) 권한이 없는 사용자 1001 / 401
- 남의 장바구니 건드는 사용자 1002 / 403
- 없는 사용자 조회 에러 1003 / 404
- 잘못된 로그인 정보 에러 1004 / 401

장바구니 관련 2000
- 없는 장바구니 조회 에러 2001 / 404
- 장바구니 99개 넘어가면 에러 2002 / 400

상품 관련 3000
- 없는 상품을 조회 에러 3001 / 404

쿠폰 관련 4000
- 없는 쿠폰 조회 에러 4001 / 404
- 쿠폰 1개 초과 적용 에러 4002 / 400
- 쿠폰에 잘못된 할인 값이 들어간 경우 에러 4003 / 400
- 쿠폰 사용시 최소 사용 금액보다 주문 금액이 작은 경우 에러 4004 / 400
- 쿠폰의 만료기간이 지난 경우 에러 4005 / 400
- 다른 사용자의 쿠폰을 조회 에러 4006 / 403

주문 관련 5000
- 없는 주문내역을 조회 에러 5001 / 404
- 최종 가격과 넘어온 가격다르면 에러 5002 / 400
- 총 주문 금액이 0원이면 에러 5003 / 400
- 다른 사용자의 주문 조회 에러 5004 / 403

금액 관련 6000
- 유효하지 않는 금액 에러 6001 / 400


{
  "errorCode": 1001
}
```
