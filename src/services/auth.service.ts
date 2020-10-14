import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) {
  }

  getUserId() {
    return this.httpClient.get<any>(environment.getUserIdUrl); // {user: {id: "asdfasdfasdf"}}
  }

  createUser() {
    const body = {
      user_param: {
        language: 'en-US',
        locate: true
      }
    };
    return this.httpClient.post<any>(environment.loginUrl, body);
    // authenticated
    //               .token.access_token
    //               .user.id
  }
}
