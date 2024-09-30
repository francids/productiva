import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterLink } from '@angular/router';
import { RxdbService } from '../../services/rxdb.service';
import { Note } from '../../models/note.model';
import { v4 as uuidv4 } from 'uuid';
import { NewNoteDialogComponent } from '../../components/notes/new-note-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'note-welcome',
  standalone: true,
  templateUrl: './note-welcome.component.html',
  styleUrl: './note-welcome.component.css',
  imports: [RouterLink, MatCardModule, MatButtonModule, MatDividerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteWelcomeComponent {
  notes = signal<{
    id: string,
    title: string,
  }[]>([]);
  readonly dialog = inject(MatDialog);
  readonly newNoteTitle = signal('');

  constructor(private router: Router, private rxdbService: RxdbService) {
    this.loadNotes();
  };

  async loadNotes(): Promise<void> {
    (await this.rxdbService.getNotesObservable()).subscribe((notes: Note[]) => {
      this.notes.set(notes.map(note => ({
        id: note.id,
        title: note.title,
      })));
    });
  };

  createNewNote(title: string): void {
    const newNoteId = uuidv4();
    this.rxdbService.createNote(
      {
        id: newNoteId,
        title: title,
        content: ''
      }
    );
    this.router.navigate(['/notes', newNoteId]);
  };

  openDialogCreateNote(): void {
    const dialogRef = this.dialog.open(NewNoteDialogComponent, {
      data: { title: this.newNoteTitle() },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.newNoteTitle.set(result);
        this.createNewNote(this.newNoteTitle());
      }
    });
  };
}
