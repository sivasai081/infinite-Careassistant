import fetch from "isomorphic-unfetch";
import * as Constants from '../../constants/constant';


export default async (req, res) => {
    const { method } = req;
    // let param = req.query.id;
    let appointment_id = req.query.appointment_id;
    let patient_id = req.query.patient_id;
    let title = req.query.title;
    let caremanager_id = req.query.caremanager_id;
    let startdate = req.query.start_date;
    let enddate = req.query.end_date;
    let color = req.query.color;
    let description = req.query.description;
    let appointment_type = req.query.appointment_type;
    switch (method) {
        case 'POST':
            try {
                const result = await fetch(Constants.BaseURL + Constants.editAppointment +"?appointment_id=" +appointment_id + "&patient_id=" + patient_id +  "&caremanager_id=" + caremanager_id + "&title=" + title+"&start_date=" +startdate + "&end_date=" + enddate+ "&color=" +color+"&description=" +description +"&appointment_type="+ appointment_type, {
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
                return res.status(404).json({
                    status: 404,
                    message: 'Not Found'
                })
            }
            break

        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'PATCH'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }



}