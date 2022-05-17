import fetch from "isomorphic-unfetch";
import * as Constants from '../../constants/constant';


export default async (req, res) => {
    const { method } = req;
    let authid = req.query.authid;
    switch (method) {
        case 'GET':
            try {
                const result = await fetch(Constants.BaseURL + "memberapi/getInPatientAuthNote?auth_id=" + authid, Constants.config);
                const json = await result.json();
                return res.json({ json })
            } catch (error) {
                console.log(error);
            }
            break

        case 'POST':
            try {
                const result = await fetch(Constants.BaseURL + "memberapi/insertInPatientNote?auth_id=" + authid, {
                    headers: {
                        "Authorization": Constants.Auth,
                        "Content-Type": "application/json"
                    },
                    method: 'POST',
                    body: JSON.stringify(req.body)
                });
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