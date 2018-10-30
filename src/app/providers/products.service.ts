import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class ProductsService {

	constructor(public http: HttpClient) { }

	addProductData(productData) {
		console.log('product Service ::::>>>>', productData);
		let productBody = {
			"product_name": productData.product_name,
			"product_sku": productData.product_sku,
			"product_quantity_bottle": productData.qty,
		}
		return this.http.post('http://localhost:3000/api/add-product', productBody);
	}

	getProductsData() {
		return this.http.get('http://localhost:3000/api/get-product');
	}

	editProductsData(data) {
		return this.http.post('http://localhost:3000/api/edit-product', data);
	}

	getProductDataById(id) {
		console.log(id);
		return this.http.get(`http://localhost:3000/api/get-product-byId/:id/${id}`)
	}
}
