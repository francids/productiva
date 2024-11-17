import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { Note } from '../models/note.model';

export class ProductivaDB extends Dexie {
  notes!: Dexie.Table<Note, string>;

  constructor() {
    super('productiva-db');
    this.version(1).stores({
      notes: 'id, title, content'
    });
  }
}

@Injectable({
  providedIn: 'root'
})
export class DexieService {
  public db: ProductivaDB;

  constructor() {
    this.db = new ProductivaDB();
  }

  async init() {
    try {
      await this.db.open();
      console.log('Database initialized');
    } catch (err) {
      console.error('Failed to open database:', err);
    }
  }
}
