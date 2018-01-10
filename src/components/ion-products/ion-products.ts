import { Component ,Input ,Output,EventEmitter} from '@angular/core';

/**
 * Generated class for the IonProductsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'ion-products',
  templateUrl: 'ion-products.html'
})
export class IonProductsComponent {

  @Input()  text: string;
  @Output() public follow=new EventEmitter<string>();

  constructor() {
    console.log('Hello IonProductsComponent Component');
    this.text = 'Hello World';
  }
  dohaha(){
    alert("dohaha")
    this.follow.emit("follow");
  }

}
