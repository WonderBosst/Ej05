import { registerLocaleData } from '@angular/common';
import localMX from '@angular/common/locales/es-MX';
import {
  DEFAULT_CURRENCY_CODE,
  enableProdMode,
  importProvidersFrom,
  LOCALE_ID,
} from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { environment } from './environments/environment';

registerLocaleData(localMX, 'es-MX');
if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    importProvidersFrom(IonicModule.forRoot({})),
    provideRouter(routes),
    { provide: LOCALE_ID, useValue: 'es-MX' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'MXN' },
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
      provideFirestore(() => getFirestore())
    ),
  ],
});