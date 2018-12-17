import { MatMomentDateModule } from '@angular/material-moment-adapter';

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';

import { FuseDirectivesModule } from '@fuse/directives/directives';
import { FusePipesModule } from '@fuse/pipes/pipes.module';

// FontAwesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas, faArchive, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

library.add(fas, faArchive, faClipboardList, faTwitter);

// Material
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
	MatSlideToggleModule,
	MatDialogModule,
	MatToolbarModule,
    MatCardModule
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

		// FontAwesome
		FontAwesomeModule,

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
		MatDialogModule,
        MatToolbarModule,
        MatCardModule,

		MatMomentDateModule,

		NgxChartsModule
	],
	exports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,

		FlexLayoutModule,

		FuseDirectivesModule,
		FusePipesModule,

		// FontAwesome
		FontAwesomeModule,

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
		MatDialogModule,
        MatToolbarModule,
        MatCardModule,

		MatMomentDateModule,

		NgxChartsModule
	]
})
export class FuseSharedModule {}
