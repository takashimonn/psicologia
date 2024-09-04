import {connect} from '../database';

export const GetDiagnosticos = async(req, res) => {
    const connection = await connect();
    const [rows] = await connection.query('SELECT * FROM diagnosticos');
    res.json(rows);
}