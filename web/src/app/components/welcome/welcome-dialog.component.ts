import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "welcome-dialog",
  template: `
    <h2 mat-dialog-title i18n="@@dialogs.welcome.title">
      ¡Bienvenido a Productiva Mente!
    </h2>
    <mat-dialog-content>
      <p class="mat-body-medium" i18n="@@dialogs.welcome.description">
        Productiva Mente es una aplicación web para la gestión de tareas y
        notas.
      </p>
      <p class="mat-body-medium">
        <strong i18n="@@dialogs.welcome.features"
          >Características principales:</strong
        >
      </p>
      <ul>
        <li i18n="@@dialogs.welcome.feature1">
          Gestión de notas con editor Markdown
        </li>
        <li i18n="@@dialogs.welcome.feature2">
          Organización de tareas con prioridades
        </li>
        <li i18n="@@dialogs.welcome.feature3">
          Almacenamiento local para garantizar tu privacidad
        </li>
        <li i18n="@@dialogs.welcome.feature4">Modo oscuro</li>
        <li i18n="@@dialogs.welcome.feature5">Funcionamiento sin conexión</li>
      </ul>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button
        mat-button
        (click)="onNoClick()"
        color="primary"
        i18n="@@dialogs.welcome.close"
      >
        Comenzar
        <mat-icon>シ</mat-icon>
      </button>
    </mat-dialog-actions>
  `,
  styles: [
    `
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
    `,
  ],
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
})
export class WelcomeDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<WelcomeDialogComponent>);

  onNoClick(): void {
    this.dialogRef.close();
  }
}
