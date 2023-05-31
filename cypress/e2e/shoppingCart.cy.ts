import { ProductItemData } from '../../src/types/product';
import { priceFormatter } from '../../src/utils/formatter';

const TEST_URL = 'http://localhost:3000/react-shopping-cart-prod';

describe('상품 목록 페이지 e2e 테스트', () => {
  beforeEach(() => {
    cy.visit(TEST_URL);
    cy.wait(3000);
  });

  it.skip('웹 페이지에 처음 방문 시 상품 목록 데이터가 렌더링되기 전에 skeleton을 볼 수 있다.', () => {
    cy.clock();

    cy.visit(TEST_URL);

    cy.tick(4000);

    cy.get('.skeleton').should('be.visible');
  });

  it.skip('웹 페이지에 처음 방문 시 현재 판매 중인 상품 목록을 볼 수 있다.', () => {
    cy.fixture('productData.json').then((expectedData) => {
      expectedData.forEach((productItem: ProductItemData) => {
        cy.get('ol').should('contain', productItem.name);
      });
    });
  });

  it.skip('현재 판매 중인 상품 목록에서 각 상품 마다 상품 사진, 이름, 그리고 가격으로 불 수 있다.', () => {
    cy.fixture('productData.json').then((expectedData) => {
      cy.get('li').each((element, index) => {
        const productItem = expectedData[index];
        cy.wrap(element).should('contain', productItem.name);
        cy.wrap(element).should('contain', priceFormatter(productItem.price));
        cy.wrap(element).find('img').should('have.attr', 'src', productItem.imageUrl);
      });
    });
  });

  it.skip('상품 할인이 있는 상품인 경우 상품 목록에서 할인률, 할인된 가격, 그리고 원래 가격을 볼 수 있다.', () => {
    cy.fixture('productData.json').then((expectedData) => {
      cy.get('li').each((element, index) => {
        const productItem = expectedData[index];

        if (productItem.discountRate > 0) {
          cy.wrap(element).should('contain', productItem.discountRate);
          cy.wrap(element).should('contain', priceFormatter(productItem.discountedPrice));
          cy.wrap(element).should('contain', priceFormatter(productItem.price));
        }
      });
    });
  });

  it.skip('웹 페이지 처음 방문 시 상품 이미지 위에 "+" 버튼을 볼 수 있다.', () => {
    cy.get('li').each((element) => {
      cy.wrap(element).find('button[aria-label="상품 추가"]').find('svg').should('exist');
    });
  });

  it.skip('상품 이미지 위 "+" 버튼 클릭하면 상품이 장바구니에 추가된 후 헤더 장바구니 아이콘 숫자가 증감된다.', () => {
    cy.get('button[aria-label="상품 추가"]').first().click();

    cy.get('button[aria-labelledby="cart-button"]').find('span').should('contain', 1);
  });

  it.skip('상품 이미지 위 "+" 버튼 클릭하면 상품이 장바구니에 추가된 후 하단에 "장바구니에 상품을 추가했습니다"라는 메세지를 볼 수 있다.', () => {
    cy.get('button[aria-label="상품 추가"]').first().click();

    cy.get('[role="alert"]').should('contain', '장바구니에 상품을 추가했습니다');
  });

  it.skip('상품 이미지 위 "+" 버튼 클릭하면 상품이 장바구니에 추가된 후에 버튼이 상품 수량이 표시된 스텝퍼 버튼으로 변경된다.', () => {
    cy.get('button[aria-label="상품 추가"]').first().click();

    cy.get('button[aria-label="카운트 감소"]').first().should('be.visible');
    cy.get('button[aria-label="카운트 증가"]').first().should('be.visible');
    cy.get('input[aria-label="카운트 입력"]').first().should('have.value', 1);
  });

  it.skip('상품 이미지 위 스텝퍼 버튼 "+" 아이콘을 클릭해서 장바구니 상품 수량을 증가시킬 수 있다.', () => {
    cy.get('button[aria-label="상품 추가"]').first().click();

    cy.get('input[aria-label="카운트 입력"]').first().should('have.value', 1);

    cy.get('button[aria-label="카운트 증가"]').first().click();
    cy.get('button[aria-label="카운트 증가"]').first().click();
    cy.get('input[aria-label="카운트 입력"]').first().should('have.value', 3);
  });

  it.skip('상품 이미지 위 스텝퍼 버튼 "-" 아이콘을 클릭해서 장바구니 상품 수량을 감소시킬 수 있다.', () => {
    cy.get('button[aria-label="상품 추가"]').first().click();

    cy.get('input[aria-label="카운트 입력"]').first().should('have.value', 1);

    cy.get('button[aria-label="카운트 증가"]').first().click();
    cy.get('input[aria-label="카운트 입력"]').first().should('have.value', 2);

    cy.get('button[aria-label="카운트 감소"]').first().click();
    cy.get('input[aria-label="카운트 입력"]').first().should('have.value', 1);
  });

  it.skip('상품 이미지 위 스텝퍼 버튼에서 수량을 표시하고 있는 인풋 박스에 숫자를 입력해서 상품 수량을 변경시킬 수 있다.', () => {
    cy.get('button[aria-label="상품 추가"]').first().click();

    cy.get('input[aria-label="카운트 입력"]').first().should('have.value', 1);

    cy.get('input[aria-label="카운트 입력"]').first().type('2');
    cy.get('input[aria-label="카운트 입력"]').first().should('have.value', 12);
  });
});
