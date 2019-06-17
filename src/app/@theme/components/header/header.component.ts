import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserService } from '../../../@core/data/users.service';
import { AnalyticsService } from '../../../@core/utils';
import { LayoutService } from '../../../@core/utils';
import { NbAuthJWTToken, NbAuthService , NbTokenService } from '@nebular/auth';
import { NbAccessChecker } from '@nebular/security';
import {Router} from '@angular/router'
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';

  user: any;

  userMenu = [{ title: 'Log Out' }];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private userService: UserService,
              private analyticsService: AnalyticsService,
              private layoutService: LayoutService,
              private authService: NbAuthService, 
              public accessChecker: NbAccessChecker,
              private router : Router,
              private tokenService: NbTokenService) {
                
                this.authService.onTokenChange()
                .subscribe((token: NbAuthJWTToken) => {
                  if (token.isValid()) {
                    this.user = token.getPayload(); // here we receive a payload from the token and assigne it to our `user` variable 
                  }
                });
  }

  ngOnInit() {
    this.menuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'logout-menu'),
        map(({ item: { title } }) => title),
      )
      .subscribe(title => {
        if(title === "Log Out"){
          console.log(title);
          this.tokenService.clear();
          this.router.navigate(['auth/login'])
        }
      });
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }

  adminNavigate(){
    this.router.navigate(['admin/device/user-add'])
  }

  homeNavigate(){
    this.router.navigate(['attendance/attendance-overview'])
  }
}
