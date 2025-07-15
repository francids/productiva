import {
  effect,
  inject,
  Injectable,
  Renderer2,
  RendererFactory2,
  signal,
} from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  private rendererFactory = inject(RendererFactory2);
  private renderer = signal<Renderer2>(
    this.rendererFactory.createRenderer(null, null)
  );
  private darkModeClass: string = "darkmode";
  private darkModeSubject: Subject<boolean> = new Subject<boolean>();
  private lightThemeColor: string = "#faf9f9";
  private darkThemeColor: string = "#101111";
  private systemPreferenceMediaQuery = signal<MediaQueryList>(
    window.matchMedia("(prefers-color-scheme: dark)")
  );
  private autoModeEnabled = signal<boolean>(true);

  darkModeChanges$ = this.darkModeSubject.asObservable();

  constructor() {
    effect(() => {
      if (this.autoModeEnabled()) {
        this.toggleDarkMode(this.systemPreferenceMediaQuery().matches);
      }
    });
  }

  toggleDarkMode(isDarkMode: boolean): void {
    if (isDarkMode) {
      this.renderer().addClass(document.body, this.darkModeClass);
      localStorage.setItem("darkMode", "true");
      this.updateThemeColor(this.darkThemeColor);
    } else {
      this.renderer().removeClass(document.body, this.darkModeClass);
      localStorage.setItem("darkMode", "false");
      this.updateThemeColor(this.lightThemeColor);
    }
    this.darkModeSubject.next(isDarkMode);
  }

  loadUserPreference(): void {
    const autoMode =
      localStorage.getItem("autoMode") === null
        ? true
        : localStorage.getItem("autoMode") === "true";
    this.autoModeEnabled.set(autoMode);

    if (autoMode) {
      const systemPrefersDark = this.systemPreferenceMediaQuery().matches;
      this.toggleDarkMode(systemPrefersDark);
      localStorage.setItem("darkMode", systemPrefersDark.toString());
      localStorage.setItem("autoMode", "true");
    } else {
      const darkMode = localStorage.getItem("darkMode") === "true";
      if (darkMode) {
        this.renderer().addClass(document.body, this.darkModeClass);
        this.updateThemeColor(this.darkThemeColor);
      } else {
        this.renderer().removeClass(document.body, this.darkModeClass);
        this.updateThemeColor(this.lightThemeColor);
      }
      this.darkModeSubject.next(darkMode);
    }
  }

  isDarkModeEnabled(): boolean {
    return localStorage.getItem("darkMode") === "true";
  }

  toggleAutoMode(isAutoMode: boolean): void {
    this.autoModeEnabled.set(isAutoMode);
    localStorage.setItem("autoMode", isAutoMode.toString());

    if (isAutoMode) {
      const systemPrefersDark = this.systemPreferenceMediaQuery().matches;
      this.toggleDarkMode(systemPrefersDark);
    }
  }

  isAutoModeEnabled(): boolean {
    return localStorage.getItem("autoMode") === null
      ? true
      : localStorage.getItem("autoMode") === "true";
  }

  private updateThemeColor(color: string): void {
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.setAttribute("content", color);
    }
  }
}
