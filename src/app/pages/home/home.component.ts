import { Component } from '@angular/core';
import { TitleService } from '../../services/title.service';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core'
import { RouterLink } from '@angular/router';

@Component({
  selector: 'home-page',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [MatCardModule, MatRippleModule, RouterLink]
})
export class HomeComponent {
  constructor(
    private titleService: TitleService
  ) {
    this.titleService.updateTitle('Productiva Mente');
  }
}
