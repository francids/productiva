import { ChangeDetectionStrategy, Component, ElementRef, inject, ViewChild, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import EditorJS, { BlockToolConstructable } from '@editorjs/editorjs';
import Header from '@editorjs/header';
import NestedList from '@editorjs/nested-list';
import { RxdbService } from '../../services/rxdb.service';
import { OutputData } from '@editorjs/editorjs';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Note } from '../../models/note.model';
import { MatDialog } from '@angular/material/dialog';
import { DelNoteDialogComponent } from './del-note-dialog.component';
import { EditTitleNoteDialogComponent } from './edit-title-note-dialog.component';

@Component({
  selector: 'note-edit',
  template: `
    <div class="note-edit-header">
      <p class="note-title" (click)="openDialogEditTitleNote()">{{note()!.title}}</p>
      <div>
        <button mat-button (click)="saveNote()">Guardar nota</button>
        <button mat-button (click)="openDialogDeleteNote()">Eliminar nota</button>
      </div>
    </div>
    <div #editor></div>
  `,
  styles: [`
    .note-edit-header {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
    .note-title {
      font-weight: 300;
      font-size: 1rem;
    }
  `],
  standalone: true,
  imports: [MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteEditComponent {
  noteId: string | undefined;
  note = signal<Note | undefined>(undefined);
  readonly dialog = inject(MatDialog);

  @ViewChild("editor", {
    read: ElementRef,
    static: true
  })
  editorElement: ElementRef | undefined;

  private editor: EditorJS | undefined;
  private _snackBar = inject(MatSnackBar);

  constructor(private route: ActivatedRoute, private router: Router, private rxdbService: RxdbService) {
    this.route.params.subscribe(async params => {
      if (this.editor) {
        this.editor.destroy();
      };
      this.noteId = params['id'];
      const fetchedNote = await this.rxdbService.getNoteById(this.noteId!);
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
        onChange: () => {
          console.log('Editor content changed');
        },
        autofocus: true,
        inlineToolbar: false,
        data: noteValue,
        onReady: () => {
          console.log('Editor is ready');
        },
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
        }
      });
    });
  };

  saveNote(): void {
    console.log('Saving note...');
    this.editor?.save().then((outputData: OutputData) => {
      this.rxdbService.updateNoteContent(this.noteId!, outputData);
    });
    this._snackBar.open('Nota guardada', 'Cerrar', { duration: 2000 });
    console.log('Note saved');
  };

  openDialogEditTitleNote(): void {
    const dialogRef = this.dialog.open(EditTitleNoteDialogComponent, {
      data: { title: this.note()!.title }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        console.log('Editing note title...');
        this.rxdbService.updateNoteTitle(this.noteId!, result);
        this.note.set({
          ...this.note()!,
          title: result
        });
        this._snackBar.open('Título de la nota editado', 'Cerrar', { duration: 2000 });
      };
    });
  };

  openDialogDeleteNote(): void {
    const dialogRef = this.dialog.open(DelNoteDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        console.log('Deleting note...');
        this.rxdbService.deleteNoteById(this.noteId!);
        this.editor?.destroy();
        this.router.navigate(['/notes']);
        this._snackBar.open('Nota eliminada', 'Cerrar', { duration: 2000 });
      };
    });
  };
};
