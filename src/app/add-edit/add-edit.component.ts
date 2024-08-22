import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {ContactService} from '../_Service/contact.service'
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {AlertService} from '../_Service/alert.service'
@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent {
  form!: FormGroup;
  id?: string;
  title!: string;
  loading = false;
  submitting = false;
  submitted = false;

  items: any[] = [];


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private  contactService: ContactService,
    private alertService: AlertService
   )
  {  

 this.form = this.fb.group({
    id:0,
    firstName: '',
    lastName: '',
    email: '',
 });
}
  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.form = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        id:0
        });

    this.title = 'Add Contact';
    if (this.id) {
        debugger;
        // edit mode
        this.title = 'Edit Contact';
        this.loading = true;
       
        this.contactService.GetAll()
        .subscribe({
          next: (data:any) => {
            this.items = data.contacts;
            debugger;
            var filter_array = this.items.filter(x => x.id == this.id);
            
            this.form.patchValue({
              firstName: filter_array[0].firstName ,
              lastName:filter_array[0].lastName,
              email:filter_array[0].email,
              id:filter_array[0].id,
            })

          },
          error: (httpError: HttpErrorResponse) => {
              debugger;
              const errorValue: any | null = httpError.error;
              const errorCode: number = httpError.status;
              console.error(`Endpoint returned error ${errorValue} with status code ${errorCode}`)
          }
        });
    }
    else
    {

    }
}

onSubmit() {

  this.submitted = true;

  // stop here if form is invalid
  if (this.form.invalid) {
    return;
  }

  this.submitting = true;
  
  if(this.title =="Add Contact")
    {
      this.contactService.Create(this.form.value).subscribe({
        next: (res) => {
          this.alertService.success('Contact added successfully', { keepAfterRouteChange: true,autoClose:true });
          this.router.navigateByUrl('/View');
        
        },
        error: (e) => console.error(e)
      });
    }

    if(this.title =="Edit Contact")
      {
        debugger;
        this.contactService.Update(this.form.value).subscribe({
          next: (res) => {
            this.alertService.success('Contact updated successfully', { keepAfterRouteChange: true,autoClose:true });
            this.router.navigateByUrl('/View');
          },
          error: (e) => console.error(e)
        });
      }

}
 
}
