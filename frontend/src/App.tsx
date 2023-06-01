import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './styles/App.css';
import { Login } from './views/Login';
import { Productos } from './views/Productos';
import { Producto, UserDummyJSON } from './utils/interfaces';

function App() {
  const user: UserDummyJSON = {
    email: '',
    firstName: '',
    id: 0,
    image: '',
    lastName: '',
    password: '',
    username: '',
  };
  const isAuthenticated = false;

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={Login} />
          <Route path='/productos' element={<Productos isAuthenticated={isAuthenticated} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
