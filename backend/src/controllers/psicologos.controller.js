import { connect } from "../database"; 


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

export const CreatePsicologo = async (req, res) => {
    console.log(req.body);
    const connection = await connect();
    const results = await connection.query("INSERT INTO psicologos(nombre) VALUES (?)", [
        req.body.nombre,
        // req.body.apellido,
        // req.body.especialidad,
        // req.body.correo_electronico,
        // req.body.telefono,
        // req.body.usuario,
        // req.body.contrasena
    ])
    console.log(req.body.nombre)
}

export const DeletePsicologo = (req, res) => {
    res.send('ando bien abstracto alv')
}

export const PutPsicologo = (req, res) => {
    res.send('ando bien abstracto alv')
}