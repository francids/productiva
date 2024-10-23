import { Component, inject } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'new-note-dialog',
  templateUrl: './new-note-dialog.component.html',
  standalone: true,
  imports: [MatDialogModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
})
export class NewNoteDialogComponent {
  readonly dialogRef = inject(MatDialogRef<NewNoteDialogComponent>);
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
      this.dialogRef.close(this.titleForm.value.title);
    };
  };
};
