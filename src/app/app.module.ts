import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";

// COMPONENTS
import { AppComponent } from "./app.component";

// MODALS
import { NoticeModal } from "./modals/notice/notice.modal";
import { RegisterModal } from "./modals/register/register.modal";

// MODULES
import { RoutingModule } from "./modules/routing.module";
import { SharedModule } from "./modules/shared.module";

// PAGES
import { ErrorPage } from "./pages/error";

// ERROR INTERCEPTOR
import { Interceptor } from "./services/interceptor";

// SERVICES
import { MenuService } from "./services/menu.service";
import { ModalService } from "./services/modal.service";
import { UserService } from "./services/user.service";

@NgModule({
  declarations: [
    AppComponent,
    // MODALS
    NoticeModal,
    RegisterModal,
    // PAGES
    ErrorPage
  ],
  imports: [
    HttpClientModule,
    RouterModule,
    BrowserModule,
    ReactiveFormsModule,
    // MODULES
    RoutingModule,
    SharedModule
  ],
  bootstrap: [AppComponent],
  providers: [
    MenuService,
    ModalService,
    UserService,
    {provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true}
  ]
})
export class AppModule {
}
