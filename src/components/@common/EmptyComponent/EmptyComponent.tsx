import EmptyPicture from '../../../assets/empty-box.png';
import * as Styled from './EmptyComponent.styles.tsx';
const EmptyComponent = () => {
  return (
    <Styled.EmptyComponentWrapper>
      <Styled.EmptyImage src={EmptyPicture} alt='empty jewelry box' aria-label='empty jewelry box' />
      <Styled.EmptyText>
        보석함이 비어있네요. 🥲
        <br />
        <br /> 사랑스러운 그/그녀에게 특별함을 선사하세요. 💎
      </Styled.EmptyText>
    </Styled.EmptyComponentWrapper>
  );
};

export default EmptyComponent;
