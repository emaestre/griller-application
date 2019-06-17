import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';

import { GrillerService, AuthenticationService } from '../_services'
import { ModalComponent } from '../modal';

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
    private modalService: NgbModal,
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

  openFormModal(griller:any) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.griller = griller;
    modalRef.componentInstance.currentUser = this.authenticationService.currentUserValue;
    
    this.selectedGriller = griller;
    
  }
}
