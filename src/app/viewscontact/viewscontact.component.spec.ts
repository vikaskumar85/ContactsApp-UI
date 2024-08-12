import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewscontactComponent } from './viewscontact.component';
import { ContactService } from '../_Service/contact.service';
import { AlertService } from '../_Service/alert.service';
import { ModalService } from '../_Service/modal.service';
import { of, throwError } from 'rxjs';
import { PaginationComponent } from '../_compnent/pagination/pagination.component'
import { ModalComponent } from '../_compnent/_modelpopup/modal.component'

describe('ViewscontactComponent', () => {
  let component: ViewscontactComponent;
  let fixture: ComponentFixture<ViewscontactComponent>;
  let contactService: ContactService;
  let alertService: AlertService;
  let modalService: ModalService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewscontactComponent, PaginationComponent, ModalComponent ],
      imports: [ HttpClientTestingModule, FormsModule, ReactiveFormsModule ],
      providers: [ ContactService, AlertService, ModalService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewscontactComponent);
    component = fixture.componentInstance;
    contactService = TestBed.inject(ContactService);
    alertService = TestBed.inject(AlertService);
    modalService = TestBed.inject(ModalService);
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(fixture).toBeTruthy();
  });
});
