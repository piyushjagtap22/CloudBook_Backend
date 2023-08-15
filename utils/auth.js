generateOTP = () => {
  let otp = ''
  for (let i = 0; i < 6; i++) {
      const randomVal = Math.round(Math.random() * 9)
      otp = otp + randomVal
  }
  return otp
}


module.exports = { generateOTP }