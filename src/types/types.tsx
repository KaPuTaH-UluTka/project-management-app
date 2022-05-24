export interface ISignUpUser {
  name: string;
  login: string;
  password: string;
}

export interface ILoginUser {
  login: string;
  password: string;
}

export interface ITask {
  boardId: string;
  columnId: string;
  description: string;
  done: boolean;
  files: [];
  id: string;
  order: number;
  title: string;
  userId: string;
}

export type BoardType = {
  id: string;
  title: string;
  columns: Array<ColumnType>;
};
export type ColumnType = {
  id: string;
  title: string;
  order: number;
  tasks: Array<TaskType>;
};
export type TaskType = {
  id: string;
  title: string;
  order: number;
  done: boolean;
  description: string;
  userId: string;
  files: Array<FileType>;
};
export type FileType = {
  filename: string;
  fileSize: number;
};
