import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../user';

@Component({
  selector: 'app-utilisateurs',
  imports: [ReactiveFormsModule,CommonModule, FormsModule],
  templateUrl: './utilisateurs.html',
  styleUrl: './utilisateurs.css'
})
export class UtilisateursComponent implements OnInit {
  userForm: FormGroup;
  users: User[] = []; 
  editMode: boolean = false;  
  currentUserId:any
  constructor(private fb: FormBuilder,private http: HttpClient) {
    // Création du formulairen
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() { 
   this.fetchUsers();
   }

fetchUsers(){    this.http.get<any>('http://localhost:8000/api/users').subscribe(data => {
      this.users = data.data;
    });  }


  onSubmit() {
    console.log(this.userForm.value)
    this.http.post('http://localhost:8000/api/users', this.userForm.value) 
      .subscribe(response => {
        console.log('Réponse du serveur :', response);
      });
    }


     addUser() {
    if (this.userForm.valid) {
      const newUser: User = {
        ...this.userForm.value
      };
      this.http.post('http://localhost:8000/api/users', this.userForm.value) 
      .subscribe(response => {
        this.fetchUsers();
        console.log('Réponse du serveur :', response);
      });
      this.userForm.reset();
    }
  }

  // Remplir le formulaire pour édition
  editUser(user: User) {
    this.editMode = true;
    this.currentUserId = user.id;
    this.userForm.patchValue(user);
  }

  // Sauvegarder les modifications
  updateUser() {
    if (this.userForm.valid && this.currentUserId !== null) {
     this.http.put(`http://localhost:8000/api/users/${this.currentUserId}`, this.userForm.value) 
      .subscribe(response => {
        this.fetchUsers();
        console.log('Réponse du serveur :', response);
      });
      this.cancelEdit();
    }
  }

  // Supprimer un utilisateur
  deleteUser(id: number) {
    this.http.delete(`http://localhost:8000/api/users/${id}`) 
      .subscribe(response => {
        this.fetchUsers();
        console.log('Réponse du serveur :', response);
      });
  }

  // Annuler édition
  cancelEdit() {
    this.editMode = false;
    this.currentUserId = null;
    this.userForm.reset();
  }
}

