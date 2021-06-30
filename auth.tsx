import React, { useState, useEffect, useContext, createContext } from "react";
import nookies from "nookies";
import { firebaseClient } from "./firebaseClient";

const AuthContext = createContext<{ user: firebaseClient.User | null, loading:boolean }>({
  user: null,
  loading: true,
});

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<firebaseClient.User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).nookies = nookies;
    }
    return firebaseClient.auth().onIdTokenChanged(async (user) => {
      console.log(`token changed!`);
      if (!user) {
        console.log(`no token found...`);
        setUser(null);
        setLoading(true)
        nookies.destroy(null, "token");
        nookies.set(null, "token", "", {path: '/'});
        return;
      }

      console.log(`updating token...`);
      const token = await user.getIdToken();
      setUser(user);
      setLoading(false);
      nookies.destroy(null, "token");
      nookies.set(null, "token", token, {path: '/'});
    });
  }, []);

  // force refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      console.log(`refreshing token...`);
      const user = firebaseClient.auth().currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);
    return () => clearInterval(handle);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};