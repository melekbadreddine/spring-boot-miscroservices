import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Member } from '../../models/Member';
import { MemberService } from '../../services/member.service';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-member',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css'],
})
export class MemberComponent implements OnInit {
  constructor(
    private memberService: MemberService,
    private dialog: MatDialog
  ) {}

  dataSource: Member[] = [];

  ngOnInit() {
    this.loadMembers();
  }

  loadMembers() {
    this.memberService.getAllMembers().subscribe({
      next: (data) => {
        this.dataSource = data;
      },
    });
  }

  deleteMember(id: string) {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: '200px',
      width: '300px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.memberService.deleteMember(id).subscribe({
          next: () => {
            this.dataSource = this.dataSource.filter(
              (member) => member.id !== id
            );
            console.log('Member deleted successfully');
          },
        });
      }
    });
  }

  editMember(id: string) {
    this.memberService.deleteMember(id).subscribe({
      next: () => {
        this.dataSource = this.dataSource.filter((member) => member.id !== id);
        console.log('Member deleted successfully');
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
