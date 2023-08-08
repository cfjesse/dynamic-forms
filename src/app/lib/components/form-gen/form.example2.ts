import { IFormSection, ControlTypesEnum } from "./form.example";

export const formGroups2: IFormSection[] = [
  {
    groupName: 'userInfo',
    controls: [
      {
        name: 'firstName',
        required: true,
        type: ControlTypesEnum.Text,
        placeholder: 'example Clark',
        errorMessage: 'field is required',
        displayText: 'First Name'
      },
      {
        name: 'middleName',
        required: false,
        type: ControlTypesEnum.Text,
        placeholder: 'example Kent',
        errorMessage: 'field is required',
        displayText: 'Middle Name'
      },
      {
        name: 'lastName',
        required: true,
        type: ControlTypesEnum.Text,
        placeholder: 'example Kent',
        errorMessage: 'field is required',
        displayText: 'Last Name'
      },
      {
        name: 'age',
        required: true,
        type: ControlTypesEnum.Number,
        placeholder: 'please enter your age',
        displayText: 'Age'
      },
      {
        name: 'maritalStatus',
        required: true,
        type: ControlTypesEnum.Dropdown,
        placeholder: 'Marital Status',
        displayText: 'Marital Status',
        dropdown: [
          { label: 'single', value: 1},
          { label: 'married', value: 2},
          { label: 'divorced', value: 3},
          { label: 'widowed', value: 4},
        ]
      },

    ]
  },
  {
    groupName: 'travelDates',
    controls: [
      {
        name: 'departureDate',
        type: ControlTypesEnum.Date,
        required: true,
        placeholder: 'departure date',
        errorMessage: 'Start Date is required',
        displayText: 'Start Date'
      },
      {
        name: 'returnDate',
        type: ControlTypesEnum.Date,
        required: true,
        placeholder: 'return date',
        errorMessage: 'return date is required',
        displayText: 'return date'
      },
      {
        name: 'numberOfDestinations',
        type: ControlTypesEnum.Number,
        required: false,
        placeholder: 'number of destinations',
        displayText: 'number of destinations'
      }

    ]
  }
];
