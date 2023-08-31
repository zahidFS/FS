import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { SnackBarServiceService } from 'src/app/Core/snack-bar-service.service';
import { FieldServiceService } from 'src/app/field-library/field-service.service';
import { PageTypeServiceService } from 'src/app/page-types/page-type-service.service';
import { CustomerServiceService } from '../customer-service.service';

@Component({
  selector: 'app-library-onboard',
  templateUrl: './library-onboard.component.html',
  styleUrls: ['./library-onboard.component.css']
})
export class LibraryOnboardComponent implements OnInit{
  allForms: any[] = []; // Assuming you populate this with your form options
  allfields: any[] = []; // Assuming you populate this with your field options
   displayedColumns: string[] = ['fieldLabel','fieldName','placeholder','controlType','dataType','required','readOnly','Action'];
  selectedItems: any[] = [];
  dataSource:any;

  formGroup: any;
  constructor(private fb: FormBuilder,
    private _forms:PageTypeServiceService,
    private _field:FieldServiceService ,
    private _sBarService:SnackBarServiceService,
    private _customerService:CustomerServiceService,
    ) {
    
  }

  ngOnInit(): void {
    
    this._customerService.selectedForms.subscribe((res:any[])=>{
      console.log("Library",res);
      this.allForms=res;
    })
    //this.getForms();
    this.getFields();
    this.formGroup = this.fb.group({
      selectedForm:null,
      selectedItem: null,
    });
    this.dataSource = this.selectedItems;
  }

 
  addItem(selectedItem: any) {
    if (selectedItem) {
      const existingItem = this.selectedItems.find(item => item.fieldName === selectedItem);
      if (!existingItem) {
        const objSelected = this.allfields.find(val => val.fieldName === selectedItem);
        this.selectedItems.push(objSelected);
        this.dataSource = [...this.selectedItems];
        this.formGroup.get('selectedItem').reset();
      } else {
       this._sBarService.openSnackBar("Field Already Added",'done');
      }
    }
  }


  public fieldAction(event:string,ele:any){}

  public deleteItem(id:any){
    this.selectedItems = this.selectedItems.filter(item => item.id !== id);
    this.dataSource = [...this.selectedItems];  // Update dataSource
  }



  private getForms(){
    this._forms.getPageType().subscribe((res:any[])=>{
      console.log(res);
      this.allForms=res
    })
  }

  private getFields(){
    this._field.getField().subscribe((res:any[])=>{
      console.log(res);
      this.allfields=res
    })
  }
}

