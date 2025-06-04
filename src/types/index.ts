export type Screen = "landing" | "category-setup" | "manual-entry" | "board";

export interface Category {
    name: string;
    questionCount: number;
} 