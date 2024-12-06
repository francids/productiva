// Angular
import { Component, OnInit } from "@angular/core";

// Modules
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from "@angular/material/divider";
import { MatCardModule } from "@angular/material/card";

// Services
import { TitleService } from '../../services/title.service';
import { ThemeService } from "../../services/theme.service";

@Component({
  selector: "settings-page",
  templateUrl: "./settings.component.html",
  styleUrl: "./settings.component.scss",
  imports: [MatSlideToggleModule, MatDividerModule, MatCardModule]
})
export class SettingsComponent implements OnInit {
  isDarkMode: boolean = false;

  constructor(
    private titleService: TitleService,
    private themeService: ThemeService,
  ) {
    this.titleService.updateTitle('Configuración');
  }

  ngOnInit(): void {
    this.isDarkMode = this.themeService.isDarkModeEnabled();
  }

  toggleDarkMode(event: any): void {
    this.themeService.toggleDarkMode(event.checked);
  }
}