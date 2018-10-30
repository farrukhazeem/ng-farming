import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BugService } from '../../../../providers/bug.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bugs',
  templateUrl: './bugs.component.html',
  styleUrls: ['./bugs.component.css']
})
export class BugsComponent implements OnInit {
  demoArray = [
    { bugName: 'cell 1' },
    { bugName: 'cell 1' },
    { bugName: 'cell 1' },
    { bugName: 'cell 1' },
  ];

  bugList = [];
  createBugForm: FormGroup;
  editBugForm: FormGroup;
  editIndex;
  constructor(private fb: FormBuilder, private bs: BugService, private toastr: ToastrService) { }

  ngOnInit() {
    this.createForm();
    this.apiCall();
  }

  apiCall() {
    this.bs.getBugData().subscribe(data => {
      console.log(data);
      this.bugList = data['data'];
    }, (error) => {
      console.log(error);
    })
  }



  createForm() {
    this.createBugForm = this.fb.group({
      bug_name: ['', Validators.required],
    });

    this.editBugForm = this.fb.group({
      bug_name: ['', Validators.required],
    });

  }

  createBug() {
    this.bs.addBug(this.createBugForm.value).subscribe((data) => {
      console.log(data);
      this.bugList = [...this.bugList, ...data['data']];
    }, (error) => {
      console.log(error);
			this.toastr.error('Create Bug!', 'Error!');

    },()=>{
    this.createBugForm.reset();
			this.toastr.success('Create Bug!', 'Completes!');
    
	})
  }

  fillEditForm(index) {
    console.log(index);
    this.editIndex = index;
    this.editBugForm.patchValue({
      bug_name : this.bugList[index].bug_name
    }) 
  }

  editBug() {
    let body = {
      bug_name : this.editBugForm.value.bug_name,
      id: this.bugList[this.editIndex]['_id']
    }

    this.bs.editBug(body).subscribe((data) => {
      console.log(data);
      // this.bugList = [...this.bugList, ...data['data']];
      this.bugList[this.editIndex] = data['data']
    }, (error) => {
      console.log(error);
			this.toastr.error('Update Bug!', 'Error!');

    },()=>{
    this.editBugForm.reset();
			this.toastr.success('Update Bug!', 'Completes!');
    
	})
  }


}
