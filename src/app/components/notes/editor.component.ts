// Angular
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild, AfterViewInit } from "@angular/core";
import { CommonModule } from "@angular/common";

// Milkdown
import { Editor, rootCtx, defaultValueCtx } from "@milkdown/kit/core";
import { commonmark } from "@milkdown/kit/preset/commonmark";
import { nord } from "@milkdown/theme-nord";
import { listener, listenerCtx } from "@milkdown/kit/plugin/listener";
import { clipboard } from "@milkdown/kit/plugin/clipboard";
import { history } from "@milkdown/kit/plugin/history";
import { findParent } from "@milkdown/kit/prose";
import type { Node } from "@milkdown/kit/prose/model";
import { Decoration, DecorationSet } from "@milkdown/kit/prose/view";
import type { MilkdownPlugin } from "@milkdown/kit/ctx";
import { type EditorState, Plugin, PluginKey } from "@milkdown/kit/prose/state";
import { prosePluginsCtx } from "@milkdown/kit/core";

@Component({
  selector: "app-editor",
  template: "<div #editorRef></div>",
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorComponent implements AfterViewInit, OnChanges {
  @Input() content: string = "";
  @Output() contentChange = new EventEmitter<string>();

  @ViewChild("editorRef")
  editorRef: ElementRef | undefined;

  private editor: Editor | undefined;
  private placeholders = [
    "Escribe aquí tu nota...",
    "¿Qué tienes en mente hoy?",
    "Comienza a escribir...",
    "Plasma tus ideas aquí...",
    "Toma una nota rápida...",
    "Documenta tus pensamientos...",
    "Nueva idea brillante...",
    "Anota tus reflexiones...",
  ];

  private getRandomPlaceholder(): string {
    const randomIndex = Math.floor(Math.random() * this.placeholders.length);
    return this.placeholders[randomIndex];
  }

  ngAfterViewInit(): void {
    this.initEditor();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["content"] && !changes["content"].firstChange && this.editor) {
      this.destroyEditor();
      setTimeout(() => this.initEditor(), 0);
    }
  }

  private async initEditor(): Promise<void> {
    if (!this.editorRef) return;

    const isDocEmpty = (doc: Node) => {
      return doc.childCount <= 1 && !doc.firstChild?.content.size
    }

    const createPlaceholderDecoration = (
      state: EditorState,
      placeholderText: string
    ): Decoration | null => {
      const { selection } = state
      if (!selection.empty) return null

      const $pos = selection.$anchor
      const node = $pos.parent
      if (node.content.size > 0) return null

      const inTable = findParent((node) => node.type.name === "table")($pos)
      if (inTable) return null

      const before = $pos.before()

      return Decoration.node(before, before + node.nodeSize, {
        class: "editor-placeholder",
        "data-placeholder": placeholderText,
      })
    }

    const placeholderPlugin: MilkdownPlugin = (ctx) => {
      return async () => {
        const plugins = [
          new Plugin({
            key: new PluginKey("placeholderKey"),
            props: {
              decorations: (state) => {
                if (!isDocEmpty(state.doc)) return DecorationSet.empty;
                const deco = createPlaceholderDecoration(state, this.getRandomPlaceholder());
                if (!deco) return DecorationSet.empty;
                return DecorationSet.create(state.doc, [deco]);
              }
            },
          })
        ]
        ctx.set(prosePluginsCtx, plugins);
      }
    }

    this.editor = await Editor.make()
      .config((ctx) => {
        ctx.set(rootCtx, this.editorRef!.nativeElement);
        ctx.set(defaultValueCtx, this.content);
      })
      .config((ctx) => {
        const listener = ctx.get(listenerCtx);
        listener.markdownUpdated((ctx, markdown, prevMarkdown) => {
          if (markdown !== prevMarkdown) {
            this.contentChange.emit(markdown);
          }
        });
      })
      .config(nord)
      .use(placeholderPlugin)
      .use(commonmark)
      .use(listener)
      .use(clipboard)
      .use(history)
      .create();

    setTimeout(() => {
      if (this.editorRef?.nativeElement) {
        const editorElement = this.editorRef.nativeElement.querySelector("[contenteditable=\"true\"]");
        if (editorElement) {
          editorElement.focus();
        }
      }
    }, 100);
  }

  private destroyEditor(): void {
    this.editor?.destroy();
    this.editor = undefined;
  }

  ngOnDestroy(): void {
    this.destroyEditor();
  }
}
