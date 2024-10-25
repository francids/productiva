// Angular
import { ChangeDetectionStrategy, Component, ElementRef, inject, ViewChild, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

// EditorJS
import EditorJS, { BlockToolConstructable } from '@editorjs/editorjs';
import Header from '@editorjs/header';
import NestedList from '@editorjs/nested-list';
import Table from '@editorjs/table';
import { OutputData } from '@editorjs/editorjs';

// Services
import { NotesService } from '../../services/notes.service';

// Material Components
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

// Models
import { Note } from '../../models/note.model';

// Dialogs
import { EditTitleNoteDialogComponent } from '../../components/notes/edit-title-note-dialog.component';
import { DelNoteDialogComponent } from '../../components/notes/del-note-dialog.component';

@Component({
  selector: 'note-edit',
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.scss'],
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatIconModule, MatToolbarModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteEditComponent {
  noteId: string | undefined;
  note = signal<Note | undefined>(undefined);
  readonly dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);

  @ViewChild("editor", {
    read: ElementRef,
    static: true
  })
  editorElement: ElementRef | undefined;
  private editor: EditorJS | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private notesService: NotesService,
  ) {
    this.route.params.subscribe(async params => {
      if (this.editor) {
        this.editor.destroy();
      };
      this.noteId = params['id'];
      const fetchedNote = await this.notesService.getNoteById(this.noteId!);
      if (!fetchedNote) {
        this.router.navigate(['/notes']);
        return;
      }
      this.note.set(fetchedNote);
      let noteValue: {
        time: number,
        blocks: [],
        version: string
      } | undefined;
      try {
        noteValue = JSON.parse(this.note()!.content!);
      } catch (error) {
        noteValue = undefined;
      }
      this.editor = new EditorJS({
        autofocus: true,
        inlineToolbar: false,
        data: noteValue,
        minHeight: 300,
        holder: this.editorElement?.nativeElement,
        placeholder: 'Escribe algo interesante...',
        tools: {
          list: {
            class: NestedList as unknown as BlockToolConstructable,
            inlineToolbar: true,
            config: {
              defaultStyle: 'unordered'
            }
          },
          header: {
            class: Header as unknown as BlockToolConstructable,
            config: {
              placeholder: 'Introduce un encabezado...',
              levels: [2, 3, 4],
              defaultLevel: 2,
            }
          },
          table: {
            class: Table as unknown as BlockToolConstructable,
            inlineToolbar: true,
            config: {
              rows: 2,
              cols: 3,
              maxRows: 10,
              maxCols: 10,
            }
          }
        },
        onChange: () => this.saveNote(),
      });
    });
  };

  saveNote(): void {
    this.editor?.save().then((outputData: OutputData) => {
      this.notesService.updateNote(this.noteId!, {
        id: this.noteId!,
        title: this.note()!.title,
        content: JSON.stringify(outputData)
      });
    }).catch((error) => {
      this._snackBar.open('Error al guardar la nota', 'Cerrar', { duration: 1000 });
      console.error('Error al guardar la nota', error);
    });
  };

  openDialogEditTitleNote(): void {
    const dialogRef = this.dialog.open(EditTitleNoteDialogComponent, {
      data: { title: this.note()!.title }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.notesService.updateNote(this.note()!.id, {
          id: this.note()!.id,
          title: result,
          content: this.note()!.content
        });
        this.note.set({ ...this.note()!, title: result });
        this._snackBar.open('Título de la nota editado', 'Cerrar', { duration: 2000 });
      };
    });
  };

  openDialogDeleteNote(): void {
    const dialogRef = this.dialog.open(DelNoteDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.notesService.deleteNote(this.note()!.id);
        this._snackBar.open('Nota eliminada', 'Cerrar', { duration: 2000 });
        this.router.navigate(['/notes']);
      };
    });
  };
};
