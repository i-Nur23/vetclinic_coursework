import {Level} from "../../utils/Level";
import { AdminControls, RegisterControls, DoctorControls, ManagerControls } from "./RoleControls";


export const WorkerControls = (props : any) => {
  const level = props.role;

  const renderSwitch = () => {
    switch (level) {
      case Level.Admin:
        return <AdminControls/>
        break;
      case Level.Register:
        return <RegisterControls/>
        break;
      case Level.Doctor:
        return <DoctorControls/>
        break;
      case Level.Manager:
        return <ManagerControls/>
        break;
    }
  }

  return(
    <div
      className="flex"
      style={{width: '50%'}}
    >
      {renderSwitch()}
    </div>
  )
}