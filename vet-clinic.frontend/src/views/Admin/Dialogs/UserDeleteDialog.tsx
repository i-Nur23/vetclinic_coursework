import React, {FormEvent, Fragment, useEffect, useState} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {CustomListbox} from "../../../components/Listbox";
import {WorkerApi} from "../../../api/WorkerApi";

export const UserDeleteDialog = (props : any) => {

  const [id, setId] = useState('')

  useEffect(() => {
      var account = props.user.account;
      setId(account._id)
    }, [])

  const HandleDeleting = async () => {

    await WorkerApi.Delete(id);

    props.close();
  }

  return(
    <Dialog as="div" className="relative z-50" onClose={props.close}>
      <Transition.Child
        as={Fragment}
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      >
      <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4 text-center">
      <Transition.Child
        as={Fragment}
      enter="ease-out duration-300"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
      ><div>
        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
      <Dialog.Title
        as="h3"
      className="text-lg font-medium leading-6 text-gray-900 text-center"
        >
        Уверены, что хотите удалить пользователя ?
      </Dialog.Title>
      <div className="flex justify-between gap-2 mt-4">
      <button
        type="button"
      className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-black hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      onClick={() => props.close()}
    >
      Отмена
      </button>
      <button
      type="submit"
      className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
      onClick={() => HandleDeleting()}
    >
      Удалить
      </button>
      </div>
      </Dialog.Panel>
      </div>
      </Transition.Child>
      </div>
      </div>
  </Dialog>
)
}