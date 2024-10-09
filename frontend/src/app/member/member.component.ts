import { Component, OnInit } from '@angular/core';
import { Member } from 'src/models/Member';
import { MemberService } from 'src/services/member.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css'],
})
export class MemberComponent implements OnInit {
  constructor(private MS: MemberService, private dialog: MatDialog) {}
  //decalaration du tableau
  displayedColumns: string[] = [
    'id',
    'cin',
    'name',
    'type',
    'cv',
    'createdDate',
    'icons',
  ];
  dataSource: Member[] = [];
  ngOnInit(): void {
    //appeler la fonction du  service getAllMembers
    this.MS.getAllMembers().subscribe((data) => {
      this.dataSource = data;
    });
  }
  delete(id: string): void {
    //lancer la boite
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: '200px',
      width: '300px',
    });
    //attendre le resultat de click
    dialogRef.afterClosed().subscribe((result) => {
      if (result == true) {
        //si click = confirm =>
        this.MS.deleteMember(id).subscribe(() => {
          this.MS.getAllMembers().subscribe((data) => {
            this.dataSource = data;
          });
        });
      }
    });
  }
}
