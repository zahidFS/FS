import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackBarServiceService } from 'src/app/Core/snack-bar-service.service';
import { FieldServiceService } from '../field-service.service';
import { Options,LabelType } from 'ngx-slider-v2';

@Component({
  selector: 'app-add-edit-field-library',
  templateUrl: './add-edit-field-library.component.html',
  styleUrls: ['./add-edit-field-library.component.css']
})
export class AddEditFieldLibraryComponent {
  public fieldForm:any;
  sliderValue: number = 0;

  minValue: number = 5;
  maxValue: number = 50;
  options: Options = {
    floor: 0,
    ceil: 100,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return "<b>Min Range:</b> " + value;
        case LabelType.High:
          return "<b>Max Range:</b> " + value;
        default:
          return "" + value;
      }
    }
  };

  valueMinLen: number = 0;
  optionsMinLen: Options = {
    floor: 0,
    ceil: 50,
    // translate: (value: number): string => {
    //   return "<b>Min Length:</b> " + value; // Combine value and label
    // }
  };
  valueMaxLen: number = 100;
  optionsMaxLen: Options = {
    floor: 0,
    ceil: 250
  };



  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddEditFieldLibraryComponent>,
    private _sBarService:SnackBarServiceService,
    private _fieldService:FieldServiceService,
    private fb: FormBuilder
  ){}
  
  ngOnInit(){
   
   this.generateFormElements();
   console.log(this.data)
  }



  updateSliderValue(event: any): void {
    this.sliderValue = event.target.value;
  }

  /** 
   * Method To Generate Form Elements 
  */
  public generateFormElements(){
    this.fieldForm=this.fb.group({
      id:new FormControl(this.data?.dataObj ? this.data.dataObj.id:null),
      fieldLabel:new FormControl(this.data?.dataObj ? this.data.dataObj?.fieldLabel:null),
      fieldName:new FormControl(this.data?.dataObj ? this.data.dataObj?.fieldName:null,[Validators.required]),
      placeholder:new FormControl(this.data?.dataObj ? this.data.dataObj?.placeholder:null,[Validators.required]),
      allowedChar:new FormControl(this.data?.dataObj ? this.data.dataObj?.allowedChar:null),
      notAllowedChar:new FormControl(this.data?.dataObj ? this.data.dataObj?.allowedChar:null),
      multiSelect:new FormControl(this.data?.dataObj ? this.data.dataObj?.multiSelect:null),
      showLabel:new FormControl(this.data?.dataObj ? this.data.dataObj?.showLabel:null),
      required:new FormControl(this.data?.dataObj ? this.data.dataObj?.required:null),
      readOnly:new FormControl(this.data?.dataObj ? this.data.dataObj?.readOnly:true),
      maxRange:new FormControl(this.data?.dataObj ? this.data.dataObj?.maxRange:null),
      minRange:new FormControl(this.data?.dataObj ? this.data.dataObj?.minRange:null),
      minLength:new FormControl(this.data?.dataObj ? this.data.dataObj?.minLength:null),
      maxLength:new FormControl(this.data?.dataObj ? this.data.dataObj?.maxLength:null),
      controlType:new FormControl(this.data?.dataObj ? this.data.dataObj?.controlType:null,[Validators.required]),
      dataType:new FormControl(this.data?.dataObj ? this.data.dataObj?.dataType:null,[Validators.required]),
      validRegx:new FormControl(this.data?.dataObj ? this.data.dataObj?.validRegx:null,[Validators.required]),
      createdAt:new FormControl(this.data?.dataObj ? this.data.dataObj?.createdAt:new Date()),
      updatedAt:new FormControl(this.data?.dataObj ? new Date():null),
      isActive:new FormControl(this.data?.dataObj?.isActive || 1),
      slider:[0],
      // selectedRoles:new FormControl([]),
    })
  }


  /** 
   * Method To Add/Update values  
  */
  public addUpdateField(){
    console.log(this.fieldForm.value);
    if(this.data.Action==='Add'){
      this.addField();
    }else{
      this.updateQueue();
    }
    
  }

  /** 
   * Method To Add New Field Definition  
  */
  private addField(){
    let fieldData=this.fieldForm.value;
    this._fieldService.postField(fieldData).subscribe((res:any[])=>{
      this._sBarService.openSnackBar('Field Added successfully!','done');
      this.fieldForm.reset();
    },err=>{
      console.log(err)
    })
  }

  /** 
   * Method To Update Field values Definition  
  */
  private updateQueue(){
    let userData=this.fieldForm.value;
    let id=this.fieldForm.value.id;

    this._fieldService.updateField(id,userData).subscribe((res:any[])=>{
      this._sBarService.openSnackBar('Field Updated successfully!','done')
      this.dialogRef.close(true); 
    },err=>{
      console.log(err)
    })
  }


  getHandleColor(): string {
    // Your logic to determine the color
    if (this.minValue < 50) {
      return 'red';
    } else {
      return 'green';
    }
  }


 /** 
   * Method To close Dialog  
  */  
  public closeDialog(){
    this.dialogRef.close(true);
  }
}
