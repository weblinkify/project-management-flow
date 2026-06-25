export type TaskStatus = "todo" | "progress" | "done";

export type Task = {
  id: string;
  title: string;
  status: TaskStatus;
};