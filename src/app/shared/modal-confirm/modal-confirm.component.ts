import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.css']
})
export class ModalConfirmComponent implements OnInit {

  @Input() public user: any;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  closeModal(toDelete:boolean) {
    this.activeModal.close(toDelete);
  }

}
