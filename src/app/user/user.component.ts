import { Component, OnInit, TemplateRef } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { from } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userList: Object;
  userError: any;
  listGridView: string = "Grid";
  deleteUserData: any;
  deleteModel: boolean;
  deleteErrorMessage: string;
  modalRef: BsModalRef;

  userForm: FormGroup;
  securityQuestion: { id: number; name: string; }[];
  genderData: { id: number; name: string; }[];
  submitted: boolean = false;
  userData: Object;

  constructor(private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.getUserList();
    this.createUserForm();
  }

  getUserList() {
    this.userService.getUsers().subscribe((userRespose) => {
      this.userList = userRespose;
      console.log(userRespose);
    }, (error) => {
      this.userError = error;
    })
  }

  createUserForm() {
    this.userForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(50)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(50)])],
      confirmPassword: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(15)])],
      lastName: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(15)])],
      phone: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]*$')])],
      securityKey: ['', Validators.required],
      securityValue: ['', Validators.required],
      gender: ['', Validators.required]
    })

    this.userService.selectedGenderItems.subscribe((response) => {
      this.genderData = response;
    })

    this.userService.securityQustnArr.subscribe((response) => {
      this.securityQuestion = response;
    })
  }

  gridListView(viewVale) {
    this.listGridView = viewVale;
  }

  createUserClick() {
    this.router.navigate['/add-user'];
  }

  editUserClick(userId: number) {
    if (userId) {
      this.router.navigate(['/edit-user', userId]);
    }
  };

  openDeleteModel(userData) {
    this.deleteUserData = userData;
    this.deleteModel = true;
  }

  deleteUserClick(userId: number) {
    if (userId) {
      this.deleteErrorMessage = '';
      this.userService.deleteUser(userId).subscribe(
        (response) => {
          this.deleteModel = false;
          this.getUsers();
        },
        (error) => {
          this.deleteErrorMessage = error.error;
        })
    }
  }

  getUsers() {
    throw new Error("Method not implemented.");
  };

  openCreateModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

  closeUserModal() {
    this.modalRef.hide();
    this.modalRef = null;
  }

  createUser() {
    this.submitted = false;
    if (this.userForm.invalid) {
      this.submitted = true;
      return
    } else {
      let userPayload = {
        username: this.userForm.controls.username.value,
        password: this.userForm.controls.password.value,
        confirmPassword: this.userForm.controls.confirmPassword.value,
        email: this.userForm.controls.email.value,
        firstName: this.userForm.controls.firstName.value,
        lastName: this.userForm.controls.lastName.value,
        phone: this.userForm.controls.phone.value,
        securityKey: this.userForm.controls.securityKey.value,
        securityValue: this.userForm.controls.securityValue.value,
        gender: this.userForm.controls.gender.value
      }

      if (userPayload) {
        this.userService.createUser(userPayload).subscribe((userResponse) => {
          if (userResponse) {
            this.userData = userResponse;
            console.log('user created successfully---->', userResponse);
            alert('User created successfully');
            this.router.navigate(['user']);
          }
        }, ((error) => {
          this.userError = error || 'Something went wrong, Please try agian';
          console.log('Getting error-------->', error);
        })
        )
      }
    }
  }

}
