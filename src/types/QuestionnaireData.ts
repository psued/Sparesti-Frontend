export interface QuestionnaireData {
  stepOne: StepOneData;
  stepTwo: StepTwoData;
  stepThree: StepThreeData;
  stepFour: StepFourData;
}
export interface StepOneData {
  firstName: string;
  lastName: string;
  birthdate: string;
  occupationStatus: 'student' | 'employed' | 'unemployed' | '';
}

export interface StepTwoData {
  checkingAccount: string;
  savingsAccount: string;
}

export interface StepThreeData {
  annualIncome: number;
  changeWillingness: number;
}

export interface StepFourData {
  products: Product[];
}

export interface Product {
  name: string;
  frequency: string;
  timeUnit: string;
  price: string;
}