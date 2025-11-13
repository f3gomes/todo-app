"use client";

import { Task } from "@/types/task";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { listTasks, updateTask } from "@/actions/api";
import { TaskCard } from "@/components/custom/task-card";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import Navbar from "@/components/custom/navbar";
import EditTaskForm from "@/components/custom/edit-task-form";
import CreateTaskForm from "@/components/custom/new-task-form";

type ColumnType = "PENDING" | "IN_PROGRESS" | "COMPLETED";

export default function TaskListPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);

  const [selectedTaskEdit, setSelectedTaskEdit] = useState<Task | null>();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);

  const fetchTasks = async () => {
    const list = await listTasks();
    setTasks(list);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter((t) =>
    t.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = {
    PENDING: {
      name: "Pendente",
      color: "bg-yellow-50",
      items: filteredTasks.filter((t) => t.status === "PENDING"),
    },
    IN_PROGRESS: {
      name: "Em andamento",
      color: "bg-green-50",
      items: filteredTasks.filter((t) => t.status === "IN_PROGRESS"),
    },
    COMPLETED: {
      name: "Finalizado",
      color: "bg-gray-100",
      items: filteredTasks.filter((t) => t.status === "COMPLETED"),
    },
  };

  const onDragEnd = async (result: any) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId === destination.droppableId) {
      const column = columns[source.droppableId as ColumnType];
      const copiedItems = Array.from(column.items);
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);

      const newTasks = tasks.map(
        (t) => copiedItems.find((c) => c.id === t.id) || t
      );
      setTasks(newTasks);
    } else {
      const sourceCol = columns[source.droppableId as ColumnType];
      const destCol = columns[destination.droppableId as ColumnType];

      const sourceItems = Array.from(sourceCol.items);
      const destItems = Array.from(destCol.items);
      const [removed] = sourceItems.splice(source.index, 1);

      removed.status = destination.droppableId;
      destItems.splice(destination.index, 0, removed);

      const newTasks = tasks.map((t) =>
        t.id === removed.id ? { ...removed } : t
      );
      setTasks(newTasks);

      try {
        await updateTask(removed.id, { status: destination.droppableId });
      } catch (err) {
        console.error("Erro ao atualizar status:", err);
        setTasks(tasks);
      }
    }

    setSelectedTaskId(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-lg">
        Carregando...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-6 text-slate-700">
          Minhas Tarefas
        </h1>

        <Button
          onClick={() => setOpenCreate(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white mb-4 cursor-pointer"
        >
          <Plus size={18} />
          Nova Tarefa
        </Button>

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(columns).map(([id, column]) => (
              <Droppable key={id} droppableId={id}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`p-4 rounded-2xl shadow-sm border ${column.color}`}
                  >
                    <h2 className="text-xl font-semibold mb-3 text-gray-700">
                      {column.name}
                    </h2>
                    <div className="flex flex-col gap-3 min-h-[500px]">
                      {column.items.map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={String(task.id)}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              onClick={() => {
                                setSelectedTaskId(task.id);
                              }}
                              className={`transition-all rounded-2xl ${
                                selectedTaskId === task.id
                                  ? "ring-2 ring-blue-400 ring-offset-2 ring-offset-transparent"
                                  : ""
                              }`}
                            >
                              <TaskCard
                                key={task.id}
                                task={task}
                                fetchTasks={fetchTasks}
                                setEditModalOpen={setEditModalOpen}
                                setSelectedTask={setSelectedTaskEdit}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>

        {selectedTaskId && (
          <div className="mt-6 text-sm text-gray-600">
            <strong>Tarefa selecionada:</strong> {selectedTaskId}
          </div>
        )}

        {selectedTaskEdit && (
          <EditTaskForm
            open={editModalOpen}
            setOpen={() => {
              // eslint-disable-next-line
              setEditModalOpen;
              setSelectedTaskEdit(null);
            }}
            task={selectedTaskEdit}
            fetchTasks={async () => {
              await fetchTasks();
              setSelectedTaskEdit(null);
            }}
          />
        )}

        <CreateTaskForm
          open={openCreate}
          setOpen={setOpenCreate}
          fetchTasks={fetchTasks}
        />
      </div>
    </main>
  );
}
