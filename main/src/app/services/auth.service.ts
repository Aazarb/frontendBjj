import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from '../../environments/environment.development';
import {BehaviorSubject, catchError, map, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string;
  private roleSubject = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl || 'https://localhost:8081/auth';
    console.log('API_URL:', this.apiUrl);
  }

  login(credentials: { email: string, password: string }): Observable<boolean> {
    return this.http.post<{ role: string }>(`${this.apiUrl}/login`, credentials, { withCredentials: true }).pipe(
      map(response => {
        if (response && response.role) {
          this.roleSubject.next(response.role); // Stocke le rôle
          return true;
        }
        return false;
      }),
      catchError(() => {
        return of(false);
      })
    );
  }

  logout() {
    return this.http.post(`${this.apiUrl}/logout`, {}, {withCredentials: true})  // withCredentials pour la gestion du token coté backend
      .subscribe(() => {
        this.roleSubject.next(null);
      });
  }

  /** Observable pour suivre les rôles en temps réel */
  get role$(): Observable<string | null> {
    return this.roleSubject.asObservable();
  }

  /**  Retourne le rôle actuel */
  getRole(): string | null {
    return this.roleSubject.value;
  }

  /**  Retourne l'etat d'authentification connexion et le role actuel */
  checkAuthStatusAndUpdateRole(): Observable<boolean> {
    return this.http.get<{ authenticated: boolean, role: string }>(`${this.apiUrl}/status`, {withCredentials: true}).pipe(
      map(response => {
          if (response && response.role) {
            this.roleSubject.next(response.role);
            return true;
          }
          return false;
        }),
      catchError(() => of(false)),
    );
  }
}
