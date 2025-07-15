import { Component, inject, signal } from "@angular/core";
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

@Component({
  selector: "edit-task-dialog",
  template: `
    <h2 mat-dialog-title i18n="@@dialogs.edit-task">Editar tarea</h2>
    <mat-dialog-content>
      <form
        [formGroup]="taskForm()"
        (ngSubmit)="taskForm().valid && onSaveClick()"
      >
        <mat-form-field>
          <mat-label i18n="@@dialogs.task-title">Título de la tarea</mat-label>
          <input matInput formControlName="title" />
          @if (taskForm().get('title')!.hasError('required')) {
          <mat-error i18n="@@dialogs.error.title-required"
            >El título es obligatorio.</mat-error
          >
          }
        </mat-form-field>
        <mat-form-field>
          <mat-label i18n="@@dialogs.task-description"
            >Descripción de la tarea</mat-label
          >
          <textarea matInput formControlName="description"></textarea>
          @if (taskForm().get('description')!.hasError('required')) {
          <mat-error i18n="@@dialogs.error.description-required"
            >La descripción es obligatoria.</mat-error
          >
          }
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="onNoClick()" i18n="@@dialogs.cancel">
        Cancelar
      </button>
      <button
        mat-button
        (click)="onSaveClick()"
        [disabled]="taskForm().invalid"
        i18n="@@dialogs.save"
      >
        Guardar
      </button>
    </mat-dialog-actions>
  `,
  styles: [
    `
      form {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }
    `,
  ],
  imports: [
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
})
export class EditTaskDialogComponent {
  private readonly fb = inject(FormBuilder);
  readonly dialogRef = inject(MatDialogRef<EditTaskDialogComponent>);
  readonly data = inject<{ title: string; description: string }>(
    MAT_DIALOG_DATA
  );
  readonly taskForm = signal(
    this.fb.group({
      title: [this.data.title, [Validators.required]],
      description: [this.data.description, [Validators.required]],
    })
  );

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.taskForm().valid) {
      const newTask = this.taskForm().value;
      this.dialogRef.close(newTask);
    }
  }
}
