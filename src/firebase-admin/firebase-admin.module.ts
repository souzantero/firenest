import { DynamicModule, Module } from '@nestjs/common';
import { FirebaseAdminCoreModule } from './firebase-admin-core.module';
import { FirebaseAdminModuleOptions } from './firebase-admin.interfaces';

@Module({
  providers: [],
  exports: [],
})
export class FirebaseAdminModule {
  static register(options: FirebaseAdminModuleOptions): DynamicModule {
    return {
      module: FirebaseAdminModule,
      imports: [FirebaseAdminCoreModule.register(options)],
    };
  }
}
