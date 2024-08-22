import { Component ,OnInit} from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {ContactService} from '../_Service/contact.service'
import {AlertService} from '../_Service/alert.service'
import { ModalService } from '../_Service/modal.service';
import {ContactModel} from '../_model/contact-model.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-viewscontact',
  templateUrl: './viewscontact.component.html',
  styleUrls: ['./viewscontact.component.css']
})
export class ViewscontactComponent implements OnInit {
  form!: FormGroup;
  id?: string;
  Isedit=false;
  title!: string;

  submitting = false;
  submitted = false;

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


  constructor(private  contactService: ContactService, private alertService: AlertService,private http: HttpClient,protected modalService: ModalService,  private fb: FormBuilder, private formBuilder: FormBuilder
 
    ) {
    this.form = this.fb.group({
      id:0,
      firstName: '',
      lastName: '',
      email: '',
   });

  }

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

protected get contactFormControl() {
  debugger;
  return this.form.controls;
}

protected get name() {
  return this.form.get('firstName');
}

onSubmit() {

  this.submitted = true;
 
  if (this.form.invalid) {
      return;
  }

  this.submitting = true;


  if(this.title =="Add Contact")
  {
    debugger;
    this.contactService.Create(this.form.value).subscribe({
      next: (res) => {
        this.loading = false;
        this.submitting = false;
        this.submitted = false;

       
         this.alertService.success("Record Saved",{autoClose:true});
       this.modalService.close();
       this.ngOnInit() ;
      
      },
      error: (e) => console.error(e)
    });
  }

  if(this.title =="Edit Contact")
    {
      debugger;
      this.contactService.Update(this.form.value).subscribe({
        next: (res) => {
          this.form = this.fb.group({
            id:0,
            firstName: '',
            lastName: '',
            email: '',
         });
         this.submitted = false;
         this.submitting = false;
         this.loading=false; 
          this.alertService.success("Record updated",{autoClose:true});
          this.modalService.close();
          this.ngOnInit() ;
        },
        error: (e) => console.error(e)
      });
    }

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


Add(): void {
  
  this.title = 'Add Contact';
  this.buttontext="Save";
  this.submitted = false;
  this.submitting = false;
  this.loading=false;

   this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      id:0
      });
  this.modalService.open('modal-2');
 
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
               this.modalService.close();
               this.ngOnInit() ;
            }
            else{
               this.alertService.error("Record not deleted",{autoClose:true});
            }
        },
        error: (e) => console.error(e)
      });
}

Editcontact(userId: string) {
 this.buttontext="Update"
 this.title="Edit Contact"
 var result = this.items.find(o => o.id === userId);
 this.form.patchValue({
        firstName:result.firstName ,
        lastName:result.lastName,
        email:result.email,
        id:result.id,
      })

this.modalService.open('modal-2')

}


}


