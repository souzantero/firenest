import { DynamicModule, Global, Module } from '@nestjs/common';
import { FireAdminModuleOptions } from './fire-admin.interfaces';
import * as firebase from 'firebase-admin';
import { getFireAdminAppToken } from './fire-admin.utils';

@Global()
@Module({})
export class FireAdminCoreModule {
  static register(options: FireAdminModuleOptions): DynamicModule {
    const firebaseAdminAppName = getFireAdminAppToken(options.appName);
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
      module: FireAdminCoreModule,
      providers: [firebaseAdminAppProvider],
      exports: [firebaseAdminAppProvider],
    };
  }
}
