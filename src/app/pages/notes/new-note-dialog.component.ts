import { Component, inject, model } from "@angular/core"
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'new-note-dialog',
  templateUrl: './new-note-dialog.component.html',
  standalone: true,
  imports: [MatDialogModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
})
export class NewNoteDialogComponent {
  readonly dialogRef = inject(MatDialogRef<NewNoteDialogComponent>);
  readonly data = inject<{ title: string }>(MAT_DIALOG_DATA);
  readonly title = model(this.data.title);

  onNoClick(): void {
    this.dialogRef.close();
  }
}
