import FlexBox from '../FlexBox/FlexBox.component';
import Input from '../Input/Input.component';
import TextBox from '../TextBox/TextBox.component';

function InputBox({ label, type, placeholder, error, onChange, value, errorMessage, maxLength }) {
  return (
    <FlexBox width="100%" gap="5px" direction="column">
      <TextBox fontSize="small" as="label">
        {label}
      </TextBox>
      <Input
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        error={error}
        maxLength={maxLength}
      />
      {error && (
        <TextBox fontSize="extraSmall" color="RED_001">
          {errorMessage}
        </TextBox>
      )}
    </FlexBox>
  );
}

export default InputBox;
