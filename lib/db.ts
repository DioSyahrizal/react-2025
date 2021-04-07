import { SiteFormState } from '~/interfaces/sites';
import firebase from './firebase';

const firestore = firebase.firestore();

export function createUser(uid: string, data: any) {
  return firestore
    .collection('users')
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
}

export function createSite(data: any) {
  return firestore.collection('sites').add(data);
}
