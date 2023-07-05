const Database = require('./utils/database')
const extractVerificationCode = require('./utils/extractVerificationCode')

function queryCode() {
  if (!utools.isMacOS()) utools.showNotification('仅支持mac os')
  const db = new Database(utools.getPath('home') + '/Library/Messages/chat.db')

  const sqlstr = `
  SELECT text FROM message
  WHERE
    (date / 1000000000 + 978307200) > strftime('%s', 'now') - 60
    AND text IS NOT NULL
    AND length(text) > 0
  ORDER BY
    date DESC
  LIMIT 1
  `
  return db
    .all(sqlstr)
    .then((res) => {
      if (!res || res.length < 1) {
        return utools.showNotification('没有短信')
      }
      const sms = res[0]

      const code = extractVerificationCode(sms.text)
      if (!code) {
        return utools.showNotification('没有验证码')
      }
      utools.copyText(code)
      // macos 模拟粘贴
      utools.simulateKeyboardTap('v', 'command')
      utools.showNotification('验证码已复制')
    })
    .finally(() => {
      db.close()
    })
}

module.exports = queryCode
