
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';

import { FuseDirectivesModule } from '@fuse/directives/directives';
import { FusePipesModule } from '@fuse/pipes/pipes.module';

import {
    MatButtonModule,
    MatChipsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatRippleModule,
    MatSelectModule,
    MatSortModule,
    MatSnackBarModule,
    MatTableModule,
    MatTabsModule,
    MatDatepickerModule,
    MatMenuModule,
    MatSlideToggleModule
} from '@angular/material';
import { NgxChartsModule } from '@swimlane/ngx-charts';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        FlexLayoutModule,

        FuseDirectivesModule,
        FusePipesModule,

        // Angular Material
        MatButtonModule,
        MatChipsModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatPaginatorModule,
        MatRippleModule,
        MatSelectModule,
        MatSortModule,
        MatSnackBarModule,
        MatTableModule,
        MatTabsModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatMenuModule,
        MatSlideToggleModule,

        NgxChartsModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        FlexLayoutModule,

        FuseDirectivesModule,
        FusePipesModule,

         // Angular Material
         MatButtonModule,
         MatChipsModule,
         MatExpansionModule,
         MatFormFieldModule,
         MatIconModule,
         MatInputModule,
         MatPaginatorModule,
         MatRippleModule,
         MatSelectModule,
         MatSortModule,
         MatSnackBarModule,
         MatTableModule,
         MatTabsModule,
         MatFormFieldModule,
         MatDatepickerModule,
         MatMenuModule,
         MatSlideToggleModule,

         NgxChartsModule
    ]
})
export class FuseSharedModule {}
