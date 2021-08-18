import firebase, { app } from 'firebase-admin';

export interface FirebaseAdminApp extends app.App {}

export interface FirebaseAdminModuleOptions {
  appName?: string;
  appOptions?: firebase.AppOptions;
}
