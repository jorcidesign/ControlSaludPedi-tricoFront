import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

export const useLogout = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();

  const logout = () => {
    // Eliminar la cookie de sesión
    cookies.remove('user', { path: '/' });
    // Redirigir a la página de inicio de sesión
    navigate('/login');
  };

  return logout;
};
