import {NgModule} from '@angular/core';

import {IonProductsComponent} from './ion-products/ion-products';
import {ButtonGroupComponent} from './button-group/button-group';


@NgModule({
  declarations: [
    IonProductsComponent,
    ButtonGroupComponent
  ],
  imports: [],
  exports: [
    IonProductsComponent,
    ButtonGroupComponent
  ]
})
export class ComponentsModule {
}
