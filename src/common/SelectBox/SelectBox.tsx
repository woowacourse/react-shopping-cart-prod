import { styled } from 'styled-components';

interface SelectBoxProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: {
    value: string;
    name: string;
  }[];
}

function SelectBox({ options, ...restProps }: SelectBoxProps) {
  return (
    <Select {...restProps}>
      {options.map(({ value, name }) => {
        return (
          <option key={value} value={value}>
            {name}
          </option>
        );
      })}
    </Select>
  );
}

const Select = styled.select`
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 4px;
  background-color: transparent;

  color: ${({ theme }) => theme.lightColor};
  font-weight: 600;
  font-size: 1.4rem;
  border: ${({ theme }) => theme.secondaryColor} 1px solid;

  text-align: center;
`;

export default SelectBox;
