import { Textarea } from "@/components/ui/textarea";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./ui/form";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

interface FormFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>; // Pasamos el formulario entero
  name: Path<T>; // Extraemos el nombre de los campos dinámicamente
  label: string;
  placeholder: string;
}

export const FormTextArea = <T extends FieldValues>({
  form,
  name,
  label,
  placeholder,
}: FormFieldProps<T>) => (
  <FormField
    control={form.control} // Ahora usa el control del formulario recibido
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Textarea placeholder={placeholder} {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
