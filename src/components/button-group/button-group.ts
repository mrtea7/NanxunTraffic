import { Component ,Input ,Output,EventEmitter} from '@angular/core';

/**
 * Generated class for the IonProductsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'button-group',
  templateUrl: 'button-group.html'
})
export class ButtonGroupComponent {

  @Input()  text: string;
  @Output() public follow=new EventEmitter<string>();

  constructor() {
    this.text = 'button-group';
  }
  dohaha(){
    alert("dohaha")
    this.follow.emit("follow");
  }

}
