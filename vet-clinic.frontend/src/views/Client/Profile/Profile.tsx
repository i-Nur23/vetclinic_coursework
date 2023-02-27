import {useSelector} from "react-redux";
import {RootState} from "../../../store/store";
import {useEffect, useState} from "react";

export const Profile = () => {
  const userId = useSelector((state : RootState) => state.id);

  const [name, setName] = useState< string >('')
  const [surName, setSurName] = useState< string >('')
  const [login, setLogin] = useState< string >('')
  const [password, setPassword] = useState< string >('')
  const [email, setEmail] = useState< string >('')


  useEffect(() => {
    (
      async () => {
        const response = await fetch('api/pilot/all', {
          headers: {'Content-Type': 'application/json'},
          credentials: 'include',
        });

        const content = await response.json();
      }
    )();
  },[]);

  return (<div>

  </div>)
}