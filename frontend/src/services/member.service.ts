import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Member } from '../models/Member';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  constructor(private http: HttpClient) {}

  getAllMembers(): Observable<Member[]> {
    return this.http.get<Member[]>('http://localhost:3000/members');
  }

  deleteMember(id: string): Observable<void> {
    return this.http.delete<void>(`http://localhost:3000/members/${id}`);
  }
}
