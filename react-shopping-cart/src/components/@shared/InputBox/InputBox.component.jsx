import FlexBox from '../FlexBox/FlexBox.component';
import Input from '../Input/Input.component';
import TextBox from '../TextBox/TextBox.component';

function InputBox({ label, type, placeholder, error }) {
  return (
    <FlexBox width="100%" gap="5px" direction="column">
      <TextBox fontSize="small" as="label">
        {label}
      </TextBox>
      <Input type={type} placeholder={placeholder} />
      {error && error}
    </FlexBox>
  );
}

export default InputBox;
