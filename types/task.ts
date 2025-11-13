export interface Task {
  id: number;
  title: string;
  details: string;
  author: string;
  createdAt: Date;
  status?: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELED";
}
