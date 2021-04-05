import React, { useState, useEffect, useContext, FC } from 'react';
import { createUser } from './db';
import firebase from './firebase';

import { RawUser } from '~/interfaces/user';
import { formatUser } from '~/utils/formatter';

interface AuthContextObject {
  user: any;
  signinWithGithub: () => Promise<void>;
  signout: () => Promise<void>;
}

const AuthContext = React.createContext<AuthContextObject>(
  {} as AuthContextObject
);
const githubAuthProvider = new firebase.auth.GithubAuthProvider();

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const handleUser = async (rawUser?: RawUser) => {
    console.dir(rawUser);
    if (rawUser) {
      const user = await formatUser(rawUser);
      createUser(user.uid, user);
      setUser(user);
      return user;
    } else {
      setUser(false);
      return false;
    }
  };

  const signinWithGithub = () => {
    return firebase
      .auth()
      .signInWithPopup(githubAuthProvider)
      .then((response) => {
        handleUser(response.user);
      });
  };

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        handleUser();
      });
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        handleUser(user);
      } else {
        handleUser();
      }
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    signinWithGithub,
    signout
  };
}

export const ProviderAuth: FC = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
