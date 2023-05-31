import { SHIPPING_FEE } from '../../src/constants';
import { MEMBER_INFORMATION_LOCAL_STORAGE_KEY } from '../../src/constants/localStorage';
import { MEMBER_DISCOUNT_RATE, MEMBER_RANK } from '../../src/constants/member';
import { PATH } from '../../src/constants/path';
import { MemberInformation } from '../../src/types/member';
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

describe('장바구니 페이지 e2e 테스트', () => {
  beforeEach(() => {
    cy.visit(TEST_URL);
    cy.wait(3000);
  });

  it.skip('장바구니에 상품이 없는 경우 장바구니에 담긴 상품이 없다는 메세지를 볼 수 있고 "홈으로 이동하기" 버튼을 눌러서 상품 목록 페이지로 이동할 수 있다.', () => {
    cy.get('button[aria-labelledby="cart-button"]').click();
    cy.wait(3000);

    cy.get('section').should('contain.text', '장바구니에 담긴 상품이 없습니다.');

    cy.findByText('홈으로 이동하기', { selector: 'button' }).should('be.visible');
    cy.findByText('홈으로 이동하기', { selector: 'button' }).should(
      'contain.text',
      '홈으로 이동하기'
    );
    cy.findByText('홈으로 이동하기', { selector: 'button' }).click();

    cy.url().should('eq', TEST_URL);
  });

  it.skip('상품 목록 페이지에서 상품을 추가하면 장바구니 페이지에서 추가된 상품을 볼 수 있다.', () => {
    cy.fixture('productData.json').then((expectedData) => {
      cy.get('li').first().should('contain', expectedData[0].name);
      cy.get('button[aria-label="상품 추가"]').first().click();

      cy.get('button[aria-labelledby="cart-button"]').click();

      cy.get('li').first().should('contain', expectedData[0].name);
    });
  });

  it.skip('장바구니 페이지에서 추가된 상품에 대해서 스텝퍼 버튼을 눌러서 수량을 증가시킬 수 있다.', () => {
    cy.get('button[aria-label="상품 추가"]').first().click();

    cy.get('button[aria-labelledby="cart-button"]').click();

    cy.get('li').find('button[aria-label="카운트 증가"]').click();
    cy.get('li').find('button[aria-label="카운트 증가"]').click();
    cy.get('li').find('input[aria-label="카운트 입력"]').should('have.value', 3);
  });

  it.skip('장바구니 페이지에서 추가된 상품에 대해서 스텝퍼 버튼을 눌러서 수량을 감소시킬 수 있다.', () => {
    cy.get('button[aria-label="상품 추가"]').first().click();

    cy.get('li').find('button[aria-label="카운트 증가"]').click();
    cy.get('li').find('input[aria-label="카운트 입력"]').should('have.value', 2);

    cy.get('li').find('button[aria-label="카운트 감소"]').click();
    cy.get('li').find('input[aria-label="카운트 입력"]').should('have.value', 1);
  });

  it.skip('장바구니 페이지에서 추가된 상품에 대해서 스텝퍼 버튼을 눌러서 수량을 변경시킬 시 장바구니 결제 박스에서 상품 가격과 결제 예상 금액이 현재 수량에 맞춰서 변한다.', () => {
    cy.fixture('productData.json').then((expectedData) => {
      cy.get('button[aria-label="상품 추가"]').first().click();

      cy.get('button[aria-labelledby="cart-button"]').click();

      cy.get('li').first().should('contain', priceFormatter(expectedData[0].price));

      cy.get('li').find('button[aria-label="카운트 증가"]').click().click();
      cy.get('li').find('input[aria-label="카운트 입력"]').should('have.value', 3);
      cy.get('li')
        .first()
        .should('contain', priceFormatter(expectedData[0].price * 3));

      cy.get('aside').should('contain', priceFormatter(expectedData[0].price * 3));
    });
  });

  it.skip('장바구니 페이지에서 추가된 상품이 상품 할인이 있는 상품인 경우 스텝퍼 버튼을 눌러서 수량을 변경시킬 시 장바구니 아이템 섹션에서 할인된 가격과 원래 가격이 변한다.', () => {
    cy.fixture('productData.json').then((expectedData) => {
      cy.get('button[aria-label="상품 추가"]').eq(2).click();

      cy.get('button[aria-labelledby="cart-button"]').click();

      cy.get('li').first().should('contain', priceFormatter(expectedData[2].price));

      cy.get('li').find('button[aria-label="카운트 증가"]').click();
      cy.get('li').find('input[aria-label="카운트 입력"]').should('have.value', 2);
      cy.get('li')
        .first()
        .should('contain', priceFormatter(expectedData[2].discountedPrice * 2));
      cy.get('li')
        .first()
        .should('contain', priceFormatter(expectedData[2].price * 2));

      cy.get('li')
        .first()
        .invoke('text')
        .then((originalPrice) => {
          const discountedPrice = priceFormatter(expectedData[2].discountedPrice * 2);

          expect(originalPrice).not.equal(discountedPrice);
        });
    });
  });

  it.skip('장바구니 페이지에서 추가된 상품이 상품 할인이 있는 상품인 경우 스텝퍼 버튼을 눌러서 수량을 변경시킬 시 장바구니 결제 박스에서 상품 가격, 상품 할인 금액, 그리고 결제 예상 금액이 현재 수량에 맞춰서 변한다.', () => {
    cy.fixture('productData.json').then((expectedData) => {
      cy.get('button[aria-label="상품 추가"]').eq(2).click();

      cy.get('button[aria-labelledby="cart-button"]').click();

      cy.get('li').first().should('contain', priceFormatter(expectedData[2].price));

      cy.get('li').find('button[aria-label="카운트 증가"]').click();
      cy.get('li').find('input[aria-label="카운트 입력"]').should('have.value', 2);

      cy.get('aside').should('contain', priceFormatter(expectedData[2].price * 2));
      cy.get('aside').should('contain', priceFormatter(expectedData[2].discountedPrice * 2));
      cy.get('aside').should(
        'contain',
        priceFormatter(expectedData[2].price * 2 - expectedData[2].discountedPrice * 2)
      );
    });
  });

  it.skip('멤버 등급이 "일반" 이상일 경우 각 멤버 등급에 따라 등급 할인 해택을 받을 수 있다. 멤버 등급이 다이아몬드인 경우 상품 구매 시 30% 할인 받을 수 있다.', () => {
    const newMember: MemberInformation = {
      id: Number(new Date()),
      rank: MEMBER_RANK[4],
      discountRate: MEMBER_DISCOUNT_RATE[MEMBER_RANK[4]],
    };

    cy.visit(TEST_URL, {
      onBeforeLoad(window) {
        window.localStorage.setItem(
          MEMBER_INFORMATION_LOCAL_STORAGE_KEY,
          JSON.stringify(newMember)
        );
      },
    });
    cy.wait(3000);

    cy.get('button[aria-label="상품 추가"]').first().click();
    cy.get('button[aria-label="상품 추가"]').eq(2).click();

    cy.get('button[aria-labelledby="cart-button"]').click();

    cy.fixture('productData.json').then((expectedData) => {
      const totalItemPrice = expectedData[0].price + expectedData[3].price;
      cy.get('aside').should('contain', priceFormatter(totalItemPrice));

      const memberDiscountAmount =
        totalItemPrice * (1 - MEMBER_DISCOUNT_RATE[MEMBER_RANK[4]] / 100);
      cy.get('aside').should('contain', priceFormatter(memberDiscountAmount));

      const totalDiscountedPrice = totalItemPrice - memberDiscountAmount;
      cy.get('aside').should('contain', priceFormatter(totalDiscountedPrice));
    });
  });

  it.skip('5만원 이상의 상품들을 구매하면 배송비 3천원이 제외된다.', () => {
    cy.get('button[aria-label="상품 추가"]').eq(4).click();

    cy.get('button[aria-labelledby="cart-button"]').click();

    cy.get('aside').should('contain', priceFormatter(SHIPPING_FEE));

    cy.get('li').find('button[aria-label="카운트 증가"]').click().click().click();
    cy.get('aside').should('not.contain', priceFormatter(SHIPPING_FEE));
  });

  it.skip('상품 목록 페이지에서 상품 추가 후 장바구니 페이지 방문 시 추가된 상품들이 전체 선택되어 있다.', () => {
    cy.get('button[aria-label="상품 추가"]').first().click();
    cy.get('button[aria-label="상품 추가"]').eq(2).click();

    cy.get('button[aria-labelledby="cart-button"]').click();

    cy.get('main').find('header').should('contain', '(2/2)');
  });

  it.skip('장바구니에 추가된 상품을 개별적으로 선택하지 않을 수 있다. 그럼 상단 "전체 선택" 정보에 현재 장바구니에 있는 상품 개수 중 현재 선택된 상품 수량만 표시되고 전체 선택이 해지된다.', () => {
    cy.get('button[aria-label="상품 추가"]').first().click();
    cy.get('button[aria-label="상품 추가"]').eq(2).click();

    cy.get('button[aria-labelledby="cart-button"]').click();
    cy.get('main').find('header').should('contain', '(2/2)');

    cy.get('li').first().find('label').click({ multiple: true });
    cy.get('main').find('header').should('contain', '(1/2)');
  });

  it.skip('장바구니에 추가된 상품을 개별적으로 삭제할 수 있다. 삭제하기 전에 삭제하기 전에 삭제 여부를 재차 확인하는 모달을 볼 수 있다.', () => {
    cy.get('button[aria-label="상품 추가"]').first().click();
    cy.get('button[aria-label="상품 추가"]').eq(2).click();

    cy.get('button[aria-labelledby="cart-button"]').click();
    cy.get('main').find('header').should('contain', '(2/2)');

    cy.get('button[aria-label="상품 삭제"]').first().click();
    cy.get('[aria-modal]').find('div[aria-describedby="modal-description"]').should('be.visible');

    cy.findByText('삭제', { selector: 'button' }).click();
    cy.get('main').find('header').should('contain', '(1/1)');
  });

  it.skip('장바구니에 추가된 상품들 중 체크된 상품들을 "선택삭제"를 클릭해서 일괄 삭제할 수 있다. 삭제하기 전에 삭제하기 전에 삭제 여부를 재차 확인하는 모달을 볼 수 있다.', () => {
    cy.get('button[aria-label="상품 추가"]').first().click();
    cy.get('button[aria-label="상품 추가"]').eq(2).click();

    cy.get('button[aria-labelledby="cart-button"]').click();
    cy.get('main').find('header').should('contain', '(2/2)');

    cy.findByText('선택삭제', { selector: 'button' }).first().click();
    cy.get('[aria-modal]').find('div[aria-describedby="modal-description"]').should('be.visible');

    cy.findByText('삭제', { selector: 'button' }).click();
    cy.get('main').find('header').should('contain', '(0/0)');

    cy.findByText('선택삭제', { selector: 'button' }).should('have.attr', 'disabled');
    cy.get('section').should('contain.text', '장바구니에 담긴 상품이 없습니다.');
  });

  it.skip('장바구니에 상품을 추가한 후 새로고침해도 장바구니 페이지에서 추가했던 상품을 볼 수 있다.', () => {
    cy.get('button[aria-label="상품 추가"]').first().click();
    cy.get('button[aria-label="상품 추가"]').eq(2).click();

    cy.get('button[aria-labelledby="cart-button"]').click();
    cy.get('main').find('header').should('contain', '(2/2)');

    cy.reload();

    cy.visit(`${TEST_URL}${PATH.CART}`);
    cy.wait(3000);

    cy.get('main').find('header').should('contain', '(2/2)');
  });
});
