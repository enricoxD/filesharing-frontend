import {BASE_URL} from "@/utils/api";
import Icon from "@mdi/react";
import React from "react";
import {
    mdiAccountCircleOutline, mdiAccountMultiple,
    mdiFile,
    mdiNaturePeople,
    mdiUpload
} from "@mdi/js";

interface NavBarItemProps {
    name: string;
    icon: string;
    path: string;
    className?: string;
}

export const NavBar = () => {
    const NavBarItem = ({name, icon, path, className}: NavBarItemProps) => {
        return (
            <a className={`navbar-item ${className}`} href={`${BASE_URL}/${path}`}>
                <div className={"icon-wrapper"}>
                    <Icon path={icon} className={"icon"}/>
                </div>
                <p>{name}</p>
            </a>
        )
    }

    return (
        <nav className={"navbar"}>
            <NavBarItem path={"/"} name={"Filesharing"} icon={mdiFile} />
            <NavBarItem path={"/upload"} name={"Upload"} icon={mdiUpload} />
            <NavBarItem path={"/people"} name={"People"} icon={mdiAccountMultiple} />
            <NavBarItem path={"/signup"} name={"Sign Up"} icon={mdiAccountCircleOutline} />
        </nav>
    )
}