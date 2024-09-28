import { Component, inject, model } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: "edit-title-note-dialog",
  templateUrl: "./edit-title-note-dialog.component.html",
  standalone: true,
  imports: [MatDialogModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
})
export class EditTitleNoteDialogComponent {
  readonly dialogRef = inject(MatDialogRef<EditTitleNoteDialogComponent>);
  readonly data = inject<{ title: string }>(MAT_DIALOG_DATA);
  titleForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.titleForm = this.fb.group({
      title: [this.data.title, [Validators.required]]
    });
  };

  onNoClick(): void {
    this.dialogRef.close();
  };

  onSaveClick(): void {
    if (this.titleForm.valid) {
      const newTitle = this.titleForm.value.title;
      if (newTitle !== this.data.title) {
        this.dialogRef.close(newTitle);
      } else {
        this.dialogRef.close();
      };
    };
  };
};
