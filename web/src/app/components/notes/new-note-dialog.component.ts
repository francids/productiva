import { ChangeDetectionStrategy, signal, inject } from "@angular/core";
import { FormBuilder, Validators, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

import { Component } from "@angular/core";

@Component({
  selector: "new-note-dialog",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h2 mat-dialog-title i18n="@@dialogs.create-note">Crear nota</h2>
    <mat-dialog-content>
      <form [formGroup]="titleForm()" (ngSubmit)="onSaveClick()">
        <mat-form-field>
          <mat-label i18n="@@dialogs.note-title">Título de la nota</mat-label>
          <input matInput formControlName="title" />
          @if (titleForm().get('title')?.hasError('required')) {
          <mat-error i18n="@@dialogs.error.title-required">
            El título es obligatorio.
          </mat-error>
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
        type="submit"
        [disabled]="titleForm().invalid"
        i18n="@@dialogs.save"
        (click)="onSaveClick()"
      >
        Guardar
      </button>
    </mat-dialog-actions>
  `,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
})
export class NewNoteDialogComponent {
  readonly dialogRef = inject(MatDialogRef<NewNoteDialogComponent>);
  readonly data = inject<{ title: string }>(MAT_DIALOG_DATA);
  private readonly fb = inject(FormBuilder);

  readonly titleForm = signal(
    this.fb.group({
      title: [this.data.title, [Validators.required]],
    })
  );

  onNoClick() {
    this.dialogRef.close();
  }

  onSaveClick() {
    if (this.titleForm().valid) {
      this.dialogRef.close(this.titleForm().value.title);
    }
  }
}
