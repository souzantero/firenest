import { Inject, Injectable } from '@nestjs/common';
import { FIREBASE_ADMIN_MODULE_OPTIONS } from './firebase-admin.constants';
import { FirebaseAdminModuleOptions } from './firebase-admin.interfaces';

import * as firebase from 'firebase-admin';

@Injectable()
export class FirebaseAdminService {
  constructor(
    @Inject(FIREBASE_ADMIN_MODULE_OPTIONS) options: FirebaseAdminModuleOptions,
  ) {
    if (!firebase.apps.length) {
      firebase.initializeApp(options.appOptions);
      firebase.firestore().settings({
        ignoreUndefinedProperties: true,
      });
    }
  }

  firestore(): firebase.firestore.Firestore {
    return firebase.firestore();
  }

  storage(): firebase.storage.Storage {
    return firebase.storage();
  }

  auth(): firebase.auth.Auth {
    return firebase.auth();
  }
}
