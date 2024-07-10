// src/utils/notificationHelpers.js

import { agregarNotificacion } from '../services/api';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const crearNotificacionVacunaRegistrada = async (descripcion) => {
  const usuario = cookies.get('user');
  if (usuario && usuario.id) {
    const notificacion = {
      UsuarioId: usuario.id,
      Descripcion: descripcion,
      FechaHora: `/Date(${new Date().getTime()})/`,
    };
    try {
      await agregarNotificacion(notificacion);
    } catch (error) {
      console.error('Error creando notificación de vacuna registrada:', error);
    }
  }
};

export const crearNotificacionAlertaIMC = async (descripcion) => {
  const usuario = cookies.get('user');
  if (usuario && usuario.id) {
    const notificacion = {
      UsuarioId: usuario.id,
      Descripcion: descripcion,
      FechaHora: `/Date(${new Date().getTime()})/`,
    };
    try {
      await agregarNotificacion(notificacion);
    } catch (error) {
      console.error('Error creando notificación de alerta IMC:', error);
    }
  }
};
