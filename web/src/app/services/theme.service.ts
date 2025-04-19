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
  private systemPreferenceMediaQuery: MediaQueryList;
  private autoModeEnabled: boolean = false;

  darkModeChanges$ = this.darkModeSubject.asObservable();

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.systemPreferenceMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    this.systemPreferenceMediaQuery.addEventListener('change', (e) => {
      if (this.autoModeEnabled) {
        this.toggleDarkMode(e.matches);
      }
    });
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
    const autoMode = localStorage.getItem('autoMode') === 'true';
    this.autoModeEnabled = autoMode;

    if (autoMode) {
      const systemPrefersDark = this.systemPreferenceMediaQuery.matches;
      this.toggleDarkMode(systemPrefersDark);
      localStorage.setItem('darkMode', systemPrefersDark.toString());
    } else {
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
  }

  isDarkModeEnabled(): boolean {
    return localStorage.getItem('darkMode') === 'true';
  }

  toggleAutoMode(isAutoMode: boolean): void {
    this.autoModeEnabled = isAutoMode;
    localStorage.setItem('autoMode', isAutoMode.toString());

    if (isAutoMode) {
      const systemPrefersDark = this.systemPreferenceMediaQuery.matches;
      this.toggleDarkMode(systemPrefersDark);
    }
  }

  isAutoModeEnabled(): boolean {
    return localStorage.getItem('autoMode') === 'true';
  }

  private updateThemeColor(color: string): void {
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.setAttribute('content', color);
    }
  }
}
