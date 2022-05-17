import fetch from "isomorphic-unfetch";
import * as Constants from '../../constants/constant';


export default async (req, res) => {
  const { method } = req;
  let param = req.query.id;
  switch (method) {
    case 'GET':
      try {
        const result = await fetch(Constants.BaseURL + Constants.listCareTeamDetails, Constants.config);
        const json = await result.json();
        return res.json({ json })
      } catch (error) {
        console.log(error);
      }
      break
      case 'POST':
            try {
                const result = await fetch(Constants.BaseURL + Constants.saveCareTeamDetails + "?patientid=" + param, {
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
                return res.status(404).json({
                    status: 404,
                    message: 'Not Found'
                })
            }
            break
    
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'PATCH'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }



}