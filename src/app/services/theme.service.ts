import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private renderer: Renderer2;
  private darkModeClass: string = 'darkmode';
  private darkModeSubject: Subject<boolean> = new Subject<boolean>();

  darkModeChanges$ = this.darkModeSubject.asObservable();

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  toggleDarkMode(isDarkMode: boolean): void {
    if (isDarkMode) {
      this.renderer.addClass(document.body, this.darkModeClass);
      localStorage.setItem('darkMode', 'true');
    } else {
      this.renderer.removeClass(document.body, this.darkModeClass);
      localStorage.setItem('darkMode', 'false');
    }
    this.darkModeSubject.next(isDarkMode);
  }

  loadUserPreference(): void {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    if (darkMode) {
      this.renderer.addClass(document.body, this.darkModeClass);
    } else {
      this.renderer.removeClass(document.body, this.darkModeClass);
    }
    this.darkModeSubject.next(darkMode);
  }

  isDarkModeEnabled(): boolean {
    return localStorage.getItem('darkMode') === 'true';
  }
}
