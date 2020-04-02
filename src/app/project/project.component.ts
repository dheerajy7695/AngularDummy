import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  projectForm: FormGroup;
  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.projectForm = this.formBuilder.group({

      projectId: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(50)])],
      projectName: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(50)])],
      managerId: ['', Validators.required],
      managerName: ['', [Validators.required]],
      managerStartDate: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(15)])],
      custodianId: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(15)])],
      custodianName: ['', Validators.compose([Validators.required])],
      custodianDate: ['', Validators.required],
      shipDate: ['', Validators.required],
      expiryDate: ['', Validators.required],
      comments: ['', Validators.required]
    })

  }

  createProject() {
    this.submitted = false;
    if (this.projectForm.invalid) {
      this.submitted = true;
      return
    } else {
      let projectPayload = {
        projectId: this.projectForm.controls.projectId.value,
        projectName: this.projectForm.controls.projectName.value,
        managerId: this.projectForm.controls.managerId.value,
        managerName: this.projectForm.controls.managerName.value,
        managerStartDate: this.projectForm.controls.managerStartDate.value,
        custodianId: this.projectForm.controls.custodianId.value,
        custodianName: this.projectForm.controls.custodianName.value,
        shipDate: this.projectForm.controls.shipDate.value,
        expiryDate: this.projectForm.controls.expiryDate.value,
        comments: this.projectForm.controls.comments.value
      }

      if (projectPayload) {
        console.log('projectPayload-->', projectPayload);
      }
    }
  }

}
