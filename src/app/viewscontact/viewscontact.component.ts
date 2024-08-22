import { Component ,OnInit} from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {ContactService} from '../_Service/contact.service'
import {AlertService} from '../_Service/alert.service'
import {ContactModel} from '../_model/contact-model.model';
import { FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-viewscontact',
  templateUrl: './viewscontact.component.html',
  styleUrls: ['./viewscontact.component.css']
})
export class ViewscontactComponent implements OnInit {
  form!: FormGroup;
  items: any[] = [];
  previtems: any[] = [];
  pageOfItems?: Array<any>;
  sortProperty: string = 'id';
  sortOrder = 1;
  loading = false;
  buttontext="Save"
  addUpdateText="Add Contact"
  searchText=""

  page = 1
  count = 0;
  pageSize = 10;


  contactModel: ContactModel = {
    Id: 0,
    FirstName: '',
    LastName: '',
    Email: ''
  };


  constructor(private  contactService: ContactService, private alertService: AlertService,private http: HttpClient) {}

  ngOnInit() {
    const params = this.getRequestParams(this.page, this.pageSize);

    // fetch items from the backend api
    this.loading = true;
    this.contactService.GetAll()
        .subscribe({
          next: (data:any) => {
            this.items = data.contacts;
            this.previtems = this.items;
            this.count = data.TotalNoOfContacts
            this.onChangePage(this.items);
            this.loading = false;
          },
          error: (httpError: HttpErrorResponse) => {
              debugger;
              const errorValue: any | null = httpError.error;
              const errorCode: number = httpError.status;
              console.error(`Endpoint returned error ${errorValue} with status code ${errorCode}`)
          }
        });
}

getRequestParams(page: number, pageSize: number): any {
  let params: any = {};
if (page) {
    params[`Page`] = page ;
  }

  if (pageSize) {
    params[`PageSize`] = pageSize;
  }

  return params;
}

onChangePage(pageOfItems: Array<any>) {
  // update current page of items
  this.pageOfItems = pageOfItems;
}

sortBy(property: string) {
  this.sortOrder = property === this.sortProperty ? (this.sortOrder * -1) : 1;
  this.sortProperty = property;
  this.items = [...this.items.sort((a: any, b: any) => {
      // sort comparison function
      let result = 0;
      if (a[property] < b[property]) {
          result = -1;
      }
      if (a[property] > b[property]) {
          result = 1;
      }
      return result * this.sortOrder;
  })];
}

sortIcon(property: string) {
  if (property === this.sortProperty) {
      return this.sortOrder === 1 ? '☝️' : '👇';
  }
  return '';
}

Search(event: any): void {
  var searchVal = event.target.value;
  if (searchVal == null || searchVal.trim() === ''){
    this.items = this.previtems;
  }
  else
  {
    var result = this.previtems.filter(item => 
      Object.keys(item).some(k => item[k] != null && 
      item[k].toString().toLowerCase()
      .includes(searchVal.toLowerCase()))
      );
    this.items = result;
    this.onChangePage(this.items);
  }
}

deletecontact(id: string) {
 this.contactService.Delete(id)
      .subscribe({
        next: (response) => {
          if(response){
               this.alertService.success("Record deleted",{autoClose:true});
               this.ngOnInit();
            }
            else{
               this.alertService.error("Record not deleted",{autoClose:true});
            }
        },
        error: (e) => console.error(e)
      });
}

}