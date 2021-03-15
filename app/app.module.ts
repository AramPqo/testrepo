import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import './vendor';
import { MedappointSharedModule } from 'app/shared/shared.module';
import { MedappointCoreModule } from 'app/core/core.module';
import { MedappointAppRoutingModule } from './app-routing.module';
import { MedappointHomeModule } from './home/home.module';
import { MedappointEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { LeftBarComponent } from './layouts/lef-bar/left-bar.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { FileValueAccessorDirective } from './shared/directives/file-value-accessor';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    FormlyModule.forRoot(),
    MedappointSharedModule,
    MedappointCoreModule,
    MedappointHomeModule,
    MedappointEntityModule,
    MedappointAppRoutingModule
  ],
  declarations: [
    MainComponent,
    NavbarComponent,
    ErrorComponent,
    FileValueAccessorDirective,
    PageRibbonComponent,
    LeftBarComponent,
    ActiveMenuDirective,
    FooterComponent
  ],
  bootstrap: [MainComponent],
})
export class MedappointAppModule { }
