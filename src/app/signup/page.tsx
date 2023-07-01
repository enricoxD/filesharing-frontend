"use client";
import '@/styles/styles.scss'
import {SyntheticEvent, useState} from "react";
import Textfield from "@/components/Textfield";
import {mdiAccount, mdiClose, mdiEmail, mdiLock, mdiLockCheck} from "@mdi/js";
import {Button} from "@/components/Button";
import Link from "next/link";
import Image from "next/image";
import {api} from "@/utils/api";

interface FormData {
  name: string;
  password: string;
  email: string;
}

export default function Page() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    password: '',
    email: '',
  });
  const [showException, setShowException] = useState<boolean>(false);
  const [exception, setException] = useState<String | false>(false);

  const handleSignup = async (event: SyntheticEvent) => {
    event.preventDefault();

    try {
      const response = await api.post('/auth/register', formData, {
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
            <h1>Signup</h1>
            <div className={"content-frame"}>
              <div className={"credentials"}>
                <Textfield
                    placeholder={"Username"}
                    name={"name"}
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

              <Button layout={"filled"} disabled={false} onClick={handleSignup}>
                <p>Signup</p>
              </Button>

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
                  <p className={"signup"}>Already have an account? <Link href={"/login"}>Login</Link></p>
                  <Link href={"/terms"} className={"terms"}>Terms & Conditions</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
  )
}
