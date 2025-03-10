import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

// Initialize Twilio Client
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Function to send SMS
export const sendSMS = async (to, message) => {
  try {
    const response = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER, // Twilio number
      to: to, // Customer's phone number
    });

    console.log("SMS sent successfully:", response.sid);
  } catch (error) {
    console.error("Error sending SMS:", error);
  }
};


