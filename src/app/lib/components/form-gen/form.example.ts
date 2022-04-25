export enum ControlTypesEnum {
  Text = 'text',
  Number = 'number',
  Email = 'email',
  Phone = 'phone',
  Date = 'date',
  Dropdown = 'dropdown',
  CountrySelect = 'country'
}

export enum ValidatorsEnum {
  MinLength = 'minLength',
  MaxLength = 'maxLength',
  Pattern = 'pattern',
  Email = 'email',
  Null = 'null',
  Custom = 'custom'
}

export enum CalendarTypeEnum {
  Range = 'range',
  Mutli = 'multi',
}

export interface IValidator {
  type: ValidatorsEnum ;
  value?: any;
}

export interface IControl {
  type: ControlTypesEnum;
  name: string;
  default?: string | number | boolean;
  displayText?: string;
  placeholder?: string;
  required?: boolean;
  validators?: IValidator[],
  errorMessage?: string;
  calendar?: {
    type?: CalendarTypeEnum;
    format?: string;
  }
  dropdown?: { label: string; value: any }[];
}

export interface IFormSection {
  groupName: string;
  allowReset?: boolean;
  disableSection?: boolean;
  layout?: string;
  controls: IControl[];
  separator?: boolean;
}

export const formGroups: IFormSection[] = [
  {
    groupName: 'travelInfo',
    separator: true,
    controls: [
      {
        name: 'startDate',
        type: ControlTypesEnum.Date,
        required: true,
        placeholder: 'Start Date',
        errorMessage: 'Start Date is required',
        displayText: 'Start Date'
      },
      {
        name: 'endDate',
        type: ControlTypesEnum.Date,
        required: true,
        placeholder: 'End Date',
        errorMessage: 'End Date is required',
        displayText: 'End Date'
      }
    ]
  },
  {
    groupName: 'userInfo',
    controls: [
      {
        name: 'firstName',
        required: true,
        type: ControlTypesEnum.Text,
        placeholder: 'example Clark',
        errorMessage: 'field is required',
        displayText: 'First Name',
        validators: [{ type: ValidatorsEnum.MinLength, value: 2 }]
      },
      {
        name: 'lastName',
        required: true,
        type: ControlTypesEnum.Text,
        placeholder: 'example Kent',
        errorMessage: 'field is required',
        displayText: 'Last Name',
        validators: [{ type: ValidatorsEnum.MinLength, value: 2 }]
      },
      {
        name: 'age',
        required: true,
        type: ControlTypesEnum.Number,
        placeholder: 'please enter your age',
        displayText: 'Age'
      }
    ]
  },
  {
    groupName: 'presets',
    controls: [
      {
        name: 'City',
        required: true,
        type: ControlTypesEnum.Dropdown,
        dropdown:  [
          {label: 'empty', value: 'null'},
          {label: 'New York', value: 'NY'},
          {label: 'Rome', value: 'RM'},
          {label: 'London', value: 'LDN'},
          {label: 'Istanbul', value: 'IST'},
          {label: 'Paris', value: 'PRS'}
        ]
      }
    ]
  }
];
