import { Component, OnInit } from '@angular/core';
import { AtdService } from '../services/atd.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
data: any;

  constructor(private atdService:AtdService) {}
  ngOnInit(): void {
    console.log("tab 3", this.atdService.data);
    this.data = this.atdService.data;
  }

}
