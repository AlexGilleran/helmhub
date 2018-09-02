const dotRegExp = new RegExp("\\.", "g");
const reverseDotRegExp = new RegExp("%2E", "gi");

export function encodeForFirebase(string: string): string {
  return string.toLowerCase().replace(dotRegExp, "%2e");
}

export function decodeForFirebase(string: string): string {
  return string.replace(reverseDotRegExp, ".");
}
