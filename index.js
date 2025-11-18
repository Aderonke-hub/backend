const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const ejs = require('ejs')
const dotenv = require('dotenv')
dotenv.config()
// const URI = 'mongodb+srv://deronkeUser:mujiba27@cluster0.epwqlyz.mongodb.net/classwork_db?appName=Cluster0'

const URI = process.env.URI

const mongoose = require('mongoose')
const User = require("./models/user.models")
const userRoute = require('./routes/user.routes')


// app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }))
mongoose.connect(process.env.URI)
     .then(() => {
          console.log("Mongo db Connected Sucessfully");

     })
     .catch((err) => {
          console.log("Error connecting to database", err);

     })

app.use('/user', userRoute)
const cors =require("cors")
app.use(cors({
     origin:'http://localhost:5173',
     methods:['GET', 'POST','PUT', 'DELETE','PATCH'],
     credentials: true
}));
// app.post('/reg', (req, res) => {
//      const { firstName, lastName, email, userPassword } = req.body;
//      console.log(req.body);
//      const strongPasswordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//      if (!strongPasswordRegex.test(userPassword)) {
//           return res.status(400).send(
//                "password must be at least 8 characters long, contain uppercase, lowercase, a number and a special character"
//           );
//      }



//      userModel.findOne({ email })
//           .then((existingUser) => {
//                if (existingUser) {
//                     res.status(400).send("Email already exists");
//                     return Promise.reject("User already exists");
//                }
//                return bcrypt.hash(userPassword, saltRounds);
//           })
//           .then((hashedPassword) => {
//                if (!hashedPassword) return;
//                const newUser = new userModel({
//                     firstName,
//                     lastName,
//                     email,
//                     userPassword: hashedPassword
//                });
//                return newUser.save();
//           })
//           .then((savedUser) => {
//                if (!savedUser) return;
//                console.log("User registered successfully");
//                // Node mailer logic can go here to send a welcome email
//                let transporter = nodemailer.createTransport({
//                     service: 'gmail',
//                     auth: {
//                          user: 'qderonke@gmail.com',
//                          pass: 'nyhlmvmpnhfxwqni'
//                     }
//                });
//                // this is the information about the email you are sending
//                let mailOptions = {
//                     from: 'qderonke@gmail.com',
//                     to: [req.body.email],
//                     subject: 'Welcome to our application',
//                     html: `
//                               <div style="margin:0;padding:0;background-color:#f4f6f8;font-family:Arial,Helvetica,sans-serif;">
//                                    <div style="max-width:600px;margin:40px auto;background-color:#ffffff;padding:30px;border-radius:8px;box-shadow:0 4px 10px rgba(0,0,0,0.1);text-align:center;">
//                                         <h1 style="color:#4f46e5;margin-bottom:16px;">Welcome to Our Application</h1>
//                                         <p style="font-size:16px;color:#111827;margin-bottom:12px;">
//                                              <strong>Congratulations!</strong> Your sign-up was successful.
//                                         </p>
//                                         <p style="font-size:15px;color:#374151;margin-bottom:24px;">
//                                              We’re excited to have you on board. You can now log in and explore your dashboard.
//                                         </p>
//                                    </div>
//                               </div>
//      `
//                };

//                transporter.sendMail(mailOptions, function (error, info) {
//                     if (error) {
//                          console.log(error);

//                     } else {
//                          console.log('Email sent:' + info.response);

//                     }
//                });
//                res.redirect("/signin");
//           })
//           .catch((err) => {
//                if (err === "User already exists") return;
//                console.log("error saving user:", err);
//                res.status(500).send("Internal server error");
//           });
// })

// app.post('/login', async (req, res) => {
//      const { email, userPassword } = req.body;
//      try {
//           const user = await userModel.findOne({ email });
//           if (!user) {
//                return res.status(400).send("Invalid email or password");
//           }

//           const match = await bcrypt.compare(userPassword, user.userPassword);
//           if (!match) {
//                return res.status(400).send("Invalid email or password");
//           }

//           res.redirect('/dashboard');
//      } catch (error) {
//           console.error('Login error:', error);
//           res.status(500).send("Error during login");
//      }
// });
// app.get('/', (req, res) => {
//      res.render("index")
// })


// app.get('/signup', (req, res) => {
//      res.render("index")
// })

// app.get('/signin', (req, res) => {
//      res.render("signup")
// })

// app.get('/dashboard', (req, res) => {
//      res.render("dashboard")
// })
//  let allStudents =[
//     { id:"1", name:"john",Age:20},
//     { id:"2", name:"Felix",Age:24},
//     { id:"3", name:"d0e",Age:65},
//  ]
//  app.get("/", (req, res)=>{
//     res.send(allStudents)
//  })
//  app.get("/",(req, res)=>{
//     res.send("Morning")
//  })
// app.get("/good", (req, res) => {
//      res.sendFile(__dirname + "/index.html")
// })

//  app.listen(portnumber,callback function)
app.listen(port, (err) => {
     // console.log("App is running on port 3000");
     if (err) {
          console.log("Error occurrred while starting the server", err);

     } else {
          console.log("App is running on port 3000");

     }
})
