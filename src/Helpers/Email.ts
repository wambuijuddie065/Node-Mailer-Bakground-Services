import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()
function createTransporter (config:any) {
    const transporter=nodemailer.createTransport(config)
    return transporter
}

let configuration={
    service: 'gmail',
    host: 'smtp.gmail.com',
    port:587,
    requireTLS:true,
    auth: {
      user:process.env.EMAIL as string,
      pass:process.env.PASSWORD as string
    }
}

const sendMail=async (mailOptions:any)=>{
    const transporter=await  createTransporter(configuration)
    await transporter.verify
    await transporter.sendMail(mailOptions,(error,info)=>{
        if (error) {
            console.log(error);
            
            
        } else {
            console.log(info.response);
            
            
        }
    })

}
export default sendMail;