import React, { useState, useEffect, useContext, FC } from 'react';
import firebase from './firebase';

interface AuthContextObject {
  user: any;
  signinWithGithub: () => Promise<firebase.User>;
  signout: () => Promise<void>;
}

const AuthContext = React.createContext<AuthContextObject>(
  {} as AuthContextObject
);
const githubAuthProvider = new firebase.auth.GithubAuthProvider();

function useProvideAuth() {
  const [user, setUser] = useState(null);

  console.dir(user);
  const signinWithGithub = () => {
    return firebase
      .auth()
      .signInWithPopup(githubAuthProvider)
      .then((response) => {
        setUser(response.user);
        return response.user;
      });
  };

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(false);
      });
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
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
