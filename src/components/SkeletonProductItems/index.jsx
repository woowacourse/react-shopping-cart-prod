import { v4 as uuidv4 } from 'uuid';
import * as CommonStyled from 'components/@common/CommonStyle/styles';
import * as Styled from './styles';

const SkeletonProductItems = () =>
  Array.from({ length: 16 }).map(() => (
    <CommonStyled.Container key={uuidv4()} width="100%" flexDirection="column">
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
