import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useTermsStep = () => {
  const navigate = useNavigate();

  const [checkedFlags, setCheckedFlags] = useState<Record<string, boolean>>({
    'term-of-service': false,
    'term-of-personal-info': false,
  });

  const handleCheck =
    (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setCheckedFlags((prev) => ({ ...prev, [name]: e.target.checked }));
    };

  const handleCheckAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedFlags({
      'term-of-service': e.target.checked,
      'term-of-personal-info': e.target.checked,
    });
  };

  const isAllChecked = Object.values(checkedFlags).every((checked) => checked);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    navigate('/signup/2');
  };

  return {
    checkedFlags,
    isAllChecked,
    handleCheck,
    handleCheckAll,
    handleSubmit,
  };
};

export default useTermsStep;
