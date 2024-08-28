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
    const [results]= await connection.query("INSERT INTO citas(id_psicologo, id_paciente, fecha_cita, hora_cita, tipo_cita, estado) VALUES (?,?,?,?,?,?)", [
        req.body.id_psicologo,
        req.body.id_paciente,
        req.body.fecha_cita,
        req.body.hora_cita,
        req.body.tipo_cita,
        req.body.estado,
    ]);
    res.json({
        id: results.insertId,
        ...req.body,
    });
}

export const DeleteCita = async(req, res) => {
    const connection = await connect();
    await connection.query("DELETE FROM citas WHERE id_cita = ?", [
        req.params.id_cita,
    ]);
    res.sendStatus(204);
}

export const PutCita = async(req, res) => {
    const connection = await connect();
    await connection.query("UPDATE citas SET ? WHERE id_cita = ?", [
        req.body,
        req.params.id_cita,
    ]);
    const [rows] = await connection.query(
        "SELECT * FROM citas WHERE id_cita = ?",
        [req.params.id_cita]
    );
    res.json(rows[0]);
}