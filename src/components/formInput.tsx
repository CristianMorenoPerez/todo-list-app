import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./ui/form";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { Input } from "./ui/input";

interface FormFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>; // Pasamos el formulario entero
  name: Path<T>; // Extraemos el nombre de los campos dinámicamente
  label: string;
  placeholder: string;
  focus: boolean;
}

export const FormInput = <T extends FieldValues>({
  form,
  name,
  label,
  placeholder,
  focus = false,
}: FormFieldProps<T>) => (
  <FormField
    control={form.control} // Ahora usa el control del formulario recibido
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl autoFocus={focus}>
          <Input placeholder={placeholder} {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
