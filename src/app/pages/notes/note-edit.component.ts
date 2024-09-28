import { ChangeDetectionStrategy, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import EditorJS, { BlockToolConstructable } from '@editorjs/editorjs';
import Header from '@editorjs/header';
import NestedList from '@editorjs/nested-list';
import { RxdbService } from '../../services/rxdb.service';
import { OutputData } from '@editorjs/editorjs';
import { MatButtonModule } from '@angular/material/button';
import { Note } from '../../models/note.model';
import { MatDialog } from '@angular/material/dialog';
import { DelNoteDialogComponent } from './del-note-dialog.component';

@Component({
  selector: 'note-edit',
  template: `
    <div class="note-edit-header">
      <p class="note-title">{{note!.title}}</p>
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
    }
  `],
  standalone: true,
  imports: [MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteEditComponent {
  noteId: string | undefined;
  note: Note | undefined;
  readonly dialog = inject(MatDialog);

  @ViewChild("editor", {
    read: ElementRef,
    static: true
  })
  editorElement: ElementRef | undefined;

  private editor: EditorJS | undefined;

  constructor(private route: ActivatedRoute, private router: Router, private rxdbService: RxdbService) {
    this.route.params.subscribe(async params => {
      if (this.editor) {
        this.editor.destroy();
      };
      this.noteId = params['id'];
      this.note = await this.rxdbService.getNoteById(this.noteId!);
      let noteValue: {
        time: number,
        blocks: [],
        version: string
      } | undefined;
      try {
        noteValue = JSON.parse(this.note?.content!);
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
      console.log(this.note?.content);
    });
  };

  saveNote(): void {
    console.log('Saving note...');
    this.editor?.save().then((outputData: OutputData) => {
      this.rxdbService.updateNoteContent(this.noteId!, outputData);
    });
    console.log('Note saved');
  };

  openDialogDeleteNote(): void {
    const dialogRef = this.dialog.open(DelNoteDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        console.log('Deleting note...');
        this.rxdbService.deleteNoteById(this.noteId!);
        this.editor?.destroy();
        this.router.navigate(['/notes']);
      };
    });
  };
}
