import type { Note } from "../models/note.model";
import { signal, effect, computed, inject, Injectable } from "@angular/core";
import { DexieService } from "./db.service";

@Injectable({
  providedIn: "root",
})
export class NotesService {
  private readonly dexieService = inject(DexieService);
  private readonly _notes = signal<Note[]>([]);

  readonly notes = computed(() => this._notes());

  constructor() {
    effect(() => {
      this.loadNotes();
    });
  }

  private async loadNotes(): Promise<void> {
    const notes = await this.dexieService.db.notes.toArray();
    this._notes.set(notes);
  }

  async getNoteById(noteId: string): Promise<Note | undefined> {
    return await this.dexieService.db.notes.get(noteId);
  }

  async saveNote(note: Note): Promise<void> {
    await this.dexieService.db.notes.put(note);
    await this.loadNotes();
  }

  async updateNote(noteId: string, newNote: Note): Promise<void> {
    await this.dexieService.db.notes.update(noteId, newNote);
    await this.loadNotes();
  }

  async deleteNote(noteId: string): Promise<void> {
    await this.dexieService.db.notes.delete(noteId);
    await this.loadNotes();
  }
}
