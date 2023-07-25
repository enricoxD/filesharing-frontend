"use client";
import {SyntheticEvent, useState} from "react";
import Textfield from "@/components/Textfield";
import {mdiAccount, mdiClose, mdiEmail, mdiLock, mdiLockCheck} from "@mdi/js";
import {Button} from "@/components/Button";
import Link from "next/link";
import Image from "next/image";
import {api} from "@/utils/api";

interface FormData {
  username: string;
  password: string;
  email: string;
}

export default function SignUp() {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
    email: '',
  });
  const [showException, setShowException] = useState<boolean>(false)
  const [exception, setException] = useState<string | false>(false)

  const handleSignup = async (event: SyntheticEvent) => {
    event.preventDefault();

    api.post('/auth/register', formData)
      .then((response) => {
        if (response.data.exception) {
          setExceptionMessage(response.data.exception)
          return
        }
        process.env.BASE_URL && window.location.replace(process.env.BASE_URL)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const setExceptionMessage = (message: string) => {
    setException(message);
    setShowException(true);
    setTimeout(() => {
      setShowException(false);

      setTimeout(() => {
        setException(false);
      }, 1000)
    }, 7500)
  }

  const handleTextfieldChange = (event: SyntheticEvent<HTMLInputElement>) => {
    const {name, value} = event.currentTarget;
    setFormData((prevFormData: FormData) => ({...prevFormData, [name]: value}));
  };

  return (
    <main className={"auth-page container"}>
      <div className={"authcard"}>
        <h1>Signup</h1>
        <div className={"content-frame"}>
          <div className={"credentials"}>
            <Textfield
              placeholder={"Username"}
              name={"username"}
              onChange={handleTextfieldChange}
              isRequired={true}
              icon={mdiAccount}
            />
            <Textfield
              placeholder={"E-Mail"}
              name={"email"}
              onChange={handleTextfieldChange}
              isRequired={true}
              icon={mdiEmail}
            />
            <Textfield
              placeholder={"Password"}
              name={"password"}
              password
              onChange={handleTextfieldChange}
              isRequired={true}
              icon={mdiLock}
            />
          </div>

          <Button layout={"gradient"} disabled={false} onClick={handleSignup}>
            <p>Signup</p>
          </Button>

          <div className={"sso"}>
            <span className={"divider"}>Or</span>
            <div className={"provider"}>
              <Link href={"https://www.api.filesharing.enricoe.de/oauth/login"}>
                <Image src={"/google.svg"} alt={"Github Single Sign On"} width="40" height="40"/>
              </Link>
              <Link href={{/*TODO*/}}>
                <Image src={"/github.svg"} alt={"Github Single Sign On"} width="40" height="40"/>
              </Link>
            </div>
          </div>
          <div className={"information"}>
            {<p className={`exception ${showException ? "shown" : "hidden"}`} dangerouslySetInnerHTML={exception ? { __html: exception } : { __html: ""}}></p>}
            <div className={"links"}>
              <p className={"signup"}>Already have an account? <Link href={"/login"}>Login</Link></p>
              <Link href={"/terms"} className={"terms"}>Terms & Conditions</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
