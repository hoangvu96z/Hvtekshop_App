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
  dataSubmit: RegisterPayload = {
    username: '',
    email: '',
    user_pass: '',
    nonce: '',
    display_name: '',
    notify: '',
  };

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
    // this.register = this.fb.group({
    //   username: ['', [Validators.required, Validators.minLength(4)]],
    //   email: ['', [Validators.required, Validators.email]],
    //   firstName: [''],
    //   lastName: [''],
    //   password: ['', Validators.required],
    // });

    this.registerForm = new FormGroup({
      'username': new FormControl(null, [Validators.required, Validators.minLength(4)]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'firstName': new FormControl(null,),
      'lastName': new FormControl(null,),
      'website': new FormControl(null,),
      'password': new FormControl(null, Validators.required),
      'language': new FormControl(null,),
    })

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    console.log(this.registerForm);
    this.submitted = true;
    this.loading = true;
    // this.authenticationService
    //   .register(this.dataSubmit)
    //   .pipe(first())
    //   .subscribe(
    //     (data) => {
    //       this.router.navigate([this.returnUrl]);
    //     },
    //     (error) => {
    //       // this.alertService.error(error);
    //       this.loading = false;
    //     }
    //   );
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }
}
