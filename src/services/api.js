const API_URL = "/api/Service.svc";

const iniciarSesion = async (email, contrasena) => {
  try {
    const response = await fetch(`${API_URL}/IniciarSesion`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, contrasena }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Something went wrong");
    }

    return await response.json();
  } catch (error) {
    console.error("Error iniciando sesión:", error.message);
    throw error;
  }
};

const registrarUsuario = async (usuario) => {
  try {
    const response = await fetch(`${API_URL}/RegistrarUsuario`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Something went wrong");
    }

    return await response.json();
  } catch (error) {
    console.error("Error registrando usuario:", error.message);
    throw error;
  }
};

const modificarDatosUsuario = async (usuario) => {
  try {
    const response = await fetch(`${API_URL}/ModificarDatosUsuario`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Something went wrong");
    }

    return await response.json();
  } catch (error) {
    console.error("Error modificando usuario:", error.message);
    throw error;
  }
};

const listarPacientesPorUsuario = async (usuarioId) => {
  try {
    const response = await fetch(`${API_URL}/ListarPacientesPorUsuario`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ UsuarioId: usuarioId }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Something went wrong");
    }

    return await response.json();
  } catch (error) {
    console.error("Error listando pacientes:", error.message);
    throw error;
  }
};

const agregarPerfilPaciente = async (usuarioId, perfilPaciente) => {
  try {
    const response = await fetch(`${API_URL}/AgregarPerfilPaciente`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        UsuarioId: usuarioId,
        PerfilPaciente: perfilPaciente,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Something went wrong");
    }

    return await response.json();
  } catch (error) {
    console.error("Error agregando perfil de paciente:", error.message);
    throw error;
  }
};

const modificarDatosPaciente = async (perfilPacienteId, perfilPaciente) => {
  try {
    const response = await fetch(`${API_URL}/ModificarDatosPaciente`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        perfilPacienteId,
        perfilPaciente,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Something went wrong");
    }

    return await response.json();
  } catch (error) {
    console.error("Error modificando datos del paciente:", error.message);
    throw error;
  }
};

const eliminarPerfilPaciente = async (perfilPacienteId) => {
  try {
    const response = await fetch(`${API_URL}/EliminarPerfilPaciente`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        perfilPacienteId,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Something went wrong");
    }

    return await response.json();
  } catch (error) {
    console.error("Error eliminando perfil de paciente:", error.message);
    throw error;
  }
};

const agregarRegistroMedico = async (perfilPacienteId, registroMedico) => {
    try {
      const response = await fetch(`${API_URL}/AgregarRegistroMedico`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          perfilPacienteId,
          registroMedico,
        }),
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Something went wrong");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error agregando registro médico:", error.message);
      throw error;
    }
  };
  
  const listarRegistroMedicoPorPerfilPaciente = async (perfilPacienteId) => {
    try {
      const response = await fetch(`${API_URL}/ListarRegistroMedicoPorPerfilPaciente`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ PerfilPacienteId: perfilPacienteId }),
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Something went wrong");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error listando registros médicos:", error.message);
      throw error;
    }
  };
  
  const eliminarRegistroMedico = async (registroMedicoId) => {
    try {
      const response = await fetch(`${API_URL}/EliminarRegistroMedico`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ registroMedicoId }),
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Something went wrong");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error eliminando registro médico:", error.message);
      throw error;
    }
  };
  
  const agregarVacuna = async (vacunaData) => {
    try {
      const response = await fetch(`${API_URL}/AgregarVacuna`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vacunaData),
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Something went wrong");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error agregando vacuna:", error.message);
      throw error;
    }
  };

  const obtenerVacunasPorPerfilPaciente = async (perfilPacienteId) => {
    try {
      const response = await fetch(`${API_URL}/ObtenerVacunasPorPerfilPaciente`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ PerfilPacienteId: perfilPacienteId }),
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Something went wrong");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error obteniendo vacunas por perfil paciente:", error.message);
      throw error;
    }
  };

  const eliminarEsquemaVacunacion = async (esquemaVacunacionId) => {
    try {
      const response = await fetch(`${API_URL}/EliminarEsquemaVacunacion`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ EsquemaVacunacionId: esquemaVacunacionId }),
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Something went wrong");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error eliminando esquema de vacunación:", error.message);
      throw error;
    }
  };

  const obtenerNotificacionesPorUsuario = async (usuarioId) => {
    try {
      const response = await fetch(`${API_URL}/ObtenerNotificacionesPorUsuario`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Something went wrong");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error obteniendo notificaciones por usuario:", error.message);
      throw error;
    }
  };
  
  const agregarNotificacion = async (notificacion) => {
    try {
      const response = await fetch(`${API_URL}/AgregarNotificacion`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(notificacion),
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Something went wrong");
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