export interface Budget {
    [Symbol.iterator](): Iterator<Budget>;
    id: number;
    row: BudgetRow[];
    expiryDate: string;
}

interface BudgetRow {
    id: number;
    name: string;
    usedAmount: number;
    maxAmount: number;
    category: string;
    emoji: string;
}