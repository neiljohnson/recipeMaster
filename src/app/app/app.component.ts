import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {CacheService} from '../../services/cache.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'mealPlanner';

  constructor(private authService: AuthService, private cacheService: CacheService) {
  }

  ngOnInit(): void {
    // this.setWhiskToken();
  }

  setWhiskToken() {
    if (!this.cacheService.get('whiskToken')) {
      this.cacheService.put('whiskToken', this.authService.createUser().subscribe((response) => {
        return response.authenticated.token.access_token;
      }));
    }
    this.authService.getUserId().subscribe((result) => {
      if (!result) {
        this.cacheService.put('whiskToken', this.authService.createUser().subscribe((response) => {
          return response.authenticated.token.access_token;
        }));
      }
    });
  }
}
