import { Injectable } from '@angular/core';
import {
  createRxDatabase,
  RxDatabase,
  addRxPlugin
} from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { RxDBUpdatePlugin } from 'rxdb/plugins/update';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
import { RxDBQueryBuilderPlugin } from 'rxdb/plugins/query-builder';

addRxPlugin(RxDBDevModePlugin);
addRxPlugin(RxDBUpdatePlugin);
addRxPlugin(RxDBQueryBuilderPlugin);

// Schema for the note collection
const noteSchema = {
  title: 'note schema',
  version: 0,
  primaryKey: "id",
  type: 'object',
  properties: {
    id: {
      type: 'string',
      maxLength: 100,
    },
    title: {
      type: 'string'
    },
    content: {
      type: "string"
    }
  },
  required: ['id']
};

export async function initDatabase(): Promise<RxDatabase> {
  const db = await createRxDatabase({
    name: 'productiva-db',
    storage: getRxStorageDexie(),
  });

  await db.addCollections({
    notes: { schema: noteSchema }
  });

  console.log('Database initialized');
  return db;
}

@Injectable({
  providedIn: 'root'
})
export class RxdbService {
  public db: RxDatabase | undefined;

  constructor() { }

  init() {
    return new Promise((resolve, reject) => {
      initDatabase().then((db) => {
        this.db = db;
        resolve(true);
      }).catch((err) => {
        console.error(err);
        reject(err);
      });
    });
  }
}
