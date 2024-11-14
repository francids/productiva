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

  async updateNote(noteId: string, newNote: Note): Promise<void> {
    try {
      const noteDoc = await this.databaseService.db!["notes"].findOne().where("id").eq(noteId).exec();

      if (!noteDoc) {
        throw new Error(`Nota con ID ${noteId} no encontrada.`);
      }
      await noteDoc.incrementalUpdate({
        $set: {
          title: newNote.title,
          content: newNote.content
        }
      });
      console.log("Nota actualizada con éxito.");
    } catch (error) {
      console.error("Error al actualizar la nota:", error);
    }
  }

  deleteNote(noteId: string) {
    this.databaseService.db!["notes"].find().where('id').eq(noteId).remove();
  }
}
