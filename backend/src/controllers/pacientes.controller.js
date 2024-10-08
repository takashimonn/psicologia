import { connect } from "../database";

//Muestra todos los campos dentro de pacientes
export const getPacientes = async (req, res) => {
  const { id_psicologo } = req.query; // Obtén el id_psicologo desde los parámetros de consulta

  const connection = await connect();

  // Verifica si se ha proporcionado el id_psicologo en la consulta
  if (id_psicologo) {
      const [rows] = await connection.query(
          "SELECT * FROM pacientes WHERE id_psicologo = ?", 
          [id_psicologo]
      );
      res.json(rows);
  } else {
      // Si no se proporciona id_psicologo, muestra todos los pacientes (o maneja el caso según tu necesidad)
      const [rows] = await connection.query("SELECT * FROM pacientes");
      res.json(rows);
  }
};

//Filtra pacientes por id
export const getPaciente = async (req, res) => {
  const connection = await connect();
  const [rows] = await connection.query("SELECT * FROM pacientes WHERE id_paciente = ?", [
    req.params.id_paciente,
  ]);
  res.json(rows[0]);
};

//Creacion de paciente
export const createPaciente = async (req, res) => {
  const connection = await connect();
  const [result] = await connection.query(
    "INSERT INTO pacientes (nombre, apellido, fecha_nacimiento, correo_electronico, telefono, direccion, id_psicologo, usuario, contrasena, tarifa, nombre_emergencia, contacto_emergencia , estado_civil, ocupacion, fecha_registro) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [
      req.body.nombre,
      req.body.apellido,
      req.body.fecha_nacimiento,
      req.body.correo_electronico,
      req.body.telefono,
      req.body.direccion,
      req.body.id_psicologo,
      req.body.usuario,
      req.body.contrasena,
      req.body.tarifa,
      req.body.nombre_emergencia,
      req.body.contacto_emergencia,
      req.body.estado_civil,
      req.body.ocupacion,
      req.body.fecha_registro,
    ]);
    res.json({
      id: result.insertId,
      ...req.body,
  });
}



//Eliminar paciente
export const deletePaciente = async (req, res) => {
  const connection = await connect();
  await connection.query("DELETE FROM pacientes WHERE id_paciente = ?",[
      req.params.id_paciente,
    ]);
  res.sendStatus(204);
}

//Actualizar paciente
export const putPaciente = async (req, res) => {
  const connection = await connect();
  await connection.query("UPDATE pacientes SET ? WHERE id_paciente = ?", 
    [
      req.body,
      req.params.id_paciente
    ]);
  const [rows] = await connection.query(
    "SELECT * FROM pacientes WHERE id_paciente = ?",
    [req.params.id_paciente]
);
    res.json(rows[0]);
  }