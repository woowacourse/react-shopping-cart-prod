import styled from 'styled-components';

type Options = { name: string; value: string };

type SelectBoxProps = {
  value: string;
  options: Options[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const SelectBox = ({ value, options, onChange }: SelectBoxProps) => {
  return (
    <Select value={value} onChange={onChange}>
      {options.map(({ name, value }) => (
        <Option key={value} value={value}>
          {name}
        </Option>
      ))}
    </Select>
  );
};

export default SelectBox;

const Select = styled.select`
  width: 100%;
  border: 0;
  border-radius: 4px;
  font-weight: 700;
  cursor: pointer;
  user-select: none;
`;

const Option = styled.option`
  font-weight: 700;
`;
