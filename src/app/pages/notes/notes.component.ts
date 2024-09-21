import { Component } from '@angular/core';
import { EditorComponent, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'notes-page',
  standalone: true,
  imports: [EditorComponent, MatCardModule, MatIconModule],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }
  ],
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

  init: EditorComponent['init'] = {
    plugins: 'lists link image table code help wordcount',
    base_url: '/tinymce',
    suffix: '.min'
  };
}
