import { NgModule } from '@angular/core';
import { Firebase } from '@ionic-native/firebase';
import { SharedModule } from '@shared/shared.module';
import { IonicModule } from 'ionic-angular';

import { PopoverPush } from './components/popover-push';
import { FCMService } from './fcm.service';

@NgModule({
    declarations: [
        PopoverPush
    ],
    imports: [
        IonicModule,
        SharedModule
    ],
    providers: [
        Firebase,
        FCMService
    ],
    entryComponents: [
        PopoverPush
    ]
})
export class FCMModule { }
