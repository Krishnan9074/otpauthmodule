"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';

const LoginForm = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [userOtp, setUserOtp] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [timer, setTimer] = useState(60); // Timer set to 60 seconds

    // Function to generate OTP
    const generateOTP = () => {
      const number = Math.floor(100000 + Math.random() * 900000);  // 6 digit random number
      setOtp(number);
    };

    // API call to send OTP
    const api = async () => {
      try {
        const response = await axios.post('/api/otp', {
          phoneNumber: phoneNumber, 
          otp: otp,
        });
        alert("OTP sent successfully");
        setIsOtpSent(true);
        setTimer(60); // Reset timer to 60 seconds
      } catch (error) {
        alert("Error during OTP verification");
      }
    };

    // Function to handle Send OTP button
    const handleLogin = () => {
      generateOTP();
    };

    // Function to handle mobile number input
    const handleUserPhoneNumber = (e) => {
      setPhoneNumber(e.target.value);
    };

    // Function to handle OTP input
    const handleUserOtp = (e) => {
      setUserOtp(e.target.value);
    };

    // Function to verify OTP
    const verifyOtp = () => {
      if (otp == userOtp) {
        alert("OTP Verified");
      } else {
        alert("OTP Not Verified");
      }
    };

    // useEffect to trigger the API call after OTP is generated
    useEffect(() => {
      if (otp) {
        api();
      }
    }, [otp]);

    // useEffect to handle timer countdown
    useEffect(() => {
      let interval;
      if (isOtpSent && timer > 0) {
        interval = setInterval(() => {
          setTimer(prevTimer => prevTimer - 1);
        }, 1000);
      } else if (timer === 0) {
        setIsOtpSent(false); // Disable OTP verification if time runs out
      }
      return () => clearInterval(interval);
    }, [isOtpSent, timer]);

    return (
      <div style={Styles.container}>
        <div>
          <h2 style={Styles.h1}>Login with Mobile Number</h2>
          <input
            style={Styles.input}
            type="tel"
            placeholder="Enter your mobile number"
            value={phoneNumber}
            onChange={handleUserPhoneNumber}
          />
          <button style={Styles.button} onClick={handleLogin}>
            Send OTP
          </button>
        </div>

        <div>
          <h2 style={Styles.h1}>Verify OTP</h2>
          <input
            style={Styles.input}
            type="tel"
            placeholder="Enter your OTP"
            value={userOtp}
            onChange={handleUserOtp}
            disabled={!isOtpSent} // Disable input if OTP is not sent
          />
          <button
            style={{ ...Styles.button, backgroundColor: isOtpSent ? '#007bff' : '#ccc', cursor: isOtpSent ? 'pointer' : 'not-allowed' }}
            onClick={verifyOtp}
            disabled={!isOtpSent} // Disable button if OTP is not sent or timer expired
          >
            Verify
          </button>
          {isOtpSent && <p style={Styles.timerText}>Time left to enter OTP: {timer}s</p>}
        </div>
      </div>
    );
};

// Improved CSS styles for a modern, light-themed look
const Styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
    width: '50%',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '12px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #ccc',
    outline: 'none',
    transition: 'border-color 0.2s ease-in-out',
  },
  button: {
    width: '100%',
    padding: '12px',
    margin: '10px 0',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease-in-out',
  },
  h1: {
    textAlign: 'center',
    marginBottom: '15px',
    fontSize: '22px',
    color: '#007bff',
  },
  timerText: {
    marginTop: '10px',
    color: '#ff0000',
  },
};

export default LoginForm;
