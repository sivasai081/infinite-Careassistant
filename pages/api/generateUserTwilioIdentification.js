import fetch from "isomorphic-unfetch";
import * as Constants from '../../constants/constant';


export default  async (req, res)  => {
    const { method } = req;
    let param = req.query.id;
    switch (method) {
        case 'POST':            
            try {
                const result = await fetch(Constants.BaseURL + Constants.generateTwilioIdentification + "?identity="+req.body.identity,  {                
                    headers: {
                        "Authorization": Constants.Auth,
                        "Content-Type": "application/json"
                      },
                      method: 'POST',
                    //   body: JSON.stringify(req.body.details)
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