import {DefaultItem} from "../MenuItems";

export const AdminActions = () => {
  return(
    <div className="py-1">
      <DefaultItem href="#">
        Управление услугами
      </DefaultItem>
      <DefaultItem href="#">
        Расписание
      </DefaultItem>
      <DefaultItem href="#">
        Вакансии
      </DefaultItem>
      <DefaultItem href="#">
        Персонал
      </DefaultItem>
    </div>
  )
}