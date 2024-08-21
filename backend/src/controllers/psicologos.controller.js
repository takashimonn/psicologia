import { connect } from "../database"; 


export const GetPsicologos = async (req, res) => {
    const db = await connect()
    const [rows] = await db.query('SELECT * FROM psicologos');
    console.log(rows);
}

export const GetPsicologo = (req, res) => {
    res.send('ando bien abstracto alv')
}

export const CreatePsicologo = (req, res) => {
    res.send('ando bien abstracto alv')
}

export const DeletePsicologo = (req, res) => {
    res.send('ando bien abstracto alv')
}

export const PutPsicologo = (req, res) => {
    res.send('ando bien abstracto alv')
}