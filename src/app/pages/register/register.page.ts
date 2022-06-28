import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService, RegisterPayload } from 'src/app/services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  languages = ['English', 'Tiếng Việt'];
  submitted = false;
  loading = false;
  returnUrl: string;
  randomPassword: string[];



  constructor(
    private translate: TranslateService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService
  ) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngOnInit() {
    this.registerForm = new FormGroup({
      'username': new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(32)]),
      'email': new FormControl(null, [Validators.required, Validators.pattern(/\S+@\S+\.\S+/)]),
      'firstName': new FormControl(null,),
      'lastName': new FormControl(null,),
      'website': new FormControl(null,),
      'password': new FormControl(null, Validators.required),
      'language': new FormControl(null, Validators.required),
      'genPassword': new FormControl(null)
    })

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  /**
   *  Function to generate combination of password
   */
  onGeneratePassword() {
    let pw = [];
    let pass: string = '';
    let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let num = '0123456789';
    let specialChar = '~!@#$%^&*()'
    this.registerForm.get('password').reset();

    for (let i = 1; i <= 3; i++) {
      let pass1 = Math.floor(Math.random()
        * alphabet.length + 1);
      pass += alphabet.charAt(pass1);
      // console.log('pass1:' + pass1);
    }

    for (let i = 1; i <= 3; i++) {
      let pass2 = Math.floor(Math.random()
        * num.length + 1);
      pass += num.charAt(pass2);
      // console.log('pass2:' + pass2);
    }

    for (let i = 1; i <= 2; i++) {
      let pass3 = Math.floor(Math.random()
        * specialChar.length + 1);
      pass += specialChar.charAt(pass3);
      // console.log('pass3:' + pass3);
    }
    pw.push(pass);
    // console.log('pass:' + pass);

    this.randomPassword = pw;
    this.registerForm.get('genPassword').setValue(this.randomPassword[0]);
    this.registerForm.get('password').setValue(this.randomPassword[0]);
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
    }
    console.log('form:', this.registerForm.value);
    console.log('json:', submitData);
    this.submitted = true;
    this.loading = true;
    this.authenticationService.register(submitData).pipe(first()).subscribe(
      (data) => {
        this.router.navigate([this.returnUrl]);
      },
      (error) => {
        // this.alertService.error(error);
        this.loading = false;
      }
    );
    // this.registerForm.reset();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }
}
