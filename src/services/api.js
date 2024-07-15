// src/services/api.js
const API_URL = "/api";

const iniciarSesion = async (email, contrasena) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password: contrasena }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error al iniciar sesión");
    }

    const data = await response.json();
    const token = data.access_token;

    const profileResponse = await fetch(`${API_URL}/auth/profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!profileResponse.ok) {
      const error = await profileResponse.json();
      throw new Error(error.message || "Error al obtener el perfil");
    }

    const profileData = await profileResponse.json();

    return { token, profile: profileData };
  } catch (error) {
    console.error("Error iniciando sesión:", error.message);
    throw error;
  }
};

const logout = async (token) => {
  try {
    await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error('Error al cerrar sesión:', error.message);
  }
};

const registrarUsuario = async (usuario) => {
  try {
    const response = await fetch(`${API_URL}/usuarios/registrarUsuario`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error creando el usuario");
    }

    return await response.json();
  } catch (error) {
    console.error("Error registrando usuario:", error.message);
    throw error;
  }
};

const modificarDatosUsuario = async (usuario) => {
  try {
    const response = await fetch(`${API_URL}/usuarios/${usuario.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Algo salió mal");
    }

    return await response.json();
  } catch (error) {
    console.error("Error modificando usuario:", error.message);
    throw error;
  }
};

const listarPacientesPorUsuario = async (usuarioId) => {
  try {
    const response = await fetch(`${API_URL}/perfilPacientes?usuarioId=${usuarioId}`);
    if (!response.ok) {
      throw new Error("Error obteniendo los perfiles de los pacientes");
    }
    const perfiles = await response.json();
    return { Success: true, Perfiles: perfiles };
  } catch (error) {
    console.error("Error listando pacientes:", error.message);
    throw error;
  }
};

const agregarPerfilPaciente = async (perfilPaciente) => {
  try {
    const response = await fetch(`${API_URL}/perfilPacientes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(perfilPaciente),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Algo salió mal");
    }

    return await response.json();
  } catch (error) {
    console.error("Error agregando perfil de paciente:", error.message);
    throw error;
  }
};

const modificarDatosPaciente = async (perfilPacienteId, perfilPaciente) => {
  try {
    const response = await fetch(`${API_URL}/perfilPacientes/${perfilPacienteId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(perfilPaciente),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Algo salió mal");
    }

    return await response.json();
  } catch (error) {
    console.error("Error modificando datos del paciente:", error.message);
    throw error;
  }
};

const eliminarPerfilPaciente = async (perfilPacienteId) => {
  try {
    const response = await fetch(`${API_URL}/perfilPacientes/${perfilPacienteId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Algo salió mal");
    }

    return await response.json();
  } catch (error) {
    console.error("Error eliminando perfil de paciente:", error.message);
    throw error;
  }
};

const agregarRegistroMedico = async (registroMedico) => {
  try {
    const response = await fetch(`${API_URL}/registroMedicos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registroMedico),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Algo salió mal");
    }

    return await response.json();
  } catch (error) {
    console.error("Error agregando registro médico:", error.message);
    throw error;
  }
};

const listarRegistroMedicoPorPerfilPaciente = async (perfilPacienteId) => {
  try {
    const response = await fetch(`${API_URL}/registroMedicos?perfilPacienteId=${perfilPacienteId}`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Algo salió mal");
    }

    return await response.json();
  } catch (error) {
    console.error("Error listando registros médicos:", error.message);
    throw error;
  }
};

const eliminarRegistroMedico = async (registroMedicoId) => {
  try {
    const response = await fetch(`${API_URL}/registroMedicos/${registroMedicoId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Algo salió mal");
    }

    return await response.json();
  } catch (error) {
    console.error("Error eliminando registro médico:", error.message);
    throw error;
  }
};

const agregarVacuna = async (vacunaData) => {
  try {
    const response = await fetch(`${API_URL}/vacunas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vacunaData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Algo salió mal");
    }

    return await response.json();
  } catch (error) {
    console.error("Error agregando vacuna:", error.message);
    throw error;
  }
};

const obtenerVacunasPorPerfilPaciente = async (perfilPacienteId) => {
  try {
    const response = await fetch(`${API_URL}/esquemaVacunacion?perfilPacienteId=${perfilPacienteId}`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Algo salió mal");
    }

    return await response.json();
  } catch (error) {
    console.error("Error obteniendo vacunas por perfil paciente:", error.message);
    throw error;
  }
};

const eliminarEsquemaVacunacion = async (esquemaVacunacionId) => {
  try {
    const response = await fetch(`${API_URL}/esquemaVacunacion/${esquemaVacunacionId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Algo salió mal");
    }

    return await response.json();
  } catch (error) {
    console.error("Error eliminando esquema de vacunación:", error.message);
    throw error;
  }
};

const obtenerNotificacionesPorUsuario = async (usuarioId) => {
  try {
    const response = await fetch(`${API_URL}/notificaciones?usuarioId=${usuarioId}`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Algo salió mal");
    }

    return await response.json();
  } catch (error) {
    console.error("Error obteniendo notificaciones por usuario:", error.message);
    throw error;
  }
};

const agregarNotificacion = async (notificacion) => {
  try {
    const response = await fetch(`${API_URL}/notificaciones`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(notificacion),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Algo salió mal");
    }

    return await response.json();
  } catch (error) {
    console.error("Error agregando notificación:", error.message);
    throw error;
  }
};

export {
  iniciarSesion,
  registrarUsuario,
  logout,
  modificarDatosUsuario,
  listarPacientesPorUsuario,
  agregarPerfilPaciente,
  modificarDatosPaciente,
  eliminarPerfilPaciente,
  agregarRegistroMedico,
  listarRegistroMedicoPorPerfilPaciente,
  eliminarRegistroMedico,
  agregarVacuna,
  obtenerVacunasPorPerfilPaciente,
  eliminarEsquemaVacunacion,
  obtenerNotificacionesPorUsuario,
  agregarNotificacion
};
