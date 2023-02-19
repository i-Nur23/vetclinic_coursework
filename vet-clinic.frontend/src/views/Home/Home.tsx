import React from "react";
import dogWithVet from "../../assets/images/homepage/doghome.jpg"
import vets from "../../assets/images/homepage/veterinarians-holding-dog.jpg"
import {Link, animateScroll} from 'react-scroll';
import {SpecIcons} from "./SpecIcons";

const Home = () => {
  return(
    <div className="container px-9">
      <div className="container">
        <div>
          <div className="relative w-100" style={{marginTop:'-0.75rem'}}>
            <img src={dogWithVet}/>
            <h2 className="text-center text-3xl absolute top-1/2" style={{width:"100%"}}>
              Добро пожаловать в ветеринарную клинику "Питомец"
            </h2>
            <Link to="intro" smooth={true} className="bg-transparent absolute bottom-0 left-1/2 m-auto">
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
            В нащей клинике работают лучшие <a className="text-gray-700 hover:text-black hover:underline">врачи</a> с
            многолетним опытом работы, которые с заботой отнесутся к вашим питомцам. Регулярно проводятся курсы повышения
            квалификации. Всё это делается для того, чтобы Вы остались довольный нашей клиникой
          </p>
        </div>
        <div className="mt-24">
          <p className="text-center text-3xl mb-10">Наши <a className="text-gray-700 hover:text-black hover:underline">услуги</a></p>
          <div className="grid grid-cols-4 gap-4">
            <SpecIcons>Терапия</SpecIcons>
            <SpecIcons>Лабораторные исследования</SpecIcons>
            <SpecIcons>Прививки</SpecIcons>
            <SpecIcons>Офтальмология</SpecIcons>
            <SpecIcons>Стоматология</SpecIcons>
            <SpecIcons>Хирургия</SpecIcons>
            <SpecIcons>Акушерство</SpecIcons>
            <SpecIcons>Груминг</SpecIcons>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;