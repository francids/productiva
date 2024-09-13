import { Routes } from '@angular/router';

import { NotesComponent } from './pages/notes/notes.component';
import { TasksComponent } from './pages/tasks/tasks.component';

export const routes: Routes = [
  { path: 'notes', component: NotesComponent },
  { path: 'tasks', component: TasksComponent }
];
