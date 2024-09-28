import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { RxdbService } from '../../services/rxdb.service';
import { Note } from '../../models/note.model';
import { NewNoteDialogComponent } from './new-note-dialog.component';

@Component({
  selector: 'notes-page',
  standalone: true,
  imports: [RouterLink, RouterOutlet, MatCardModule, MatListModule, MatDividerModule, MatButtonModule, MatIconModule],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesComponent {
  notes: Note[] = [];
  readonly dialog = inject(MatDialog);
  readonly noteTitle = signal('');

  constructor(private router: Router, private rxdbService: RxdbService) {
    this.loadNotes();
  }

  trackByNoteId(index: number, note: Note): string {
    return note.id;
  }

  async loadNotes(): Promise<void> {
    (await this.rxdbService.getNotesObservable()).subscribe((notes: Note[]) => {
      this.notes = notes;
    });
  }

  isPageEditingNote(): boolean {
    return !(this.router.url === "/notes");
  }

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
  }

  openDialogCreateNote(): void {
    const dialogRef = this.dialog.open(NewNoteDialogComponent, {
      data: { title: this.noteTitle() },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.noteTitle.set(result);
        this.createNewNote(this.noteTitle());
      }
    });
  }
}
