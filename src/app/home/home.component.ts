import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  onselectValue: any;
  constructor() { }

  ngOnInit(): void {
  }

  securityDataList = [
    {
      id: 102,
      name: "What is your Birthdate?",
      states: [
        {
          name: "Andhra Pradesh",
          id: "1001"
        },
        {
          name: "Arunachal pradesh",
          id: "1002"
        },
        {
          name: "Assam",
          id: "1003"
        },
        {
          name: "Sikkim",
          id: "1004"
        }
      ]
    },
    {
      id: 103,
      name: "What is Your old Phone Number?",
      states: [
        {
          name: "10000001",
          id: "1001"
        },
        {
          name: "10000002",
          id: "1002"
        },
        {
          name: "10000003",
          id: "1003"
        },
        {
          name: "10000004",
          id: "1004"
        }
      ]
    },
    {
      id: 104,
      name: "What is your Pet Name?",
      states: [
        {
          name: "Daisy",
          id: "1001"
        },
        {
          name: "Teddy",
          id: "1002"
        },
        {
          name: "Coco",
          id: "1003"
        },
        {
          name: "Rosie",
          id: "1004"
        }
      ]
    }
  ]

  onSelectEvent(selectedData) {
    console.log('----------->', selectedData);
    this.onselectValue = selectedData.states;
  }

}
