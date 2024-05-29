import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

export const useLogout = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();

  const logout = () => {
    // Eliminar las cookies de sesión
    cookies.remove('user', { path: '/' });
    cookies.remove('perfiles', { path: '/' });
    cookies.remove('perfilActivo', { path: '/' });
    
    // Redirigir a la página de inicio de sesión
    navigate('/login');
  };

  return logout;
};