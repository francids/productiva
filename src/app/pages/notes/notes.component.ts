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
  :host {
    display: flex;
    flex-grow: 1;
  }
  main {
    margin: 1rem;
    display: flex;
    flex-grow: 1;
  }
  `],
})
export class NotesComponent { };
