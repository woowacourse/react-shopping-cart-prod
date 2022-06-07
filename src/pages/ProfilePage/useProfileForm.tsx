import axios from 'axios';
import { SERVER_URL } from 'configs/api';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Customer } from 'types';

import useDaumPostcode, { Address } from 'hooks/useDaumPostcode';

const useProfileForm = () => {
  const navigate = useNavigate();
  const { postcode, addressData, setAddressData } = useDaumPostcode();
  const [values, setValues] = useState<Record<string, string>>({
    email: '',
    password: '',
    'confirm-password': '',
    name: '',
    contact: '',
    detailAddress: '',
    gender: '',
    birthday: '',
  });
  const [errors, setErrors] = useState<Record<string, string> | undefined>();

  const handleChange: React.FormEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    const { name, value } = target as HTMLInputElement;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClickAddressButton = () => {
    postcode?.open();
  };

  const handleClickUnregisterButton = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const customerId = localStorage.getItem('userId');

    try {
      await axios({
        method: 'delete',
        url: `${SERVER_URL}/api/customers/${customerId}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      localStorage.removeItem('accessToken');
      localStorage.removeItem('userId');

      alert('계정이 삭제되었습니다.');
      navigate('/');
    } catch (e) {
      if (axios.isAxiosError(e)) {
        alert('요청을 실패했습니다.');
      } else {
        alert(e);
      }
    }
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (Object.entries(errors as Record<string, string>).length !== 0) return;

    const accessToken = localStorage.getItem('accessToken');
    const customerId = localStorage.getItem('userId');

    const formData = new FormData(e.target as HTMLFormElement);
    const requestBody = {
      ...(Object.fromEntries(formData.entries()) as Partial<Customer>),
      profileImageUrl: `http://gravatar.com/avatar/${Date.now()}?d=identicon`,
    };

    try {
      await axios({
        method: 'put',
        url: `${SERVER_URL}/api/customers/${customerId}`,
        data: requestBody,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      alert('회원 정보가 수정되었습니다.');
    } catch (e) {
      if (axios.isAxiosError(e)) {
        alert('유효하지 않은 이메일 형식입니다.');
      } else {
        alert(e);
      }
    }
  };

  const loadUserInfo = async (accessToken: string, customerId: string) => {
    const {
      data: {
        name,
        contact,
        email,
        zoneCode,
        address,
        detailAddress,
        gender,
        birthday,
      },
    } = await axios({
      method: 'get',
      data: '',
      url: `${SERVER_URL}/api/customers/${customerId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    setValues((prev) => ({
      ...prev,
      name,
      contact,
      email,
      gender,
      detailAddress,
      birthday,
    }));

    setAddressData({
      zonecode: zoneCode,
      address,
    });
  };

  useEffect(() => {
    setErrors(validate(values, addressData as Partial<Address>));
  }, [values, addressData]);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const customerId = localStorage.getItem('userId');

    if (!accessToken || !customerId) {
      navigate('/signin');
    }

    try {
      loadUserInfo(accessToken as string, customerId as string);
    } catch (e) {
      console.error('error');
    }
  }, [setAddressData]);

  return {
    values,
    addressData,
    errors,
    handleChange,
    handleClickAddressButton,
    handleSubmit,
    handleClickUnregisterButton,
  };
};

const validate = (
  values: Record<string, string>,
  addressData: Partial<Address>
) => {
  const errors: Record<string, string> = {};

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

export default useProfileForm;
