import useInput from './useInput';

const usePhoneNumberInput = (initialValue: string) => {
  const { value: phoneNumber, setValue: setPhoneNumber } =
    useInput(initialValue);

  const handler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 11) return;

    setPhoneNumber(e);
  };

  return { phoneNumber, setPhoneNumber: handler };
};

export default usePhoneNumberInput;
