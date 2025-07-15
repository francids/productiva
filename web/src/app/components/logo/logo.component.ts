import { Component, input, OnDestroy, OnInit } from "@angular/core";
import { ThemeService } from "../../services/theme.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-logo",
  standalone: true,
  templateUrl: "./logo.component.html",
})
export class LogoComponent implements OnInit, OnDestroy {
  width = input<string>("500px");
  height = input<string>("500px");
  color: string = "#002109";
  private darkModeSubscription: Subscription | undefined;

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.updateColor(this.themeService.isDarkModeEnabled());
    this.darkModeSubscription = this.themeService.darkModeChanges$.subscribe(
      (isDarkMode) => {
        this.updateColor(isDarkMode);
      }
    );
  }

  ngOnDestroy() {
    if (this.darkModeSubscription) {
      this.darkModeSubscription.unsubscribe();
    }
  }

  private updateColor(isDarkMode: boolean) {
    this.color = isDarkMode ? "#f6fff2" : "#002109";
  }
}
