import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/models/Member';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  constructor(private http: HttpClient) {}
  getAllMembers(): Observable<Member[]> {
    //envoyer une req http vers backend
    return this.http.get<Member[]>('http://localhost:3000/members');
  }
  getMemberByID(id: string): Observable<Member> {
    return this.http.get<Member>(`http://localhost:3000/members/${id}`);
  }
  add(m: Member): Observable<void> {
    return this.http.post<void>('http://localhost:3000/members', m);
  }
  deleteMember(id: string): Observable<void> {
    return this.http.delete<void>(`http://localhost:3000/members/${id}`);
  }
  updateMember(id: string, m: Member): Observable<void> {
    return this.http.put<void>(`http://localhost:3000/members/${id}`, m);
  }
}
