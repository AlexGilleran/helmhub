const dotRegExp = new RegExp("\\.", "g");
const reverseDotRegExp = new RegExp("%2E", "gi");

exports.encodeForFirebase = function encodeForFirebase(string) {
  return string.toLowerCase().replace(dotRegExp, "%2e");
};

exports.decodeForFirebase = function decodeForFirebase(string) {
  return string.replace(reverseDotRegExp, ".");
};
