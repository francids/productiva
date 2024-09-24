import { Routes } from '@angular/router';

import { notesRoutes } from './pages/notes/notes.routes';
import { TasksComponent } from './pages/tasks/tasks.component';

export const routes: Routes = [
  { path: 'notes', children: notesRoutes },
  { path: 'tasks', component: TasksComponent }
];
