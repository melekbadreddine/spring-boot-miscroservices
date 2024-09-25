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
import { Router } from '@angular/router';

@Component({
  selector: 'app-member-form',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css'],
})
export class MemberFormComponent implements OnInit {
  form!: FormGroup;

  constructor(private memberService: MemberService, private router: Router) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = new FormGroup({
      cin: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      type: new FormControl(null, [Validators.required]),
      cv: new FormControl(null, [Validators.required]),
    });
  }

  sub(): void {
    console.log('Form submitted', this.form.value);
    const newMember = {
      ...this.form.value,
      createdDate: new Date().toISOString(),
    };
    this.memberService.addMember(newMember).subscribe({
      next: (response) => {
        console.log('Member added successfully', response);
        this.router.navigate(['']);
      },
      error: (error) => {
        console.error('Error adding member:', error);
      },
    });
  }
}
