import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import EditorJS, { BlockToolConstructable } from '@editorjs/editorjs';
import Header from '@editorjs/header';
import NestedList from '@editorjs/nested-list';

@Component({
  selector: 'note-create',
  templateUrl: "./note-create.component.html"
})
export class NoteCreateComponent implements AfterViewInit {
  @ViewChild("editor", {
    read: ElementRef,
    static: true
  })
  editorElement: ElementRef | undefined;

  private editor: EditorJS | undefined;

  ngAfterViewInit() {
    this.editor = new EditorJS({
      minHeight: 300,
      holder: this.editorElement?.nativeElement,
      placeholder: 'Escribe algo interesante...',
      tools: {
        list: {
          class: NestedList as unknown as BlockToolConstructable,
          inlineToolbar: true,
          config: {
            defaultStyle: 'unordered'
          }
        },
        header: {
          class: Header as unknown as BlockToolConstructable,
          config: {
            placeholder: 'Introduce un encabezado...',
            levels: [2, 3, 4],
            defaultLevel: 2,
          }
        },
      }
    });
  }
}
