import base from "../config/base";

export default function getCurrentDomain(userId) {
  return base
    .fetch(`/domains`, {
      context: this,
      asArray: true,
      queries: {
        orderByChild: "site",
        equalTo: `/users/${userId}/sites/main`,
        limitToFirst: 1
      }
    })
    .then(result => (result.length > 0 ? result[0] : null));
}
