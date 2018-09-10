import globals from "./globals";

// auth.onAuthStateChanged(user => {
// 	if (user) {
// 		this.setState({ user });
// 	} else if (!isServer) {
// 		Router.push('/login');
// 	}
// });
const fakeUser = {
  displayName: "Alex",
  photoUrl: "http://example.com"
};

const auth = {
  onAuthStateChanged(fn) {
    setTimeout(() => {
      fn(fakeUser);
    });
  }
};

export {auth};

const base = {
    syncState() {}
}

export default base;