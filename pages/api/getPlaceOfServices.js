import fetch from "isomorphic-unfetch";
import * as Constants from '../../constants/constant';


export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case 'GET':
      try {
        const result = await fetch(Constants.BaseURL + Constants.getPlaceOfServices + "?patient_type=" + req.query.patient_type, Constants.config);
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