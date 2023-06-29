import React, {ComponentProps, SyntheticEvent} from "react";

export type ButtonTypes = "filled";

interface ButtonProps extends ComponentProps<"button"> {
    arsch: (event: SyntheticEvent) => void;
    layout: ButtonTypes;
    disabled: boolean;
}

export const Button = (props: ButtonProps) => {
    const {children, className, disabled, layout, arsch, ...attributes} = props;
    return (
        <button
            className={`button ${disabled ? "disabled" : ""} ${layout} ${className ? className : ''}`}
            onClick={arsch}
            {...attributes}
        >
            {children}
        </button>
    );
};
