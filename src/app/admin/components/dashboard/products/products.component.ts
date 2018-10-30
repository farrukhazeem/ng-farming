import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/providers/products.service';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-products',
	templateUrl: './products.component.html',
	styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
	edit_productForm: FormGroup;
	productData = [];
	productForm;
	editIndex;

	constructor(private fb: FormBuilder, private productService: ProductsService, private toastr: ToastrService) {
		this.createForm();
		this.editForm();
	}

	ngOnInit() {
		this.productService.getProductsData()
			.subscribe((data) => {
				this.productData = [...this.productData, ...data['data']];
			}
				, (error) => {
					console.log(error)
				})
	}

	createForm() {
		this.productForm = this.fb.group({
			product_name: ['', Validators.required],
			product_sku: ['', Validators.required],
			qty: ['', Validators.required],
		});
	}

	editForm() {
		this.edit_productForm = this.fb.group({
			edit_product_name: ['', Validators.required],
			edit_product_sku: ['', Validators.required],
			edit_qty: ['', Validators.required],
		});
	}

	edit() {
		console.log(this.edit_productForm.value)
		let body = {
			product_name: this.edit_productForm.value.edit_product_name,
			product_sku: this.edit_productForm.value.edit_product_sku,
			product_quantity_bottle: this.edit_productForm.value.edit_qty,
			id: this.productData[this.editIndex]['_id']
		}

		this.productService.editProductsData(body).subscribe((data) => {
			// this.productData[this.editIndex] = data['data'];
			this.afterEdit(data['data']);
		}
		, (error) => {
			console.log(error);
			this.toastr.error('Edit Product!', 'Fails!');

		},()=>{
			this.edit_productForm.reset();
			this.toastr.success('Edit Product!', 'Completes!');
		})

	}

	addproduct() {
		console.log(this.productForm.value);
		this.productService.addProductData(this.productForm.value).subscribe(data => {
			this.productData = [...this.productData, ...data['data']];
		}, (error) => {
			console.log(error);
			this.toastr.error('Edit Product!', 'Fails!');

		},()=>{
			this.toastr.success('Edit Product!', 'Completes!');
			this.productForm.reset();
		})
	}

	selectedRow(data, index) {
		console.log(data)
		this.edit_productForm.setValue({
			edit_product_name: data.product_name,
			edit_product_sku: data.product_sku,
			edit_qty: data.product_quantity_bottle,
		});
		this.editIndex = index;
	}


	afterEdit(data) {
		console.log(data);
		let obj = this.productData.find(x => x['_id'] === data['_id']);
		let index = this.productData.indexOf(obj);
		this.productData[index] = data;
	}


}
