import { Component } from '@angular/core';
import { TitleService } from '../../services/title.service';

@Component({
  selector: 'home-page',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(
    private titleService: TitleService
  ) {
    this.titleService.updateTitle('Productiva Mente');
  }
}
