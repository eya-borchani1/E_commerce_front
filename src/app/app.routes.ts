import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { RandomFormComponent } from './random-form.component';
import { SignupComponent } from './signup.component';
import { UtilisateursComponent } from './utilisateurs/utilisateurs';
import { ProductsComponent } from './products/products';
import { ProductListComponent } from './product-list/product-list';





export const routes: Routes = [
  { path: '', component: LoginComponent }, // page par défaut
  { path: 'random-form', component: RandomFormComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'utilisateurs', component: UtilisateursComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'product-list', component: ProductListComponent }
];
