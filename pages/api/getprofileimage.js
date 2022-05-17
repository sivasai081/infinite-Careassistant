import fetch from "isomorphic-unfetch";
import * as Constants from '../../constants/constant';
import * as FileReader from  'filereader';
import axios from 'axios';

export default async (req, res) => {
  const { method } = req;
  let id = req.query.id;
  let member_type = req.query.member_type;
  switch (method) {
    case 'GET':
        try {
            await axios.get(Constants.BaseURL + Constants.profileimage + "?id=" + id + "&member_type=" + member_type,
            {
              auth:
              {
                "username": "apiuser",
                "password": "5f585e38c85b2aeb20af46741ca7e0244e95077c"
              }
              ,responseType: 'arraybuffer'
            }
          )
          .then(function (response) {
            res.send({ json: Buffer.from(response.data, 'binary').toString('base64') });
          })
          .catch(function (error) {
            res.send({ json: error.response.data });
          });
      } catch (error) {
            console.log("error", error);
        }
        break

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'PATCH'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }



}