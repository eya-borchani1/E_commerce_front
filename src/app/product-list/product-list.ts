import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Product } from '../Models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.html',
   styleUrl: './product-list.css',
   imports: [ReactiveFormsModule, CommonModule, FormsModule],
})
export class ProductListComponent implements OnInit{
  products: Product[] = [
    // {
    //   nom: 'Wireless Headphones',
    //   description: 'High-quality sound with noise cancellation.',
    //   qte: 12,
    //   image: 'https://m.media-amazon.com/images/I/616tDnOfX4L._AC_SL1500_.jpg'
    // },
    // {
    //   nom: 'Smartphone',
    //   description: 'Latest model with 128GB storage and 5G support.',
    //   qte: 5,
    //   image: 'https://via.placeholder.com/200x150?text=Smartphone'
    // },
    // {
    //   nom: 'Smartwatch',
    //   description: 'Track your fitness and health with style.',
    //   qte: 8,
    //   image: 'https://via.placeholder.com/200x150?text=Smartwatch'
    // },
    // {
    //   nom: 'Bluetooth Speaker',
    //   description: 'Portable speaker with powerful bass.',
    //   qte: 15,
    //   image: 'https://via.placeholder.com/200x150?text=Speaker'
    // }
  ];
constructor(private http: HttpClient) {}

  ngOnInit(): void {
      this.getProducts();
      
  }

getProducts(){
console.log("Fetching products...");
    this.http.get<any>('http://localhost:8000/api/products').subscribe(data => {
      this.products = data.data || data;
      console.log("Products fetched:", this.products);
    }, err => {
      console.error('Erreur fetch products', err);
    });
}

}
