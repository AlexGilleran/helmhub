import * as firebaseAdmin from "firebase-admin";
import { ChartMetadata } from "../model";

export default async function updateChart(
  userId: string,
  chartMetadata: ChartMetadata
) {
  const chartDoc = firebaseAdmin
    .firestore()
    .collection("users")
    .doc(userId)
    .collection("charts")
    .doc(chartMetadata.chartYaml.name);

  await chartDoc.set({
    makeFirebaseWork: true
  });

  const doc = chartDoc
    .collection("versions")
    .doc(chartMetadata.chartYaml.version);

  return doc.set(chartMetadata);
}
