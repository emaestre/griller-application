import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  showMsgPostGriller: string;
  title: string = 'My first AGM project';
  lat: number = 51.678418;
  lng: number = 7.809007;


  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // show success message on home
    if (this.route.snapshot.queryParams['grillerMsg']) {
      this.showMsgPostGriller = 'Griller Creation Success!';
    }
  }

}
