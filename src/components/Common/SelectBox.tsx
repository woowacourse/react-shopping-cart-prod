import { SelectHTMLAttributes } from 'react';
import { styled } from 'styled-components';
import {
  DISABLED_MESSAGES,
  DisabledMessageKeys,
} from '../../constants/message';

interface SelectBoxProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: string[];
  disabledMessageKey?: DisabledMessageKeys;
}

const SelectBox = ({
  options,
  disabled,
  disabledMessageKey,
  ...props
}: SelectBoxProps) => {
  return (
    <StyledSelectBox disabled={disabled} {...props}>
      {!disabled ? (
        options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))
      ) : (
        <>
          {disabledMessageKey ? (
            <option>{DISABLED_MESSAGES[disabledMessageKey]}</option>
          ) : (
            '클릭할 수 없습니다'
          )}
        </>
      )}
    </StyledSelectBox>
  );
};

const StyledSelectBox = styled.select`
  width: fit-content;

  &:disabled {
    cursor: not-allowed;
    background: ${({ theme }) => theme.colors.gray200};
    color: white;
  }
`;

export default SelectBox;
