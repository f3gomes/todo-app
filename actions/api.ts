import axios from "axios";

interface TaskPayload {
  title?: string;
  details?: string;
  author?: string;
  status?: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELED";
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export const listTasks = async () => {
  try {
    const response = await api.get("/task/list");
    return response.data.tasks;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const createTask = async (payload: TaskPayload) => {
  try {
    const response = await api.post("/task/new", payload);

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const updateTask = async (id: number, payload: TaskPayload) => {
  try {
    const response = await api.patch(`/task/edit/${id}`, payload);

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deleteTask = async (id: number) => {
  try {
    const response = await api.delete(`/task/edit/${id}`);

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};
