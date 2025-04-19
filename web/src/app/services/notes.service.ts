import { Injectable } from "@angular/core";
import { DexieService } from "./db.service";
import { BehaviorSubject } from "rxjs";
import { Note } from "../models/note.model";

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private notesSubject = new BehaviorSubject<Note[]>([]);
  public notes$ = this.notesSubject.asObservable();

  constructor(private dexieService: DexieService) {
    this.loadNotes();
  }

  private async loadNotes(): Promise<void> {
    const notes = await this.dexieService.db.notes.toArray();
    this.notesSubject.next(notes);
  }

  async getNoteById(noteId: string): Promise<Note | undefined> {
    return await this.dexieService.db.notes.get(noteId);
  }

  async saveNote(note: Note): Promise<void> {
    await this.dexieService.db.notes.put(note);
    this.loadNotes();
  }

  async updateNote(noteId: string, newNote: Note): Promise<void> {
    await this.dexieService.db.notes.update(noteId, newNote);
    this.loadNotes();
  }

  async deleteNote(noteId: string): Promise<void> {
    await this.dexieService.db.notes.delete(noteId);
    this.loadNotes();
  }
}
