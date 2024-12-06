import { Component, inject } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'new-note-dialog',
  template: `
  <h2 mat-dialog-title>Crear nota</h2>
  <mat-dialog-content>
    <form [formGroup]="titleForm" (ngSubmit)="titleForm.valid && onSaveClick()">
      <mat-form-field>
        <mat-label>Título de la nota</mat-label>
        <input matInput formControlName="title" />
        @if (titleForm.get('title')!.hasError('required')) {
          <mat-error>El título es obligatorio.</mat-error>
        }
      </mat-form-field>
    </form>
  </mat-dialog-content>
  <mat-dialog-actions>
    <button mat-button (click)="onNoClick()">Cancelar</button>
    <button mat-button (click)="onSaveClick()" [disabled]="titleForm.invalid">
      Crear nota
    </button>
  </mat-dialog-actions>
  `,
  imports: [MatDialogModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule]
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
