import ejs from "ejs";
import mssql from "mssql";
import dotenv from "dotenv";

import { sqlConfig } from "../Config/Config";
dotenv.config();
interface Task {
  id: number;
  name: string;
  email: string;
  task:string
  issent: string;
}

import sendMail from "../Helpers/Email";
const SendEmails = async () => {
  const pool = await mssql.connect(sqlConfig);
  const tasks: Task[] = (
    await pool.request().query(`SELECT * FROM TaskTable WHERE issent='0'`)
  ).recordset;

for(let atask of tasks){
    ejs.renderFile('templates/registration.ejs',{name:atask.name,task:atask.task},async(error,data)=>{
        let mailOptions={
            from:process.env.EMAIL,
            to:atask.email,
            subject:'Group Judy Project',
            html:data,
            attachments:[
                {
                    filename:'task.txt',
                    content:`You have been assigned a task to : ${atask.task}`
                }
            ]
        }
        try {
            await sendMail(mailOptions)
            await pool.request().query(`UPDATE TaskTable SET issent='1' WHERE id=${atask.id}`)
            console.log('EMAIL SENT SUCCESSFULLY');
               
        } catch (error:any) {
            console.log(error);
            
            
        }
    } )
}

};

export default SendEmails
