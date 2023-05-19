import {Dialog} from "@headlessui/react";
import React from "react";
import {PetAPI} from "../../api/PetAPI";

export const DeleteDialog = (props : any) => {
  const HandleDelete = async () => {
    PetAPI.deletePet(props.pet._id, props.pet.owner._id)
      .then( _ => props.close());
  }

  return(
    <div>
      <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
        <Dialog.Title
          as="h3"
          className="text-lg font-medium leading-6 text-gray-900 text-center"
        >
          Вы точно хотите удалить питомца из списка ?
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
            className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            onClick={() => HandleDelete()}
          >
            Удалить
          </button>
        </div>
      </Dialog.Panel>
    </div>
  )
}