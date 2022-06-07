import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { requestOrderCartItem } from 'api';
import { snackbar } from 'actions/snackbar';
import { 알림_메시지 } from 'constants/';

import Button from 'components/@common/Button/styles';

import * as CommonStyled from 'components/@common/CommonStyle/styles';
import * as Styled from './styles';

const CartReceipt = ({ cartList, checkboxItems }) => {
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);

  const checkboxItemCount = useMemo(() => checkboxItems.length, [checkboxItems]);

  useEffect(() => {
    const calculatedTotalPrice = cartList
      .filter((item) => checkboxItems.includes(item.product.id))
      .reduce((prev, curr) => prev + curr.product.price * curr.quantity, 0);

    setTotalPrice(calculatedTotalPrice);
  }, [cartList, checkboxItems]);

  const orderSelectedItem = async () => {
    await requestOrderCartItem(checkboxItems);
    dispatch(snackbar.pushMessageSnackbar(알림_메시지.상품_주문_성공));
  };

  return (
    <Styled.CartListReceiptContainer>
      <CommonStyled.FlexWrapper padding="1.5rem">
        <CommonStyled.Text>결제예상금액</CommonStyled.Text>
      </CommonStyled.FlexWrapper>
      <CommonStyled.HR margin="0" />
      <CommonStyled.FlexWrapper flexDirection="column" padding="1.5rem">
        <CommonStyled.FlexWrapper justifyContent="space-between">
          <CommonStyled.Text weight="bold" size="0.8rem">
            결제예상금액
          </CommonStyled.Text>
          <CommonStyled.Text weight="bold" size="0.8rem">
            {totalPrice ? totalPrice.toLocaleString('ko-KR') : 0}원
          </CommonStyled.Text>
        </CommonStyled.FlexWrapper>
        {checkboxItemCount === 0 ? (
          <Button height="60px" margin="3rem 0 0 0" size="1.2rem" weight="normal" disabled>
            주문하기({checkboxItemCount || 0}종)
          </Button>
        ) : (
          <Button
            height="60px"
            margin="3rem 0 0 0"
            size="1.2rem"
            weight="normal"
            onClick={orderSelectedItem}
          >
            주문하기({checkboxItemCount || 0}종)
          </Button>
        )}
      </CommonStyled.FlexWrapper>
    </Styled.CartListReceiptContainer>
  );
};

CartReceipt.propTypes = {
  cartList: PropTypes.object,
  checkboxItems: PropTypes.array,
};

CartReceipt.defaultProps = {
  cartList: {},
  checkboxItems: [],
};

export default CartReceipt;
