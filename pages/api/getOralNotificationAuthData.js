import fetch from "isomorphic-unfetch";
import * as Constants from '../../constants/constant';


export default async (req, res) => {
    const { method } = req;
    let patient_type = req.query.patient_type;
    let assigned_to = req.query.assigned_to;
    // console.log(Constants.BaseURL + Constants.getAuthListByAssignedTo + "?patient_type=" + patient_type + "&assigned_to=" + assigned_to,"URL")
    switch (method) {
        case 'GET':
            try {
                const result = await fetch(Constants.BaseURL + Constants.getOralNotificationAuthData + "?patient_type=" + patient_type + "&assigned_to=" + assigned_to, Constants.config);
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