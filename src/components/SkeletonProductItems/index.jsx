import * as CommonStyled from 'components/@common/CommonStyle/styles';
import * as Styled from './styles';

const SkeletonProductItems = () =>
  Array.from({ length: 16 }).map((_, i) => (
    <CommonStyled.Container key={i} width="100%" flexDirection="column">
      <Styled.ImageWrapper />
      <CommonStyled.Container
        justifyContents="space-between"
        width="100%"
        alignItems="center"
        margin="0"
      >
        <Styled.Info>
          <Styled.SingleLineText width="70%" />
          <Styled.SingleLineText width="40%" />
        </Styled.Info>
        <CommonStyled.FlexWrapper width="auto" />
      </CommonStyled.Container>
    </CommonStyled.Container>
  ));

export default SkeletonProductItems;
