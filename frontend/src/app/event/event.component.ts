import { Component, OnInit } from '@angular/core';
import { Evt } from 'src/models/Event';
import { EventService } from 'src/services/event.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
})
export class EventComponent implements OnInit {
  dataSource: Evt[] = [];

  constructor(private ES: EventService, private dialog: MatDialog) {}

  displayedColumns: string[] = [
    'id',
    'titre',
    'datedebut',
    'datefin',
    'lieu',
    'icons',
  ];

  ngOnInit(): void {
    this.ES.getAllEvents().subscribe((data) => {
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
        this.ES.deleteEvent(id).subscribe(() => {
          this.ES.getAllEvents().subscribe((data) => {
            this.dataSource = data;
          });
        });
      }
    });
  }
}
