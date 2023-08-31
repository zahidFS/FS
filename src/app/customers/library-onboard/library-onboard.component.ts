import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SnackBarServiceService } from 'src/app/Core/snack-bar-service.service';
import { FieldServiceService } from 'src/app/field-library/field-service.service';
import { PageTypeServiceService } from 'src/app/page-types/page-type-service.service';
import { CustomerServiceService } from '../customer-service.service';
import { MatDialog } from '@angular/material/dialog';
import { AddEditFieldLibraryComponent } from 'src/app/field-library/add-edit-field-library/add-edit-field-library.component';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

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
  disable:boolean=true;
  isNewItemSelected = false;

  mergedDataArray: any[] = [];

  formGroup: any;
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
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
  });

  this.getFields();
  //Form Generation
  this.formGroup = this.fb.group({
    selectedForm:null,
    selectedItem: null,
  });
  this.dataSource = this.selectedItems;
  
}

/**
  * to add selected items from grid to table or Add new
  * @param selectedItem 
*/
  public addItem(selectedItem: any) {
      if (selectedItem === 'addNew') {
        this.fieldAction('Add',null)
        this.isNewItemSelected = true;
      }else{
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
   
  }

/**
  * Definitation of Add/Edit New Fields
  * @param event @param ele
*/
  public fieldAction(event:string,ele:any){
    return this.dialog.open(AddEditFieldLibraryComponent, {width: '90%', height: '590px',data:{Action:event,dataObj:ele}}).afterClosed()
      .subscribe(res => {
        if(res){
          this.formGroup.get('selectedItem').reset();
          this.isNewItemSelected = false; // Reset isNewItemSelected when dialog is closed
          this.getFields();
        } 
      });
  }

  public formSelection(val:string){
    console.log("form selected ",val);

  }

/**
  * to Finaly Save Records 
*/
  public saveRecord(){
    console.log("form selected ",this.formGroup.value)
    console.log("table selected ",this.dataSource)
    const mergedData = {
      forms: [
        {
          Formid: this.formGroup.value.selectedForm,
          fields: this.dataSource
          // fields: this.dataSource.map((field:any) => (
          //   { id: field.id }))
        }
      ]
    };
    this.mergedDataArray.push(mergedData);
    console.log('Merged Data Array:', this.mergedDataArray);
    this.dataSource=[];
  }


/**
  * to Delete Row From table 
  * @param id 
*/  
  public deleteItem(id:any){
    this.selectedItems = this.selectedItems.filter(item => item.id !== id);
    this.dataSource = [...this.selectedItems];  // Update dataSource
  }

/**
  * to get Form from API Not needed so far
  * @param selectedItem 
*/

  private getForms(){
    this._forms.getPageType().subscribe((res:any[])=>{
      console.log(res);
      this.allForms=res
    })
  }

/**
  * to get Fields from API
  * @param selectedItem 
*/
  private getFields(){
    this._field.getField().subscribe((res:any[])=>{
      console.log(res);
      this.allfields=res
    })
  }
}

