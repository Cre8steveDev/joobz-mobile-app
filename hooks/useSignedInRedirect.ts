// hooks/useAuthRedirect.ts
import { useState, useEffect } from 'react';
import useTypedSelector from './useTypedSelector';
import { Redirect } from 'expo-router';

export const useAuthRedirect = () => {
  const { user } = useTypedSelector((state) => state.auth);
  const [redirectPath, setRedirectPath] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      if (user.ROLE === 'FREELANCER') {
        setRedirectPath('/(freelancer)/Home');
      } else if (user.ROLE === 'USER') {
        setRedirectPath('/(user)/Home');
      }
    }
  }, [user]);

  return {
    isAuthenticated: !!user,
    userRole: user?.ROLE,
    redirect: redirectPath,
  };
};
