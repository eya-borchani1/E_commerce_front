import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-random-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './random-form.html',
  styleUrls: ['./random-form.css']
})
export class RandomFormComponent {
  randomForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.randomForm = this.fb.group({
      favoriteColor: ['ere', Validators.required],
      luckyNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$'),Validators.min(300)]],
      birthDate: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      country: ['', Validators.required],
      agree: [false, Validators.requiredTrue]
    });
  }

  onSubmit() {
    console.log(this.randomForm.get('luckyNumber'))
    if (this.randomForm.valid) {
      alert('Formulaire soumis avec succès!\n' + JSON.stringify(this.randomForm.value, null, 2));
    }
  }
}
