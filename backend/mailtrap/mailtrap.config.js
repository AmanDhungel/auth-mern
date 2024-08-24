import  {MailtrapClient} from "mailtrap";
import dotenv from 'dotenv'
dotenv.config();

const TOKEN = process.env.MAIL_TOKEN;
const ENDPOINT = "https://send.api.mailtrap.io/";

export const mailTrapClient = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });

export const sender = {
  email: "mailtrap@demomailtrap.com",
  name: "Aman",
};

// const recipients = [
//   {
//     email: "aman.most100@gmail.com",
//   }
// ];

// client
//   .send({
//     from: sender,
//     to: recipients,
//     subject: "You are awesome!",
//     text: "Congrats for sending test email with Mailtrap!",
//     category: "Integration Test",
//   })
//   .then(console.log, console.error);