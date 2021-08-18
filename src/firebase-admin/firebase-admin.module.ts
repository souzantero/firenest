import { DynamicModule, Module } from '@nestjs/common';
import { FirebaseAdminCoreModule } from './firebase-admin-core.module';
import {
  FirebaseAdminModuleAsyncOptions,
  FirebaseAdminModuleOptions,
} from './firebase-admin.interfaces';
import { FirebaseAdminService } from './firebase-admin.service';

@Module({
  providers: [FirebaseAdminService],
  exports: [FirebaseAdminService],
})
export class FirebaseAdminModule {
  static register(options: FirebaseAdminModuleOptions): DynamicModule {
    return {
      module: FirebaseAdminModule,
      imports: [FirebaseAdminCoreModule.register(options)],
    };
  }

  static registerAsync(
    options: FirebaseAdminModuleAsyncOptions,
  ): DynamicModule {
    return {
      module: FirebaseAdminModule,
      imports: [FirebaseAdminCoreModule.registerAsync(options)],
    };
  }
}
