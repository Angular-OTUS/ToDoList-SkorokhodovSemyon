import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideEventPlugins } from '@taiga-ui/event-plugins';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),
    provideEventPlugins(),
    provideTranslateService({
      lang: localStorage.getItem('lang') ?? 'ru',
      fallbackLang: 'ru',
      loader: provideTranslateHttpLoader(),
    }),
  ],
};
