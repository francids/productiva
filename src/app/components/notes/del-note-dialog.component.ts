import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'del-note-dialog',
  template: `
  <h2 mat-dialog-title>Eliminar nota</h2>
  <mat-dialog-actions>
    <button mat-button mat-dialog-close>
      Cancelar
    </button>
    <button mat-button [mat-dialog-close]="true">
      Eliminar nota
    </button>
  </mat-dialog-actions>
`,
  imports: [MatDialogModule, MatButtonModule]
})
export class DelNoteDialogComponent {
  readonly dialogRef = inject(MatDialogRef<DelNoteDialogComponent>);
  readonly data = inject(MAT_DIALOG_DATA);
};
