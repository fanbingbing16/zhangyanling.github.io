import { zlibSync, unzlibSync, strToU8, strFromU8 } from 'fflate'

// 解码
export function atou(base64) {
  const binary = atob(base64)

  // zlib header (x78), level 9 (xDA)
  if (binary.startsWith('\x78\xDA')) {
    const buffer = strToU8(binary, true)
    const unzipped = unzlibSync(buffer)
    return strFromU8(unzipped)
  }

  // old unicode hacks for backward compatibility
  // https://base64.guru/developers/javascript/examples/unicode-strings
  return decodeURIComponent(escape(binary))
}

// 编码
export function utoa(data) {
  const buffer = strToU8(data)
  const zipped = zlibSync(buffer, { level: 9 })
  // 二个参数传了true，代表转换成二进制字符串，因为js内置的btoa和atob方法不支持Unicode字符串，而我们的代码内容显然不可能只使用ASCII的256个字符
  const binary = strFromU8(zipped, true)
  return btoa(binary)
}