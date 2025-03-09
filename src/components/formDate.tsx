import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./ui/form";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { format } from "date-fns";
import { Button } from "./ui/button";
interface FormFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>; // Pasamos el formulario entero
  name: Path<T>; // Extraemos el nombre de los campos dinámicamente
  label: string;
  placeholder: string;
}

export const FormInputDate = <T extends FieldValues>({
  form,
  name,
  label,
  placeholder,
}: FormFieldProps<T>) => (
  <FormField
    control={form.control} // Ahora usa el control del formulario recibido
    name={name}
    render={({ field }) => (
      <FormItem className="flex flex-col w-full">
        <FormLabel>{label}</FormLabel>
        <Popover>
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                variant={"outline"}
                className={cn(
                  " pl-3 text-left font-normal w-full",
                  !field.value && "text-muted-foreground"
                )}
              >
                {field.value ? (
                  format(field.value, "PPP")
                ) : (
                  <span>{placeholder}</span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto p-0 bg-white border rounded-sm"
            align="start"
          >
            <Calendar
              className="w-full"
              mode="single"
              selected={field.value}
              onSelect={field.onChange}
              // disabled={(date) =>
              //   date > new Date() || date < new Date("1900-01-01")
              // }
              initialFocus
              lang="'es'"
            />
          </PopoverContent>
        </Popover>
        <FormMessage />
      </FormItem>
    )}
  />
);
