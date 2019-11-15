import { Component, Input } from '@angular/core';
import { AppStore } from '@app/app-store';
import { Store } from '@ngrx/store';
import { DeviceState } from '@app/core/device/models/device-state';

/**
 * Generated class for the NavbarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'navbar',
  templateUrl: 'navbar.html'
})
export class NavbarComponent {

  @Input() pageName: string = '';
  menuToggleVisible: boolean = true;

  constructor(
    private store: Store<AppStore>) { }


  ngAfterViewInit() {

    this.store.select('deviceState').subscribe(
      (deviceState: DeviceState) => {

        if(deviceState.deviceType == 'tablet') this.menuToggleVisible = false;
        else this.menuToggleVisible = true;
      }
    )
  }

}
