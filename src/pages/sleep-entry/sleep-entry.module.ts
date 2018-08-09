import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SleepEntryPage } from './sleep-entry';

@NgModule({
  declarations: [
    SleepEntryPage,
  ],
  imports: [
    IonicPageModule.forChild(SleepEntryPage),
  ],
})
export class SleepEntryPageModule {}
