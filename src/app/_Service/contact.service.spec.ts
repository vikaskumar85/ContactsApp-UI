import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ContactService } from './contact.service';
import { environment } from 'src/environments/environment';

describe('ContactService', () => {
  let service: ContactService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ContactService]
    });

    service = TestBed.inject(ContactService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  // Test case 1: GetAll should fetch data from the API
  it('should retrieve all contacts from the API via GET', () => {
    const dummyContacts = [
      { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' },
      { id: 2, firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@example.com' }
    ];

    service.GetAll().subscribe(contacts => {
      expect(contacts).toEqual(dummyContacts);
    });

    const request = httpMock.expectOne(`${environment.apiUrl}GetAll`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyContacts);
  });

  // Test case 2: Create should post data to the API
  it('should post contact data to the API via POST', () => {
    const contact = { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' };
    const response = { success: true };

    service.Create(contact).subscribe(res => {
      expect(res).toEqual(response);
    });

    const request = httpMock.expectOne(`${environment.apiUrl}Insert`);
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(contact);
    request.flush(response);
  });

  // Test case 3: Update should post updated data to the API
  it('should post updated contact data to the API via POST', () => {
    const contact = { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' };
    const response = { success: true };

    service.Update(contact).subscribe(res => {
      expect(res).toEqual(response);
    });

    const request = httpMock.expectOne(`${environment.apiUrl}Update`);
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(contact);
    request.flush(response);
  });

  // Test case 4: Delete should send a DELETE request to the API
  it('should delete contact data from the API via DELETE', () => {
    const contactId = '1';
    const response = { success: true };

    service.Delete(contactId).subscribe(res => {
      expect(res).toEqual(response);
    });

    const request = httpMock.expectOne(`${environment.apiUrl}Delete/${contactId}`);
    expect(request.request.method).toBe('DELETE');
    request.flush(response);
  });
});
