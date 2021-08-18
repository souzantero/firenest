import firebase from 'firebase-admin';
import { AsyncModuleOptions } from '../shared';

export interface FirebaseAdminModuleOptions {
  appOptions?: firebase.AppOptions;
}

export interface FirebaseAdminModuleAsyncOptions
  extends AsyncModuleOptions<FirebaseAdminModuleOptions> {}
