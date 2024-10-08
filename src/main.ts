import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import '@capacitor-community/safe-area';
import { initialize } from '@capacitor-community/safe-area';
initialize();

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
