// Angular
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

// Services
import { NotesService } from '../../services/notes.service';

// Material Components
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatRippleModule } from '@angular/material/core';

// Utils
import { v4 as uuidv4 } from 'uuid';

// Models
import { Note } from '../../models/note.model';

// Dialogs
import { NewNoteDialogComponent } from '../../components/notes/new-note-dialog.component';

@Component({
  selector: 'note-welcome',
  standalone: true,
  templateUrl: './note-welcome.component.html',
  styleUrl: './note-welcome.component.css',
  imports: [RouterLink, MatCardModule, MatButtonModule, MatDividerModule, MatRippleModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteWelcomeComponent {
  notes = signal<{
    id: string,
    title: string,
  }[]>([]);
  readonly dialog = inject(MatDialog);
  readonly newNoteTitle = signal('');

  constructor(
    private router: Router,
    private notesService: NotesService,
  ) {
    this.loadNotes();
  };

  async loadNotes(): Promise<void> {
    this.notesService.notes$?.subscribe((notes: Note[]) => {
      this.notes.set(notes.map(note => ({
        id: note.id,
        title: note.title,
      })));
    });
  };

  createNewNote(title: string): void {
    const newNoteId = uuidv4();
    this.notesService.saveNote({
      id: newNoteId,
      title: title,
      content: ''
    });
    this.router.navigate(['/notes', newNoteId]);
  };

  openDialogCreateNote(): void {
    const dialogRef = this.dialog.open(
      NewNoteDialogComponent,
      {
        data: { title: this.newNoteTitle() },
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.newNoteTitle.set(result);
        this.createNewNote(this.newNoteTitle());
      }
    });
  };
}
