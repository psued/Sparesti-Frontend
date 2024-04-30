export interface Budget {
    id: number;
    row: BudgetRow[];
    expiryDate: string;
    creationDate: string;
}

interface BudgetRow {
    id: number;
    name: string;
    usedAmount: number;
    maxAmount: number;
    category: string;
    emoji: string;
}