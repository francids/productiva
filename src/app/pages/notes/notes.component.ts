import { Component } from '@angular/core';
import { EditorComponent } from "../../components/editor/editor.component";
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'notes-page',
  standalone: true,
  imports: [EditorComponent, MatCardModule, MatIconModule],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css'
})
export class NotesComponent {
  notes = [
    {
      id: 1,
      title: "Note 1",
      content: "This is the first note"
    },
    {
      id: 2,
      title: "Note 2",
      content: "This is the second note"
    },
  ];
}
