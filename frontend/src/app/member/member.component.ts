import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Member } from '../../models/Member';
import { MemberService } from '../../services/member.service';

@Component({
  selector: 'app-member',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css'],
})
export class MemberComponent implements OnInit {
  constructor(private MS: MemberService) {}
  dataSource: Member[] = [];
  ngOnInit() {
    this.MS.getAllMembers().subscribe((data) => {
      this.dataSource = data;
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
