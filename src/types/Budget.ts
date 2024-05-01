export interface Budget {
    id: number;
    row: BudgetRow[];
    name: string;
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