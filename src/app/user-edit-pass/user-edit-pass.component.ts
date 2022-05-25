import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserServiceService } from '../services/user-service.service';
import { FormBuilder, FormGroup, Validators, NgForm, FormControl, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-user-edit-pass',
  templateUrl: './user-edit-pass.component.html',
  styleUrls: ['./user-edit-pass.component.css']
})
export class UserEditPassComponent implements OnInit {
  title = 'Change Password';
  modalForm: FormGroup = new FormGroup({});
  @Input() user:any;
  constructor(
    private userService: UserServiceService,
    private activeModal: NgbActiveModal,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.modalForm = this.fb.group({
      old_password: ['', [Validators.required, Validators.minLength(4)]],
      new_password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }

  onSubmit(form: FormGroup) {
    console.log('Valid?', form.valid); // true or false
    console.log('Old Password', form.value.old_password);
    console.log('New Password', form.value.new_password);

    this.changePassword(form.value.old_password, form.value.new_password);
  }
  
  changePassword(oldPassword:any, newPassword:any) {
    const verified = this.userService.verifyPassword(oldPassword, this.user.password);

    if (verified) {
      this.userService.changePassword(this.user, newPassword).subscribe((res) => {
        console.log(res);
        alert('Password successfully changed');
        this.closeModal();
      });
    } else {
      alert('Invalid old password entered');
    }

  }

}
