import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'notes-page',
  standalone: true,
  imports: [RouterOutlet],
  template: `
  <main>
    <router-outlet></router-outlet>
  </main>
  `,
  styles: [`
  main {
    margin: 1rem;
  }
  `],
})
export class NotesComponent { };
