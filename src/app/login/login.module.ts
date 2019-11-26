import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginPage, LoginService } from '@app/login';
import { SharedModule } from '@shared/shared.module';
import { IonicModule } from 'ionic-angular';
import { WelcomeScreen } from './pages/welcome-screen/welcome-screen';
import { ShowHideInput } from './directives/show-hide-input.directive';

@NgModule({
    imports: [
        IonicModule,
        SharedModule,
        FormsModule
    ],
    declarations: [
        // Pages list
        LoginPage,
        WelcomeScreen,

        // Components
        // Directives
        ShowHideInput
    ],
    entryComponents: [
        // Pages list
        LoginPage,
        WelcomeScreen,

        // Components
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    providers: [
        LoginService
    ]
})
export class LoginModule { }
