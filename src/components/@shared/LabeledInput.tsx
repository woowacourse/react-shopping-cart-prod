import React from 'react';

interface Props
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id'> {
  id: string;
  children: React.ReactNode;
}

function Input({ id, children, ...props }: Props) {
  return (
    <>
      <label htmlFor={id}>{children}</label>
      <input id={id} {...props} />
    </>
  );
}

export default Input;
