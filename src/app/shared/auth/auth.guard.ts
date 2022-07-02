import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services';
import { SharedService } from '../shared.service';


@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  returnUrl: string = 'login';
  constructor(private authenticationService: AuthService, private router: Router, private route: ActivatedRoute, private sharedService: SharedService, private translate: TranslateService,) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authenticationService.currentUserValue == null) {
      setTimeout(() => {
        this.router.navigate([this.returnUrl]);
      }, 200);
      this.sharedService.toastMessage(this.translate.instant('common.plsLogin'),
        'danger')
      return false;
    }
    return true;
  }

}
