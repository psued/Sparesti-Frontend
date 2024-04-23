import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import type { QuestionnaireData } from '@/types/questionnaireData'; // Check this path!

export const useQuestionnaireStore = defineStore('questionnaireStore', {
  state: () => ({
    questionnaireData: useStorage<QuestionnaireData>('questionnaireData', {
      stepOne: {
        firstName: '',
        lastName: '',
        birthdate: '',
        occupationStatus: '',
      },
      stepTwo: {
        checkingAccount: '',
        savingsAccount: '',
      },
      stepThree: {
        annualIncome: 0,
        changeWillingness: 0,
      },
      stepFour: {
        products: [],
      },
      
    }, sessionStorage),
  }),
  getters: {
    fullData: (state): QuestionnaireData => state.questionnaireData,
    stepOneData: (state) => state.questionnaireData.stepOne,
    stepTwoData: (state) => state.questionnaireData.stepTwo,
    stepThreeData: (state) => state.questionnaireData.stepThree,
    stepFourData: (state) => state.questionnaireData.stepFour,
  },
  actions: {
    setStepData(step: keyof QuestionnaireData, data: QuestionnaireData[keyof QuestionnaireData]) {
      this.questionnaireData[step] = data;
    },
    updateStepOneData(data: QuestionnaireData['stepOne']) {
      this.questionnaireData.stepOne = data;
    },
    updateStepTwoData(data: QuestionnaireData['stepTwo']) {
      this.questionnaireData.stepTwo = data;
    },
    updateStepThreeData(data: QuestionnaireData['stepThree']) {
      this.questionnaireData.stepThree = data;
    },
    updateStepFourData(data: QuestionnaireData['stepFour']) {
      this.questionnaireData.stepFour = data;
    },
    
    resetQuestionnaire() {
      this.questionnaireData = {
        stepOne: {
          firstName: '',
          lastName: '',
          birthdate: '',
          occupationStatus: '',
        },
        stepTwo: {
          checkingAccount: '',
          savingsAccount: '',
        },
        stepThree: {
          annualIncome: 0,
          changeWillingness: 0,
        },
        stepFour: {
          products: [],
        },
      };
    },
  },
});
