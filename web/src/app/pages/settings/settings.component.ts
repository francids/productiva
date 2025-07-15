// Angular
import { Component, inject, signal } from "@angular/core";

// Modules
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatDividerModule } from "@angular/material/divider";
import { MatCardModule } from "@angular/material/card";

// Services
import { TitleService } from "../../services/title.service";
import { ThemeService } from "../../services/theme.service";

@Component({
  selector: "settings-page",
  templateUrl: "./settings.component.html",
  styleUrl: "./settings.component.scss",
  imports: [MatSlideToggleModule, MatDividerModule, MatCardModule],
})
export class SettingsComponent {
  private readonly titleService = inject(TitleService);
  private readonly themeService = inject(ThemeService);

  isDarkMode = signal<boolean>(false);
  isAutoMode = signal<boolean>(false);

  constructor() {
    this.titleService.updateTitle($localize`:@@settings:Configuración`);
  }

  ngOnInit(): void {
    this.isDarkMode.set(this.themeService.isDarkModeEnabled());
    this.isAutoMode.set(this.themeService.isAutoModeEnabled());
  }

  toggleDarkMode(event: any): void {
    this.themeService.toggleDarkMode(event.checked);
  }

  toggleAutoMode(event: any): void {
    this.isAutoMode.set(event.checked);
    this.themeService.toggleAutoMode(event.checked);
    if (!event.checked) {
      this.isDarkMode.set(this.themeService.isDarkModeEnabled());
    }
  }
}
