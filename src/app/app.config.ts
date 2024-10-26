import { ApplicationConfig, provideZoneChangeDetection, isDevMode, importProvidersFrom, APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideServiceWorker } from '@angular/service-worker';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { BrowserModule } from '@angular/platform-browser';
import { RxdbService } from './services/rxdb.service';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ThemeService } from './services/theme.service';

export function initializeDatabase(rxdbService: RxdbService) {
  return () => rxdbService.init();
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
      deps: [RxdbService],
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeTheme,
      deps: [ThemeService],
      multi: true,
    },
    provideAnimations(),
    provideIonicAngular({}),
  ],
};
