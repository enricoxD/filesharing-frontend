import React, {ComponentProps, SyntheticEvent, useState} from "react";
import Icon from '@mdi/react';
import {mdiAbacus, mdiEye, mdiEyeOff} from '@mdi/js';


interface TextfieldProps extends ComponentProps<"input"> {
  icon?: string;
  name?: string;
  placeholder?: string;
  password?: boolean;
  onChange?: (event: SyntheticEvent<HTMLInputElement>) => void;
  isRequired?: boolean;
}

const Textfield: React.FC<TextfieldProps> = (props) => {
  const {
    icon,
    name,
    placeholder,
    password,
    onChange,
    isRequired,
    children,
    className,
    ...attributes
  } = props;
  const [showInput, setShowInput] = useState(!password);

  return (
    <div className={`textfield`} {...attributes}>
      {icon && <Icon path={icon} className={"input-icon"} />}
      <input
        type={`${showInput ? "text" : "password"}`}
        name={name}
        className={icon ? "input-with-icon" : "input"}
        placeholder={placeholder}
        onChange={(event) => onChange && onChange(event) }
      />
      {password && (
        <a
          className={`toggle-password-icon`}
          onClick={() => setShowInput(!showInput)}
        >
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
