import {UserType} from "@/utils/baseTypes";

export const UserUploads = ({user, type}: { user: UserType, type: 'own' | 'shared' }) => {
  return (
    <div className={"user-uploads"}>
      <p>Hi das sind user uploads of type {type}</p>
      <p>Hi das sind user uploads of type {type}</p>
      <p>Hi das sind user uploads of type {type}</p>
      <p>Hi das sind user uploads of type {type}</p>
      <p>Hi das sind user uploads of type {type}</p>
      <p>Hi das sind user uploads of type {type}</p>
      <p>Hi das sind user uploads of type {type}</p>
      <p>Hi das sind user uploads of type {type}</p>
      <p>Hi das sind user uploads of type {type}</p>
    </div>
  )
}