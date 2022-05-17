import fetch from "isomorphic-unfetch";
import * as Constants from '../../constants/constant';


export default async (req, res) => {

  const { method } = req;
  switch (method) {
   
    case 'POST':
      try {
        const result = await fetch(Constants.BaseURL + Constants.twiliochattoken +"?identity="+ req.body.identity, {
          headers: {
            "Authorization": Constants.Auth,
          },
          method: 'POST',
          body: req.body.identity
        });
        const json = await result.json();
        return res.json({ json })
      } catch (error) {

        console.log(error);
      }
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }



}