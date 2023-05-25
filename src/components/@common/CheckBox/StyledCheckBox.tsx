import * as Styled from './StyledCheckBox.styles.tsx';

type CartItemCheckBoxProps = {
  className?: string;
  checked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

const StyledCheckBox = ({ className, checked, onChange, ...props }: CartItemCheckBoxProps) => (
  <Styled.CheckboxContainer className={className}>
    <Styled.CheckboxLabel>
      <Styled.HiddenCheckbox checked={checked} onChange={onChange} {...props} />{' '}
      <Styled.StyledCheckbox checked={checked}>
        <Styled.Icon viewBox='0 0 24 24'>
          <polyline points='20 6 9 17 4 12' />
        </Styled.Icon>
      </Styled.StyledCheckbox>
    </Styled.CheckboxLabel>
  </Styled.CheckboxContainer>
);

export default StyledCheckBox;
