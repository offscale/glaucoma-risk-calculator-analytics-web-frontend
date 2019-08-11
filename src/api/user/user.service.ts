import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { parseDates } from '../shared';
import { IUser } from './user.interfaces';


@Injectable()
export class UserService {
  constructor(private http: HttpClient) {
  }

  create(user: IUser): Observable<IUser> {
    return this.http
      .post<IUser>('/api/user', user)
      .pipe(map(parseDates));
  }

  read(userId?: string): Observable<IUser> {
    return this.http
      .get<IUser>(`/api/user${userId == null ? '' : '/' + userId}`)
      .pipe(map(parseDates));
  }

  update(user: IUser, userId?: string): Observable<IUser> {
    return this.http
      .put<IUser>(`/api/user${userId == null ? '' : '/' + userId}`, user)
      .pipe(map(parseDates));
  }

  destroy(userId: string): Observable<{}> {
    return this.http
      .delete(`/api/user/${userId}`);
  }

  getAll(): Observable<IUser[]> {
    return this.http
      .get<{users: IUser[]}>('/api/users')
      .pipe(
        map(users => users.users.sort((a, b) => a.email.localeCompare(b.email))), // TODO: sort server-side
        map(users => users.map(parseDates))
      );
  }
}
