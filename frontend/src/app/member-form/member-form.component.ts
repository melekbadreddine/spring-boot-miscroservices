import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MemberService } from '../../services/member.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from '../../models/Member';

@Component({
  selector: 'app-member-form',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css'],
})
export class MemberFormComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private memberService: MemberService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    const idcourant = this.activatedRoute.snapshot.params['id'];
    if (!!idcourant) {
      this.memberService.getMember(idcourant).subscribe({
        next: (member) => {
          this.form = new FormGroup({
            cin: new FormControl(member.cin, [Validators.required]),
            name: new FormControl(member.name, [Validators.required]),
            type: new FormControl(member.type, [Validators.required]),
            cv: new FormControl(member.cv, [Validators.required]),
          });
        },
        error: (error) => {
          console.error('Error fetching member:', error);
        },
      });
    } else {
      this.form = new FormGroup({
        cin: new FormControl(null, [Validators.required]),
        name: new FormControl(null, [Validators.required]),
        type: new FormControl(null, [Validators.required]),
        cv: new FormControl(null, [Validators.required]),
      });
    }
  }

  sub(): void {
    const idCourant = this.activatedRoute.snapshot.params['id'];
    if (!!idCourant) {
      // je suis dans update
      const m: Member = this.form.value;
      const data = { ...this.form.value, createDate: new Date().toISOString() };
      this.memberService.updateMember(idCourant, data).subscribe(() => {
        this.router.navigate(['']);
      });
    } else if (this.form.valid) {
      const formData = {
        ...this.form.value,
        createDate: new Date().toISOString(),
      };
      console.log('Form Data:', formData);
      //appeler la fonction du service
      this.memberService.addMember(formData).subscribe(() => {
        this.router.navigate(['']);
      });
    }
  }
}
