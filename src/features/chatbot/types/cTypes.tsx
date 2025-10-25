export type Role = "user" | "ibu";

export interface Message {
  id: string;
  role: Role;
  text: string;
  ts: number;
  status?: "typing" | "done";
}

export interface Chat {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  messages: Message[];
  meta?: {
    draft?: string;
  };
}
