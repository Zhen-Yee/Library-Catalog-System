import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete-item',
  templateUrl: './delete-item.component.html',
  styleUrls: ['./delete-item.component.css']
})
export class DeleteItemComponent implements OnInit {
  numDeleted = [
    {value: 'delete-1', viewValue: '1'},
    {value: 'delete-2', viewValue: '2'},
    {value: 'delete-3', viewValue: '3'},
    {value: 'delete-4', viewValue: '4'},
    {value: 'delete-5', viewValue: '5'},
    {value: 'delete-6', viewValue: '6'},
    {value: 'delete-7', viewValue: '7'},
    {value: 'delete-8', viewValue: '8'},
    {value: 'delete-9', viewValue: '9'},
    {value: 'delete-10', viewValue: '10'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
