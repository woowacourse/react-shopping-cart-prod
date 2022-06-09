const REG_EXP = {
  ID: '^[a-z0-9_-]{5,20}$',
  PASSWORD:
    '^(?=.*[A-Za-z])(?=.*\\d)(?=.*[!@#$%^&*()])[A-Za-z\\d!@#$%^&*()]{8,16}$',
  EMAIL: '^[a-z0-9._-]+@[a-z]+[.]+[a-z]{2,3}$',
  PHONE_NUMBER: '^010-?([0-9]{3,4})-?([0-9]{4})',
};

export default REG_EXP;
