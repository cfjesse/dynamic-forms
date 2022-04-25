import { EventEmitter, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { IFormSection, IControl, IValidator, ControlTypesEnum, ValidatorsEnum } from './form.example';



@Component({
  selector: 'app-form-gen',
  templateUrl: './form-gen.component.html',
  styleUrls: ['./form-gen.component.scss']
})
export class FormGenComponent implements OnInit, OnChanges {

  form: FormGroup;
  formGroups: IFormSection[];
  ControlTypesEnum = ControlTypesEnum;
  @Input() formData: any;
  @Output() formValue = new EventEmitter<{ [key: string]: { [key: string]: any }}>();
  @Output() formValidation = new EventEmitter<{ [key: string]: { [key: string]: boolean }}>();
  @Output() formIsValid = new EventEmitter<boolean>();

  subscriptions: Subscription[] = [];
  showForm: boolean;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {

    this.showForm = false;

    if(!changes.formData.isFirstChange) {
      this.compareChanges(changes.formData.currentValue, changes.formData.previousValue);
    }

    this.generateForm();
  }

  compareChanges(prev, next): any {

    if(JSON.stringify(prev) === JSON.stringify(next)) {
      console.log(`**** diff`);
    }

  }

  private generateValidators(required = false, validatorList: IValidator[]): any[] {
    const validators: IValidator[] | any = [];
    if(required) {
      validators.push(Validators.required);
    }

    validatorList.forEach(validator => {

      switch(validator.type) {
        case ValidatorsEnum.MinLength:
          validators.push(Validators.minLength(parseInt(validator.value)));
          break;
        case ValidatorsEnum.MaxLength:
          validators.push(Validators.maxLength(parseInt(validator.value)));
          break;
        case ValidatorsEnum.Email:
          validators.push(Validators.email);
          break;
        case ValidatorsEnum.Pattern:
          validators.push(Validators.pattern(validators.value));
          break;
      }
    });

    return validators;
  }

  private generateForm(): void {
    const forms = {};

    this.formData.forEach((group: IFormSection) => {

      const controls: { [key: string]: FormControl; } = {};
      group.controls.forEach((control: IControl) => {
        const validators = [...this.generateValidators(control.required, control.validators || [])];
        controls[control.name] = new FormControl(control.default || '', validators);
      })

      forms[group.groupName] = this.fb.group(controls);

    })

    this.form = this.fb.group(forms);
    this.subscriptions.forEach(sub => sub.unsubscribe());

    this.subscriptions.push(
      this.form.valueChanges.subscribe(() => {
        this.formIsValid.emit(this.form.valid);
        this.formValue.emit(this.form.value);
        const validation = {};
        this.formData.forEach(group => {
          validation[group.groupName] = { };
          group.controls.forEach(control =>  validation[group.groupName][control.name] = this.form.get(group.groupName).get(control.name).valid);
        })
        this.formValidation.emit(validation);
      })
    );


    this.showForm = true;

  }

  trackByFn(index: number, item: any): any {
    return item;
  }

}
