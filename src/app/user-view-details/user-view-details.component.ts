import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../models/user.model';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-user-view-details',
  templateUrl: './user-view-details.component.html',
  styleUrls: ['./user-view-details.component.css']
})
export class UserViewDetailsComponent implements OnInit {

  @Input() public user: any;

  activeUser = new User({id: 0, first_name: '', last_name: '', email: '', password: '', isDeleted: true});
  constructor(
    private activeModal: NgbActiveModal,
    private userService: UserServiceService) { }

  ngOnInit(): void {
    if (this.user)
      this.activeUser = this.user;
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }

}
