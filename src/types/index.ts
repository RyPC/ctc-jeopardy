export type Screen = "landing" | "category-setup" | "manual-entry" | "team-setup" | "board";

export interface Category {
    name: string;
    questionCount: number;
} 