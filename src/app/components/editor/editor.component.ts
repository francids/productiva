import { Component, ElementRef, ViewChild } from '@angular/core';
import { defaultValueCtx, Editor, editorViewOptionsCtx, rootCtx } from '@milkdown/kit/core';
import { commonmark } from '@milkdown/kit/preset/commonmark';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'editor-component',
  standalone: true,
  imports: [MatToolbarModule],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css'
})
export class EditorComponent {
  @ViewChild('editorRef')
  editorRef!: ElementRef;

  defaultValue = '';

  ngAfterViewInit() {
    Editor
      .make()
      .config((ctx) => {
        ctx.set(rootCtx, this.editorRef.nativeElement);
        ctx.set(defaultValueCtx, this.defaultValue);
        ctx.update(editorViewOptionsCtx, (prev) => ({
          ...prev,
          attributes: {
            class: 'cool-editor',
          },
        }));
      })
      .use(commonmark)
      .create();
  }
}
