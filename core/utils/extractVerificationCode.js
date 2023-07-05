function extractVerificationCode(message) {
  const regex = /码\s*([A-Za-z0-9]{4,}\b)/ // 匹配 "验证码" 后面的六位由数字和字母组成的验证码
  const match = message.match(regex)
  return match ? match[1] : null
}
module.exports = extractVerificationCode
