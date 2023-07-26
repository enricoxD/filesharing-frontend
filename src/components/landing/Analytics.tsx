"use client"
import {mdiAccountGroup, mdiDownload, mdiUpload} from "@mdi/js";
import Icon from "@mdi/react";
import {useEffect, useState} from "react";
import {api} from "@/utils/api";
import {PublicInformationType} from "@/utils/baseTypes";

interface AnalyticsEntryProps {
  title: string;
  icon: string;
  state: number;
}

const AnalyticsEntry = ({title, icon, state}: AnalyticsEntryProps) => {
  return (
    <div className={"analytics-entry"}>
      <Icon className={"icon"} path={icon} />
      <p className={"number"}>{state}</p>
      <p className={"name"}>{title}</p>
    </div>
  )
}

export const Analytics = () => {
  const [information, setInformation] = useState<PublicInformationType | null>(null)

  useEffect(() => {
    api.get("/analytics/public-information")
      .then((response) => {
        setInformation(response.data)
      })
  }, [])

  return (
    <section className={"analytics container section"}>
      <AnalyticsEntry title={"Uploads"} icon={mdiUpload} state={information?.uploads || 0}/>
      <AnalyticsEntry title={"Users"} icon={mdiAccountGroup} state={information?.users || 0}/>
      <AnalyticsEntry title={"Downloads"} icon={mdiDownload} state={information?.downloads || 0}/>
    </section>
  )
}