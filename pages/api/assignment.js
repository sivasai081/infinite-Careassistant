import fetch from "isomorphic-unfetch";
import * as Constants from '../../constants/constant';



export default async (req, res) => {
  const { method } = req;
    let caremanger_id = req.query.caremanger_id;
    let logged_user = req.query.logged_user;
    let source_caremanger_id = req.query.source_caremanger_id;
    let source_caremanger_name = req.query.source_caremanger_name;
    let destination_caremanger_id = req.query.destination_caremanger_id;
    let destination_caremanger_name = req.query.destination_caremanger_name;
  switch (method) {
    case 'GET':
      try {
        const result = await fetch(Constants.BaseURL + Constants.manualassignmenthistory + "?caremanger_id=" + caremanger_id, Constants.config);
        const json = await result.json();
        return res.json({ json })
      } catch (error) {
        console.log(error);
      }
      break
    case 'PUT':
      try {
        const result = await fetch(Constants.BaseURL + Constants.manualassignment + "?logged_user=" + logged_user + "&source_caremanger_id=" + source_caremanger_id  + "&source_caremanger_name="  + source_caremanger_name  + "&destination_caremanger_id=" + destination_caremanger_id + "&destination_caremanger_name=" + destination_caremanger_name, {
          headers: {
            "Authorization": Constants.Auth,
          },
          method: 'PUT',
          body: JSON.stringify(req.body)
        });
        const json = await result.json();
        return res.json({ json })
      } catch (error) {

        console.log(error);
      }
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'PATCH'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }



}