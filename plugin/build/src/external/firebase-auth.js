"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_1 = __importDefault(require("firebase"));
const firebase_admin_1 = __importDefault(require("firebase-admin"));
class FirebaseAuth {
    constructor(firebaseConfig) {
        firebase_1.default.initializeApp(firebaseConfig);
        firebase_admin_1.default.initializeApp({
            serviceAccountId: "my-client-id@my-project-id.iam.gserviceaccount.com"
        });
    }
    signIn(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return firebase_1.default
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then(user => {
                return firebase_1.default
                    .auth()
                    .currentUser.getIdToken(true)
                    .then(idToken => ({ idToken, user }));
            });
        });
    }
    signInWithToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return firebase_1.default
                .auth()
                .signInWithCustomToken(token)
                .then(user => {
                return firebase_1.default
                    .auth()
                    .currentUser.getIdToken(true)
                    .then(idToken => ({ idToken, user }));
            });
        });
    }
}
exports.default = FirebaseAuth;
//# sourceMappingURL=firebase-auth.js.map