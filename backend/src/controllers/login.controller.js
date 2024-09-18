import { connect } from "../database";

// Verifica las credenciales del usuario
export const verificarCredenciales = async (req, res) => {
  const { usuario, contrasena } = req.body;

  try {
    const connection = await connect();
    const [rows] = await connection.query(
      'SELECT * FROM psicologos WHERE usuario = ? AND contrasena = ?',
      [usuario, contrasena]
    );

    if (rows.length > 0) {
      // Usuario encontrado
      res.status(200).json({ exists: true, user: rows[0] });
    } else {
      // Usuario no encontrado
      res.status(401).json({ exists: false });
    }
  } catch (error) {
    console.error('Error en la consulta:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};
