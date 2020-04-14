import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ProjectService } from '../services/project/project.service';

declare var $: any;

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  projectForm: FormGroup;
  modalRef: BsModalRef;

  submitted: boolean = false;
  listGridView: string = "Grid";
  projectList: any;
  getErrorMsg: any;
  projectData: Object;
  projectError: any;
  deleteProjectData: any;
  deleteErrorMsg: any;
  deleteResponse: any;
  chosenDate: any;

  constructor(private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private projectService: ProjectService
  ) { }

  ngOnInit() {
    this.createForm();
    this.getProjectList();
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

  refreshProject() {
    this.submitted = false;
    this.getProjectList();
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
        custodianDate: this.projectForm.controls.custodianDate.value,
        shipDate: this.projectForm.controls.shipDate.value,
        expiryDate: this.projectForm.controls.expiryDate.value,
        comments: this.projectForm.controls.comments.value
      }

      if (projectPayload) {
        this.projectService.saveProject(projectPayload).subscribe((response) => {
          this.projectData = response;
          this.closeModal();
          this.getProjectList();
        }, ((error) => {
          this.projectError = error || 'Something went wrong, Please try agian';
        })
        )
      }
    }
  }

  gridListView(viewVale) {
    this.listGridView = viewVale;
  }

  openCreateProjectModel(template: TemplateRef<any>) {
    this.createForm();
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
    this.submitted = false;
  }

  closeModal() {
    this.modalRef.hide();
    this.modalRef = null;
    this.submitted = false;
  }

  getProjectList() {
    this.projectService.getProjects().subscribe((response) => {
      if (response) {
        this.projectList = response;
      }
    }, (error) => {
      this.getErrorMsg = error;
    })
  }

  editProjectModal(projectData, template: TemplateRef<any>) {
    console.log('projectData-->', projectData);
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
    this.projectForm.patchValue(projectData);
  }

  deleteProjectModal(projectData, template) {
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
    this.deleteProjectData = projectData;
  }

  deleteProject(projectData) {
    if (projectData._id) {
      this.projectService.deleteProject(projectData._id).subscribe(response => {
        this.deleteResponse = response;
        this.getProjectList();
        this.modalRef.hide();
        this.modalRef = null;
      }, (error) => {
        this.deleteErrorMsg = error;
      })
    }
  }

  projectInfoModal(projectData, template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

}