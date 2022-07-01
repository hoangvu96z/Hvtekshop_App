/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable max-len */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services';
import { SharedService } from 'src/app/shared/shared.service';
import { LANGUAGES, ROLES } from 'src/app/const/shared.enum';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit, OnDestroy {
  registerForm: FormGroup;
  languages = LANGUAGES;
  loading = false;
  returnUrl: string;
  randomPassword: string;
  subscription: Subscription;
  roles = ROLES;

  constructor(
    private translate: TranslateService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private sharedService: SharedService,
    private authenticationService: AuthService
  ) {
  }

  ngOnInit() {
    this.registerForm = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(32)]),
      email: new FormControl(null, [Validators.required, Validators.pattern(/\S+@\S+\.\S+/)]),
      firstName: new FormControl(null,),
      lastName: new FormControl(null,),
      website: new FormControl(null,),
      password: new FormControl(null, [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{7,}$')]),
      language: new FormControl('en_US', Validators.required),
      genPassword: new FormControl(null),
      role: new FormControl(ROLES[0].key, Validators.required)
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  /**
   *  Function to generate combination of password
   */
  onGeneratePassword() {
    let pass = '';
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const alphabetUppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const num = '0123456789';
    const specialChar = '~!@#$%^&*()';
    this.registerForm.get('password').reset();

    for (let i = 1; i <= 4; i++) {
      const pass1 = Math.floor(Math.random() * alphabet.length) + 1;
      pass += alphabet.charAt(pass1).toString();
    }

    for (let i = 1; i <= 3; i++) {
      const pass2 = Math.floor(Math.random() * num.length) + 1;
      pass += num.charAt(pass2).toString();
    }

    for (let i = 1; i <= 2; i++) {
      const pass3 = Math.floor(Math.random() * specialChar.length) + 1;
      pass += specialChar.charAt(pass3);
    }

    for (let i = 1; i <= 2; i++) {
      const pass4 = Math.floor(Math.random() * alphabetUppercase.length) + 1;
      pass += alphabetUppercase.charAt(pass4);
    }

    this.randomPassword = pass;
    this.registerForm.get('genPassword').setValue(pass);
    this.registerForm.get('password').setValue(pass);
    return pass;
  }
  onSubmit() {
    const dataSubmit = this.registerForm.value;
    const submitData = {
      username: dataSubmit.username,
      first_name: dataSubmit.firstName,
      last_name: dataSubmit.lastName,
      email: dataSubmit.email,
      url: dataSubmit.website,
      locale: dataSubmit.language,
      password: dataSubmit.password,
      roles: dataSubmit.role
    };
    this.loading = true;
    this.subscription = this.authenticationService.register(submitData).pipe().subscribe(
      (data) => {
        this.loading = false;
        this.sharedService.toastMessage(
          this.translate.instant('register-page.register_success'),
          'success'
        );
        this.router.navigate([this.returnUrl]);
      },
      (error) => {
        this.sharedService.toastMessage(`[ERROR] ${error.message}`, 'danger');
        this.loading = false;
      }
    );
  }

  get f() {
    return this.registerForm.controls;
  }

  ngOnDestroy() {
    this.loading = false;
    this.subscription.unsubscribe();
  }
}
