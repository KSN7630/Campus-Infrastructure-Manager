import React, { useState, useRef, useEffect } from 'react';
import "./newpassword.scss";

function PasswordResetPage() {
  const [userInputCaptcha, setUserInputCaptcha] = useState('');
  const [captchaText, setCaptchaText] = useState('');
  const [captchaLoaded, setCaptchaLoaded] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    initializeCaptcha(ctx);
  }, []); // Run only once when component mounts

  const generateRandomChar = (min, max) =>
    String.fromCharCode(Math.floor(Math.random() * (max - min + 1) + min));

  const generateCaptchaText = () => {
    let captcha = '';
    for (let i = 0; i < 3; i++) {
      captcha += generateRandomChar(65, 90);
      captcha += generateRandomChar(97, 122);
      captcha += generateRandomChar(48, 57);
    }
    return captcha.split('').sort(() => Math.random() - 0.5).join('');
  };

  const drawCaptchaOnCanvas = (ctx, captcha) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const textColors = ['rgb(0,0,0)', 'rgb(130,130,130)'];
    const letterSpace = 150 / captcha.length;
    for (let i = 0; i < captcha.length; i++) {
      const xInitialSpace = 25;
      ctx.font = '20px Roboto Mono';
      ctx.fillStyle = textColors[Math.floor(Math.random() * 2)];
      ctx.fillText(
        captcha[i],
        xInitialSpace + i * letterSpace,
        Math.floor(Math.random() * 16 + 25),
        100
      );
    }
    setCaptchaLoaded(true);
  };

  const initializeCaptcha = (ctx) => {
    setUserInputCaptcha('');
    const newCaptcha = generateCaptchaText();
    setCaptchaText(newCaptcha);
    drawCaptchaOnCanvas(ctx, newCaptcha);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your password reset logic here
  };

  const handleInputChange = (e) => {
    setUserInputCaptcha(e.target.value);
  };

  const handleReloadCaptcha = () => {
    const ctx = canvasRef.current.getContext('2d');
    initializeCaptcha(ctx);
  };

  return (
    <div className="overall">
      <div className="newpass">
        <h2>Password Reset</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div>
            <label htmlFor="newPassword">New Password:</label>
            <input type="password" id="newPassword" name="newPassword" required />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input type="password" id="confirmPassword" name="confirmPassword" required />
          </div>
          <div>
            <label htmlFor="captcha">Captcha:</label>
            <input type="text" id="captcha" name="captcha" value={userInputCaptcha} onChange={handleInputChange} required />
            <button type="button" onClick={handleReloadCaptcha}>Reload Captcha</button>
            <canvas ref={canvasRef} width="150" height="50"></canvas>
          </div>
          <button type="submit">Reset Password</button>
        </form>
      </div>
    </div>
  );
}

export default PasswordResetPage;
