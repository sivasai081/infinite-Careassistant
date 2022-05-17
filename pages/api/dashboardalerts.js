import fetch from "isomorphic-unfetch";
import * as Constants from '../../constants/constant';


export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case 'POST':
      try {
        const result = await fetch(Constants.BaseURL + Constants.dashboardalerts, {
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