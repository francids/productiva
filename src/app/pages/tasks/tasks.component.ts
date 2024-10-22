import { Component } from '@angular/core';
import { TitleService } from '../../services/title.service';

@Component({
  selector: 'tasks-page',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  constructor(
    private titleService: TitleService
  ) {
    this.titleService.updateTitle('Tareas');
  }
};
