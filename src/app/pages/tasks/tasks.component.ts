// Angular
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Services
import { TitleService } from '../../services/title.service';

// Material Components
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule } from '@angular/material/sort';

// Models
import { Task } from '../../models/task.model';

@Component({
  selector: 'tasks-page',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
  imports: [MatTableModule, MatCheckboxModule, FormsModule, MatButtonModule, MatIconModule, MatSortModule],
})
export class TasksComponent implements AfterViewInit {
  constructor(
    private titleService: TitleService
  ) {
    this.titleService.updateTitle('Tareas');
  }

  tasks: Task[] = [
    {
      id: '1',
      title: 'Completar informe',
      description: 'Terminar el informe final del proyecto y enviarlo al gerente.',
      completed: false
    },
    {
      id: '2',
      title: 'Reunión de equipo',
      description: 'Asistir a la reunión semanal del equipo para discutir actualizaciones y obstáculos del proyecto.',
      completed: true
    },
    {
      id: '3',
      title: 'Revisión de código',
      description: 'Revisar el código enviado por el equipo de desarrollo y proporcionar retroalimentación.',
      completed: false
    },
    {
      id: '4',
      title: 'Presentación al cliente',
      description: 'Preparar y entregar la presentación para la reunión con el cliente la próxima semana.',
      completed: true
    },
    {
      id: '5',
      title: 'Actualizar documentación',
      description: 'Actualizar la documentación del proyecto con los últimos cambios y mejoras.',
      completed: false
    },
    {
      id: '6',
      title: 'Corregir errores',
      description: 'Identificar y corregir errores reportados por el equipo de QA en la última versión.',
      completed: true
    },
  ];

  dataSource = new MatTableDataSource(this.tasks);
  displayedColumns: string[] = ["title", "description", "completed"];

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
};
