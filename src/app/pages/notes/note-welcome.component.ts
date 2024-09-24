import { Component } from '@angular/core';

@Component({
  selector: 'note-welcome',
  template: `<p>¡Bienvenido a la página de notas!</p>`,
  styles: [`
    p { 
      text-align: center;
      font-size: 1.1em;
    }
   `]
})
export class NoteWelcomeComponent { }
