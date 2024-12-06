// Angular
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet, RouterLinkActive, Router, NavigationEnd } from '@angular/router';

// RxJS
import { filter } from 'rxjs/operators';

// Modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { LogoComponent } from "./logo/logo.component";

// Services
import { TitleService } from './services/title.service';

// Zone.js
import 'zone.js/plugins/zone-patch-rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterOutlet, MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatDividerModule, LogoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title: string = 'Productiva Mente';
  currentRoute: string = '';

  constructor(
    public router: Router,
    private titleService: TitleService,
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentRoute = event.urlAfterRedirects;
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.titleService.title$.subscribe(title => {
        this.title = title;
      });
    }, 0);
  }

  isEditPage(): boolean {
    return this.currentRoute.includes('/notes/edit');
  }
};
