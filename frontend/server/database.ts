import firebaseAdmin from "firebase-admin";
import { fromPairs } from "lodash";

export async function getUser(username: string) {
  return firebaseAdmin
    .firestore()
    .collection("users")
    .where("username", "==", username)
    .limit(1)
    .select("uid")
    .get();
}

export async function getChart(username: string, chartName: string) {
  const user = await getUser(username);
  const uid = user.docs[0].get("uid");

  const versions = await firebaseAdmin
    .firestore()
    .collection(`/users/${uid}/charts/${chartName}/versions`)
    .orderBy("chartYaml.version", "desc")
    .limit(1)
    .get();

  return versions.docs[0].data();
}

export async function getChartsByUserId(uid: string) {
  const chartsSnapshot = await firebaseAdmin
    .firestore()
    .collection(`/users/${uid}/charts`)
    .get();

  const versionCollectionPromises = chartsSnapshot.docs.map(chart =>
    firebaseAdmin
      .firestore()
      .collection(`/users/${uid}/charts/${chart.id}/versions`)
      .get()
      .then(collection => [
        chart.id,
        fromPairs(collection.docs.map(doc => [doc.id, doc.data().chartYaml]))
      ])
  );

  const versionCollections = fromPairs(
    await Promise.all(versionCollectionPromises)
  );

  return versionCollections;
}

export async function getCharts(username: string) {
  const user = await getUser(username);
  const uid = user.docs[0].get("uid");

  return uid;
}
