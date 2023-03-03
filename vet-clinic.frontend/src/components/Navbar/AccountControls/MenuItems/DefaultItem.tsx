import {Menu} from "@headlessui/react";
import {Link} from "react-router-dom";

export const DefaultItem = (props : {href : string, children : any}) => {

  function classNames(...classes : any) {
    return classes.filter(Boolean).join(' ')
  }

  return(<Menu.Item>
    {({ active }) => (
      <Link
        to={props.href}
        className={classNames(
          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
          'block px-4 py-2 text-sm'
        )}
      >
        {props.children}
      </Link>
    )}
  </Menu.Item>)
}