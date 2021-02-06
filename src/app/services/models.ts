export interface User {
  uid: string,
  email: string,
  photoURL?: string,
  displayName?: string
}

export interface Task {
  taskId: string,
  title: string,
  assignee: string,
  owner?: string,
  description: string,
  createdDate?: Date,
  status?: string
}