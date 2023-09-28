import React, { useState, useRef, createRef, } from 'react';
import { Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const gradientColors = ['#800080', '#B4C1FD', '#B0CDFB'];
  const gradient = `linear-gradient(to right, ${gradientColors.join(', ')})`;

  const [email, setEmail] = useState('');
  const [otpRequestStatus, setOTPRequestStatus] = useState(false);
  const [otp, setOTP] = useState(['', '', '', '', '', '']); // Separate input for each digit
  const [verificationStatus, setVerificationStatus] = useState('');
  const [emailError, setEmailError] = useState('');
  const [sessionId, setsessionId] = useState();

  const otpInputRefs = useRef(Array.from({ length: 6 }, () => createRef()));
  const navigate = useNavigate();

  // Function to send OTP to the user's email
  const sendOTP = () => {
    axios
      .post(`https://api.p360.build:9003/v1/user/authenticateUser/${email}`,)
      .then((response) => {
        console.log(response.data.otp);
        setOTPRequestStatus(true);
        setsessionId(response.data.sessionId);
        // Assuming the API response includes an 'otp' field
        const receivedOTP = response.data.otp;
        // Set the received OTP in the OTP state
        setOTP(receivedOTP.split(''));
        // Once OTP is sent, set OTP request status to true
      })
      .catch((error) => {
        console.error('Error sending OTP:', error);
        // Handle error, display an error message, etc.
      });
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    console.log(email);

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!email.match(emailRegex)) {
      setEmailError('Invalid email format');
      return;
    } else {
      // Call the sendOTP function to send OTP to the user's email
      sendOTP();
    }
  };

  const handleOTPSubmit = (e) => {
    e.preventDefault();

    const enteredOTP = otp.join('');

    // Simulate OTP verification (you can replace this with actual verification logic)
    // const isOTPValid = enteredOTP === '123456'; // Replace '123456' with your actual OTP

    // if (isOTPValid) {
    const reqbody = {
      session: sessionId,
      email: email,
      confirmationCode: enteredOTP,
    };
    axios
      .post(`https://api.p360.build:9003/v1/user/respondToAuthChallenge`, reqbody)
      .then((response) => {
        console.log(response.data);
        // Assuming the response indicates successful verification
        setVerificationStatus('OTP Verified. You can now proceed.');
        localStorage.setItem("accessToken", response.data.accessToken)
        navigate('/home');
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  };

  const handleOTPChange = (e, index) => {
    const updatedOTP = [...otp];
    updatedOTP[index] = e.target.value;
    setOTP(updatedOTP);
    // Handle backspace key press
    if (e.target.value === '' && index > 0) {
      otpInputRefs.current[index - 1].current.focus();
    } else if (index < otp.length - 1 && e.target.value !== '') {
      otpInputRefs.current[index + 1].current.focus();
    }


  };

  // const otpInputStyle = {
  //   width: '1rem',
  //   height: '1rem',
  //   padding: '0.6rem',
  //   fontSize: '1rem',
  //   border: '2px solid black',
  //   borderRadius: '0.25rem',
  //   textAlign: 'center',
  //   margin: '1rem 0.25rem',

  // };

  return (
    <div>
      <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
        <Grid item xs={12} sm={6}>
          <Box
            border="0px solid"
            height="97vh"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            position="relative"
            style={{ background: gradient }}
          >
            <Box
              width="10cm"
              height="10cm"
              bgcolor="rgba(255, 255, 255, 0.3)"
              justifyContent="center"
              alignItems="center"
              style={{ padding: '30px' }}
            >
              <p style={{ color: 'white', fontSize: '3rem', fontWeight: 'bold' }}>
                Digital platform for
              </p>
              <p style={{ color: 'black', fontSize: '2rem', fontWeight: 'bold' }}>
                FUNDS-FLOW.
              </p>
              <p style={{ color: 'white', fontSize: '0.87rem' }}>
                You will never know everything.
              </p>
              <p style={{ color: 'white', fontSize: '0.6rem' }}>
                But You will Know more.
              </p>
            </Box>
            {/* Box 1 */}
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box border="0px solid" height="97vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            {verificationStatus ? (
              <p style={{ color: 'green' }}>{verificationStatus}</p>
            ) : (
              <>
                <p style={{ color: 'black', fontSize: '2rem', fontWeight: 'bold' }}>
                  {otpRequestStatus ? 'Enter OTP' : 'Login'}
                </p>
                {otpRequestStatus ? (
                  <form onSubmit={handleOTPSubmit} style={{ width: '80%', textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      {otp.map((digit, index) => (
                        <input
                          type="text"
                          placeholder="0"
                          value={digit}
                          onChange={(e) => handleOTPChange(e, index)}
                          id={`otp-input-${index}`}
                          key={index}
                          maxLength="1"
                          style={{ width: "5%", textAlign: "center", margin: 5, borderRadius: "10px", borderColor: "black", height: "30px" }}
                          ref={otpInputRefs.current[index]} // Add this line to set the ref
                        />
                      ))}
                    </div>
                    <button
                      type="submit"
                      style={{ marginTop: '10px', borderRadius: "10px ", background: gradient, color: 'black', padding: '10px 20px', border: 'none', cursor: 'pointer' }}
                    >
                      Verify OTP
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleEmailSubmit} style={{ width: '80%', textAlign: 'center' }}>
                    <input
                      type="email"
                      placeholder="Your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{ width: '50%', padding: '10px', marginBottom: '10px' }}
                    />
                    <p style={{ color: 'red' }}>{emailError}</p>
                    <button
                      type="submit"
                      style={{ background: gradient, color: 'white', padding: '10px 20px', border: 'none', cursor: 'pointer' }}
                    >
                      Request OTP
                    </button>
                  </form>
                )}
                {/* {otpRequestStatus && (
                  <button
                    onClick={() => {
                      // Implement logic to resend OTP here
                      // For example, you can reset the OTP input boxes and resend OTP
                      setOTP(['', '', '', '', '', '']);
                      otpInputRefs.current[0].current.focus(); // Focus on the first OTP input
                    }}
                    style={{ marginTop: '-33px', marginLeft: '160px', color: 'black', padding: '10px 20px', border: 'none', cursor: 'pointer', background: 'none' }}
                  >
                    Resend OTP
                  </button>
                )} */}
              </>
            )}
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default Login;
