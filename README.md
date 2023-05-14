<p align="middle" >
  <img src="https://techcourse-storage.s3.ap-northeast-2.amazonaws.com/3e6c6f30b11d4b098b5a3e81be19ce3a" width="400">
</p>
<h2 align="middle">Level2 - 장바구니</h2>
<<<<<<< HEAD
<p align="middle">React & Redux 장바구니 협업 미션</p>
=======
<p align="middle">React & Recoil 데스크탑 장바구니 애플리케이션</p>
>>>>>>> a165c2b ([장바구니 미션 Step 1] 타미(김태은) 미션 제출합니다. (#172))
</p>

### 결과물: [장바구니🛒](https://xodms0309.github.io/react-shopping-cart/)

## 🚀 학습 목표

백엔드와의 협업을 통해 실제 동작하는 애플리케이션을 만듭니다.

<<<<<<< HEAD
<br>
=======
✔️ `데스크탑 타겟`의 웹 앱을 구현하며 구매로 이어지는 것에 끊김이 없고 `재방문을 고려한 UI/UX`에 대해 고민해봅니다.  
✔️ 상태 관리를 위해 `Recoil`을 활용합니다.
✔️ `Router`를 활용해 여러 페이지 전환을 고려합니다.  
✔️ [배민상회](https://mart.baemin.com) 서비스 참고
>>>>>>> a165c2b ([장바구니 미션 Step 1] 타미(김태은) 미션 제출합니다. (#172))

### 📝 1단계 기능 목록

1. 상품 목록 페이지
   - 상품 목록 페이지에 필요한 UI 마크업
   - header의 숫자 표시를 통해 장바구니에 담긴 상품 종류의 갯수 표시
2. 전역 상태 관리
   - recoil을 사용하여 전역 상태 관리
3. mock 데이터 활용
   - Mock 데이터를 활용하여 상품 데이터를 처리한다. 협업 미션을 고려하여 장바구니 API 예상 명세 참고
4. 테스트 도구 선정
   - 적합한 테스트 도구를 선택하여 사용하고, 중요한 테스트 케이스를 정의하여 테스트 진행

### 💻 페어프로그래밍

| <img src="https://avatars.githubusercontent.com/u/55427367?v=4" width=150px> | <img src="https://avatars.githubusercontent.com/u/50974359?v=4" width=150px> |
| :--------------------------------------------------------------------------: | :--------------------------------------------------------------------------: |
|                     [타미](http://github.com/xodms0309)                      |                     [클린](http://github.com/hozzijeong)                     |

<<<<<<< HEAD
버그를 발견한다면, [Issues](https://github.com/woowacourse/react-shopping-cart-prod/issues)에 등록해주세요.
=======
### 🌲 파일 구조

```
📦src
 ┣ 📂api
 ┃ ┗ 📜index.ts
 ┣ 📂components
 ┃ ┣ 📂@common
 ┃ ┃ ┣ 📂ContentLayout
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┣ 📂Svg
 ┃ ┃ ┃ ┣ 📜SvgSprite.tsx
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┗ 📂Toast
 ┃ ┃ ┃ ┣ 📂hooks
 ┃ ┃ ┃ ┃ ┗ 📜useToast.tsx
 ┃ ┃ ┃ ┣ 📜Toast.stories.tsx
 ┃ ┃ ┃ ┣ 📜Toast.styles.ts
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂Counter
 ┃ ┃ ┣ 📜Counter.stories.tsx
 ┃ ┃ ┣ 📜Counter.styles.ts
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂Header
 ┃ ┃ ┣ 📜Header.styles.ts
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┗ 📂ProductItem
 ┃ ┃ ┣ 📜ProductItem.stories.tsx
 ┃ ┃ ┣ 📜ProductItem.styles.ts
 ┃ ┃ ┗ 📜index.tsx
 ┣ 📂hooks
 ┃ ┣ 📜useFetch.ts
 ┃ ┗ 📜useProductSelect.ts
 ┣ 📂pages
 ┃ ┗ 📜ProductList.tsx
 ┣ 📂recoil
 ┃ ┗ 📜cartList.ts
 ┣ 📂router
 ┃ ┗ 📜index.tsx
 ┣ 📂styles
 ┃ ┣ 📜GlobalStyle.ts
 ┃ ┣ 📜styles.d.ts
 ┃ ┗ 📜theme.ts
 ┣ 📂types
 ┃ ┗ 📜index.ts
 ┣ 📜App.tsx
 ┗ 📜index.tsx
```
>>>>>>> a165c2b ([장바구니 미션 Step 1] 타미(김태은) 미션 제출합니다. (#172))
