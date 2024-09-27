import { Injectable } from '@angular/core';
import {
  createRxDatabase,
  RxDatabase,
  RxCollection
} from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { Note } from '../models/note.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RxdbService {
  private db: RxDatabase | undefined;
  private noteCollection: RxCollection | undefined;

  constructor() {
    this.initDatabase();
  }

  async initDatabase() {
    this.db = await createRxDatabase({
      name: 'ultradb',
      storage: getRxStorageDexie(),
    });

    const collections = await this.db.addCollections({
      notes: {
        schema: {
          title: 'note schema',
          version: 0,
          description: 'Describes a simple hero',
          primaryKey: "id",
          type: 'object',
          properties: {
            id: {
              type: 'string'
            },
            title: {
              type: 'string'
            },
            content: {
              type: "string"
            }
          },
          required: ['id']
        }
      }
    });

    this.noteCollection = collections.notes;

    console.log('Database initialized');
  }

  getNotesObservable(): Observable<Note[]> {
    return this.noteCollection!.find().$;
  }

  async getNotes(): Promise<Note[]> {
    if (!this.noteCollection) {
      console.warn("Database not initialized");
      return [];
    }
    const notes: Note[] = await this.noteCollection!.find().exec();
    return notes;
  }

  async createNote(note: Note) {
    if (
      this.noteCollection === undefined ||
      this.db === undefined
    ) {
      console.error('Database not initialized');
    }
    await this.noteCollection!.insert(note);
  }
}
