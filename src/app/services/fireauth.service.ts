import { Injectable, inject, signal } from '@angular/core';
import {
  Auth, idToken, User, user, UserCredential,
  signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut
} from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class FireauthService {
  private _auth:Auth = inject(Auth);

  private _user$ = user(this._auth);
  fireUser = signal<User|null>(null);

  private _token$ = idToken(this._auth);
  fireToken = signal<string|null>(null);

  constructor() {
    this._user$.subscribe({
      next: (fUser: User | null) => {
        this.fireUser.set(fUser);
      },
    });

    this._token$.subscribe({
      next: (token: string | null) => {
        this.fireToken.set(token);
      },
    });
  }

  signUp(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this._auth, email, password);
  }

  signIn(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this._auth, email, password);
  }

  signOut(): Promise<void> {
    return signOut(this._auth);
  }
}
