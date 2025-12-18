import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
  email: string;
  name?: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check for user AND token in localStorage on mount
    const storedUser = localStorage.getItem("mediwave_user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      try {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error parsing user from localStorage", error);
        localStorage.removeItem("mediwave_user");
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      }
    } else {
      // If either is missing, clear both to be safe
      localStorage.removeItem("mediwave_user");
      localStorage.removeItem("token");
      setIsAuthenticated(false);
    }
    setLoading(false);
  }, []);

  const signIn = (email: string) => {
    const newUser = { email, name: email.split("@")[0] };
    localStorage.setItem("mediwave_user", JSON.stringify(newUser));
    setUser(newUser);
    setIsAuthenticated(true);
    return newUser;
  };

  const signOut = () => {
    localStorage.removeItem("mediwave_user");
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
    router.push("/login");
  };

  return {
    user,
    loading,
    isAuthenticated,
    signIn,
    signOut,
  };
};