import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private renderer: Renderer2;
  private darkModeClass: string = 'darkmode';
  private darkModeSubject: Subject<boolean> = new Subject<boolean>();
  private lightThemeColor: string = '#faf9f9';
  private darkThemeColor: string = '#101111';

  darkModeChanges$ = this.darkModeSubject.asObservable();

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  toggleDarkMode(isDarkMode: boolean): void {
    if (isDarkMode) {
      this.renderer.addClass(document.body, this.darkModeClass);
      localStorage.setItem('darkMode', 'true');
      this.updateThemeColor(this.darkThemeColor);
    } else {
      this.renderer.removeClass(document.body, this.darkModeClass);
      localStorage.setItem('darkMode', 'false');
      this.updateThemeColor(this.lightThemeColor);
    }
    this.darkModeSubject.next(isDarkMode);
  }

  loadUserPreference(): void {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    if (darkMode) {
      this.renderer.addClass(document.body, this.darkModeClass);
      this.updateThemeColor(this.darkThemeColor);
    } else {
      this.renderer.removeClass(document.body, this.darkModeClass);
      this.updateThemeColor(this.lightThemeColor);
    }
    this.darkModeSubject.next(darkMode);
  }

  isDarkModeEnabled(): boolean {
    return localStorage.getItem('darkMode') === 'true';
  }

  private updateThemeColor(color: string): void {
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.setAttribute('content', color);
    }
  }
}
