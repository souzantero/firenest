import firebase, { app } from 'firebase-admin';

export interface FireAdminApp extends app.App {}

export interface FireAdminModuleOptions {
  appName?: string;
  appOptions?: firebase.AppOptions;
}
