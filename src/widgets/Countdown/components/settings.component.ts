import {Component, ViewChild} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {NgForm} from 'angular2/common';
import {Timepicker} from 'ng2-bootstrap';

import {IConfig, Config} from '../config';
import {DurationComponent} from './duration.component';
import {DurationAccessor} from './duration.accessor';
import {DonationsComponent} from './donations.component';
import {DonationsAccessor} from './donations.accessor';

import {Donation} from '../Donation';
import {Goal} from '../Goal';
import {numberConverter} from '../../../utils/TypeConverters';


// webpack imports
let template = require('./settings.component.html');
let style = require('./settings.component.scss');

let formats = ['2:00 PM', '14:00']; // TODO(djw): convert into value provider
let intervals = [1, 5, 10, 15, 30, 45, 60]; // TODO(djw): convert into value provider

@Component({
  selector: 'settings',
  directives: [
    Timepicker,
    DurationComponent,
    DurationAccessor,
    DonationsComponent,
    DonationsAccessor,
    CORE_DIRECTIVES,
    FORM_DIRECTIVES,
    ROUTER_DIRECTIVES
  ],
  template: template,
  styles: [style]
})
export class SettingsComponent {

  settings: IConfig = new Config();
  goal: Goal = new Goal();

  public isMeridian: boolean = true;
  public timeInterval: number = 15;
  public timeFormat: string = this.formats[0];

  get intervals() {
    return intervals;
  }
  get formats() {
    return formats;
  }

  // TODO(djw): Remove this when we're done testing
  get diagnostic() {
    return JSON.stringify({
      settings: JSON.stringify(this.settings),
      goal: JSON.stringify(this.goal),
    });
  }

  constructor() {
    this.goal.donations = [new Donation(20, 'daniel')];
  }

  private handleTimeFormatChange(evt): void {
    this.isMeridian = evt.target.value === this.formats[0];
  }

  private handleEndTimeChange(v: number): void {
    this.settings.maxTime = Math.max(v, this.settings.maxTime);
  }

  private handleMaxTimeChange(v: number): void {
    this.settings.endTime = Math.min(this.settings.endTime, v);
  }
}
