import CryptoJS from 'crypto-js'

// 自定义密钥和偏移量
const KEY = CryptoJS.enc.Utf8.parse('aaDJL2d9DfhLZO0z') // 密钥
const IV = CryptoJS.enc.Utf8.parse('412ADDSSFA342442') // 偏移量

/** AES加密 */
export function Encrypt(word: string) {
  let srcs = CryptoJS.enc.Utf8.parse(word)
  var encrypted = CryptoJS.AES.encrypt(srcs, KEY, {
    iv: IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding,
  })

  return CryptoJS.enc.Base64.stringify(encrypted.ciphertext)
}

/** AES 解密 */
export function Decrypt(word: string) {
  let base64 = CryptoJS.enc.Base64.parse(word)
  let src = CryptoJS.enc.Base64.stringify(base64)

  var decrypt = CryptoJS.AES.decrypt(src, KEY, {
    iv: IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding,
  })

  var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
  return decryptedStr.toString()
}
