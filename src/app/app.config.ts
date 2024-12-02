import { ApplicationConfig, provideZoneChangeDetection, isDevMode, importProvidersFrom, APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideServiceWorker } from '@angular/service-worker';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ThemeService } from './services/theme.service';
import { DexieService } from './services/db.service';

export function initializeDatabase(dexieService: DexieService) {
  return () => dexieService.init();
}

export function initializeTheme(themeService: ThemeService) {
  return () => themeService.loadUserPreference();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideAnimationsAsync(),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }),
    importProvidersFrom(BrowserModule),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeDatabase,
      deps: [DexieService],
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeTheme,
      deps: [ThemeService],
      multi: true,
    },
    provideAnimations(),
  ],
};
