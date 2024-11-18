import { Component, inject } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

@Component({
  selector: "edit-task-dialog",
  template: `
  <h2 mat-dialog-title>Editar tarea</h2>
  <mat-dialog-content>
    <form [formGroup]="taskForm" (ngSubmit)="taskForm.valid && onSaveClick()">
      <mat-form-field>
        <mat-label>Título de la tarea</mat-label>
        <input matInput formControlName="title" />
        @if (taskForm.get('title')!.hasError('required')) {
          <mat-error>El título es obligatorio.</mat-error>
        }
      </mat-form-field>
      <mat-form-field>
        <mat-label>Descripción de la tarea</mat-label>
        <textarea matInput formControlName="description"></textarea>
        @if (taskForm.get('description')!.hasError('required')) {
          <mat-error>La descripción es obligatoria.</mat-error>
        }
      </mat-form-field>
    </form>
  </mat-dialog-content>
  <mat-dialog-actions>
    <button mat-button (click)="onNoClick()">Cancelar</button>
    <button mat-button (click)="onSaveClick()" [disabled]="taskForm.invalid">
      Guardar tarea
    </button>
  </mat-dialog-actions>
  `,
  styles: [`
  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  `],
  standalone: true,
  imports: [MatDialogModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
})
export class EditTaskDialogComponent {
  readonly dialogRef = inject(MatDialogRef<EditTaskDialogComponent>);
  readonly data = inject<{ title: string, description: string }>(MAT_DIALOG_DATA);
  taskForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      title: [this.data.title, [Validators.required]],
      description: [this.data.description, [Validators.required]],
    });
  };

  onNoClick(): void {
    this.dialogRef.close();
  };

  onSaveClick(): void {
    if (this.taskForm.valid) {
      const newTask = this.taskForm.value;
      this.dialogRef.close(newTask);
    };
  };
};
