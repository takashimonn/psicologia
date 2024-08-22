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

// Crea el controlador para agregar un psicólogo
export const CreatePsicologo = (req, res) => {
    const { nombre, apellido, especialidad, correo_electronico, telefono, usuario, contrasena } = req.body;

    // Valida que al menos uno de los campos obligatorios esté presente
    if (!nombre || !apellido || !especialidad || !correo_electronico || !telefono || !usuario || !contrasena) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    // Inserta el nuevo psicólogo en la base de datos
    const sql = 'INSERT INTO psicologos (nombre, apellido, especialidad, correo_electronico, telefono, usuario, contrasena) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [nombre, apellido, especialidad, correo_electronico, telefono, usuario, contrasena], (err, result) => {
        if (err) {
            console.error('Error al insertar el psicólogo en la base de datos:', err);
            return res.status(500).json({ message: 'Error al guardar el psicólogo en la base de datos' });
        }

        // Responde con un mensaje de éxito y el ID del nuevo psicólogo
        res.status(201).json({ message: 'Psicólogo creado exitosamente', psicologoId: result.insertId });
    });
};


export const DeletePsicologo = (req, res) => {
    res.send('ando bien abstracto alv')
}

export const PutPsicologo = (req, res) => {
    res.send('ando bien abstracto alv')
}