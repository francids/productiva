import { Injectable } from '@angular/core';
import {
  createRxDatabase,
  RxDatabase,
  RxCollection,
  addRxPlugin
} from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { Note } from '../models/note.model';
import { Observable } from 'rxjs';
import { OutputData } from '@editorjs/editorjs';
import { RxDBUpdatePlugin } from 'rxdb/plugins/update';

addRxPlugin(RxDBUpdatePlugin);

@Injectable({
  providedIn: 'root'
})
export class RxdbService {
  private db: RxDatabase | undefined;
  private noteCollection: RxCollection | undefined;
  private dbInitialized: Promise<void>;

  constructor() {
    this.dbInitialized = this.initDatabase();
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

  private async ensureDbInitialized() {
    await this.dbInitialized;
  }

  async getNotesObservable(): Promise<Observable<Note[]>> {
    await this.ensureDbInitialized();
    return this.noteCollection!.find().$;
  }

  async getNoteById(id: string): Promise<Note> {
    await this.ensureDbInitialized();
    return this.noteCollection!.findOne(id).exec();
  };

  async createNote(note: Note): Promise<void> {
    await this.ensureDbInitialized();
    await this.noteCollection!.insert(note);
  };

  async updateNoteContent(noteId: string, noteContent: OutputData): Promise<void> {
    await this.ensureDbInitialized();
    this.noteCollection!.findOne(noteId).update({
      $set: {
        content: JSON.stringify(noteContent)
      }
    });
  };

  async deleteNoteById(id: string): Promise<void> {
    await this.ensureDbInitialized();
    await this.noteCollection!.findOne(id).remove();
  };
}
