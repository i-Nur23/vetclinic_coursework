import React, {useEffect, useState} from "react";
import dogWithVet from "../../assets/images/homepage/doghome.jpg"
import vets from "../../assets/images/homepage/veterinarians-holding-dog.jpg"
import {Link} from 'react-scroll';
import {SpecIcons} from "./SpecIcons";
import {ServiceApi} from "../../api/ServiceApi";

const Home = () => {

  const [types, setTypes] = useState([]);
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    (
     async () => {
        ServiceApi.getServiceTypes()
          .then(data => {
            setTypes(data)
            setLoaded(true);

          });

      }
    )()
  },[])

  return !loaded ? <center><h2>Загрузка...</h2></center> : (
    <div className="container px-9">
      <div className="container">
        <div>
          <div className="relative w-100" style={{marginTop:'-0.75rem'}}>
            <img className="m-auto" src={dogWithVet}/>
            <h2 className="text-center text-3xl absolute top-1/2" style={{width:"100%"}}>
              Добро пожаловать в ветеринарную клинику "Питомец"
            </h2>
            <Link to="intro" offset={-70} smooth={true} className="bg-transparent absolute bottom-0 left-1/2 m-auto">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" bg-transparent m-auto animate-bounce w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </Link>
          </div>
        </div>
        <div id="intro" className="mt-28 left-0">
          <p className="indent-4 text-4xl italic leading-normal">"Наша ветринарная клиника традиционно входит в число
            лучших клиник города и нам очень важно сохранять доверие клиентов, поэтому мы используем новейшие технологии,
            чтобы вы и ваши домашние животные оставались довольны"
          </p>
          <p className="text-right text-xl">
            - Иван Иванов, директор ветеринарной клиники "Питомец"
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-24">
          <div className="w-10/12">
            <img src={vets} style={{width:"100%"}}/>
          </div>
          <p className="indent-4 text-4xl leading-normal">
            В нащей клинике работают лучшие <a href='/doctors' className="text-gray-700 hover:text-black hover:underline">врачи</a> с
            многолетним опытом работы, которые с заботой отнесутся к вашим питомцам. Регулярно проводятся курсы повышения
            квалификации. Всё это делается для того, чтобы Вы остались довольный нашей клиникой
          </p>
        </div>
        <div className="mt-24">
          <p className="text-center text-3xl mb-10">Наши <a className="text-gray-700 hover:text-black hover:underline" href="/services">
            услуги
          </a></p>
          <div className="grid grid-cols-4 gap-4">
            {
              types.map( (_type : any) => {

                return (
                  <SpecIcons typeId={_type._id}>{_type.type}</SpecIcons>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;