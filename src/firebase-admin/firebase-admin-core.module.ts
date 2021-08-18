import { DynamicModule, Global, Module } from '@nestjs/common';
import { createAsyncOptionsProviders } from '../shared';
import { FIREBASE_ADMIN_MODULE_OPTIONS } from './firebase-admin.constants';
import {
  FirebaseAdminModuleAsyncOptions,
  FirebaseAdminModuleOptions,
} from './firebase-admin.interfaces';

@Global()
@Module({})
export class FirebaseAdminCoreModule {
  static register(options: FirebaseAdminModuleOptions): DynamicModule {
    return {
      module: FirebaseAdminCoreModule,
      providers: [
        { provide: FIREBASE_ADMIN_MODULE_OPTIONS, useValue: options },
      ],
      exports: [FIREBASE_ADMIN_MODULE_OPTIONS],
    };
  }

  static registerAsync(
    options: FirebaseAdminModuleAsyncOptions,
  ): DynamicModule {
    return {
      module: FirebaseAdminCoreModule,
      imports: options.imports || [],
      providers: createAsyncOptionsProviders<FirebaseAdminModuleOptions>(
        FIREBASE_ADMIN_MODULE_OPTIONS,
        options,
      ),
      exports: [FIREBASE_ADMIN_MODULE_OPTIONS],
    };
  }
}
