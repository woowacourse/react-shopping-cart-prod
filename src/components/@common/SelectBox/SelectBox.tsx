type Options = { name: string; value: string };

type SelectBoxProps = {
  options: Options[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const SelectBox = ({ options, onChange }: SelectBoxProps) => {
  return (
    <select onChange={onChange}>
      {options.map(({ name, value }) => (
        <option key={value} value={value}>
          {name}
        </option>
      ))}
    </select>
  );
};

export default SelectBox;
