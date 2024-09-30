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

  getMember(id: string): Observable<Member> {
    return this.http.get<Member>(`http://localhost:3000/members/${id}`);
  }

  addMember(m: Member): Observable<Member> {
    return this.http.post<Member>('http://localhost:3000/members', m);
  }

  deleteMember(id: string): Observable<void> {
    return this.http.delete<void>(`http://localhost:3000/members/${id}`);
  }

  updateMember(id: String, m: Member): Observable<void> {
    return this.http.put<void>(`http://localhost:3000/members/${id}`, m);
  }
}
