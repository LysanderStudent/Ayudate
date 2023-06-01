import React, { useState } from 'react'
import axios from 'axios';

import { urlAPI } from '../utils/urlAPI'
import { UserDummyJSON } from '../utils/interfaces';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const navigation = useNavigate();
  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const spanUsername = document.getElementById('error-username');
    const spanPassword = document.getElementById('error-password');
    const spinner = document.getElementById('spinner');

    if (spinner !== null)
      spinner.style.display = 'block';

    if (spanUsername !== null && spanPassword !== null) {
      spanUsername.style.display = 'none';
      spanPassword.style.display = 'none';
    }

    if (user.username !== '' && user.password !== '') {
      axios.post(`${urlAPI}/auth/login-dummy`, user)
        .then(response => {
          const responseData = response.data;
          const userAuth: UserDummyJSON = responseData.user;

          navigation('/productos', { state: { isAuth: true } });
        })
        .catch(errResponse => {
          const dataError = errResponse.response.data;

          if (!dataError.success)
            alert(dataError.message);
        });

    } else {
      // El campo del username esta vacio
      if (spanUsername !== null && user.username === '')
        spanUsername.style.display = 'block';

      // El campo del password esta vacio
      if (spanPassword !== null && user.password === '')
        spanPassword.style.display = 'block';
    }

    if (spinner !== null)
      spinner.style.display = 'none';
  };

  return (
    <div className="login-box border">

      <form onSubmit={handleSubmit}>

        <div className="user-box">
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
          <label>Username</label>
          <span id='error-username'><p>Ingresa tu nombre de usuario</p></span>
        </div>

        <div className="user-box">
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <label>Password</label>
          <span id='error-password'><p>Ingresa tu password</p></span>
        </div>

        <center>
          <input type="submit" value='LOG IN' id='btn-submit' />
        </center>

      </form>

      <div className='spinner d-flex justify-content-center mt-4'>
        <svg id="spinner" viewBox="25 25 50 50">
          <circle r="20" cy="50" cx="50"></circle>
        </svg>
      </div>
    </div>
  )
}
