import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'del-task-dialog',
  template: `
  <h2 mat-dialog-title i18n="@@dialogs.delete-task">Eliminar tarea</h2>
  <mat-dialog-actions>
    <button mat-button mat-dialog-close i18n="@@dialogs.cancel">Cancelar</button>
    <button mat-button [mat-dialog-close]="true" i18n="@@dialogs.delete">
      Eliminar
    </button>
  </mat-dialog-actions>
`,
  imports: [MatDialogModule, MatButtonModule]
})
export class DelTaskDialogComponent {
  readonly dialogRef = inject(MatDialogRef<DelTaskDialogComponent>);
  readonly data = inject(MAT_DIALOG_DATA);
};
