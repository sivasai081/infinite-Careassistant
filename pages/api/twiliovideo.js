import fetch from "isomorphic-unfetch";
import * as Constants from '../../constants/constant';


export default async (req, res) => {

  const { method } = req;
  switch (method) {
   
    case 'POST':
      try {
        const result = await fetch(Constants.BaseURL + Constants.twiliovideotoken+"?identity="+req.body.identity+"&room="+req.body.roomName, {
          headers: {
            "Authorization": Constants.Auth,
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
      res.setHeader('Allow', ['GET', 'PUT', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }



}