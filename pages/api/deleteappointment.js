import fetch from "isomorphic-unfetch";
import * as Constants from '../../constants/constant';


export default async (req, res) => {
    const { method } = req;
    let param = req.query.id;
    let role = req.query.role;
    switch (method) {
        // case 'GET':
        //     try {
        //         const result = await fetch(Constants.BaseURL + Constants.deleteappointment + "?appointmnet_id=" + param, Constants.config);
        //         const json = await result.json();
        //         return res.json({ json })
        //     } catch (error) {
        //         console.log(error);
        //     }
        //     break
        case 'POST':
            try {
                const result = await fetch(Constants.BaseURL + Constants.deleteappointment + "?appointmnet_id=" + param+"&role=" + role, {
                    headers: {
                        "Authorization": Constants.Auth,
                        "Content-Type": "application/json"
                    },
                    method: 'POST',
                    // body: JSON.stringify(req.body.data)
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