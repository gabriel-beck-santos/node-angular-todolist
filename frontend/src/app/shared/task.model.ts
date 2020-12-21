export interface Task{
  id?: string,
  description: string,
  projectId: string,
  checked?: boolean,
  checkedDate?: Date
}
