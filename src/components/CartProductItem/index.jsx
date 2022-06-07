import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { 비동기_요청, 아이콘_코드, 알림_메시지 } from 'constants/';

import IconButton from 'components/@common/IconButton';
import CheckBox from 'components/@common/CheckBox';
import Counter from 'components/@common/Counter';

import { requestDeleteCartItem } from 'api';
import { deleteCartItem } from 'actions/cart';
import { snackbar } from 'actions/snackbar';

import noImage from 'assets/no_image.png';
import * as CommonStyled from 'components/@common/CommonStyle/styles';
import * as Styled from './styles';

const CartProductItem = ({
  id,
  thumbnail,
  name,
  price,
  quantity,
  isChecked,
  handleChecked,
  handleItemCount,
}) => {
  const dispatch = useDispatch();

  const onClickDeleteButton = async () => {
    if (isChecked(id)) {
      handleChecked(id);
    }
    const response = await requestDeleteCartItem({ productIds: [id] });
    if (response.status === 비동기_요청.SUCCESS) {
      dispatch(deleteCartItem([id]));
      dispatch(snackbar.pushMessageSnackbar(알림_메시지.장바구니_개별_삭제(name)));
      return;
    }
    alert('상품 제거에 실패하였습니다');
  };

  return (
    <CommonStyled.Container width="100%" margin="0">
      <CheckBox checkState={isChecked(id)} handleChecked={() => handleChecked(id)} />
      <Styled.ImageWrapper>
        <img src={thumbnail} alt="product thumbnail" />
      </Styled.ImageWrapper>
      <CommonStyled.Container
        width="100%"
        height="100px"
        justifyContent="flex-end"
        alignItems="flex-end"
        flexDirection="column"
        margin="0"
        padding="0 1rem"
      >
        <CommonStyled.Container width="100%" margin="0" justifyContent="space-between">
          <Styled.Title>{name}</Styled.Title>
          <IconButton onClick={onClickDeleteButton} icon={아이콘_코드.DELETE} />
        </CommonStyled.Container>
        <CommonStyled.FlexWrapper margin="0" width="120px" justifyContent="flex-end">
          <Counter id={id} count={quantity} handleItemCount={handleItemCount()} />
        </CommonStyled.FlexWrapper>
        <Styled.Container margin="0" width="100%" justifyContent="flex-end">
          <CommonStyled.Text padding="0.5rem 0">
            {price.toLocaleString('ko-KR')}원
          </CommonStyled.Text>
        </Styled.Container>
      </CommonStyled.Container>
    </CommonStyled.Container>
  );
};

CartProductItem.propTypes = {
  id: PropTypes.number.isRequired,
  thumbnail: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  quantity: PropTypes.number,
  isChecked: PropTypes.func,
  handleChecked: PropTypes.func,
  handleItemCount: PropTypes.func,
};

CartProductItem.defaultProps = {
  thumbnail: noImage,
  name: '이름이 지정되지 않았습니다.',
  price: -1,
  quantity: 1,
  isChecked: () => true,
  handleChecked: () => {},
  handleItemCount: () => {},
};

export default CartProductItem;
