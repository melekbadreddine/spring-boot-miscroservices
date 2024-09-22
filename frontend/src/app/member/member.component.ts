import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Member } from '../../models/Member';
import { MemberService } from '../../services/member.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-member',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css'],
})
export class MemberComponent implements OnInit {
  constructor(private memberService: MemberService) {}

  dataSource: Member[] = [];

  ngOnInit() {
    this.loadMembers();
  }

  loadMembers() {
    this.memberService.getAllMembers().subscribe({
      next: (data) => {
        this.dataSource = data;
      },
      error: (error) => {
        console.error('Error fetching members:', error);
      },
    });
  }

  openAddMemberDialog() {
    console.log('Add member button clicked');
  }

  deleteMember(id: string) {
    this.memberService.deleteMember(id).subscribe({
      next: () => {
        this.dataSource = this.dataSource.filter((member) => member.id !== id);
        console.log('Member deleted successfully');
      },
      error: (error) => {
        console.error('Error deleting member:', error);
      },
    });
  }

  columnsToDisplay: string[] = [
    'id',
    'cin',
    'name',
    'type',
    'cv',
    'createdDate',
    'actions',
  ];
}
