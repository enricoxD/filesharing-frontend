"use client";
import {SyntheticEvent, useState} from "react";
import Textfield from "@/components/Textfield";
import {mdiAccount, mdiClose, mdiLock} from "@mdi/js";
import {Button} from "@/components/Button";
import Link from "next/link";
import Image from "next/image";
import {api} from "@/utils/api";

interface FormData {
  name: string;
  password: string;
}

export default function Login() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    password: '',
  });
  const [showException, setShowException] = useState<boolean>(false);
  const [exception, setException] = useState<String | false>(false);

  const handleLogin = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      const response = await api.post('/auth/login', formData, {
        withCredentials: true
      });
      if (response.data.data) {
        process.env.BASE_URL && window.location.replace(process.env.BASE_URL);
        return
      }

      if (response.data.message) {
        setExceptionMessage(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const setExceptionMessage = (message: String) => {
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
      <main className={"auth-page"}>
        <div className={"loginsection container"}>
          <div className={"authcard"}>
            <h1>Login</h1>
            <div className={"content-frame"}>
              <div className={"credentials"}>
                <Textfield
                    placeholder={"Username"}
                    name={"name"}
                    password={false}
                    onChange={handleTextfieldChange}
                    isRequired={true}
                    icon={mdiAccount}
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

              <Button layout={"filled"} disabled={false} onClick={handleLogin}>
                <p>Login</p>
              </Button>
              <Link href={"/hallo/"} className={"center"}>
                Forgot Password?
              </Link>
              <div className={"sso"}>
                <span className={"divider"}>Or</span>
                <div className={"provider"}>
                  <Link href={{/*TODO*/}}>
                    <Image src={"/google.svg"} alt={"Github Single Sign On"} width="40" height="40"/>
                  </Link>
                  <Link href={{/*TODO*/}}>
                    <Image src={"/github.svg"} alt={"Github Single Sign On"} width="40" height="40"/>
                  </Link>
                </div>
              </div>
              <div className={"information"}>
                {<p className={`exception ${showException ? "shown" : "hidden"}`}>{exception}</p>}
                <div className={"links"}>
                  <p className={"signup"}>Don&apos;t have an account? <Link href={"/signup"}>Sign Up</Link></p>
                  <Link href={"/terms"} className={"terms"}>Terms & Conditions</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
  )
}
