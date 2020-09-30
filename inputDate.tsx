import React, { useRef, useState, useEffect } from 'react';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';
import moment from 'moment';

import { useField } from '@unform/core';

import 'react-datepicker/dist/react-datepicker.css';

interface Props extends Omit<ReactDatePickerProps, 'onChange'> {
  name: string;
  label: string;
}

const DatePicker: React.FC<Props> = ({ name, label, ...rest }) => {
  const datepickerRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  const [date, setDate] = useState(defaultValue || null);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: datepickerRef.current,
      clearValue: (ref: any) => {
        ref.clear();
      },
      setValue: (ref, value) => {
        console.log(value);

        setDate(new Date(value));
      },
      getValue: () => {
        return new Date(date);
      }
    });
  }, [fieldName, registerField, date]);

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <ReactDatePicker
        id={name}
        ref={datepickerRef}
        selected={date}
        onChange={setDate}
        showYearDropdown
        dateFormat="PP"
        isClearable
        autoComplete="off"
        {...rest}
      />
    </div>
  );
};

export default DatePicker;
