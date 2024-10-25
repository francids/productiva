import { Component, Renderer2 } from "@angular/core";
import { TitleService } from '../../services/title.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: "settings-page",
  standalone: true,
  templateUrl: "./settings.component.html",
  styleUrl: "./settings.component.scss",
  imports: [MatSlideToggleModule]
})
export class SettingsComponent {
  constructor(
    private titleService: TitleService,
    private renderer: Renderer2,
  ) {
    this.titleService.updateTitle('Configuración');
  }

  toggleDarkMode(event: any): void {
    if (event.checked) {
      this.renderer.addClass(document.body, 'darkmode');
    } else {
      this.renderer.removeClass(document.body, 'darkmode');
    }
  }
}