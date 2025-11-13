export interface Task {
  id: number;
  title: string;
  details: string;
  author: string;
  status?: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELED";
}
