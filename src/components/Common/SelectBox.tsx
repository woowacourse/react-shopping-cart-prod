import { SelectHTMLAttributes } from 'react';

interface SelectBoxProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: string[];
}

const SelectBox = ({ options, ...props }: SelectBoxProps) => {
  return (
    <select {...props}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default SelectBox;
