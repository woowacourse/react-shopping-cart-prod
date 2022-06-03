export const isInvalidEmail = email => !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

export const isInvalidPassword = password =>
  !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[~!@#$%^&*()+|=])[A-Za-z\d~!@#$%^&*()+|=]{8,16}$/.test(
    password
  );

export const isInvalidName = name => !(name && name.length < 30);

export const isInvalidAddress = address => !address;

export const isInvalidPhoneNumber = phoneNumber => !/[0-9]{4}/.test(phoneNumber);
