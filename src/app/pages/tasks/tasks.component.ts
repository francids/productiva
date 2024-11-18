// Angular
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Services
import { TitleService } from '../../services/title.service';

// Material Components
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
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
  imports: [MatTableModule, MatSelectModule, FormsModule, MatButtonModule, MatIconModule, MatSortModule],
})
export class TasksComponent implements AfterViewInit {
  constructor(
    private titleService: TitleService,
  ) { }

  tasks: Task[] = [
    {
      id: '1',
      title: 'Completar informe',
      description: 'Terminar el informe final del proyecto y enviarlo al gerente.',
      status: 1,
    },
    {
      id: '2',
      title: 'Revisar código',
      description: 'Revisar el código del proyecto y corregir los errores encontrados.',
      status: 0,
    },
    {
      id: '3',
      title: 'Desplegar aplicación',
      description: 'Desplegar la aplicación en el servidor de producción.',
      status: 2,
    },
  ];

  dataSource = new MatTableDataSource(this.tasks);
  displayedColumns: string[] = ["title", "description", "status"];

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    Promise.resolve().then(() => this.titleService.updateTitle("Tareas"));
    this.dataSource.sort = this.sort;
  }
};
