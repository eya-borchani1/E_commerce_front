import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../Models/product';

@Component({
  selector: 'app-products',
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class ProductsComponent implements OnInit {
  productForm: FormGroup;
  products: Product[] = [];
  editMode: boolean = false;
  currentProductId: any = null;

preview: string | ArrayBuffer | null = null;
selectedFile!: File;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(2)]],
      prix: [null, [Validators.required, Validators.min(0)]],
      qte: [null, [Validators.required, Validators.min(0)]],
       image: [null] 
    });
  }

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.http.get<any>('http://localhost:8000/api/products').subscribe(data => {
      this.products = data.data || data;
    }, err => {
      console.error('Erreur fetch products', err);
    });
  }

  addProduct() {
    console.log(this.productForm.value);
      const formData = new FormData();
  formData.append('name', this.productForm.value.name);
  formData.append('description', this.productForm.value.description);
  formData.append('prix', this.productForm.value.prix);
  formData.append('qte', this.productForm.value.qte);
  formData.append('image', this.selectedFile);
    if (this.productForm.valid) {
      this.http.post('http://localhost:8000/api/products', formData).subscribe(resp => {
        this.fetchProducts();
        this.productForm.reset();
      });
    }
  }

  editProduct(product: Product) {
    this.editMode = true;
    this.currentProductId = product.id;
    this.productForm.patchValue(product);
  }

  updateProduct() {
     console.log(this.productForm.value);
    if (this.productForm.valid && this.currentProductId !== null) {
      this.http.put(`http://localhost:8000/api/products/${this.currentProductId}`, this.productForm.value).subscribe(resp => {
        this.fetchProducts();
        this.cancelEdit();
      });
    }
  }

  deleteProduct(id: any) {
    this.http.delete(`http://localhost:8000/api/products/${id}`).subscribe(resp => {
      this.fetchProducts();
    });
  }

  cancelEdit() {
    this.editMode = false;
    this.currentProductId = null;
    this.productForm.reset();
  }

  onFileSelected(event: any) {
  const file = event.target.files[0];
  if (file) {
    this.selectedFile = file;
    this.productForm.patchValue({ image: file });
    this.productForm.get('image')?.updateValueAndValidity();

    // Preview
    const reader = new FileReader();
    reader.onload = () => this.preview = reader.result;
    reader.readAsDataURL(file);
  }
}
}
