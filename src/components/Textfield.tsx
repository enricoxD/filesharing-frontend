import React, {SyntheticEvent, useState} from "react";
import Icon from '@mdi/react';
import {mdiEye, mdiEyeOff} from '@mdi/js';


interface TextfieldProps {
  icon?: string;
  name?: string;
  placeholder?: string;
  password?: boolean;
  onChange?: (event: SyntheticEvent<HTMLInputElement>) => void;
  isRequired?: boolean;
  className?: string;
}

const Textfield: React.FC<TextfieldProps> = (props) => {
  const {
    icon,
    name,
    placeholder,
    password,
    onChange,
    isRequired,
    className,
    ...attributes
  } = props;
  const [showInput, setShowInput] = useState(!password);

  return (
    <div className={`textfield`} {...attributes}>
      {icon && <Icon path={icon} className={"prefix-icon"}/>}
      <input
        type={`${showInput ? "text" : "password"}`}
        name={name}
        className={icon ? "input-with-icon" : "input"}
        placeholder={placeholder}
        onChange={(event) => onChange && onChange(event)}
      />
      {password && (
        <a className={`toggle-password-icon`} onClick={() => setShowInput(!showInput)}>
          {<Icon
            path={showInput ? mdiEyeOff : mdiEye}
            className={showInput ? 'shown' : 'hidden'}
          />}
        </a>
      )}
    </div>
  );
};

export default Textfield;
