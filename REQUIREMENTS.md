### **_2단계(협력) 추가사항은 이텔릭체/굵은글씨로 작성됩니다._**

<br>

## 데스크탑 장바구니 애플리케이션 기능 목록

### Components

1. Header

- 장바구니에 담긴 상품의 개수를 보여준다.

2. 주요 컴포넌트

   1. ItemList

   - 상품의 목록 행과 열이 반응형이 되도록 구현한다.

     1. Item

     - 상품의 사진, 이름, 가격을 확인할 수 있다.
     - 장바구니 아이콘을 누르면 수량 조절 버튼이 보인다.
     - 수량이 0개가 되면 장바구니 아이콘이 보인다.
     - 상품의 수량을 증가/감소시킬 수 있다.

       1. Counter

       - Item내에 존재하는 수량조절 박스를 나타낸다.

   2. CartItemList

   - 장바구니에 담긴 상품 목록을 보여준다.

     1. CartItem

     - 상품의 사진, 이름, 가격을 확인할 수 있다.
     - 수량 조절 및 장바구니에서 뺄 수 있다.
     - 주문할 상품을 체크박스로 선택할 수 있다.

       **_1. couponSelector_**

       - **_모든 쿠폰은 제한사항(최소금액, 사용기간 등)이 없다._**
       - **_한 품목에서 적용된 쿠폰은 다른 곳에서 사용할 수 없다._**

   3. PurchaseOrder

   - 총 주문금액을 확인하고 주문할 수 있다.
   - **_쿠폰이 적용된 금액으로 총 주문금액이 보여진다._**
   - **_주문하기를 누르면 주문내역이 표시된다._**

   4. **_주문 내역 컴포넌트_**

   - **_주문 번호와 주문 품목(이름/이미지/가격/수량)을 확인할 수 있다._**

### pages

1. Main

- 상품 목록 페이지를 나타낸다.
- 상품의 종류에 따라 장바구니의 수량을 변경시킨다.

2. Cart

- 장바구니 페이지를 나타낸다.
- 상품들을 장바구니에서 제거하거나 수량을 조절할 수 있다.
- 주문하거나 제거할 상품을 체크박스로 선택할 수 있다.
- 결제 예상금액을 확인하고 주문할 수 있다.

3. **_주문 목록 페이지_**

- **_주문한 내역 페이지를 나타낸다._**
- **_상단에 주문목록을 클릭하면 해당 페이지로 이동한다._**
- **_주문 내역을 간략하게 표시한다._**
- **_주문 내역 상세보기를 누르면 상세보기 페이지로 전환된다._**

4. **_주문 상세 페이지_**

- **_주문한 내역 상세페이지를 나타낸다._**
- **_주문하기를 클릭하거나 주문목록 페이지에서 상세보기를 클릭하는 경우 해당 페이지로 이동한다._**
- **_주문 내역과 결제 금액/할인 등을 표시한다._**

### 고려사항

- [] msw를 이용하여 api를 모킹한다.

  - [x] 쿠폰 전체 조희

    - 사례

      - 쿠폰이 있는 경우
      - 쿠폰이 없는 경우
      - 유효하지 않은 쿠폰은 백에서 주지 않음

    - 요청
      ```json
      GET /coupons
      Authorization: Basic ~~~~
      ```
    - 응답
      ```json
      [
        {
          couponId: 1,
          name: "오픈 기념 쿠폰",
          discount: {
            type: "rate"
            amount: 10
          }
        },
        {
          couponId: 2,
          name: "오픈 기념 쿠폰",
          discount: {
            type: "price"
            amount: 1000
          }
        }
      ]
      ```

  - [x] 주문 하기
    - 사례
      - 체크된 물품이 없는데 주문하기를 누른 경우
      - 쿠폰을 사용하여 주문한 경우
      - 쿠폰을 사용하지 않고 주문한 경우
    - 요청
      ```json
      POST /orders
      Authorization: Basic ~~~~~
      Body:
      [
        {
          product: {
            id: 1
            name: "친환경 실링용기-ECO 19153"
            price: 60200,
            imageUrl: "Xxxxxx"
          }
          quantity: 10,
          couponId: []
        },
        {
          product: {
            id: 1
            name: "친환경 실링용기-ECO 19153"
            price: 60200,
            imageUrl: "Xxxxxx"
          }
          quantity: 10,
          couponId: [1]
        }
      ]
      ```
    - 응답
      ```json
      204 NO_CONTENT
      ```
  - [] 주문내역 조회하기
    - 사례
      - 주문 내역이 없는 경우
      - 주문 내역이 방대한 경우
    - 요청
      ```json
      GET /orders
      Authorization: Basic xxxx
      ```
    - 응답
      ```json
      [
        {
          orderId: 1,
          orderItems: [
            {
              orderItemId: 3,
              product: {
                id: 1,
                name: "샀던 시점의 이름",
                price: 샀던 시점의 가격
                imageUrl: "샀던 시점의 이미지"
              }
              couponIds: [1], // id가 아닌 실제 쿠폰으로 대체될 예정
              total: 167400,
              quantity: 3
            },
            {
              orderItemId: 4,
              product: {
                id: 1,
                name: "샀던 시점의 이름",
                price: 샀던 시점의 가격
                imageUrl: "샀던 시점의 이미지"
              }
              couponIds: [1],
              total: 167400,
              quantity: 3
            }
          ]
        },
        {
          orderId: 2,
          orderItems: [
            {
              orderItemId: 5,
              product: {
                id: 1,
                name: "샀던 시점의 이름",
                price: 샀던 시점의 가격
                imageUrl: "샀던 시점의 이미지"
              }
              couponIds: [1],
              total: 167400,
              quantity: 3
            },
            {
              orderItemId: 6,
              product: {
                id: 1,
                name: "샀던 시점의 이름",
                price: 샀던 시점의 가격
                imageUrl: "샀던 시점의 이미지"
              }
              couponIds: [1],
              total: 167400,
              quantity: 3
            }
          ]
        }
      ]
      ```
