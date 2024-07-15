// src/hooks/useLogout.js
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { logout as logoutService } from '../services/api';

export const useLogout = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();

  const logout = async () => {
    try {
      const token = cookies.get('access_token');
      if (token) {
        await logoutService(token);
      }

      // Eliminar las cookies de sesión
      cookies.remove('access_token', { path: '/' });
      cookies.remove('user', { path: '/' });
      cookies.remove('perfiles', { path: '/' });
      cookies.remove('perfilActivo', { path: '/' });

      // Redirigir a la página de inicio de sesión
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return logout;
};
