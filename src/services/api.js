const API_URL = '/api/Service.svc';

const iniciarSesion = async (email, contrasena) => {
  try {
    const response = await fetch(`${API_URL}/IniciarSesion`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, contrasena })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Something went wrong');
    }

    return await response.json();
  } catch (error) {
    console.error('Error iniciando sesión:', error.message);
    throw error;
  }
};

const registrarUsuario = async (usuario) => {
  try {
    const response = await fetch(`${API_URL}/RegistrarUsuario`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(usuario)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Something went wrong');
    }

    return await response.json();
  } catch (error) {
    console.error('Error registrando usuario:', error.message);
    throw error;
  }
};

const modificarDatosUsuario = async (usuario) => {
    try {
      const response = await fetch(`${API_URL}/ModificarDatosUsuario`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario)
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Something went wrong');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error modificando usuario:', error.message);
      throw error;
    }
  };
  
  export { iniciarSesion, registrarUsuario, modificarDatosUsuario };