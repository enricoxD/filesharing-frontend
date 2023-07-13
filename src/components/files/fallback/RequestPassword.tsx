import {SyntheticEvent} from "react";
import Textfield from "@/components/Textfield";
import {mdiLock} from "@mdi/js";
import {Button} from "@/components/Button";

export const RequestPassword = (props: {
    failedTries: number,
    onChange: (event: SyntheticEvent<HTMLInputElement>) => void,
    onSubmit: () => void
}) => {

    return <div className={"fallback section"}>
        <h2>This upload requires a password.</h2>
        <p>Please enter the password to continue.</p>
        <div className={"password"}>
            <Textfield
                placeholder={"Password"}
                name={"password"}
                password
                onChange={props.onChange}
                isRequired={true}
                icon={mdiLock}
            />
            <Button onClick={props.onSubmit} layout={"gradient"} className={"desktop-one-third"}>
                <p>Submit Password</p>
            </Button>
        </div>
    </div>
}