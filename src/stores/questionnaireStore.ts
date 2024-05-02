import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import type { QuestionnaireData } from "@/types/QuestionnaireData";

export const useQuestionnaireStore = defineStore("questionnaireStore", {
  state: () => ({
    questionnaireData: useStorage<QuestionnaireData>(
      "questionnaireData",
      {
        stepOne: {
          firstName: "",
          lastName: "",
          nickName: "",
          birthdate: "",
          occupationStatus: "",
        },
        stepTwo: {
          checkingAccount: "",
          savingsAccount: "",
        },
        stepThree: {
          annualIncome: 0,
          changeWillingness: 0,
        },
        stepFour: {
          products: [],
        },
      },
      sessionStorage,
    ),
  }),
  getters: {
    fullData: (state): QuestionnaireData => state.questionnaireData,
    stepOneData: (state) => state.questionnaireData.stepOne,
    stepTwoData: (state) => state.questionnaireData.stepTwo,
    stepThreeData: (state) => state.questionnaireData.stepThree,
    stepFourData: (state) => state.questionnaireData.stepFour,
  },
  actions: {
    updateStepOneData(data: QuestionnaireData["stepOne"]) {
      this.questionnaireData.stepOne = data;
    },
    updateStepTwoData(data: QuestionnaireData["stepTwo"]) {
      this.questionnaireData.stepTwo = data;
    },
    updateStepThreeData(data: QuestionnaireData["stepThree"]) {
      this.questionnaireData.stepThree = data;
    },
    updateStepFourData(data: QuestionnaireData["stepFour"]) {
      this.questionnaireData.stepFour = data;
    },

    resetQuestionnaire() {
      this.questionnaireData = {
        stepOne: {
          firstName: "",
          lastName: "",
          nickName: "",
          birthdate: "",
          occupationStatus: "",
        },
        stepTwo: {
          checkingAccount: "",
          savingsAccount: "",
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
    getAllData() {
      const userInfo = {
        id: "",
        userId: -1,
        displayName: `${this.questionnaireData.stepOne.nickName}`,
        firstName: this.questionnaireData.stepOne.firstName,
        lastName: this.questionnaireData.stepOne.lastName,
        dateOfBirth: this.questionnaireData.stepOne.birthdate,
        occupationStatus:
          this.questionnaireData.stepOne.occupationStatus.toUpperCase(),
        checkingAccount: this.questionnaireData.stepTwo.checkingAccount.replace(/\s+/g, ''),
        savingsAccount: this.questionnaireData.stepTwo.savingsAccount.replace(/\s+/g, ''),
        motivation: this.questionnaireData.stepThree.changeWillingness,
        income: this.questionnaireData.stepThree.annualIncome,
        budgetingProducts: this.questionnaireData.stepFour.products.map(
          (product) => ({
            id: "",
            name: product.name,
            frequency: product.frequency.toUpperCase(),
            amount: parseFloat(product.price),
            userInfoId: "",
          }),
        ),
        budgetingLocations: [],
      };
      return userInfo;
    },
  },
});
