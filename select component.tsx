import React, { useRef, useEffect, useState } from 'react';
import { useField } from '@unform/core';
import ReactSelect, {
  OptionTypeBase,
  Props as SelectProps
} from 'react-select';

interface Props extends SelectProps<OptionTypeBase> {
  name: string;
  label: string;
  options: Array<{
    value: string;
    label: string;
  }>;
}

const Select: React.FC<Props> = ({ name, label, options, ...rest }) => {
  const selectRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      setValue: (ref, value) => {
        const valor = ref.props.options.find(
          (option: OptionTypeBase) => option.value === value
        );

        ref.onChange(valor);
      },
      getValue: (ref: any) => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return [];
          }
          return ref.state.value.map((option: OptionTypeBase) => option.value);
        }
        if (!ref.state.value) {
          return '';
        }
        return ref.state.value.value;
      }
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <ReactSelect
        id={name}
        ref={selectRef}
        defaultValue={defaultValue}
        placeholder="Pesquisar"
        classNamePrefix="react-select"
        options={options}
        {...rest}
      />
    </div>
  );
};

export default Select;
