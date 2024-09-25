import { connect } from "../database.js"; 


export const GetPsicologos = async (req, res) => {
    const connection = await connect();
    const [rows] = await connection.query('SELECT * FROM psicologos');
    res.json(rows);
}

export const GetPsicologo = async (req, res) => {
    const connection = await connect();
    const [rows] = await connection.query("SELECT * FROM psicologos WHERE id_psicologo = ?", [
        req.params.id_psicologo,
    ]);
    res.json(rows[0]);
}

export const CreatePsicologo = async(req, res) => {
    const connection = await connect();
    const [results]= await connection.query("INSERT INTO psicologos(nombre, apellido, especialidad, correo_electronico, telefono, usuario, contrasena) VALUES (?,?,?,?,?,?,?)", [
        req.body.nombre,
        req.body.apellido,
        req.body.especialidad,
        req.body.correo_electronico,
        req.body.telefono,
        req.body.usuario,
        req.body.contrasena,
    ]);
    res.json({
        id: results.insertId,
        ...req.body,
    });
}

export const DeletePsicologo = async(req, res) => {
    const connection = await connect();
    await connection.query("DELETE FROM psicologos WHERE id_psicologo = ?", [
        req.params.id_psicologo,
    ]);
    res.sendStatus(204);
}

export const PutPsicologo = async(req, res) => {
    const connection = await connect();
    await connection.query("UPDATE psicologos SET ? WHERE id_psicologo = ?", [
        req.body,
        req.params.id_psicologo,
    ]);
    const [rows] = await connection.query(
        "SELECT * FROM psicologos WHERE id_psicologo = ?",
        [req.params.id_psicologo]
    );
    res.json(rows[0]);
}