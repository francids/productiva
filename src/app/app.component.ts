import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet, RouterLinkActive, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import 'zone.js/plugins/zone-patch-rxjs';
import { TitleService } from './services/title.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet, RouterLinkActive, MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatDividerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title: string = 'Productiva Mente';

  constructor(
    public router: Router,
    private titleService: TitleService,
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.titleService.title$.subscribe(title => {
        this.title = title;
      });
    }, 0);
  }
};
