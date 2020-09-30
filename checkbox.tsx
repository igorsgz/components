import React, { useEffect, useRef, InputHTMLAttributes } from 'react';
import { useField } from '@unform/core';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  id: string;
  label: string;
}

const CheckboxInput: React.FC<Props> = ({ name, id, label, ...rest }) => {
  const inputRefs = useRef<HTMLInputElement>(null);
  const { fieldName, registerField, defaultValue = [] } = useField(name);

  useEffect(() => {
    registerField<boolean>({
      name: fieldName,
      ref: inputRefs.current,
      getValue: (refs: HTMLInputElement) => {
        return refs.checked;
      },
      clearValue: (refs: HTMLInputElement) => {
        refs.checked = false;
      },
      setValue: (refs: HTMLInputElement, values: boolean) => {
        if (values) {
          refs.checked = true;
        }
      }
    });
  }, [defaultValue, fieldName, registerField]);

  return (
    <div>
      <label htmlFor={id} key={id}>
        <input
          style={{ marginRight: '10px' }}
          ref={inputRefs}
          type="checkbox"
          id={id}
          {...rest}
        />
        {label}
      </label>
    </div>
  );
};

export default CheckboxInput;
