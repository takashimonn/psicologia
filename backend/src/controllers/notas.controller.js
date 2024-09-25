import { connect } from "../database.js";

export const GetNotas = async (req, res) => {
  const connection = await connect();
  const [rows] = await connection.query("SELECT * FROM notas");
  res.json(rows);
};

export const GetNota = async (req, res) => {
  const connection = await connect();
  const [rows] = await connection.query("SELECT * FROM notas WHERE id_nota = ?", [
    req.params.id_nota,
  ]);
  res.json(rows[0]);
};      

export const CreateNota = async (req, res) => {
  const connection = await connect();
  const [results] = await connection.query("INSERT INTO notas (propuesta_terap) VALUES (?)", [
    req.body.propuesta_terap
  ]);
  res.json({
    id: results.insertId,
    ...req.body,
  });
};  

export const DeleteNota = async (req, res) => { 
  const connection = await connect();
  await connection.query("DELETE FROM notas WHERE id_nota = ?", [
    req.params.id_nota,
  ]);
  res.sendStatus(204);
};

export const PutNota = async (req, res) => {
  const connection = await connect();
  await connection.query("UPDATE notas SET ? WHERE id_nota = ?", [
    req.body,
    req.params.id_nota,
  ]);
  const [rows] = await connection.query(
    "SELECT * FROM notas WHERE id_nota = ?",
    [req.params.id_nota]
  );
  res.json(rows[0]);
};