export interface QuestionnaireData {
    stepOne: {
      firstName: string;
      lastName: string;
      birthdate: string;
      occupationStatus: string;
    };
    stepTwo: {
      checkingAccount: string;
      savingsAccount: string;
    };
    stepThree: {
      income: number;
      changeWillingness: number;
    };
    stepFour: {
      products: Array<{ name: string; frequency: string; price: string; }>;
    };
    stepFive: {
    };
  }