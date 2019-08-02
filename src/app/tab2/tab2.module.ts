import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { RatingComponent } from '../rating/rating.component';
import {
  MatButtonModule,
  MatCardModule,
  MatInputModule
} from "@angular/material";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";



@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatIconModule,
    RouterModule.forChild([{ path: '', component: Tab2Page }])
  ],
  declarations: [Tab2Page, RatingComponent]
})
export class Tab2PageModule {}
