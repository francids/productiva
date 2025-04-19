import { Routes } from '@angular/router';
import { NotesComponent } from './notes.component';
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
        path: "edit/:id",
        component: NoteEditComponent
      },
    ]
  }
];
