import { connect } from "../database";

// Obtener todas las citas
export const GetCitas = async (req, res) => {
    const connection = await connect();
    const [rows] = await connection.query('SELECT * FROM citas');
    res.json(rows);
};

// Obtener una cita por ID
export const GetCita = async (req, res) => {
    const connection = await connect();
    const [rows] = await connection.query("SELECT * FROM citas WHERE id_cita = ?", [
        req.params.id_cita,
    ]);
    res.json(rows[0]);
};

// Obtener las citas de un paciente específico
export const GetCitasPaciente = async (req, res) => {
    const connection = await connect();
    const [rows] = await connection.query("SELECT * FROM citas WHERE id_paciente = ?", [
        req.params.id_paciente,
    ]);
    res.json(rows);
};

// Crear una nueva cita
export const CreateCita = async (req, res) => {
    const connection = await connect();
    const [results] = await connection.query("INSERT INTO citas(id_psicologo, id_paciente, fecha_cita, hora_cita, tipo_cita, estado) VALUES (?,?,?,?,?,?)", [
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
};

// Eliminar una cita
export const DeleteCita = async (req, res) => {
    const connection = await connect();
    await connection.query("DELETE FROM citas WHERE id_cita = ?", [
        req.params.id_cita,
    ]);
    res.sendStatus(204);
};

// Actualizar una cita
export const PutCita = async (req, res) => {
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
};

// Confirmar cita (actualizar estado a 'confirmada')
export const ConfirmarCita = async (req, res) => {
    const connection = await connect();
    await connection.query("UPDATE citas SET estado = 'confirmada' WHERE id_cita = ?", [
        req.params.id_cita,
    ]);
    
    const [rows] = await connection.query("SELECT * FROM citas WHERE id_cita = ?", [
        req.params.id_cita,
    ]);
    
    if (rows.length > 0) {
        res.json({ message: 'Cita confirmada.', cita: rows[0] });
    } else {
        res.status(404).json({ message: 'Cita no encontrada.' });
    }
};
