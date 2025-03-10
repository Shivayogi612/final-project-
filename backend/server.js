import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import nodemailer from 'nodemailer' 
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

// App Config
const app = express()
const port = process.env.PORT || 7008
connectDB()
connectCloudinary()

// middleware   

app.use(express.json())
app.use(cors()) 

// api endpoints     
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)


app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  console.log("Received contact form data:", req.body); // Debugging

  // Ensure name is not undefined or empty
  const senderName = name ? name.trim() : "Anonymous";

  // Configure the email transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: `"${name}" <${process.env.EMAIL}>`, // Shows the user's name
    to: process.env.RECEIVER_EMAIL,
    subject: 'New Contact Form Message',
    text: `You have a new message from ${name} (${email}):\n\n${message}`,
    replyTo: email, // Allows you to reply directly to the user
  };
  
  

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ success: false, message: 'Failed to send email' });
  }
});


app.get('/', (req, res) => {
  res.status(200).send('Hello World!')
})


app.listen(port, () => {
  console.log(`listening on port ${port}`)
})