import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { AuthInterceptor } from './app/auth-interceptor.service';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { importProvidersFrom } from '@angular/core';

bootstrapApplication(AppComponent, {
  ...appConfig,
}).catch((err) => console.error(err));
