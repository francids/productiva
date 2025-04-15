// Angular
import { ChangeDetectionStrategy, Component, inject, signal, AfterViewInit } from "@angular/core";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";

// Services
import { NotesService } from "../../services/notes.service";
import { TitleService } from "../../services/title.service";
import { ExportService } from "../../services/export.service";

// Material Components
import { MatDialog } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatToolbarModule } from "@angular/material/toolbar";

// Models
import { Note } from "../../models/note.model";

// Dialogs
import { EditTitleNoteDialogComponent } from "../../components/notes/edit-title-note-dialog.component";
import { DelNoteDialogComponent } from "../../components/notes/del-note-dialog.component";

// Components
import { EditorComponent } from "../../components/notes/editor.component";

@Component({
  selector: "note-edit",
  templateUrl: "./note-edit.component.html",
  styleUrl: "./note-edit.component.scss",
  imports: [RouterLink, MatButtonModule, MatIconModule, MatToolbarModule, EditorComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteEditComponent implements AfterViewInit {
  noteId: string | undefined;
  note = signal<Note>({ id: "", title: "", content: "" });
  readonly dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private notesService: NotesService,
    private titleService: TitleService,
    private exportService: ExportService,
  ) {
  };

  ngAfterViewInit(): void {
    this.route.params.subscribe(async params => {
      this.noteId = params["id"];
      const fetchedNote = await this.notesService.getNoteById(this.noteId!);
      if (!fetchedNote) {
        this.router.navigate(["/notes"]);
        return;
      }
      this.note.set(fetchedNote);
      Promise.resolve().then(() => this.titleService.updateTitle(fetchedNote.title));
    });
  };

  async saveNote(noteContent: string): Promise<void> {
    await this.notesService.updateNote(this.note().id, {
      id: this.note().id,
      title: this.note().title,
      content: noteContent
    });
  };

  async exportNote(): Promise<void> {
    await this.exportService.generateNoteFile(this.note().id);
  }

  openDialogEditTitleNote(): void {
    const dialogRef = this.dialog.open(EditTitleNoteDialogComponent, {
      data: { title: this.note().title }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.notesService.updateNote(this.note().id, {
          id: this.note().id,
          title: result,
          content: this.note().content
        });
        this.note.set({ ...this.note(), title: result });
        this.titleService.updateTitle(result);
        this._snackBar.open("Título de la nota editado", "Cerrar", { duration: 2000 });
      };
    });
  };

  openDialogDeleteNote(): void {
    const dialogRef = this.dialog.open(DelNoteDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.notesService.deleteNote(this.note().id);
        this._snackBar.open("Nota eliminada", "Cerrar", { duration: 2000 });
        this.router.navigate(["/notes"]);
      };
    });
  };
};
