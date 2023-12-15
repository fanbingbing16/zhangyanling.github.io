import { zlibSync, unzlibSync, strToU8, strFromU8 } from 'fflate'
//
export function utoa(data) {
  const buffer = strToU8(data);
  const zipped = zlibSync(buffer, { level: 9 });
  const binary = strFromU8(zipped, true);
  return btoa(binary);
}
//解析
 export function atou(base64) {
  const binary = atob(base64);
  if (binary.startsWith("xÚ")) {
    const buffer = strToU8(binary, true);
    const unzipped = unzlibSync(buffer);
    return strFromU8(unzipped);
  }
  return decodeURIComponent(escape(binary));
}

