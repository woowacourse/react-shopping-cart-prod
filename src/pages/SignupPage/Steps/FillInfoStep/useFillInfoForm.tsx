import axios from 'axios';
import { SERVER_URL } from 'configs/api';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Customer } from 'types';

import useDaumPostcode, { Address } from 'hooks/useDaumPostcode';

const useFillInfoForm = () => {
  const navigate = useNavigate();

  const { postcode, addressData } = useDaumPostcode();
  const [values, setValues] = useState<Record<string, string>>({
    name: '',
    contact: '',
    password: '',
    'confirm-password': '',
  });
  const [isEmailUnique, setIsEmailUnique] = useState(false);
  const [errors, setErrors] = useState<Record<string, string> | undefined>();

  const handleChange: React.FormEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    const { name, value } = target as HTMLInputElement;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'email') setIsEmailUnique(false);
  };

  const handleClickIsEmailDuplicated = async () => {
    const email = values['email'];

    try {
      await axios({
        method: 'get',
        url: `${SERVER_URL}/api/validation?email=${email}`,
      });

      setIsEmailUnique(true);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        alert('중복된 이메일입니다.');
      } else {
        alert(e);
      }
    }
  };

  const handleClickAddressButton = () => {
    postcode?.open();
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (Object.entries(errors as Record<string, string>).length !== 0) return;

    const formData = new FormData(e.target as HTMLFormElement);
    const requestBody = {
      ...(Object.fromEntries(formData.entries()) as Partial<Customer>),
      profileImageUrl: `http://gravatar.com/avatar/${Date.now()}?d=identicon`,
    };

    try {
      await axios({
        method: 'post',
        url: `${SERVER_URL}/api/customers`,
        data: requestBody,
      });

      navigate('/signup/3');
    } catch (e) {
      if (axios.isAxiosError(e)) {
        alert('유효하지 않은 이메일 형식입니다.');
      } else {
        alert(e);
      }
    }
  };

  useEffect(() => {
    setErrors(validate(values, addressData as Partial<Address>, isEmailUnique));
  }, [values, addressData, isEmailUnique]);

  return {
    addressData,
    errors,
    handleChange,
    handleClickIsEmailDuplicated,
    handleClickAddressButton,
    handleSubmit,
  };
};

const validate = (
  values: Record<string, string>,
  addressData: Partial<Address>,
  isEmailUnique: boolean
) => {
  const errors: Record<string, string> = {};

  if (!isEmailUnique) {
    errors.email = '이메일 중복 확인을 해주세요.';
  }

  if (values['name'] === '') {
    errors.name = '이름을 입력해주세요';
  }

  if (values['contact'] === '') {
    errors.contact = '전화번호를 입력해주세요';
  }

  if (
    values['password'] === '' ||
    values['confirm-password'] === '' ||
    values['password'] !== values['confirm-password']
  ) {
    errors.password = '비밀번호와 비밀번호 확인이 일치하지 않습니다.';
  }

  if (!addressData) {
    errors.address = '주소를 입력해주세요.';
  }

  return errors;
};

export default useFillInfoForm;
