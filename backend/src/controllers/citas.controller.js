import { connect } from "../database";

// Obtener todas las citas
export const GetCitas = async (req, res) => {
    try {
        const connection = await connect();
        const [rows] = await connection.query('SELECT * FROM citas');
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener citas:', error);
        res.status(500).json({ message: 'Error al obtener las citas.' });
    }
};

// Obtener una cita por ID
export const GetCita = async (req, res) => {
    try {
        const connection = await connect();
        const [rows] = await connection.query("SELECT * FROM citas WHERE id_cita = ?", [
            req.params.id_cita,
        ]);
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ message: 'Cita no encontrada.' });
        }
    } catch (error) {
        console.error('Error al obtener la cita:', error);
        res.status(500).json({ message: 'Error al obtener la cita.' });
    }
};

// Obtener las citas de un paciente específico
export const GetCitasPaciente = async (req, res) => {
    try {
        const connection = await connect();
        const [rows] = await connection.query("SELECT * FROM citas WHERE id_paciente = ?", [
            req.params.id_paciente,
        ]);
        if (rows.length > 0) {
            res.json(rows);
        } else {
            res.status(404).json({ message: 'No se encontraron citas para el paciente.' });
        }
    } catch (error) {
        console.error('Error al obtener citas del paciente:', error);
        res.status(500).json({ message: 'Error al obtener las citas del paciente.' });
    }
};

// Crear una nueva cita
export const CreateCita = async (req, res) => {
    try {
        const connection = await connect();
        const [results] = await connection.query(
            "INSERT INTO citas(id_psicologo, id_paciente, fecha_cita, hora_cita, tipo_cita, estado) VALUES (?,?,?,?,?,?)", [
                req.body.id_psicologo,
                req.body.id_paciente,
                req.body.fecha_cita,
                req.body.hora_cita,
                req.body.tipo_cita,
                req.body.estado,
            ]
        );
        res.status(201).json({
            id: results.insertId,
            ...req.body,
        });
    } catch (error) {
        console.error('Error al crear la cita:', error);
        res.status(500).json({ message: 'Error al crear la cita.' });
    }
};

// Eliminar una cita
export const DeleteCita = async (req, res) => {
    try {
        const connection = await connect();
        const [result] = await connection.query("DELETE FROM citas WHERE id_cita = ?", [
            req.params.id_cita,
        ]);
        if (result.affectedRows > 0) {
            res.sendStatus(204);
        } else {
            res.status(404).json({ message: 'Cita no encontrada.' });
        }
    } catch (error) {
        console.error('Error al eliminar la cita:', error);
        res.status(500).json({ message: 'Error al eliminar la cita.' });
    }
};

// Actualizar una cita
export const PutCita = async (req, res) => {
    try {
        const connection = await connect();
        await connection.query("UPDATE citas SET ? WHERE id_cita = ?", [
            req.body,
            req.params.id_cita,
        ]);
        const [rows] = await connection.query(
            "SELECT * FROM citas WHERE id_cita = ?",
            [req.params.id_cita]
        );
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ message: 'Cita no encontrada.' });
        }
    } catch (error) {
        console.error('Error al actualizar la cita:', error);
        res.status(500).json({ message: 'Error al actualizar la cita.' });
    }
};

// Confirmar cita (actualizar estado a 'confirmada')
export const ConfirmarCita = async (req, res) => {
    try {
        const connection = await connect();
        const [result] = await connection.query("UPDATE citas SET estado = 'confirmada' WHERE id_cita = ?", [
            req.params.id_cita,
        ]);
        if (result.affectedRows > 0) {
            const [rows] = await connection.query("SELECT * FROM citas WHERE id_cita = ?", [
                req.params.id_cita,
            ]);
            res.json({ message: 'Cita confirmada.', cita: rows[0] });
        } else {
            res.status(404).json({ message: 'Cita no encontrada.' });
        }
    } catch (error) {
        console.error('Error al confirmar la cita:', error);
        res.status(500).json({ message: 'Error al confirmar la cita.' });
    }
};
