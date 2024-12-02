import { Injectable } from "@angular/core";
import { NotesService } from "./notes.service";
import { Note } from "../models/note.model";

@Injectable({
  providedIn: "root",
})
export class ExportService {
  constructor(private notesService: NotesService) { }

  async generateNoteFile(noteId: Note["id"]): Promise<void> {
    const note = await this.notesService.getNoteById(noteId);
    if (!note) throw new Error("Note not found");
    const blob = new Blob([note.content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${note.title}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }
}
