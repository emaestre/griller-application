import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';

import { GrillerService, AuthenticationService } from '../_services'

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  grills: any[];
  dataTable: any;
  error: string;
  selectedGriller: any;

  constructor(
    private grillerService: GrillerService,
    private chRef: ChangeDetectorRef,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.error = null;
    this.grillerService.getAll()
      .subscribe(
        (data: any[]) => {
          this.grills = data
          this.chRef.detectChanges();
          const table: any = $('#dtBasicExample');

          $(document).ready( () => {
            this.dataTable = table.DataTable();
            $('.dataTables_length').addClass('bs-select');
          });
        },
        error => {
          this.error = error;
        });
  }

  RowSelected(griller:any){
    this.selectedGriller = griller;
    console.log(griller)
    console.log(this.authenticationService.currentUserValue)
  }
}
