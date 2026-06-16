import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

export const logIn = async (email, password) => {
  const res = await signInWithEmailAndPassword(auth, email, password);
  return res.user;
};

export const logOut = async () => {
  await auth.signOut();
};
