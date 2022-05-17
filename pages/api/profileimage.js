import fetch from "isomorphic-unfetch";
import * as Constants from '../../constants/constant';
import middleware from '../../middleware/middleware'
import nextConnect from 'next-connect';
import axios from 'axios';
import * as fs from 'fs';
import * as FormData from 'form-data';


export const config = {
    api: {
        bodyParser: false
    }
}

const handler = nextConnect()
handler.use(middleware)

handler.post(async (req, res) => {
    const { method } = req;
    let id = req.query.id;
    let member_type = req.query.member_type;
    const {file} = req.files;
    switch (method) {
        case 'GET':
            try {
                const result = await fetch(Constants.BaseURL + Constants.profileimage + "?id=" + id + "&member_type=" + member_type, Constants.config);
                return result;
            } catch (error) {
                console.log("error", error);
            }
            break
        case 'POST':
            try {
                
                let formData = new FormData();
                const fileStream = fs.createReadStream(file.filepath);
                formData.append('image_file', fileStream)
                formData.append('id', req.body.id)
                formData.append('member_type', req.body.member_type)
                const result = await fetch(Constants.BaseURL + Constants.uploadimagepath, {
                    headers: {
                        "Authorization": Constants.Auth,
                    },
                    method: 'POST',
                    body: formData
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
})



export default handler;
