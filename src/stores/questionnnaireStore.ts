import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import type { QuestionnaireData } from '@/types/QuestionnaireData';

export const useQuestionnaireStore = defineStore({
  id: 'questionnaireStore',
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
        income: 0,
        changeWillingness: 0,
      },
      stepFour: {
        products: [],
      },
      stepFive: {
      }
    }, sessionStorage),
  }),
  getters: {
    fullData: (state): QuestionnaireData => state.questionnaireData,
    stepOneData: (state) => state.questionnaireData.stepOne,
    stepTwoData: (state) => state.questionnaireData.stepTwo,
    stepThreeData: (state) => state.questionnaireData.stepThree,
    stepFourData: (state) => state.questionnaireData.stepFour,
    stepFiveData: (state) => state.questionnaireData.stepFive,
  },
  actions: {
    setStepData(step: keyof QuestionnaireData, data: any) {
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
    updateStepFiveData(data: QuestionnaireData['stepFive']) {
      this.questionnaireData.stepFive = data;
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
          income: 0,
          changeWillingness: 0,
        },
        stepFour: {
          products: [],
        },
        stepFive: {
        },
      };
    },
  },
});
