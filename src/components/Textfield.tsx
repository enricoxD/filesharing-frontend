import React, { ComponentProps, useState } from "react";
import { Icon } from "@/assets/icon";


interface TextfieldProps extends ComponentProps<"input"> {
  icon: string;
  placeholder: string;
  password: boolean;
  valueState: [string, React.Dispatch<React.SetStateAction<string>>];
  isRequired: boolean;
  border: "cut" | "rounded" | "top-rounded";
}

const Textfield: React.FC<TextfieldProps> = (props) => {
  const {
    icon,
    placeholder,
    password,
    valueState,
    isRequired,
    border,
    children,
    className,
    ...attributes
  } = props;
  const [showInput, setShowInput] = useState(!password);

  return (
    <div className={`textfield ${border}`} {...attributes}>
      <span className={`mdi ${icon} input-icon`} />
      <input
        type={`${showInput ? "text" : "password"}`}
        className={icon ? "input-with-icon" : "input"}
        placeholder={placeholder}
      />
      {password && (
        <a
          className={` toggle-password-icon`}
          onClick={() => setShowInput(!showInput)}
        >
          <span
            className={`mdi ${
              showInput ? `${Icon.Eye_Off} shown` : `${Icon.Eye} hidden`
            }`}
          />
        </a>
      )}
    </div>
  );
};

export default Textfield;
