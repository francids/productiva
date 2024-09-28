import { AfterViewInit, Component } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { RxdbService } from '../../services/rxdb.service';
import { Note } from '../../models/note.model';

@Component({
  selector: 'notes-page',
  standalone: true,
  imports: [RouterLink, RouterOutlet, MatCardModule, MatListModule, MatDividerModule, MatButtonModule, MatIconModule],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css'
})
export class NotesComponent implements AfterViewInit {
  notes: Note[] = [];

  constructor(private router: Router, private rxdbService: RxdbService) { }

  trackByNoteId(index: number, note: Note): string {
    return note.id;
  }

  ngAfterViewInit(): void {
    this.loadNotes();
  }

  async loadNotes(): Promise<void> {
    (await this.rxdbService.getNotesObservable()).subscribe((notes: Note[]) => {
      this.notes = notes;
    });
  }

  isPageEditingNote(): boolean {
    return !(this.router.url === "/notes");
  }

  createNewNote(): void {
    const newNoteId = uuidv4();
    this.rxdbService.createNote(
      {
        id: newNoteId,
        title: 'New Note',
        content: ''
      }
    );
    this.router.navigate(['/notes', newNoteId]);
  }
}
