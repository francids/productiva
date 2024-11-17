import { AfterViewInit, Component } from '@angular/core';
import { TitleService } from '../../services/title.service';
import { HomeBoxComponent } from "../../components/home-box/home-box.component";

@Component({
  selector: 'home-page',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [HomeBoxComponent],
})
export class HomeComponent implements AfterViewInit {
  constructor(
    private titleService: TitleService,
  ) { }

  ngAfterViewInit() {
    Promise.resolve().then(() => this.titleService.updateTitle("Productiva Mente"));
  }
}
