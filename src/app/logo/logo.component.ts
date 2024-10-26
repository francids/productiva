import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-logo',
  standalone: true,
  templateUrl: './logo.component.html',
  styleUrl: "./logo.component.scss"
})
export class LogoComponent {
  @Input() width: string = '500px';
  @Input() height: string = '500px';
  color: string = '#002109';
}
