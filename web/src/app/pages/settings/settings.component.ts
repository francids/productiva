// Angular
import { Component, OnInit } from "@angular/core";
import { NgIf } from "@angular/common";

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
  imports: [MatSlideToggleModule, MatDividerModule, MatCardModule, NgIf]
})
export class SettingsComponent implements OnInit {
  isDarkMode: boolean = false;
  isAutoMode: boolean = false;

  constructor(
    private titleService: TitleService,
    private themeService: ThemeService,
  ) {
    this.titleService.updateTitle($localize`:@@settings:Configuración`);
  }

  ngOnInit(): void {
    this.isDarkMode = this.themeService.isDarkModeEnabled();
    this.isAutoMode = this.themeService.isAutoModeEnabled();
  }

  toggleDarkMode(event: any): void {
    this.themeService.toggleDarkMode(event.checked);
  }

  toggleAutoMode(event: any): void {
    this.isAutoMode = event.checked;
    this.themeService.toggleAutoMode(event.checked);
    if (!event.checked) {
      this.isDarkMode = this.themeService.isDarkModeEnabled();
    }
  }
}