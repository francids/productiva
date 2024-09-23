import { Component } from '@angular/core';
import { EditorComponent, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'notes-page',
  standalone: true,
  imports: [EditorComponent, MatCardModule],
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
    base_url: '/tinymce',
    suffix: '.min',
    menubar: false,
    statusbar: false,
    plugins: "codesample hr image link lists checklist",
    toolbar:
      "styles | bold italic underline strikethrough forecolor backcolor | image link codesample hr | bullist numlist checklist",
    style_formats: [
      { title: "Title", block: "h1" },
      { title: "Heading", block: "h2" },
      { title: "Sub heading", block: "h3" },
      { title: "Paragraph", block: "p" },
      { title: "Code", inline: "code" },
      { title: "Quote", block: "blockquote" },
      { title: "Callout", block: "div", classes: "call-out" },
    ],
  };
}
