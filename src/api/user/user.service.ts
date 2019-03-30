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

  read(user_id?: string): Observable<IUser> {
    return this.http
      .get<IUser>(`/api/user${user_id == null ? '' : '/' + user_id}`)
      .pipe(map(parseDates));
  }

  update(user: IUser, user_id?: string): Observable<IUser> {
    return this.http
      .put<IUser>(`/api/user${user_id == null ? '' : '/' + user_id}`, user)
      .pipe(map(parseDates));
  }

  destroy(user_id: string): Observable<{}> {
    return this.http
      .delete(`/api/user/${user_id}`);
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
