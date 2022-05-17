import fetch from "isomorphic-unfetch";
import * as Constants from '../../constants/constant';


export default async (req, res) => {

  const { method } = req;
  let patient_id = req.query.id;
  let Assessment_ID = req.query.assessment_id;
  switch (method) {
    case 'GET':
      try {
        const result = await fetch(Constants.BaseURL + Constants.assessmentEndpoint + "?assessment_id=" + Assessment_ID + "&patient_id=" + patient_id, Constants.config);
        const json = await result.json();
        return res.json({ json })
      } catch (error) {
        console.log(error);
      }
      break
    case 'PATCH':
      try {
        const result = await fetch(Constants.BaseURL + Constants.postassessment, {
          headers: {
            "Authorization": Constants.Auth,
            "Content-Type": "application/json"
          },
          method: 'PATCH',
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