import fetch from "isomorphic-unfetch";
import * as Constants from '../../constants/constant';


export default async (req, res) => {
    const { method } = req;
    let patient_id = req.query.patient_id;
    let p_type = req.query.p_type;
    let methodType = req.query.method;
    let outcome = req.query.outcome;
    let date_time = req.query.date_time;
    let attempt = req.query.attempt;
    let calCycle = req.query.calCycle;
    let reason = req.query.reason;
    switch (method) {
        case 'POST':
            try {
                const result = await fetch(Constants.BaseURL + Constants.insertAttemptDetails + "?patient_id=" + patient_id + "&p_type=" + p_type + "&method=" + methodType+"&outcome=" +outcome + "&date_time=" + date_time+ "&attempt=" +attempt+"&calCycle=" +calCycle +"&reason="+ reason, {
                    headers: {
                        "Authorization": Constants.Auth,
                        "Content-Type": "application/json"
                      },
                      method: 'POST',
                    //   body: JSON.stringify(req.body.groupData)
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
                res.setHeader('Allow', ['GET', 'POST', 'PUT','PATCH'])
                res.status(405).end(`Method ${method} Not Allowed`)
    }



}