require('dotenv').config();
const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");

const port = process.env.PORT || 3000;
const useremail = process.env.USER;
const password = process.env.PASSWORD;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);
app.listen(port, () => console.log("Server Running"));


// const express = require('express')
// const app = express()
// app.all('/', (req, res) => {
//     console.log("Just got a request!")
//     res.send('Yo!')
// })
// app.listen(process.env.PORT || 3000)

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
    auth: {
      user: useremail,
      pass: password
    }
  });

transporter.verify((error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  router.all("/", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const subject = req.body.subject;
    const message = req.body.message; 
    const mail = {
      from: email,
      to: useremail,
      subject: subject,
      html: `
      <div style="width: 100%; background-color: #f3f9ff; padding: 5rem 0">
      <div style="max-width: 700px; background-color: white;border: 2px solid #C4C4C4;border-radius:20px; margin: 0 auto">
      <div style="width: 100%; height: 100px; border-radius:20px 20px 0px 0px; justify-content: center;text-align: center;">
      <a href="http://www.r16services.com/" target="_blank"><img
          src="https://firebasestorage.googleapis.com/v0/b/root16-3979e.appspot.com/o/root_16-removebg-preview.png?alt=media&token=75e81206-ee9d-4fc1-b310-23e4abe162e5"
          style="width: 150px; height: 150px; "
        /></a>
      </div>
        <div style="width: 100%; gap: 10px; padding: 30px 0; display: grid">
          <p style="font-weight: 800; font-size: 1.2rem; padding: 0 30px">
            ROOT16 feedback Form
          </p>
          <div style="font-size: .8rem; margin: 0 30px">
            <p>Name: <b>${name}</b></p>
            <p>Email: <b>${email}</b></p>
            <p style="font-size: 20px;"><i>${message}</i></p>
          </div>
        </div>
      </div>
    </div>
`,
    };
    transporter.sendMail(mail, (error) => {
      if (error) {
        res.json({ status: "ERROR" });
      } else {
        res.json({ status: "Message Sent" });
      }
    });
  });


  router.all("/book", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const subject = req.body.subject;
    const ticketType = req.body.ticketType; 
        const mail = {
          from: email,
          to: useremail,
          subject: subject,
          html: `
          <div style="width: 100%; background-color: #f3f9ff; padding: 5rem 0">
          <div style="max-width: 700px; background-color: white;border: 2px solid #C4C4C4;border-radius:20px; margin: 0 auto">
          <div style="width: 100%; height: 100px; border-radius:20px 20px 0px 0px; justify-content: center;text-align: center;">
          <a href="http://www.r16services.com/" target="_blank"><img
              src="https://firebasestorage.googleapis.com/v0/b/root16-3979e.appspot.com/o/root_16-removebg-preview.png?alt=media&token=75e81206-ee9d-4fc1-b310-23e4abe162e5"
              style="width: 150px; height: 150px; "
            /></a>
          </div>
            <div style="width: 100%; gap: 10px; padding: 30px 0; display: grid">
              <p style="font-weight: 800; font-size: 1.2rem; padding: 0 30px">
                ROOT16 feedback Form
              </p>
              <div style="font-size: .8rem; margin: 0 30px">
                <p>Name: <b>${name}</b></p>
                <p>Email: <b>${email}</b></p>
                <p style="font-size: 20px;"><i>${ticketType}</i></p>
              </div>
            </div>
          </div>
        </div>
    `,
        };
      transporter.sendMail(mail, (error) => {
        if (error) {
          res.json({ status: "ERROR" });
        } else {
          res.json({ status: "Message Sent" });
        }
      });
    
    });
