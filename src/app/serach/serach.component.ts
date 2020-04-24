import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project/project.service';

@Component({
  selector: 'app-serach',
  templateUrl: './serach.component.html',
  styleUrls: ['./serach.component.css']
})
export class SerachComponent implements OnInit {
  values: string;
  searchText: string;
  projectList = [];
  errorMsg: string;
  loadingBar: boolean = false;

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
  }

  onSearchEvent(value: string) {
    if (value.length) {
      this.loadingBar = true;
      if (this.projectList.length) this.projectList = [];
      this.projectService.searchProjectByName(value).subscribe((response) => {
        if (response.length) {
          this.errorMsg = '';
          this.projectList = response;
          this.loadingBar = false;
        } else {
          this.errorMsg = "No record found...";
          this.loadingBar = false;
        }
      }, (error) => {
        this.errorMsg = error.error ? error.error.message : 'No record found...';
        this.loadingBar = false;
      })
    }

  }

  refresh() {
    this.searchText = '';
    this.errorMsg = '';
    if (this.projectList.length) this.projectList = [];
  }
}
