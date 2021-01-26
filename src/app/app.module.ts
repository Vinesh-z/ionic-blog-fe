import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuillModule } from 'ngx-quill';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModalPageModule } from './modal/modal.module';
import { PopoverComponent } from './popovers/popover/popover.component';
import { FilterComponent } from './popovers/filter/filter.component';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { FacadeService } from './service/facade.service';
import { IonicStorageModule } from '@ionic/storage';
import { InterceptorService } from './service/interceptor.service';
import { async } from '@angular/core/testing';
import { AvatarSelectComponent } from './modal/avatar-select/avatar-select.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { AuthGuard } from './guards/auth.guard';

export function init_app(facadeService: FacadeService) {
  return async () => await facadeService.setUserToken();
}
@NgModule({
  declarations: [AppComponent, PopoverComponent, FilterComponent, SafeHtmlPipe],
  entryComponents: [PopoverComponent, FilterComponent, AvatarSelectComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule,
    QuillModule.forRoot({
    modules: {
      syntax: true
    }
  }),
    ModalPageModule,
    IonicStorageModule.forRoot()],
  providers: [
    GooglePlus,
    AuthGuard,
    FacadeService,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: APP_INITIALIZER, useFactory: init_app, deps: [FacadeService], multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
