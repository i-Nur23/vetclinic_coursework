import {Menu} from "@headlessui/react";
import {unauthorize} from "../../../../store/slicers/authSlice";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../../store/store";

export const ExitItem = () => {
  const dispatch = useDispatch<AppDispatch>()

  function classNames(...classes : any) {
    return classes.filter(Boolean).join(' ')
  }


  return(<Menu.Item>
    {({ active }) => (
      <button
        type="submit"
        className={classNames(
          active ? 'bg-gray-100' : '',
          'text-red-700 block w-full px-4 py-2 text-left text-sm'
        )}
        onClick={() => dispatch(unauthorize())}
      >
        Выйти
      </button>
    )}
  </Menu.Item>)
}