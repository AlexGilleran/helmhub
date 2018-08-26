import firebase from "firebase";

/** Class representing a firebase authentication */
export default class FirebaseAuth {
  /**
   * Creates a firebaseAuth
   * @params {Object} firebaseConfig - The config for firebase
   * @params {Object} serviceKey - The service account for firebase
   */
  constructor(firebaseConfig: Object) {
    firebase.initializeApp(firebaseConfig);

    // admin.initializeApp({
    //   serviceAccountId: "my-client-id@my-project-id.iam.gserviceaccount.com"
    // });
  }

  /**
   * Signing in an user and tries to get their id token.
   *
   * @param  {String} email - Email for the account
   * @param  {String} password - Password for the account
   * @promise {Object} Returns an object with idToken and uid of the user
   * @rejects {Object} Returns an object with errors if rejected
   */
  signIn(email: string, password: string) {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        return firebase
          .auth()
          .currentUser.getIdToken(true)
          .then(idToken => ({ idToken, user }))
          .catch(e => {
            throw e;
          });
      })
      .catch(e => {
        throw e;
      });
  }

  // async signInWithToken(token: string) {
  //   return firebase
  //     .auth()
  //     .signInWithCustomToken(token)
  //     .then(user => {
  //       return firebase
  //         .auth()
  //         .currentUser.getIdToken(true)
  //         .then(idToken => ({ idToken, user }));
  //     });
  // }

  // /**
  //  * Verify the id token of an user.
  //  *
  //  * @promise {Boolean} Returns true if successful
  //  * @rejects {Object} Returns an object with errors if rejected
  //  */
  // authToken(idToken: string) {
  //   return admin.auth().verifyIdToken(idToken);
  // }
}
