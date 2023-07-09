import {SyntheticEvent} from "react";
import Textfield from "@/components/Textfield";
import {mdiLock} from "@mdi/js";
import {Button} from "@/components/Button";

export const RequestPassword = (props: {
    onChange: (event: SyntheticEvent<HTMLInputElement>) => void,
    onSubmit: () => void
}) => (
    <div>
        <Textfield
            placeholder={"Password"}
            name={"password"}
            password
            onChange={props.onChange}
            isRequired={true}
            icon={mdiLock}
        />
        <Button onClick={props.onSubmit} layout={"filled"}/>
    </div>
)