"use client";

import { Clock, Trash2, SquarePen } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Task } from "@/types/task";
import { deleteTask } from "@/actions/api";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Props {
  task: Task;
  fetchTasks: () => Promise<void>;
}

export const TaskCard = ({ task, fetchTasks }: Props) => {
  const handleEditTask = async () => {};

  const handleRemoveTask = async () => {
    const confirmed = window.confirm(
      `Tem certeza que deseja excluir a tarefa com id ${task.id}?`
    );

    if (!confirmed) return;

    try {
      await deleteTask(task.id);
      toast.success("Tarefa excluída com sucesso!");
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="w-full h-auto bg-slate-600 text-white border border-neutral-800 hover:border-neutral-700 hover:shadow-lg transition-all duration-200 shadow-md overflow-hidden">
      <CardHeader className="">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg font-semibold leading-snug line-clamp-2 flex-1">
            {task.title}
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="">
        <p className="text-sm text-gray-400 line-clamp-3">{task.details}</p>

        <div className="flex items-center gap-3 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />

            <p>
              {format(
                new Date("2025-11-12T19:50:15.000Z"),
                "dd/MM/yyyy HH:mm",
                { locale: ptBR }
              )}
            </p>
          </span>
        </div>

        <div className="mt-4">
          <p className="text-sm font-bold text-gray-800 line-clamp-3">
            {task.author}
          </p>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between gap-2">
        <Button
          variant="destructive"
          size="sm"
          className="text-sm bg-yellow-600 hover:bg-yellow-700 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            handleEditTask();
          }}
        >
          <SquarePen className="w-4 h-4 mr-1" />
          Editar
        </Button>

        <Button
          variant="destructive"
          size="sm"
          className="text-sm bg-red-600 hover:bg-red-700 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            handleRemoveTask();
          }}
        >
          <Trash2 className="w-4 h-4 mr-1" />
          Excluir
        </Button>
      </CardFooter>
    </Card>
  );
};
