import React from 'react';
import ReactDOM from 'react-dom/client';
import ClientApp from './ClientApp';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import './index.css'
import Home from "./views/Home";
import {Provider} from "react-redux";
import {persistor, store} from './store/store';
import {PersistGate} from 'redux-persist/integration/react';
import {ProtectedRoutes} from "./utils/ProtectedRoutes";
import {Level} from "./utils/Level";
import {Profile} from './views/Client/Profile'
import WorkerApp from "./WorkerApp";
import {WorkerLogin} from "./views/Worker/WorkerLogin";
import {AddUsers, AdminCatalog, AdminHome, UsersList} from "./views/Admin";
import {ManagerHome, ScheduleBuilder, ServiceListControl} from "./views/Manager";
import {BookingToProcedure, ServicesList, TimeChoice} from "./views/Services";
import {AllDoctors, BookCurrentClient, DoctorAppointments, DoctorHome} from "./views/Doctor";
import {Appointments} from "./views/Client/Appointments";
import {AddNewClient, AddPet, ClientChoiceToBook, RegistratorHome, UpcomingBookings} from "./views/Registrator";
import {LoginForm} from "./views/Authentification/Forms/LoginForm";
import {RegistrateForm} from "./views/Authentification/Forms/RegistrateForm";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<ClientApp/>}>
        <Route index element={<Home/>}/>
        <Route path="auth/entry" element={<LoginForm/>}/>
        <Route path="auth/registration" element={<RegistrateForm/>}/>
          <Route element={<ProtectedRoutes role={Level.Client}/>}>
            <Route path='client'>
              <Route path='profile' element={<Profile/>}/>
              <Route path='bookings' element={<Appointments/>}/>
            </Route>
          </Route>
        <Route path="services">
          <Route index element={<ServicesList/>}/>
            <Route path='procedure/:combinedId' element={<BookingToProcedure/>} />
            <Route path=':combinedId' element={<TimeChoice/>} />
          </Route>
        <Route path="doctors" element={<AllDoctors/>}/>
      </Route>
      <Route path="workers" element={<WorkerApp/>}>
        <Route index element={<WorkerLogin/>}/>
        <Route element={<ProtectedRoutes role={Level.Admin}/>}>
          <Route path='admin'>
            <Route path='home' element={<AdminHome/>}/>
            <Route path='addusers' element={<AddUsers/>}/>
            <Route path='catalog' element={<AdminCatalog/>}/>
            <Route path='users' element={<UsersList/>}/>
          </Route>
        </Route>
        <Route element={<ProtectedRoutes role={Level.Manager}/>}>
          <Route path='manager'>
            <Route path='home' element={<ManagerHome/>}/>
            <Route path='schedule' element={<ScheduleBuilder/>}/>
            <Route path='services' element={<ServiceListControl/>}/>
          </Route>
        </Route>
        <Route element={<ProtectedRoutes role={Level.Register}/>}>
          <Route path='registrator'>
            <Route path='home' element={<RegistratorHome/>}/>
            <Route path='appointments' element={<UpcomingBookings/>}/>
            <Route path='new_client' element={<AddNewClient/>}/>
            <Route path='book'>
              <Route index element={<ClientChoiceToBook/>}/>
              <Route path='services'>
                <Route index element={<ServicesList/>}/>
                <Route path='procedure/:combinedId' element={<BookingToProcedure/>} />
                <Route path=':combinedId' element={<TimeChoice/>} />
              </Route>
            </Route>
            <Route path='add_pet' element={<AddPet/>}/>
          </Route>
        </Route>
        <Route element={<ProtectedRoutes role={Level.Doctor}/>}>
          <Route path='doctor'>
            <Route path='home' element={<DoctorHome/>}/>
            <Route path='appointments'>
              <Route index element={<DoctorAppointments/>}/>
              <Route path='new' element={<BookCurrentClient/>}/>
            </Route>
          </Route>
        </Route>
      </Route>
    </Route>

  ))

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
);


reportWebVitals();
