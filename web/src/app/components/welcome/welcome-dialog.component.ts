import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'welcome-dialog',
  template: `
  <h2 mat-dialog-title>¡Bienvenido a Productiva Mente!</h2>
  <mat-dialog-content>
    <p class="mat-body-medium">
      Productiva Mente es una aplicación web para la gestión de tareas y notas.
    </p>
    <p class="mat-body-medium">
      <strong>Características principales:</strong>
    </p>
    <ul>
      <li>Gestión de notas con editor Markdown</li>
      <li>Organización de tareas con prioridades</li>
      <li>Almacenamiento local para garantizar tu privacidad</li>
      <li>Modo oscuro</li>
      <li>Funcionamiento sin conexión</li>
    </ul>
  </mat-dialog-content>
  <mat-dialog-actions>
    <button mat-button (click)="onNoClick()" color="primary">
      Comenzar
      <mat-icon>シ</mat-icon>
    </button>
  </mat-dialog-actions>
  `,
  styles: [`
    h2[mat-dialog-title] {
      user-select: none;
    }
    mat-dialog-content {
      min-height: 160px;
      max-width: 400px;
      user-select: none;
    }
    ul {
      padding-left: 20px;
    }
  `],
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
})
export class WelcomeDialogComponent {
  constructor(public dialogRef: MatDialogRef<WelcomeDialogComponent>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
