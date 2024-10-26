import { Component, OnInit } from "@angular/core";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { TitleService } from '../../services/title.service';
import { ThemeService } from "../../services/theme.service";

@Component({
  selector: "settings-page",
  standalone: true,
  templateUrl: "./settings.component.html",
  styleUrl: "./settings.component.scss",
  imports: [MatSlideToggleModule]
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