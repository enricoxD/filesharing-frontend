import {UserType} from "@/utils/baseTypes";
import Textfield from "@/components/Textfield";
import Image from "next/image";
import {API_BASE_URL, formDataApi} from "@/utils/api";
import {Button} from "@/components/Button";
import {SyntheticEvent, useState} from "react";

export interface UserSettingsData {
  avatar?: File;
  name?: string;
  email?: string;
  newPassword?: string;
  confirmNewPassword?: string;
  currentPassword?: string;
}

export const UserSettings = ({user}: { user: UserType }) => {
  const [userData, setUserData] = useState<UserSettingsData>({})
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [showException, setShowException] = useState<boolean>(false);
  const [exception, setException] = useState<String | false>(false);

  const handleTextfieldChange = (event: SyntheticEvent<HTMLInputElement>) => {
    const {name, value} = event.currentTarget
    setUserData((prevData: UserSettingsData) => ({...prevData, [name]: value}))

    if (userData.newPassword && userData.confirmNewPassword) {
      if (userData.newPassword != userData.confirmNewPassword) {
        setExceptionMessage("New password and confirmation are not the same.")
      } else {
        setShowException(false);

        setTimeout(() => {
          setException(false);
        }, 1000)
      }
    }
  }

  const selectAvatar = () => {
    const input = document.createElement('input') as HTMLInputElement
    input.hidden = true
    input.type = 'file'
    input.accept = 'image/png, image/jpeg, image/jpg, image/webp'
    input.addEventListener('change', handleAvatarChange)
    input.click()
    input.remove()
  }

  const removeAvatar = () => {
    setSelectedImage(null)
    setUserData((prevData: UserSettingsData) => ({...prevData, avatar: undefined}))
  }

  const handleAvatarChange = (event: Event) => {
    const fileInput = event.target as HTMLInputElement
    const file = fileInput.files?.[0]

    if (file) {
      setUserData((prevData: UserSettingsData) => ({...prevData, avatar: file}))
      const reader = new FileReader()
      reader.onload = () => {
        setSelectedImage(reader.result as string)
      }
      reader.readAsDataURL(file);
    }
  }

  const uploadData = () => {
    formDataApi.post('/user/update', userData)
      .then((response) => {
        console.log(response)
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

  return (
    <div className={"user-settings"}>
      <div className={"avatar-setting"}>
        <div className={"upload-box"} onClick={selectAvatar}>
          <Image
            className={"avatar"}
            src={selectedImage ? selectedImage : `${API_BASE_URL}/user/avatar/${user.id}`}
            alt={`${user.name}`}
            width={64}
            height={64}
          />
          <p>Click to upload a new Avatar...</p>
        </div>
        <Button onClick={removeAvatar} layout={"filled"} disabled={selectedImage == null}>
          <p>Remove Image</p>
        </Button>
      </div>

      <div className={"setting half"}>
        <p className={"label"}>Username</p>
        <Textfield name={"name"} placeholder={user.name} onChange={handleTextfieldChange}/>
      </div>
      <div className={"setting half"}>
        <p className={"label"}>E-Mail</p>
        <Textfield name={"email"} placeholder={user.email} onChange={handleTextfieldChange}/>
      </div>

      <div className={"divider"}/>

      <div className={"setting half"}>
        <p className={"label"}>New Password</p>
        <Textfield name={"newPassword"} placeholder={"Password"} password onChange={handleTextfieldChange}/>
      </div>
      <div className={"setting half"}>
        <p className={"label"}>Confirm Password</p>
        <Textfield name={"confirmNewPassword"} placeholder={"Password"} password onChange={handleTextfieldChange}/>
      </div>

      <div className={"divider"}/>

      <div className={"confirmation"}>
        <p className={"label"}>Current Password</p>
        <Textfield name={"currentPassword"} placeholder={"Password"} password onChange={handleTextfieldChange}/>
        {<p className={`exception ${showException ? "shown" : "hidden"}`}>{exception}</p>}
        <Button
          layout={"gradient"}
          className={"desktop-one-third"}
          disabled={!userData.currentPassword || userData.newPassword != userData.confirmNewPassword}
          onClick={uploadData}
        >
          <p>Submit</p>
        </Button>
      </div>
    </div>
  )
}