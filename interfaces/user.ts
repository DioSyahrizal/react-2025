export interface RawUser {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string | null;
  phoneNumber: string | null;
  providerData: any;
}
