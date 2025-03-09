"use client";
import { useForm } from "react-hook-form";
import { FormSchemaTask } from "./schemas/form-task.schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/formInput";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { RootState, AppDispatch } from "@/store";
import { useSelector, useDispatch } from "react-redux";
import { addTodoToApi, openAndClose } from "@/store/taskSlice";

export const FormTask = () => {
  const drawerState = useSelector((state: RootState) => state.drawer);
  const dispatch = useDispatch<AppDispatch>();

  const form = useForm<z.infer<typeof FormSchemaTask>>({
    resolver: zodResolver(FormSchemaTask),
    defaultValues: {
      title: "",
      completed: false,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchemaTask>) {
    const task = {
      title: data.title,
      completed: data.completed,
      userId: 1, // Adding required userId property
    };

    dispatch(addTodoToApi(task));
    dispatch(openAndClose(!drawerState.value));
    form.reset();
  }

  return (
    <Form {...form}>
      <div className="flex flex-col gap-2">
        <FormInput
          focus={true}
          form={form}
          name="title"
          label="Titulo"
          placeholder="Aseo"
        />
        <Button className={cn("mt-3")} onClick={form.handleSubmit(onSubmit)}>
          Guardar
        </Button>
        <Button
          variant={"outline"}
          className={cn("mt-1")}
          onClick={() => {
            dispatch(openAndClose(!drawerState.value));
          }}
        >
          Cancelar
        </Button>
      </div>
    </Form>
  );
};
