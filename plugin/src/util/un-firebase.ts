export default function unfirebase<T>(
  notReallyAPromise: Promise<T>
): Promise<T> {
  return new Promise((resolve, reject) => {
    return notReallyAPromise.then((x: T) => resolve(x)).catch(e => reject(e));
  });
}
