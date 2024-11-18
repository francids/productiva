import { Component, inject } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

@Component({
  selector: 'new-task-dialog',
  template: `
  <h2 mat-dialog-title>Crear tarea</h2>
  <mat-dialog-content>
    <div class="nothing"></div>
    <form [formGroup]="form" (ngSubmit)="form.valid && onSaveClick()">
      <mat-form-field appearance="outline">
        <mat-label>Título de la tarea</mat-label>
        <input matInput formControlName="title" />
        @if (form.get('title')!.hasError('required')) {
          <mat-error>El título es obligatorio.</mat-error>
        }
      </mat-form-field>
      <mat-form-field appearance="outline">
        <mat-label>Descripción de la tarea</mat-label>
        <input matInput formControlName="description" />
        @if (form.get('description')!.hasError('required')) {
          <mat-error>La descripción es obligatoria.</mat-error>
        }
      </mat-form-field>
    </form>
  <mat-dialog-content>
  <mat-dialog-actions>
    <button mat-button (click)="onNoClick()">Cancelar</button>
    <button mat-button (click)="onSaveClick()" [disabled]="form.invalid">
      Crear tarea
    </button>
  </mat-dialog-actions>
  `,
  styles: [`
  .nothing {
    height: 0.5rem;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  }
  form > * {
    width: 100%;
  }
  `],
  standalone: true,
  imports: [MatDialogModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
})
export class NewTaskDialogComponent {
  readonly dialogRef = inject(MatDialogRef<NewTaskDialogComponent>);
  readonly data = inject<{ title: string, description: string }>(MAT_DIALOG_DATA);
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: [
        this.data.title, [Validators.required],
      ],
      description: [
        this.data.description,
        [Validators.required],
      ],
    })
  };

  onNoClick(): void {
    this.dialogRef.close();
  };

  onSaveClick(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    };
  };
};
