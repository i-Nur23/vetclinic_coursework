import React, {FormEvent, useState, Fragment} from "react";
import {AccountApi} from "../../api/AccountApi";
import {Dialog, Transition} from '@headlessui/react'
import {CustomListbox} from "../../components/Listbox";
import {DoctorApi} from "../../api/DoctorApi";

export const AddUsers = () => {
  const roles = [
    'Врач',
    'Регистратор',
    'Менеджер'
  ]

  const specs = [
    'Терапевт',
    'Лаборант',
    'Офтальмолог',
    'Стоматолог',
    'Дерматолог',
    'Грумер'
  ]


  const [message, setMessage] = useState< string >(' ')
  const [login, setLogin] = useState< string >('')
  const [password, setPassword] = useState< string >('')
  const [name, setName] = useState< string >('')
  const [surName, setSurName] = useState< string >('')
  const [email, setEmail] = useState< string >('')
  const [phone, setPhone] = useState< string >('')
  const [role, setRole] = useState<string>(roles[0])
  const [spec, setSpec] = useState<string>(specs[0])
  const [image, setImage] = useState<File | null>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const setValue = (e : FormEvent, action : any) => {
    var inputs = document.getElementsByClassName('required');
    Array.prototype.slice.call(inputs)
      .forEach((input) => {
          (input as HTMLInputElement).setCustomValidity('')
        }
      );

    action((e.target as HTMLInputElement).value)
    setMessage(' ')
  }

  const Handle = async() => {
    var isStop = false;

    var inputs = document.getElementsByClassName('required');
    Array.prototype.slice.call(inputs)
      .forEach((input) => {
          if (input.value === ''){
            (input as HTMLInputElement).setCustomValidity('Это обязательное поле')
            isStop = true
          }
        }
      );

    if (isStop){
      setMessage('Это поля обязательны к заполнению')
      return;
    }

    var answer = await AccountApi.createAccount(login, password, name, surName, email, phone, role);
    if (answer.ok){
      if (role == 'Врач'){
          DoctorApi.SetDocInfo(answer.id, spec, image);
      }

      setIsOpen(true);

    } else {
      setMessage(answer.message)
    }
  }

  return(<div className='flex flex-col gap-6 p-2 justify-between w-1/3 h-3/5 top-1/2 m-auto shadow-zinc-600 rounded-lg'>
    <p className='text-center text-2xl'>Добавление пользователя</p>
      <form className="mt-2 flex flex-col gap-6 p-2 justify-between">
    <div className='z-10'>
      <CustomListbox value={role} action={setRole} list={roles}/>
    </div>
    {role == 'Врач' ?
      <div>
        <CustomListbox value={spec} action={setSpec} list={specs}/>
        <div>
          <p className='mx-4 mt-3 mb-2'>Фото:</p>
          <input
            name='image'
            type='file'
            className='mx-2 focus:ring-0'
            onChange={e => setImage(e.target.files ? e.target.files[0] : null)}/>
        </div>
      </div>
      :
      <div/>}
    <input
      value={name}
      className="form-input mx-2 border-b-2 border-0 focus:border-black focus:ring-0 invalid:border-red-700 required"
      placeholder="Имя"
      onChange={e => setValue(e, setName)}
      onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
    />
    <input
      value={surName}
      className="form-input mx-2 border-b-2 border-0 focus:border-black focus:ring-0 invalid:border-red-700 required"
      placeholder="Фамилия"
      onChange={e => setValue(e, setSurName)}
      onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
    />
    <input
      value={email}
      className="form-input mx-2 border-b-2 border-0 focus:border-black focus:ring-0 invalid:border-red-700 required"
      placeholder="Почта"
      onChange={e => setValue(e, setEmail)}
      onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
    />
    <input
      value={phone}
      className="form-input mx-2 border-b-2 border-0 focus:border-black focus:ring-0 invalid:border-red-700 required"
      placeholder="Телефон"
      onChange={e => setValue(e, setPhone)}
      onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
    />
    <input
      value={login}
      className="form-input mx-2 border-b-2 border-0 focus:border-black focus:ring-0 invalid:border-red-700 required"
      placeholder="Логин"
      onChange={e => setValue(e, setLogin)}
      onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
    />
    <input
      value={password}
      className="form-input mx-2 border-b-2 border-0 focus:border-black focus:ring-0 invalid:border-red-700 required"
      type="password"
      placeholder="Пароль"
      onChange={e => setValue(e, setPassword)}
      onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
    />
      </form>

    <button className="bg-gray-200 rounded-lg p-4" type='submit' onClick={() => Handle()}>
      Зарегестрировать
    </button>
    <div>
      <p className="text-red-700 font-light" style={{minHeight:'2em'}}>
        {message}
      </p>
    </div>

      <Transition.Root appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={async () => { setIsOpen(false) }}>
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
              ><Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 text-center"
                >
                  Добавление успешно
                </Dialog.Title>
                <div className='flex justify-center mt-3'>
                  <button
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Хорошо
                  </button>
                </div>
              </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
  </div>

  )
}