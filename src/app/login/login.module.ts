import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '@app/login';
import { SharedModule } from '@shared/shared.module';
import { IonicModule } from 'ionic-angular';
import { WelcomeScreen } from './pages/welcome-screen/welcome-screen';
import { ShowHideInput } from './directives/show-hide-input.directive';
import { LoginPage } from './pages/login/login';
import { TagComponent } from './components/tag/tag';
import { StepComponent } from './components/step/step';

@NgModule({
    imports: [
        IonicModule,
        SharedModule,
        FormsModule,
    ],
    declarations: [
        // Pages list
        WelcomeScreen,
        LoginPage,

        // Components
        TagComponent,
        StepComponent,
        // Directives
        ShowHideInput
    ],
    entryComponents: [
        // Pages list
        WelcomeScreen,
        LoginPage,

        // Components
        TagComponent,
        StepComponent
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    providers: [
        LoginService
    ]
})
export class LoginModule { }
