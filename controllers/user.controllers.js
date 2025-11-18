const bcrypt = require("bcrypt");
const saltRounds = 10;
const nodemailer = require('nodemailer');
const userModel = require("../models/user.models")
const getDash = (req, res) => {
     res.render("dash")
}
const getNew=  (req, res) => {
      res.render("index")
}
const getSignin = (req, res) => {
     res.render("signup")
}

const postRegister =  (req, res) => {
     const { firstName, lastName, email, userPassword } = req.body;
     console.log(req.body);
     const strongPasswordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
     if (!strongPasswordRegex.test(userPassword)) {
          return res.status(400).send(
               "password must be at least 8 characters long, contain uppercase, lowercase, a number and a special character"
          );
     }



     User.findOne({ email })
          .then((existingUser) => {
               if (existingUser) {
                    res.status(400).send("Email already exists");
                    return Promise.reject("User already exists");
               }
               return bcrypt.hash(userPassword, saltRounds);
          })
          .then((hashedPassword) => {
               if (!hashedPassword) return;
               const newUser = new userModel({
                    firstName,
                    lastName,
                    email,
                    userPassword: hashedPassword
               });
               return newUser.save();
          })
          .then((savedUser) => {
               if (!savedUser) return;
               console.log("User registered successfully");
               // Node mailer logic can go here to send a welcome email
               let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                         user: 'qderonke@gmail.com',
                         pass: 'nyhlmvmpnhfxwqni'
                    }
               });
               // this is the information about the email you are sending
               let mailOptions = {
                    from: 'qderonke@gmail.com',
                    to: [req.body.email],
                    subject: 'Welcome to our application',
                    html: `
                              <div style="margin:0;padding:0;background-color:#f4f6f8;font-family:Arial,Helvetica,sans-serif;">
                                   <div style="max-width:600px;margin:40px auto;background-color:#ffffff;padding:30px;border-radius:8px;box-shadow:0 4px 10px rgba(0,0,0,0.1);text-align:center;">
                                        <h1 style="color:#4f46e5;margin-bottom:16px;">Welcome to Our routerlication</h1>
                                        <p style="font-size:16px;color:#111827;margin-bottom:12px;">
                                             <strong>Congratulations!</strong> Your sign-up was successful.
                                        </p>
                                        <p style="font-size:15px;color:#374151;margin-bottom:24px;">
                                             We’re excited to have you on board3. You can now log in and explore your dashboard.
                                        </p>
                                   </div>
                              </div>
     `
               };

               transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                         console.log(error);

                    } else {
                         console.log('Email sent:' + info.response);

                    }
               });
               res.status(201).json({success:true, message:'user registered successfully'});
          })
          .catch((err) => {
               if (err === "User already exists") return;
               console.log("error saving user:", err);
               res.status(500).send("Internal server error");
          });
}
const postLogin =  async (req, res) => {
     const { email, userPassword } = req.body;
     try {
          const user = await userModel.findOne({ email });
          if (!user) {
               return res.status(400).send("Invalid email or password");
          }

          const match = await bcrypt.compare(userPassword, user.userPassword);
          if (!match) {
               return res.status(400).send("Invalid email or password");
          }

          res.status(201).json({success:true,message:'user login successfully'});
     } catch (error) {
          console.error('Login error:', error);
          res.status(500).send("Error during login");
     }
}
const getDashboard = (req, res) => {
     res.render("dashboard")
}
module.exports = { getDash, getNew, getSignin, getDashboard,postRegister, postLogin }