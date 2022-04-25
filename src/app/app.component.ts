import { ControlTypesEnum, IFormSection } from './lib/components/form-gen/form.example';
import { DataService } from './services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'update-project';

  formValue = null;
  formValid = null;
  formIsValid;
  formData1: IFormSection[];
  formData2: IFormSection[];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {

    this.dataService.getData(1).subscribe(data => {
      this.formData1 = data;
    });

    this.dataService.getData(2).subscribe(data => {
      this.formData2 = data;
    });

  }

  onFormValidated(value): void {
    this.formIsValid = value;
  }

  onFormValidationChange($event): void {
    this.formValid = $event;
  }

  onReceiveChange(value): void {
    this.formValue = value;
  }

}
