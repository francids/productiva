// Angular
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  AfterViewInit,
} from "@angular/core";
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
import { MatMenuModule } from "@angular/material/menu";
import { MatDividerModule } from "@angular/material/divider";

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
  imports: [
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    EditorComponent,
    MatMenuModule,
    MatDividerModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteEditComponent implements AfterViewInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly notesService = inject(NotesService);
  private readonly titleService = inject(TitleService);
  private readonly exportService = inject(ExportService);

  noteId: string | undefined;
  note = signal<Note>({ id: "", title: "", content: "" });
  readonly dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);

  ngAfterViewInit(): void {
    this.route.params.subscribe(async (params) => {
      this.noteId = params["id"];
      const fetchedNote = await this.notesService.getNoteById(this.noteId!);
      if (!fetchedNote) {
        this.router.navigate(["/notes"]);
        return;
      }
      this.note.set(fetchedNote);
      Promise.resolve().then(() =>
        this.titleService.updateTitle(fetchedNote.title)
      );
    });
  }

  async saveNote(noteContent: string): Promise<void> {
    await this.notesService.updateNote(this.note().id, {
      id: this.note().id,
      title: this.note().title,
      content: noteContent,
    });
  }

  async exportNote(): Promise<void> {
    await this.exportService.generateNoteFile(this.note().id);
  }

  openDialogEditTitleNote(): void {
    const dialogRef = this.dialog.open(EditTitleNoteDialogComponent, {
      data: { title: this.note().title },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.notesService.updateNote(this.note().id, {
          id: this.note().id,
          title: result,
          content: this.note().content,
        });
        this.note.set({ ...this.note(), title: result });
        this.titleService.updateTitle(result);
        this._snackBar.open(
          $localize`:@@notes.note-title-edited:Título de la nota editado`,
          $localize`:@@common.ok:Cerrar`,
          { duration: 2000 }
        );
      }
    });
  }

  openDialogDeleteNote(): void {
    const dialogRef = this.dialog.open(DelNoteDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.notesService.deleteNote(this.note().id);
        this._snackBar.open(
          $localize`:@@notes.note-deleted:Nota eliminada`,
          $localize`:@@common.ok:Cerrar`,
          { duration: 2000 }
        );
        this.router.navigate(["/notes"]);
      }
    });
  }
}
