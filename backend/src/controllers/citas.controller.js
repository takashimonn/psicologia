import { connect } from "../database";

export const GetCitas = async(req, res) => {
    const connection = await connect();
    const [rows] = await connection.query('SELECT * FROM citas');
    res.json(rows);
}

export const GetCita = async(req, res) => {
    const connection = await connect();
    const [rows] = await connection.query("SELECT * FROM citas WHERE id_cita = ?", [
        req.params.id_cita,
    ]);
    res.json(rows[0]);
}

export const CreateCita = async(req, res) => {
    const connection = await connect();
    const [results]= await connection.query("INSERT INTO citas(nombre, apellido, especialidad, correo_electronico, telefono, usuario, contrasena) VALUES (?,?,?,?,?,?,?)", [
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