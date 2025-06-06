/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/services';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {

  loginForm: UntypedFormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private sharedService : SharedService,
    private router: Router,
    private authenticationService: AuthService,
    private translate: TranslateService
  ) {
    // redirect to products page if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/products']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.returnUrl = '/products';
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.loading = false;
          if (data.success) {
            this.sharedService.toastMessage(
              this.translate.instant('login-page.login-success'),
              'success'
            );
            setTimeout(() => {
              this.router.navigate([this.returnUrl]);
            }, 100);
          } else {
            this.sharedService.toastMessage(
              this.translate.instant('login-page.login-success'),
              'danger'
            );
          }
        },
        error => {
          this.loading = false;
          this.sharedService.toastMessage(
            this.translate.instant('login-page.login-failed'),
            'danger'
          );
        });
  }

  ngOnDestroy(): void {
      this.loading = false;
  }
}