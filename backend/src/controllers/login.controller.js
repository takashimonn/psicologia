import { connect } from "../database";

// Verifica las credenciales del usuario (psicólogo o paciente)
export const verificarCredenciales = async (req, res) => {
  const { usuario, contrasena, rol } = req.body;  // Añadimos el rol para diferenciar

  try {
    const connection = await connect();
    
    let query = '';
    let idField = '';  // Para almacenar el campo de ID correcto

    if (rol === 'psicologo') {
      // Si es un psicólogo
      query = 'SELECT * FROM psicologos WHERE usuario = ? AND contrasena = ?';
      idField = 'id_psicologo';  // Nombre del campo ID en la tabla psicologos
    } else if (rol === 'paciente') {
      // Si es un paciente
      query = 'SELECT * FROM pacientes WHERE usuario = ? AND contrasena = ?';
      idField = 'id_paciente';  // Nombre del campo ID en la tabla pacientes
    } else {
      // Si no se especifica el rol, retornamos un error
      return res.status(400).json({ error: 'Rol no válido' });
    }

    const [rows] = await connection.query(query, [usuario, contrasena]);

    if (rows.length > 0) {
      // Usuario encontrado
      const user = rows[0];
      res.status(200).json({ 
        exists: true, 
        rol, 
        user: {
          ...user,
          id: user[idField]  // Añadimos explícitamente el campo de ID correcto
        }
      });
    } else {
      // Usuario no encontrado
      res.status(401).json({ exists: false, message: 'Usuario o contraseña incorrectos' });
    }
  } catch (error) {
    console.error('Error en la consulta:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};
