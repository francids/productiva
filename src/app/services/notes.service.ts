import { Injectable } from "@angular/core";
import { RxdbService } from "./rxdb.service";
import { Observable } from "rxjs";
import { Note } from "../models/note.model";

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  public notes$: Observable<Note[]> | undefined;

  constructor(private databaseService: RxdbService) {
    this.notes$ = this.databaseService.db!["notes"].find().$;
  }

  async getNoteById(noteId: string): Promise<Note> {
    return await this.databaseService.db!["notes"].findOne({
      selector: { id: noteId }
    }).exec();
  }

  saveNote(note: Note): void {
    this.databaseService.db!["notes"].upsert(note);
  }

  updateNote(noteId: string, newNote: Note): void {
    this.databaseService.db!["notes"].findOne().where("id").eq(noteId).update({
      $set: {
        title: newNote.title,
        content: newNote.content
      }
    })
  }

  deleteNote(noteId: string) {
    this.databaseService.db!["notes"].find().where('id').eq(noteId).remove();
  }
}
