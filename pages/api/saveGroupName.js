import fetch from "isomorphic-unfetch";
import * as Constants from '../../constants/constant';


export default  async (req, res)  => {
    const { method } = req;
    let user_id = req.query.user_id;
    let group_name = req.query.group_name;
    let created_by_role = req.query.created_by_role;
    let unique_name = req.query.unique_name;
    switch (method) {
        case 'POST':            
            try {
                const result = await fetch(Constants.BaseURL + Constants.saveGroup + "?user_id="+user_id+ "&group_name="+group_name+ "&created_by_role="+created_by_role+"&unique_name="+unique_name,  {                
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
          res.setHeader('Allow', ['GET', 'POST', 'PUT','PATCH'])
          res.status(405).end(`Method ${method} Not Allowed`)
    }
      
   

  }