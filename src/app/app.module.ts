/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpResponse } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { NbPasswordAuthStrategy, NbAuthModule, NbAuthJWTToken } from '@nebular/auth';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuard, AuthGuardAdmin } from "./auth-guard.service"
import { NbSecurityModule, NbRoleProvider  } from '@nebular/security';
import { RoleProvider } from './role.provider';
import { NbDateFnsDateModule } from "@nebular/date-fns"

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          baseEndpoint: 'https://syncme.io:3005',
          login: {
            endpoint: '/login',
            method: 'post',
            redirect: {
              success: '/pages/attendance/attendance-overview',
              failure: null
            }
          },
          requestPass: {
            endpoint: '/request-pwd',
            method: 'post',
            redirect: {
              success: '/',
              failure: null,
            },
            defaultErrors: ['Something went wrong, please try again.'],
            defaultMessages: ['Reset password instructions have been sent to your email.'],
          },
          resetPass:{
            endpoint: '/reset-pwd',
            method: 'post',
            redirect: {
              success: '/',
              failure: null,
            },
            resetPasswordTokenKey: 'token',
            requireValidToken: false
          },
          token: {
            class: NbAuthJWTToken,
            key: 'token', 
          },
          messages:{
            key: 'parameters',
            // getter:  (module: string, res: HttpResponse<JSON>) => {
            //   console.log(res.body);
            //   }
          }
        }),
      ],
      forms: {},
    }),
    NbSecurityModule.forRoot({
        accessControl: {
          user: {
            view: 'pages'
          },
          moderator: {
            parent: 'user',
            view: 'admin'
          },
        },
    }),
    NbDateFnsDateModule.forRoot({ format: 'YYYY-MM-DD' })
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    AuthGuard,
    AuthGuardAdmin,
    { provide: NbRoleProvider, useClass: RoleProvider }
  ],
})
export class AppModule {
}
