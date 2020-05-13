import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { from } from 'rxjs';
import { AuthService } from '../authGuard/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  addUserForm: FormGroup;
  invalidLogin: boolean = false;
  invalidLoginError: any;
  userData: any;
  securityQuestion: { id: number; name: string; }[];
  submitted: boolean = false;
  userFormData: Object;
  genderData: { id: number; name: string; }[];
  getUserError: any;
  formView: string;


  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private routerModule: RouterModule,
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.showHideRegisterForm('Login');
    this.createLoginForm();
    this.createUserForm();
    this.dropDownData();
  }

  get f() { return this.addUserForm.controls; }

  dropDownData() {
    this.userService.securityQustnArr.subscribe((data) => {
      this.securityQuestion = data;
    });

    this.userService.selectGender.subscribe((response) => {
      this.genderData = response;
    })
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required]
    })
  }

  showHideRegisterForm(value: string) {
    this.formView = value;
    this.submitted = false;
  };

  createUserForm() {
    this.addUserForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(15)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(15)])],
      confirmPassword: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(15)])],
      lastName: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(15)])],
      phone: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]*$')])],
      securityKey: ['', Validators.required],
      securityValue: ['', Validators.required],
      gender: ['', Validators.required]
    })
  }

  loginUser() {
    if (this.loginForm.invalid) {
      this.invalidLogin = true;
      return;
    }
    this.invalidLogin = false;

    const loginPayload = {
      username: this.loginForm.controls.username.value,
      password: this.loginForm.controls.password.value
    };

    this.userService.login(loginPayload).subscribe((response) => {
      if (response) {
        this.userData = response;
        this.authService.setToken(response);
        this.router.navigate(['/home']);
      }
    }, (error) => {
      this.invalidLoginError = error.error;
      this.invalidLogin = true;
      alert(error.error);
    });
  };

  registerUserClick() {
    if (this.getUserError) this.getUserError = '';
    if (this.addUserForm.invalid) {
      this.submitted = true;
      return;
    } else {
      const createUserPayload = {
        username: this.addUserForm.controls.username.value,
        password: this.addUserForm.controls.password.value,
        confirmPassword: this.addUserForm.controls.confirmPassword.value,
        email: this.addUserForm.controls.email.value,
        firstName: this.addUserForm.controls.firstName.value,
        lastName: this.addUserForm.controls.lastName.value,
        phone: this.addUserForm.controls.phone.value,
        securityKey: this.addUserForm.controls.securityKey.value,
        securityValue: this.addUserForm.controls.securityValue.value,
        gender: this.addUserForm.controls.gender.value
      };

      console.log('createUserPayload-->', createUserPayload);
      this.userService.createUser(createUserPayload).subscribe((response) => {
        this.userData = response;
        alert('User created successfully');
        window.location.reload();
      }, (error) => {
        this.getUserError = error.error;
      })
      this.submitted = false;
    }
  };

}
