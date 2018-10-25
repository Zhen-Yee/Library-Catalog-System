import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-delete-item-prompt-dialog',
  templateUrl: './delete-item-prompt-dialog.component.html',
  styleUrls: ['./delete-item-prompt-dialog.component.css']
})
export class DeleteItemPromptDialogComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

}
