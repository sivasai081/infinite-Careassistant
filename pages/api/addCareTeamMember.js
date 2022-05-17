import fetch from "isomorphic-unfetch";
import * as Constants from '../../constants/constant';


export default  async (req, res)  => {
    const { method } = req;
    switch (method) {
        case 'POST':            
            try {
                const result = await fetch(Constants.BaseURL + Constants.addCareTeamMember + "?email="+req.body.email+"&firstname="+req.body.firstname+"&lastname="+req.body.lastname+"&role="+req.body.role+"&role_type="+req.body.role_type,  {                
                    headers: {
                        "Authorization": Constants.Auth,
                        "Content-Type": "application/json"
                      },
                      method: 'POST',
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
          case 'PUT':            
            try {
                const result = await fetch(Constants.BaseURL + Constants.editCareTeamMember + "?email="+req.query.email + "&firstname=" + req.query.firstname + "&lastname=" + req.query.lastname+"&role="+req.query.role+"&role_type="+req.query.role_type + "&user_status=ACTIVE",  {                
                    headers: {
                        "Authorization": Constants.Auth,
                        "Content-Type": "application/json"
                      },
                      method: 'PUT',
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