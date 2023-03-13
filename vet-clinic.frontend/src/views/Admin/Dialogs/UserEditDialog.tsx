import React, {FormEvent, Fragment, useEffect, useState} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {CustomListbox} from "../../../components/Listbox";
import {WorkerApi} from "../../../api/WorkerApi";

export const UserEditDialog = (props : any) => {

  const specs = [
    'Терапевт',
    'Лаборант',
    'Офтальмолог',
    'Стоматолог',
    'Дерматолог',
    'Грумер'
  ]

  const [message, setMessage] = useState< string >(' ')
  const [acc, setAcc] = useState(Object)
  const [name, setName] = useState< string >('')
  const [surName, setSurName] = useState< string >('')
  const [login, setLogin] = useState< string >('')
  const [password, setPassword] = useState< string >('')
  const [email, setEmail] = useState< string >('')
  const [phone, setPhone] = useState< string >('')
  const [spec, setSpec] = useState< string >(specs[0])
  const [image, setImage] = useState < null | File >(null)


  const HandleEditing = async () => {

    var isStop = false;

    var inputs = document.getElementsByClassName('required');
    Array.prototype.slice.call(inputs)
      .forEach((input) => {
          if (input.value === '') {
            (input as HTMLInputElement).setCustomValidity('Это обязательное поле')
            isStop = true
          }
        }
      );

    if (isStop){
      setMessage('Это поля обязательны к заполнению')
      return;
    }

    var response;

    var user = props.user;

    if (user.account.type != 'Врач'){
      response = await WorkerApi.ChangeWorkerInfo(acc._id, acc.userId, login, password, name, surName, email, phone, acc.type)
    } else if (image == null){
      response = await WorkerApi.ChangeDocInfo(acc._id, acc.userId, login, password, name, surName, email, phone, spec)
    } else {
      response = await WorkerApi.ChangeDocInfoAndPhoto(acc._id, acc.userId, login, password, name, surName, email, phone, spec, image)
    }
    if (!response.ok){
      setMessage(response.message);
    } else {
      props.close();
    }
  }

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

  useEffect(() => {
    var user = props.user;

    setName(user.info.name)
    setSurName(user.info.surName);
    setEmail(user.info.email);
    setPhone(user.info.phone);
    setLogin(user.account.login);
    setPassword(user.account.password);
    setAcc(user.account);

    if (user.account.type == 'Врач'){
      setSpec(user.info.spec);
    }

  }, [])

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
                    Редактирование информации
                  </Dialog.Title>
                  <form className="mt-2 flex flex-col gap-6 p-2 justify-between">
                      { acc.type  == 'Врач' ?
                        <div className='flex flex-col gap-6 justify-between'>
                          <div>
                            <p className='mx-3 mb-2'>Фото:</p>
                            <input
                              name='image'
                              type='file'
                              className='mx-2 focus:ring-0'
                              onChange={e => setImage(e.target.files ? e.target.files[0] : null)}/>
                          </div>
                          <div>
                            <CustomListbox value={spec} action={setSpec} list={specs}/>
                          </div>
                        </div>
                        :
                        null
                      }
                    <input
                      value={login}
                      className="form-input mx-2 border-b-2 border-0 focus:border-black focus:ring-0 invalid:border-red-700 required"
                      placeholder="Логин"
                      onChange={e => setValue(e, setLogin)}
                      onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Заполните это поле')}
                      onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
                    />
                    <input
                      value={password}
                      className="form-input mx-2 border-b-2 border-0 focus:border-black focus:ring-0 invalid:border-red-700 required"
                      placeholder="Пароль"
                      onChange={e => setValue(e, setPassword)}
                      onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Заполните это поле')}
                      onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
                    />
                    <input
                      value={name}
                      className="form-input mx-2 border-b-2 border-0 focus:border-black focus:ring-0 invalid:border-red-700 required"
                      placeholder="Имя"
                      onChange={e => setValue(e, setName)}
                      onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Заполните это поле')}
                      onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
                    />
                    <input
                      value={surName}
                      className="form-input mx-2 border-b-2 border-0 focus:border-black focus:ring-0 invalid:border-red-700 required"
                      placeholder="Фамилия"
                      onChange={e => setValue(e, setSurName)}
                      onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Заполните это поле')}
                      onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
                    />
                    <input
                      value={email}
                      className="form-input mx-2 border-b-2 border-0 focus:border-black focus:ring-0 invalid:border-red-700 required"
                      placeholder="Email"
                      onChange={e => setValue(e, setEmail)}
                      onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Заполните это поле')}
                      onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
                    />
                    <input
                      value={phone}
                      className="form-input mx-2 border-b-2 border-0 focus:border-black focus:ring-0 invalid:border-red-700 required"
                      placeholder="Телефон"
                      onChange={e => setValue(e, setPassword)}
                      onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Заполните это поле')}
                      onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
                    />
                  </form>
                  <div>
                    <p className="text-red-700 font-light text-center" style={{minHeight:'2em'}}>
                      {message}
                    </p>
                  </div>
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
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => HandleEditing()}
                    >
                      Сохранить
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