import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'notes-page',
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`,
  styles: [`
  :host {
    display: flex;
    flex-grow: 1;
  }
  `]
})
export class NotesComponent { };
