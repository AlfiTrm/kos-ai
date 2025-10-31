export type TransactionType = "Expense" | "Income" | "Transfer" | "Debt";

export interface Category {
    id: string;
    name: string;
    icon: string;
}

export interface TransactionFormState {
    type: TransactionType;
    amount: number;
    amountDisplay: string;
    date: string;
    category: Category | null;
    note: string;
    repeat: boolean;
}

export interface TransactionFormErrors {
    amount?: string;
    category?: string;
}