import {DefaultItem} from "../MenuItems";

export const ClientActions = () => {
  return(
    <div className="py-1">
      <DefaultItem href="#">
        Профиль
      </DefaultItem>
      <DefaultItem href="#">
        Мои записи
      </DefaultItem>
    </div>
)
}