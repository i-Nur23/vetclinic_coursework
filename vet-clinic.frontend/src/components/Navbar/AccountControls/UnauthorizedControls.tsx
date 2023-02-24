import {Link, redirect} from "react-router-dom";
import React from "react";

export const UnauthorizedControls = () => {
  return(
    <div>
      <Link to="/auth" state={{login: true}}>
        <button className="rounded-lg bg-white p-2 mr-3">
          Войти
        </button>
      </Link>
      <Link to="/auth" state={{login: false}}>
        <button className="rounded-lg bg-blue-500 p-2" onClick={() => redirect('/auth')}>
          Зарегистрироваться
        </button>
      </Link>
    </div>
  )
}