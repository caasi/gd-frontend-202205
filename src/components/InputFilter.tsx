import React from "react";

interface IProps {
  placeholder: string;
  onChangeFunc: (text: string) => void;
}

export default function InputFilter({ placeholder, onChangeFunc }: IProps) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      onChange={(evt) => {
        if (evt.target.value) {
          onChangeFunc(evt.target.value);
        }
      }}
    />
  );
}
