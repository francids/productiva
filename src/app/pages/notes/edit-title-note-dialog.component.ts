import { Component, inject, model } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

@Component({
  selector: "edit-title-note-dialog",
  templateUrl: "./edit-title-note-dialog.component.html",
  standalone: true,
  imports: [MatDialogModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
})
export class EditTitleNoteDialogComponent {
  readonly dialogRef = inject(MatDialogRef<EditTitleNoteDialogComponent>);
  readonly data = inject<{ title: string }>(MAT_DIALOG_DATA);
  readonly title = model(this.data.title);
}
