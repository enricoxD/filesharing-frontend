import React, {ComponentProps, SyntheticEvent} from "react";

export type ButtonTypes = "filled";

interface ButtonProps extends ComponentProps<"button"> {
    onClick: (event: SyntheticEvent) => void;
    layout: ButtonTypes;
    disabled?: boolean;
}

export const Button = (props: ButtonProps) => {
    const {children, className, disabled, layout, onClick, ...attributes} = props;
    return (
        <button
            className={`button ${disabled ? "disabled" : ""} ${layout} ${className ? className : ''}`}
            onClick={onClick}
            {...attributes}
        >
            {children}
        </button>
    );
};
