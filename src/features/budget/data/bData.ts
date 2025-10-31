import { Bus, Stethoscope, GraduationCap, CircleDollarSign, Plug, Utensils, Dumbbell, Popcorn } from "lucide-react";

export type CategoryId =
  | "transport" | "healthcare" | "education" | "finance"
  | "utilities" | "food" | "fitness" | "entertainment";

export type CategoryItem = {
  id: CategoryId;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
};

export const CATEGORY_ICONS: Record<CategoryId, React.ComponentType<{ className?: string }>> = {
  transport: Bus,
  healthcare: Stethoscope,
  education: GraduationCap,
  finance: CircleDollarSign,
  utilities: Plug,
  food: Utensils,
  fitness: Dumbbell,
  entertainment: Popcorn,
};


export const CATEGORIES: CategoryItem[] = [
  { id: "transport", name: "Transport", icon: Bus },
  { id: "healthcare", name: "Healthcare", icon: Stethoscope },
  { id: "education", name: "Education", icon: GraduationCap },
  { id: "finance", name: "Finance", icon: CircleDollarSign },
  { id: "utilities", name: "Utilities", icon: Plug },
  { id: "food", name: "Food", icon: Utensils },
  { id: "fitness", name: "Fitness", icon: Dumbbell },
  { id: "entertainment", name: "Entertain", icon: Popcorn },
];
