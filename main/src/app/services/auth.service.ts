import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
// @ts-ignore
import { NgxEnvService } from 'ngx-dotenv';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string;

  constructor(private http: HttpClient, private router: Router, private envService: NgxEnvService) {
    this.apiUrl = this.envService.get('API_URL') || 'https://localhost:8081/auth';
    console.log('API_URL:', this.apiUrl);
  }

  login(credentials: { email: string, password: string }) {
    return this.http.post(`${this.apiUrl}/login`, credentials, { withCredentials: true })
      .subscribe(() => {
        this.router.navigate(['/dashboard']);
      });
  }

  logout() {
    return this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true })
      .subscribe(() => {
        this.router.navigate(['/login']);
      });
  }
}
