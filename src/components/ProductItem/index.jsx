import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { addCartList } from 'actions/cart';
import { snackbar } from 'actions/snackbar';
import { checkIsLogin, handleRequestAddCartItem } from 'utils/addCartItem';

import IconButton from 'components/@common/IconButton';
import { 비동기_요청, 아이콘_코드, 알림_메시지 } from 'constants/';
import noImage from 'assets/no_image.png';
import * as CommonStyled from 'components/@common/CommonStyle/styles';
import * as Styled from './styles';

const ProductItem = ({ id, thumbnail, name, price }) => {
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const onClickAddCartButton = async () => {
    if (!checkIsLogin(dispatch)) {
      return;
    }
    const requestStatus = await handleRequestAddCartItem(id, dispatch);
    if (requestStatus === 비동기_요청.REDIRECT) {
      navigator('/cart');
    }
    if (requestStatus === 비동기_요청.SUCCESS) {
      dispatch(addCartList({ id, thumbnail, name, price }));
      dispatch(snackbar.pushMessageSnackbar(알림_메시지.장바구니_추가(name)));
    }
  };

  const onClickProduct = () => {
    navigator(`/product/${id}`);
  };

  return (
    <CommonStyled.Container width="100%" flexDirection="column">
      <Styled.ImageWrapper onClick={onClickProduct}>
        <img src={thumbnail} alt="product thumbnail" />
      </Styled.ImageWrapper>
      <CommonStyled.Container
        justifyContents="space-between"
        width="100%"
        alignItems="center"
        margin="0"
      >
        <Styled.Info onClick={onClickProduct}>
          <Styled.Title>{name}</Styled.Title>
          <p>{price.toLocaleString('ko-KR')}원</p>
        </Styled.Info>
        <CommonStyled.FlexWrapper width="auto">
          <IconButton onClick={onClickAddCartButton} icon={아이콘_코드.CART} />
        </CommonStyled.FlexWrapper>
      </CommonStyled.Container>
    </CommonStyled.Container>
  );
};

ProductItem.propTypes = {
  id: PropTypes.number.isRequired,
  thumbnail: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
};

ProductItem.defaultProps = {
  thumbnail: noImage,
  name: '이름이 지정되지 않았습니다.',
  price: -1,
};

export default ProductItem;
