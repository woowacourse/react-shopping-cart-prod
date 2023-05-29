import * as S from './SelectBox.style';

interface SelectBoxProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: {
    value: string;
    name: string;
  }[];
}

function SelectBox({ options, ...restProps }: SelectBoxProps) {
  return (
    <S.Select {...restProps}>
      {options.map(({ value, name }) => {
        return (
          <option key={value} value={value}>
            {name}
          </option>
        );
      })}
    </S.Select>
  );
}

export default SelectBox;
