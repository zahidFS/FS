import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers.component';
import { ViewCustomersComponent } from './view-customers/view-customers.component';
import { AddEditCustomersDialogComponent } from './add-edit-customers-dialog/add-edit-customers-dialog.component';
import { LayoutModule } from '../layout/layout.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import {MatStepperModule} from '@angular/material/stepper';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { CustomerOnBoardingComponent } from './customer-on-boarding/customer-on-boarding.component';
import { AsignUnasignItemsComponent } from './asign-unasign-items/asign-unasign-items.component';
import { FilterPipePipe } from './pipes/filter-pipe.pipe';
import { QueuesOnBoardComponent } from './queues-on-board/queues-on-board.component';
import { FormsOnboardComponent } from './forms-onboard/forms-onboard.component';
import { LibraryOnboardComponent } from './library-onboard/library-onboard.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { FilterdropdownPipe } from './pipes/filterdropdown.pipe';


@NgModule({
  declarations: [
    CustomersComponent,
    ViewCustomersComponent,
    AddEditCustomersDialogComponent,
    CustomerOnBoardingComponent,
    AsignUnasignItemsComponent,
    FilterPipePipe,
    QueuesOnBoardComponent,
    FormsOnboardComponent,
    LibraryOnboardComponent,
    FilterdropdownPipe
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    LayoutModule,
    FormsModule,ReactiveFormsModule,MatButtonToggleModule,
    MatInputModule,MatFormFieldModule,MatCheckboxModule,
    MatSelectModule,MatIconModule,MatButtonModule,
    MatDialogModule,MatRadioModule,MatStepperModule,
    MatPaginatorModule, MatTableModule,MatCardModule,
    MatTooltipModule,MatAutocompleteModule,
  ]
})
export class CustomersModule { }
