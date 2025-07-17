// Angular
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
  OnDestroy,
  input,
  output,
  viewChild,
} from "@angular/core";
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
export class EditorComponent implements AfterViewInit, OnChanges, OnDestroy {
  content = input<string>("");
  contentChange = output<string>();

  readonly editorRef = viewChild<ElementRef>("editorRef");

  private editor: Editor | undefined;
  private placeholders = [
    $localize`:@@editor.placeholder1:Escribe aquí tu nota...`,
    $localize`:@@editor.placeholder2:¿Qué tienes en mente hoy?`,
    $localize`:@@editor.placeholder3:Comienza a escribir...`,
    $localize`:@@editor.placeholder4:Plasma tus ideas aquí...`,
    $localize`:@@editor.placeholder5:Toma una nota rápida...`,
    $localize`:@@editor.placeholder6:Escribe algo interesante...`,
    $localize`:@@editor.placeholder7:Reflexiona sobre tu día...`,
    $localize`:@@editor.placeholder8:¡No olvides tus ideas!`,
    $localize`:@@editor.placeholder9:Escribe tus pensamientos...`,
    $localize`:@@editor.placeholder10:Captura tu creatividad...`,
    $localize`:@@editor.placeholder11:Escribe algo genial...`,
    $localize`:@@editor.placeholder12:Deja volar tu imaginación...`,
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
    if (!this.editorRef()) return;

    const isDocEmpty = (doc: Node) => {
      return doc.childCount <= 1 && !doc.firstChild?.content.size;
    };

    const createPlaceholderDecoration = (
      state: EditorState,
      placeholderText: string
    ): Decoration | null => {
      const { selection } = state;
      if (!selection.empty) return null;

      const $pos = selection.$anchor;
      const node = $pos.parent;
      if (node.content.size > 0) return null;

      const inTable = findParent((node) => node.type.name === "table")($pos);
      if (inTable) return null;

      const before = $pos.before();

      return Decoration.node(before, before + node.nodeSize, {
        class: "editor-placeholder",
        "data-placeholder": placeholderText,
      });
    };

    const placeholderPlugin: MilkdownPlugin = (ctx) => {
      return async () => {
        const plugins = [
          new Plugin({
            key: new PluginKey("placeholderKey"),
            props: {
              decorations: (state) => {
                if (!isDocEmpty(state.doc)) return DecorationSet.empty;
                const deco = createPlaceholderDecoration(
                  state,
                  this.getRandomPlaceholder()
                );
                if (!deco) return DecorationSet.empty;
                return DecorationSet.create(state.doc, [deco]);
              },
            },
          }),
        ];
        ctx.set(prosePluginsCtx, plugins);
      };
    };

    this.editor = await Editor.make()
      .config((ctx) => {
        ctx.set(rootCtx, this.editorRef()!.nativeElement);
        ctx.set(defaultValueCtx, this.content());
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
      const editorRef = this.editorRef();
      if (editorRef?.nativeElement) {
        const editorElement = editorRef.nativeElement.querySelector(
          '[contenteditable="true"]'
        );
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
