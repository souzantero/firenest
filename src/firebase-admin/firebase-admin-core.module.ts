import { DynamicModule, Global, Module } from '@nestjs/common';
import { FirebaseAdminModuleOptions } from './firebase-admin.interfaces';
import * as firebase from 'firebase-admin';
import { getFirebaseAdminAppToken } from './firebase-admin.utils';

@Global()
@Module({})
export class FirebaseAdminCoreModule {
  static register(options: FirebaseAdminModuleOptions): DynamicModule {
    const firebaseAdminAppName = getFirebaseAdminAppToken(options.appName);
    const firebaseAdminAppProvider = {
      provide: firebaseAdminAppName,
      useFactory: () => {
        if (!firebase.apps.some((app) => app.name === options.appName)) {
          firebase.initializeApp(options.appOptions, options.appName);
        }

        return firebase.app(options.appName);
      },
    };

    return {
      module: FirebaseAdminCoreModule,
      providers: [firebaseAdminAppProvider],
      exports: [firebaseAdminAppProvider],
    };
  }
}
