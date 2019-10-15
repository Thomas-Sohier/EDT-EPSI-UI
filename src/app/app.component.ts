import { Component } from '@angular/core';
import { User } from './_models';
import { UserService, AuthenticationService } from './_services';
import { first } from 'rxjs/operators';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EDT-EPSI-UI';
  user: User;

  constructor(
    sanitizer: DomSanitizer,
    iconRegistry: MatIconRegistry,
    private authenticationService: AuthenticationService
  ) {
    iconRegistry.addSvgIcon(
      'account',
      sanitizer.bypassSecurityTrustResourceUrl('assets/account.svg')
    );
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  logout() {
    this.authenticationService.logout();
    window.location.reload();
  }
}
