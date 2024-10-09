import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MemberService } from 'src/services/member.service';
import { ActivatedRoute, Router } from '@angular/router'; // Import Router for navigation
import { Member } from 'src/models/Member';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css'],
})
export class MemberFormComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private memberService: MemberService, // Corrected MemberService injection
    private activatedRoute: ActivatedRoute,
    private router: Router // Inject Router for navigation
  ) {}

  // Lifecycle hook to initialize the form
  ngOnInit(): void {
    const idCourant = this.activatedRoute.snapshot.params['id'];
    console.log(idCourant);
    if (!!idCourant) {
      this.memberService.getMemberByID(idCourant).subscribe((m: Member) => {
        this.editForm(m);
      });
    } else {
      this.initForm();
    }
  }

  initForm(): void {
    this.form = new FormGroup({
      cin: new FormControl(null, [Validators.required]),
      cv: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      type: new FormControl(null, [Validators.required]),
    });
  }

  editForm(m: Member): void {
    this.form = new FormGroup({
      cin: new FormControl(m.cin, [Validators.required]),
      cv: new FormControl(m.cv, [Validators.required]),
      name: new FormControl(m.name, [Validators.required]),
      type: new FormControl(m.type, [Validators.required]),
    });
  }

  // Submit form data
  sub(): void {
    const idCourant = this.activatedRoute.snapshot.params['id'];
    if (!!idCourant) {
      const m = {
        ...this.form.value,
        createdDate: new Date().toISOString(),
      };
      this.memberService.updateMember(idCourant, m).subscribe(() => {
        this.router.navigate(['']);
      });
    } else {
      const formData = {
        ...this.form.value,
        createdDate: new Date().toISOString(),
      };

      this.memberService.add(formData).subscribe(() => {
        this.router.navigate(['/member']);
      });
    }
  }
}
