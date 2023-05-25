type Options = { name: string; value: string };

type SelectBoxProps = {
  value: string;
  options: Options[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const SelectBox = ({ value, options, onChange }: SelectBoxProps) => {
  return (
    <select value={value} onChange={onChange}>
      {options.map(({ name, value }) => (
        <option key={value} value={value}>
          {name}
        </option>
      ))}
    </select>
  );
};

export default SelectBox;
