import fetch from "isomorphic-unfetch";
import * as Constants from '../../constants/constant';


export default async (req, res) => {
    const { method } = req;
    let patient_type = req.query.patient_type;
    let status = req.query.status;
    let time_line = req.query.time_line;
    switch (method) {
        case 'GET':
            try {
                const result = await fetch(Constants.BaseURL + Constants.getReferalBasedOnStatus + "?patient_type=" + patient_type + "&status=" + status + "&time_line=" + time_line, Constants.config);
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