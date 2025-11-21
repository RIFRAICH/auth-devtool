"use client";

import { auth } from "./firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  getAdditionalUserInfo,
} from "firebase/auth";

export async function login(email, password) {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user.getIdToken(true);
}

export async function loginWithGoogle() {
  const provider = new GoogleAuthProvider();
  const cred = await signInWithPopup(auth, provider);

  const info = getAdditionalUserInfo(cred);
  const isNewUser = info?.isNewUser ?? false;

  const token = await cred.user.getIdToken(true);

  return { token, isNewUser };
}

export async function signup(email, password) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  return cred.user.getIdToken(true);
}

export async function resetPassword(email) {
  await sendPasswordResetEmail(auth, email);
}

export async function fetchWithAuth(input, init = {}) {
  const token = await auth.currentUser?.getIdToken(true);
  return fetch(input, {
    ...init,
    headers: {
      ...(init.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
}

export async function logout() {
  await signOut(auth);
}
