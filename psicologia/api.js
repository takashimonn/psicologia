const API_BASE = 'http://192.168.1.74:3000';

// Ajusta las rutas según la estructura de tu backend
export const getCitas = async () => {
    const res = await fetch(`${API_BASE}/citas`);
    return await res.json();
};


export const saveCita = async (newCita) => {
    const res = await fetch(`${API_BASE}/citas`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newCita),
    });
    return await res.json();
};

export const getPacientes = async () => {
    const res = await fetch(`${API_BASE}/pacientes`); // Ajusta la URL según tu backend
    return await res.json();
};
export const getPacientesBypsicologo = async () => {
    const res = await fetch(`${API_BASE}/pacientes/${id_psicologo}`); // Ajusta la URL según tu backend
    return await res.json();
};

// En api.js
export const getDiagnosticosByPaciente = async (idPaciente) => {
    try {
        const response = await fetch(`${API_BASE}/diagnosticos/${idPaciente}`);
        if (!response.ok) {
            const text = await response.text(); // Obtén el contenido como texto para depuración
            console.error(`Error en la respuesta del servidor: ${text}`);
            throw new Error(`Error en la respuesta del servidor: ${text}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error al cargar diagnósticos:', error);
        throw error;
    }
};

export const cancelCita = async (idCita) => {
    const res = await fetch(`${API_BASE}/citas/${idCita}`, {
        method: "PUT", // Usualmente se usa PUT para actualizar
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ estado: 'cancelada' }), // Cambiamos el estado a 'cancelada'
    });

    if (!res.ok) {
        const text = await res.text(); // Obtén el contenido como texto para depuración
        console.error(`Error en la respuesta del servidor: ${text}`);
        throw new Error(`Error al cancelar la cita: ${text}`);
    }

    return await res.json(); // Devuelve la cita actualizada
};

export const reagendarCita = async (idCita, nuevaFecha) => {
    const res = await fetch(`${API_BASE}/citas/${idCita}`, {
        method: "PUT", // Usualmente se usa PUT para actualizar
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ fecha_cita: nuevaFecha }), // Solo actualiza la fecha
    });

    if (!res.ok) {
        const text = await res.text(); // Obtén el contenido como texto para depuración
        console.error(`Error en la respuesta del servidor: ${text}`);
        throw new Error(`Error al reagendar la cita: ${text}`);
    }

    return await res.json(); // Devuelve la cita actualizada
};

export const login = async (usuario, contrasena, rol) => {
    try {
      const response = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usuario, contrasena, rol }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error en la autenticación.');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error de red:', error);
      throw error; // Lanza el error para manejarlo en la pantalla
    }
  };