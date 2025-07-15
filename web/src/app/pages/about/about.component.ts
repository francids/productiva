import { Component, AfterViewInit, inject } from "@angular/core";
import { TitleService } from "../../services/title.service";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { environment } from "../../../environments/environments";

@Component({
  selector: "about-page",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.scss"],
  imports: [MatButtonModule, MatIconModule],
})
export class AboutComponent implements AfterViewInit {
  private titleService = inject(TitleService);

  currentYear = new Date().getFullYear();
  version = environment.version;

  ngAfterViewInit() {
    Promise.resolve().then(() =>
      this.titleService.updateTitle(
        $localize`:@@about-productiva:Acerca de Productiva Mente`
      )
    );
  }

  openGithub() {
    window.open("https://github.com/francids/productiva-mente", "_blank");
  }
}
