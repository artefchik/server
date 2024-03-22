"use strict";
// import nodemailer, { Transporter } from 'nodemailer'
// import dotenv from 'dotenv'
// dotenv.config()
//
//
// const HOST = process.env.SMTP_HOST || ''
// const PORT = process.env.SMTP_HOST || ''
// const USER = process.env.SMTP_USER || ''
// const PASSWORD = process.env.SMTP_PASSWORD || ''
// const CLIENT_URL: string = process.env.CLIENT_URL ? process.env.CLIENT_URL : 'http://localhost:3000'
//
//
// class MailService {
//     private transporter: Transporter
//
//     constructor() {
//         this.transporter = nodemailer.createTransport({
//             // @ts-ignore
//             host:HOST,
//             port:PORT,
//             secure:true,
//             auth:{
//                 user:USER,
//                 pass:PASSWORD
//             }
//         })
//     }
//     async sendMail( to: string, link: string) {
//         await this.transporter.sendMail({
//             from: USER,
//             to: to,
//             subject: 'Активация аккаунта на сайте' + CLIENT_URL,
//             text: '',
//             html: `
//                <div>
//                     <h1>Активация аккаунта</h1>
//                     <p>перейдите по ссылке</p>
//                         <a href=${link}>${link}</a>
//                </div>
//             `
//         })
//     }
// }
// export default new MailService()
