import fetch from "isomorphic-unfetch";
import * as Constants from '../../constants/constant';


export default async (req, res) => {
    const { method } = req;
    let patient_type = req.query.patient_type;
    let auth_id = req.query.auth_id;
    switch (method) {
        case 'GET':
            try {
                const result = await fetch(Constants.BaseURL + Constants.getAuthById + "?patient_type=" + patient_type + "&auth_id=" + auth_id, Constants.config);
                const json = await result.json();
                return res.json({ json })
            } catch (error) {
                console.log(error);
            }
            break
        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'PATCH'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }



}