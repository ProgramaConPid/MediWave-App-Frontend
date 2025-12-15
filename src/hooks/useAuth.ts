import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  email: string;
  name?: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for user in localStorage on mount
    const storedUser = localStorage.getItem('mediwave_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing user from localStorage', error);
        localStorage.removeItem('mediwave_user');
      }
    }
    setLoading(false);
  }, []);

  const signIn = (email: string) => {
    const newUser = { email, name: email.split('@')[0] };
    localStorage.setItem('mediwave_user', JSON.stringify(newUser));
    setUser(newUser);
    return newUser;
  };

  const signOut = () => {
    localStorage.removeItem('mediwave_user');
    setUser(null);
    router.push('/login');
  };

  return {
    user,
    loading,
    signIn,
    signOut,
  };
};
