import { Routes } from '@angular/router';
import { NotesComponent } from './notes.component';
import { NoteCreateComponent } from './note-create.component';
import { NoteWelcomeComponent } from './note-welcome.component';
import { NoteEditComponent } from './note-edit.component';

export const notesRoutes: Routes = [
  {
    path: '',
    component: NotesComponent,
    children: [
      {
        path: "",
        component: NoteWelcomeComponent
      },
      {
        path: "new",
        component: NoteCreateComponent
      },
      {
        path: ":id",
        component: NoteEditComponent
      }
    ]
  }
];
