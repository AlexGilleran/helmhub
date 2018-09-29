export default function handlePromise(promise, key, setState) {
  setState(key, {
    loading: true,
    error: null
  });

  return promise
    .then(result => {
      setState(key, {
        loading: false,
        result
      });

      return result;
    })
    .catch(e => {
      console.error(e);
      setState(key, {
        error: e
      });
    });
}
