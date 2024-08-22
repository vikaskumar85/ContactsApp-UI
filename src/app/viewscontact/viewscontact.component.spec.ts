import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewscontactComponent } from './viewscontact.component';
import { ContactService } from '../_Service/contact.service';
import { AlertService } from '../_Service/alert.service';
import { of, throwError } from 'rxjs';
import { PaginationComponent } from '../_compnent/pagination/pagination.component'

describe('ViewscontactComponent', () => {
  let component: ViewscontactComponent;
  let fixture: ComponentFixture<ViewscontactComponent>;
  let contactService: ContactService;
  let alertService: AlertService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewscontactComponent, PaginationComponent ],
      imports: [ HttpClientTestingModule, FormsModule, ReactiveFormsModule ],
      providers: [ ContactService, AlertService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewscontactComponent);
    component = fixture.componentInstance;
    contactService = TestBed.inject(ContactService);
    alertService = TestBed.inject(AlertService);
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(fixture).toBeTruthy();
  });
});
