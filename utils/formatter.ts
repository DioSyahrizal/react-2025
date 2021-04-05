import { RawUser } from '~/interfaces/user';

export const formatUser = async (user: RawUser) => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL
  };
};
