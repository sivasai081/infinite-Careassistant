import fetch from "isomorphic-unfetch";
import * as Constants from '../../constants/constant';


export default async (req, res) => {
    const { method } = req;
    let authid = req.query.authid;
    let note_id = req.query.note_id;
    switch (method) {
        case 'GET':
            try {
                const result = await fetch(Constants.BaseURL + "memberapi/getInPatientAuthNoteAddendum?auth_id=" + authid + "&note_id=" + note_id, Constants.config);
                const json = await result.json();
                return res.json({ json })
            } catch (error) {
                console.log(error);
            }
            break

        case 'POST':
            try {
                const result = await fetch(Constants.BaseURL + "memberapi/insertInPatientNoteAddednum?auth_id=" + authid + "&note_id=" + note_id, {
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