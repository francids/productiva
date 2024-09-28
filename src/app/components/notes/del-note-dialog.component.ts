import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'del-note-dialog',
  templateUrl: './del-note-dialog.component.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class DelNoteDialogComponent {
  readonly dialogRef = inject(MatDialogRef<DelNoteDialogComponent>);
  readonly data = inject(MAT_DIALOG_DATA);
}