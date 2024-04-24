export interface Budget {
    expiryDate: string;
    budgetRows: BudgetRow[];
}

interface BudgetRow {
    catergory: string;
    usedAmount: number;
    maxAmount: number;
    emoji: string;
}