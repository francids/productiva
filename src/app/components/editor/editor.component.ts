import { Component, ElementRef, ViewChild } from '@angular/core';
import { defaultValueCtx, Editor, rootCtx } from '@milkdown/kit/core';
import { commonmark } from '@milkdown/kit/preset/commonmark';
import { nord } from '@milkdown/theme-nord';
@Component({
  selector: 'editor-component',
  standalone: true,
  imports: [],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css'
})
export class EditorComponent {
  @ViewChild('editorRef')
  editorRef!: ElementRef;

  defaultValue = '';

  ngAfterViewInit() {
    Editor.make()
      .config((ctx) => {
        ctx.set(rootCtx, this.editorRef.nativeElement);
        ctx.set(defaultValueCtx, this.defaultValue);
      })
      .use(commonmark)
      .create();
  }
}
