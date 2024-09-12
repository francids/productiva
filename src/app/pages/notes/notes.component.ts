import { Component } from '@angular/core';
import { EditorComponent } from "../../components/editor/editor.component";

@Component({
  selector: 'notes-page',
  standalone: true,
  imports: [EditorComponent],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css'
})
export class NotesComponent {

}
