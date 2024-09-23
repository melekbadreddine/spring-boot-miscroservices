import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MemberService } from '../../services/member.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './member-form.component.html',
  styleUrl: './member-form.component.css',
})
export class MemberFormComponent implements OnInit {
  constructor(private memberService: MemberService, private router: Router) {}
  ngOnInit(): void {
    this.initform();
  }
  form!: FormGroup;
  initform(): void {
    this.form = new FormGroup({
      cin: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      type: new FormControl(null, [Validators.required]),
      cv: new FormControl(null, [Validators.required]),
    });
  }
  sub(): void {
    console.log(this.form.value);
    const x = { ...this.form.value, createdDate: new Date().toISOString() };
    this.memberService.addMember(x).subscribe(() => {
      this.router.navigate(['']);
    });
  }
}
