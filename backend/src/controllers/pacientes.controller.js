import { connect } from "../database";

//Muestra todos los campos dentro de pacientes
export const getPacientes = async (req, res) => {
  const connection = await connect();
  const [rows] = await connection.query("SELECT * FROM pacientes");
  res.json(rows);
};

//Filtra pacientes por id
export const getPaciente = async (req, res) => {
  const connection = await connect();
  const [rows] = await connection.query("SELECT * WHERE ID = ?", [
    req.params.id,
  ]);
  res.json(rows[0]);
};

//Creacion de paciente
export const createPaciente = async (req, res) => {
  const connection = await connect();
  const [rows] = await connection.query(
    "INSERT INTO `pacientes` (`id_paciente`, `nombre`, `apellido`, `fecha_nacimiento`, `correo_electronico`, `telefono`, `direccion`, `id_psicologo`, `usuario`, `contrasena`, `tarifa`, `nombre_emergencia`, `contacto_emergencia`, `estado_civil`, `ocupacion`, `fecha_registro`) VALUES (8, 'Mariana', 'Morales', '2004-08-28', 'mariana@example.com', '6188155703', 'en su casa', '1', 'user 8', 'contraseniajaja', '250', 'Lili', '6187189954', 'Soltera', 'Estudiante', '2024-01-03');"
  );
  res.json(rows);
};

//Eliminar paciente
export const deletePaciente = async (req, res) => {
  const connection = await connect();
  const [rows] = await connection.query(
    "DELETE FROM pacientes WHERE id_paciente = ?",
    [req.params.id]
  );
  res.json(rows);
};

//Actualizar paciente
export const putPaciente = async (req, res) => {
  const connection = await connect();
  const [rows] = await connection.query("");
  res.json(rows);
};
