import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'note-edit',
  template: `<p>Editar nota {{noteId}}</p>`
})
export class NoteEditComponent implements OnInit {
  noteId: string | undefined;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.noteId = params['id'];
    })
  }
}
