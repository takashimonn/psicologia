import { connect } from '../database';

export const GetDiagnosticos = async(req, res) => {
    const connection = await connect();
    const [rows] = await connection.query('SELECT * FROM diagnosticos');
    res.json(rows);
}

export const GetDiagnostico = async(req, res) => {
    const connection = await connect();
    const [rows] = await connection.query("SELECT * FROM diagnosticos WHERE id_diagnostico = ?", [
        req.params.id_diagnostico,
    ]);
    res.json(rows[0]);
}

export const CreateDiagnostico = async(req, res) => {
    const connection = await connect();
    const [results]= await connection.query("INSERT INTO diagnosticos(id_paciente, id_psicologo, fecha_diagnostico, diagnostico) VALUES (?,?,?,?)", [
        req.body.id_paciente,
        req.body.id_psicologo,
        req.body.fecha_diagnostico,
        req.body.diagnostico,
    ]);
    res.json({
        id: results.insertId,
        ...req.body,
    });
}

export const DeleteDiagnostico = async(req, res) => {
    const connection = await connect();
    await connection.query("DELETE FROM diagnosticos WHERE id_diagnostico = ?", [
        req.params.id_diagnostico,
    ]);
    res.sendStatus(204);
}

export const PutDiagnostico = async(req, res) => {
    const connection = await connect();
    await connection.query("UPDATE diagnosticos SET ? WHERE id_diagnostico = ?", [
        req.body,
        req.params.id_diagnostico,
    ]);
    const [rows] = await connection.query(
        "SELECT * FROM diagnosticos WHERE id_diagnostico = ?",
        [req.params.id_diagnostico]
    );
    res.json(rows[0]);
}


// Obtener los diagnósticos según el id del psicólogo
export const GetDiagnosticosByPsicologo = async (req, res) => {
    const connection = await connect();
    const [rows] = await connection.query("SELECT * FROM diagnosticos WHERE id_psicologo = ?", [
        req.params.id_psicologo,
    ]);
    res.json(rows);
};
