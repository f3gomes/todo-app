"use client";

import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import { Controller, useForm } from "react-hook-form";

import { DialogTitle } from "@radix-ui/react-dialog";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Task } from "@/types/task";
import { taskFormData, taskSchema } from "@/schemas/task.schema";
import { updateTask } from "@/actions/api";
import { NativeSelect, NativeSelectOption } from "../ui/native-select";

interface EditTaskFormProps {
  task: Task;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  fetchTasks: () => Promise<void>;
}

export default function EditTaskForm({
  open,
  task,
  setOpen,
  fetchTasks,
}: EditTaskFormProps) {
  console.log("🚀 ~ EditTaskForm ~ task:", task);
  const [loading, setLoading] = useState(false);

  const {
    register: formRegister,
    control: formControl,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<taskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: task,
  });

  useEffect(() => {
    if (open) {
      reset(task);
    }
  }, [open, task, reset]);

  const onSubmit = async (data: taskFormData) => {
    setLoading(true);
    try {
      await updateTask(task.id, data);
      toast.success("Tarefa atualizado com sucesso!");
      fetchTasks();
      setOpen(false);

      // eslint-disable-next-line
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Erro ao atualizar o tarefa."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-[#1a1a1a] text-white sm:max-w-[425px] border border-neutral-700 rounded-xl shadow-md">
        <CardHeader>
          <DialogTitle>
            <CardTitle>Editar Tarefa</CardTitle>
          </DialogTitle>
          <CardDescription className="text-neutral-400">
            Atualize as informações da tarefa abaixo
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="title">Título</Label>
                <Input id="title" type="text" {...formRegister("title")} />
                {errors.title && (
                  <span className="text-red-500 text-sm">
                    {errors.title.message}
                  </span>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="details">Descrição</Label>
                <Input id="details" type="text" {...formRegister("details")} />
                {errors.details && (
                  <span className="text-red-500 text-sm">
                    {errors.details.message}
                  </span>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="author">Autor</Label>
                <Input id="author" type="text" {...formRegister("author")} />
                {errors.author && (
                  <span className="text-red-500 text-sm">
                    {errors.author.message}
                  </span>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>

                <Controller
                  control={formControl}
                  name="status"
                  render={({ field }) => (
                    <NativeSelect
                      id="status"
                      value={field.value || ""} 
                      onChange={(e) => field.onChange(e.target.value)} 
                      className="w-full bg-[#1a1a1a] text-white border border-neutral-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-600"
                    >
                      <NativeSelectOption value="">
                        Selecione
                      </NativeSelectOption>
                      <NativeSelectOption value="PENDING">
                        Pendente
                      </NativeSelectOption>
                      <NativeSelectOption value="IN_PROGRESS">
                        Em andamento
                      </NativeSelectOption>
                      <NativeSelectOption value="COMPLETED">
                        Finalizado
                      </NativeSelectOption>
                    </NativeSelect>
                  )}
                />

                {errors.status && (
                  <span className="text-red-500 text-sm">
                    {errors.status.message}
                  </span>
                )}
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-2 mt-4">
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer"
              disabled={loading}
            >
              {loading ? "Salvando..." : "Salvar alterações"}
            </Button>
          </CardFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
