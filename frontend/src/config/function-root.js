export default function functionRoot() {
  return `https://us-central1-${process.env.NODE_ENV === "production"
    ? "nichetester-prod"
    : "nichetester-dev"}.cloudfunctions.net`;
}
