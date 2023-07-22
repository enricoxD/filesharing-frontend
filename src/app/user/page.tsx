"use client"

import {useCurrentUser} from "@/hooks/getCurrentUser";
import {RefObject, useEffect, useRef, useState} from "react";
import {UserSettings} from "@/components/user/UserSettings";
import {UserUploads} from "@/components/user/UserUploads";
import {Button} from "@/components/Button";
import {api} from "@/utils/api";
import {UploadListEntry} from "@/utils/baseTypes";

export default function User() {
  const user = useCurrentUser()
  const [currentTab, setCurrentTab] = useState(0)
  const [shownTab, setShownTab] = useState(0)
  const possibleTabs = ["Uploads", /*"Shared",*/ "Settings"]
  const wrapperRef: RefObject<HTMLDivElement> = useRef(null)
  const [sliderHeight, setSliderHeight] = useState(0)

  const [ownUploads, setOwnUploads] = useState<UploadListEntry[]>()
  const [sharedUploads, setSharedUploads] = useState<UploadListEntry[]>()

  const selectTab = (index: number) => {
    setCurrentTab(index)
    setTimeout(() => {
      setShownTab(index)
    }, 300)
  }

  const logout = () => {
    api.get('/auth/logout')
      .then((response) => {
        process.env.BASE_URL && window.location.replace(process.env.BASE_URL)
      })
  }

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const slides = wrapper?.getElementsByClassName("slide")

    if (slides != null) {
      const slideHeight = (slides[currentTab] as HTMLElement).offsetHeight;
      setSliderHeight(slideHeight)
    }
  }, [shownTab, user, ownUploads, sharedUploads]);

  useEffect(() => {
    if (!user) return
    api.post('/user/get-uploads', { id: user?.id })
      .then((response) => {
        setOwnUploads(response.data.data)
      })
  }, [user])

  return (
    <main className={"user-page container section"}>
      <section className={"user-information"}>
        <p className={"greeting"}>Hey, <span className={"username gradient-text"}>{user?.name}</span> <span
          className={"wave"}>&#128075;</span></p>
        <Button onClick={logout} layout={"filled"} className={"desktop-one-third"}>
          <p>Logout</p>
        </Button>
      </section>

      <section className={"body"}>
        <div className={"tab-selection"}>
          {
            possibleTabs.map((tab, index) => {
              return (
                <div
                  className={`tab ${currentTab == index ? "active" : ""}`}
                  key={`tab-${index}`}
                  onClick={() => selectTab(index)}
                >
                  <p>{tab}</p>
                </div>
              )
            })
          }
        </div>
        {user &&
            <div className="slider-wrapper" ref={wrapperRef} style={{height: sliderHeight}}>
                <div className={`slide ${currentTab == 0 ? "selected" : ""}`}>
                  {shownTab == 0 && ownUploads && <UserUploads uploads={ownUploads} type={"own"}/>}
                </div>
                {/*<div className={`slide ${currentTab == 1 ? "selected" : ""}`}>
                  {shownTab == 1 && <UserUploads user={user} type={"shared"}/>}
                </div>*/}
                <div className={`slide ${currentTab == 1 ? "selected" : ""}`}>
                  {shownTab == 1 && <UserSettings user={user}/>}
                </div>
            </div>
        }
      </section>
    </main>
  )
}
