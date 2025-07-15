import { Component, input } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatRippleModule } from "@angular/material/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-home-box",
  templateUrl: "./home-box.component.html",
  styleUrl: "./home-box.component.scss",
  imports: [MatCardModule, MatRippleModule, RouterLink],
})
export class HomeBoxComponent {
  title = input<string>("");
  path = input<string>("");
}
