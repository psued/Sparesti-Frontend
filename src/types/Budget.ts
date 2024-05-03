export interface Budget {
    id: number;
    row: BudgetRow[];
    name: string;
    expiryDate: string;
    creationDate: string;
}

export interface BudgetRow {
    id: number;
    name: string;
    usedAmount: number;
    maxAmount: number;
    category: string;
    emoji: string;
}

export interface Transaction {
    id: number;
    amount: number;
    description: string;
    category: string;
    accountNr: number;
    date: string;
}