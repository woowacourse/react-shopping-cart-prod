import axios from 'axios';
import { SERVER_URL } from 'configs/api';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Customer, StoreState } from 'types';

import { actions } from 'redux/actions';

import useDaumPostcode, { Address } from 'hooks/useDaumPostcode';

type SelectedState = StoreState['userState'];

const useProfileForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id: userId } = useSelector<StoreState, SelectedState>(
    ({ userState }) => userState
  );

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

    try {
      await axios({
        method: 'delete',
        url: `${SERVER_URL}/api/customers/${userId}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      localStorage.removeItem('accessToken');
      dispatch(actions.initUserState());
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

    const formData = new FormData(e.target as HTMLFormElement);
    const requestBody = {
      ...(Object.fromEntries(formData.entries()) as Partial<Customer>),
      profileImageUrl: `http://gravatar.com/avatar/${Date.now()}?d=identicon`,
    };
    const accessToken = localStorage.getItem('accessToken');

    try {
      await axios({
        method: 'put',
        url: `${SERVER_URL}/api/customers/${userId}`,
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

  const loadUserInfo = async (accessToken: string, userId: number) => {
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
      url: `${SERVER_URL}/api/customers/${userId}`,
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

    if (!accessToken || userId === null) {
      navigate('/signin');
    }

    try {
      loadUserInfo(accessToken as string, userId as number);
    } catch (e) {
      alert('error');
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
