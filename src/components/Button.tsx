import React, {ComponentProps, SyntheticEvent} from "react";

export type ButtonTypes = "filled";

interface ButtonProps extends ComponentProps<"button"> {
    onClick: (event: SyntheticEvent) => void;
    layout: ButtonTypes;
    disabled?: boolean;
}

export const Button = (props: ButtonProps) => {
    const {children, className, disabled, layout, onClick, ...attributes} = props;

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
            {children}
        </button>
    );
};
