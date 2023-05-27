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
  border: 1px solid black;
  text-align: center;
`;

export default SelectBox;
