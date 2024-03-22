import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function useSignup() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const signUp = async (email, password) => {
    try {
      setLoading(true);
      let res = await createUserWithEmailAndPassword(auth, email, password);
      return res.user;
      setLoading(false);
      setError("");
    } catch {
      setLoading(false);
      setError(e.message);
    }
  };
  return { error, loading, signUp };
}
