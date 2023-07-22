"use client"
import {BASE_URL} from "@/utils/api";
import Icon from "@mdi/react";
import React from "react";
import {
  mdiAccountAlert,
  mdiAccountCircleOutline, mdiAccountMultiple,
  mdiFile,
  mdiUpload
} from "@mdi/js";
import {useCurrentUser} from "@/hooks/getCurrentUser";
import Link from "next/link";

interface NavBarItemProps {
  name: string;
  icon: string;
  path: string;
  className?: string;
}

const NavBarItem = ({name, icon, path, className}: NavBarItemProps) => {
  return (
    <Link className={`navbar-item ${className}`} href={`${BASE_URL}/${path}`}>
      <div className={"icon-wrapper"}>
        <Icon path={icon} className={"icon"}/>
      </div>
      <p>{name}</p>
    </Link>
  )
}

export const NavBar = () => {
  const user = useCurrentUser()

  return (
    <nav className={"navbar"}>
      <NavBarItem path={"/"} name={"Filesharing"} icon={mdiFile}/>
      <NavBarItem path={"/upload"} name={"Upload"} icon={mdiUpload}/>
      <NavBarItem path={"/people"} name={"People"} icon={mdiAccountMultiple}/>
      {user ?
        <NavBarItem path={`/user`} name={user.name} icon={mdiAccountAlert}/>
        :
        <NavBarItem path={"/signup"} name={"Sign Up"} icon={mdiAccountCircleOutline}/>
      }
    </nav>
  )
}