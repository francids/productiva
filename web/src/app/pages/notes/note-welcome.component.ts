// Angular
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from "@angular/core";
import { Router } from "@angular/router";

// Services
import { NotesService } from "../../services/notes.service";
import { TitleService } from "../../services/title.service";

// Material Components
import { MatDialog } from "@angular/material/dialog";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatRippleModule } from "@angular/material/core";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CdkDrag } from "@angular/cdk/drag-drop";

// Utils
import { v4 as uuidv4 } from "uuid";

// Models
import { Note } from "../../models/note.model";

// Dialogs
import { NewNoteDialogComponent } from "../../components/notes/new-note-dialog.component";
import { EditTitleNoteDialogComponent } from "../../components/notes/edit-title-note-dialog.component";
import { DelNoteDialogComponent } from "../../components/notes/del-note-dialog.component";

@Component({
  selector: "note-welcome",
  templateUrl: "./note-welcome.component.html",
  styleUrl: "./note-welcome.component.scss",
  imports: [
    MatCardModule,
    MatButtonModule,
    MatRippleModule,
    MatMenuModule,
    MatIconModule,
    CdkDrag,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteWelcomeComponent {
  private readonly router = inject(Router);
  private readonly notesService = inject(NotesService);
  private readonly titleService = inject(TitleService);

  readonly notes = this.notesService.notes;
  readonly dialog = inject(MatDialog);
  readonly newNoteTitle = signal("");
  private _snackBar = inject(MatSnackBar);
  private mouseDownTimeout: any;

  onMouseDown(_: MouseEvent, __: string) {
    this.mouseDownTimeout = setTimeout(() => {
      this.mouseDownTimeout = null;
    }, 150);
  }

  onMouseUp(_: MouseEvent, noteId: string) {
    if (this.mouseDownTimeout) {
      clearTimeout(this.mouseDownTimeout);
      this.mouseDownTimeout = null;
      this.router.navigate(["/notes/edit", noteId]);
    }
  }

  constructor() {
    this.titleService.updateTitle($localize`:@@notes:Notas`);
  }

  async createNewNote(title: string): Promise<void> {
    const newNoteId = uuidv4();
    await this.notesService.saveNote({
      id: newNoteId,
      title: title,
      content: "",
    });
    this.router.navigate(["/notes/edit", newNoteId]);
  }

  openDialogCreateNote(): void {
    const dialogRef = this.dialog.open(NewNoteDialogComponent, {
      data: { title: this.newNoteTitle() },
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        this.newNoteTitle.set(result);
        await this.createNewNote(this.newNoteTitle());
      }
    });
  }

  openDialogEditTitleNote(note: Note): void {
    const dialogRef = this.dialog.open(EditTitleNoteDialogComponent, {
      data: { title: note.title },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.notesService.updateNote(note.id, {
          id: note.id,
          title: result,
          content: note.content,
        });
        this._snackBar.open(
          $localize`:@@notes.note-title-edited:Título de la nota editado`,
          $localize`:@@common.ok:Cerrar`,
          { duration: 2000 }
        );
      }
    });
  }

  openDialogDeleteNote(note: Note): void {
    const dialogRef = this.dialog.open(DelNoteDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.notesService.deleteNote(note.id);
        this._snackBar.open(
          $localize`:@@notes.note-deleted:Nota eliminada`,
          $localize`:@@common.ok:Cerrar`,
          { duration: 2000 }
        );
      }
    });
  }
}
