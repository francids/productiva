import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { notesRoutes } from './pages/notes/notes.routes';
import { TasksComponent } from './pages/tasks/tasks.component';
import { SettingsComponent } from './pages/settings/settings.component';

export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: 'notes', children: notesRoutes },
  { path: 'tasks', component: TasksComponent },
  { path: "settings", component: SettingsComponent },
];
