import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

import {Observable} from 'rxjs';
import {environment} from '../environments/environment';
import {CacheService} from '../services/cache.service';

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(private cacheService: CacheService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url !== environment.uploadImageUrl) {
      req = req.clone({
        setHeaders: {
          // Authorization: 'Bearer ' + this.cacheService.get("whiskToken"),
          Authorization: 'Bearer ' + environment.whiskToken,
          'Content-Type': 'application/json'
        }
      });
    }
    return next.handle(req);
  }
}
