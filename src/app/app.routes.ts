import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { notesRoutes } from './pages/notes/notes.routes';
import { TasksComponent } from './pages/tasks/tasks.component';

export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: 'notes', children: notesRoutes },
  { path: 'tasks', component: TasksComponent }
];
