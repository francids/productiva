// Angular
import {
  Component,
  inject,
  signal,
  effect,
  computed,
  ChangeDetectionStrategy,
} from "@angular/core";
import {
  RouterLink,
  RouterOutlet,
  Router,
  NavigationEnd,
} from "@angular/router";

// RxJS
import { filter } from "rxjs/operators";

// Modules
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from "@angular/material/divider";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatDialog } from "@angular/material/dialog";

// Components
import { LogoComponent } from "./components/logo/logo.component";
import { WelcomeDialogComponent } from "./components/welcome/welcome-dialog.component";

// Services
import { TitleService } from "./services/title.service";
import { FirstVisitService } from "./services/first-visit.service";

@Component({
  selector: "app-root",
  imports: [
    RouterLink,
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    LogoComponent,
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private router = inject(Router);
  private titleService = inject(TitleService);
  private firstVisitService = inject(FirstVisitService);
  private dialog = inject(MatDialog);

  title = signal("Productiva Mente");
  currentRoute = signal("");

  isEditPage = computed(() => this.currentRoute().includes("/notes/edit"));

  constructor() {
    effect(() => {
      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => {
          this.currentRoute.set(event.urlAfterRedirects);
        });
    });

    effect(() => {
      this.titleService.title$.subscribe((title) => {
        this.title.set(title);
      });
    });

    effect(() => {
      if (this.firstVisitService.isFirstVisit()) {
        setTimeout(() => {
          const dialogRef = this.dialog.open(WelcomeDialogComponent, {
            width: "450px",
            disableClose: true,
          });

          dialogRef.afterClosed().subscribe(() => {
            this.firstVisitService.setVisited();
          });
        }, 1000);
      }
    });
  }
}
