import React, {ComponentProps, SyntheticEvent} from "react";
import Icon from "@mdi/react";

export type ButtonTypes = "gradient" | "filled" | "filled-red";

interface ButtonProps extends ComponentProps<"button"> {
  onClick: (event: SyntheticEvent) => void;
  layout: ButtonTypes;
  icon?: string
  disabled?: boolean;
}

export const Button = (props: ButtonProps) => {
  const {children, className, disabled, layout, onClick, icon, ...attributes} = props;

  const invokeOnClick = (event: SyntheticEvent) => {
    if (disabled) return
    onClick(event)
  }

  return (
    <button
      className={`button ${disabled ? "disabled" : ""} ${layout} ${className ? className : ''}`}
      disabled={disabled}
      onClick={invokeOnClick}
      {...attributes}
    >
      {icon &&
          <div className={"icon-wrapper"}>
              <Icon path={icon} className={"icon"}/>
          </div>
      }
      {children}
    </button>
  );
};
