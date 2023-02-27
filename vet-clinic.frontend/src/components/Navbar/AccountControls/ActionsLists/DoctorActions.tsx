import {DefaultItem} from "../MenuItems";

export const DoctorActions = () => {
  return(
    <div className="py-1">
      <DefaultItem href="#">
        Профиль
      </DefaultItem>
      <DefaultItem href="#">
        Расписание
      </DefaultItem>
    </div>
  )
}