export interface AuthFormState {
    email: string;
    password: string;
    remember: boolean;
    showPassword: boolean;
}

export interface AuthErrors {
    email?: string;
    password?: string;
}

export interface SignUpState {
    email: string;
    password: string;
    confirm: string;
    showPassword: boolean;
    showConfirm: boolean;
}

export interface SignUpErrors {
    email?: string;
    password?: string;
    confirm?: string;
}

export interface ProfileState {
    fullName: string;
    phone: string;
    gender: "Male" | "Female" | "Other";
    dob: string;       
    address: string;
}

export interface ProfileErrors {
    fullName?: string;
    phone?: string;
    gender?: string;
    dob?: string;
    address?: string;
}

export interface PasswordRule {
  id: "length" | "noNameEmail" | "symbolOrNumber";
  text: string;
  valid: boolean;
}
