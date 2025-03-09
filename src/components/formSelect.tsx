import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./ui/form";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";

interface FormFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>; // Pasamos el formulario entero
  name: Path<T>; // Extraemos el nombre de los campos dinámicamente
  label: string;
  placeholder: string;
  options: { value: string; label: string }[];
}

export const FormSelect = <T extends FieldValues>({
  form,
  name,
  label,
  placeholder,
  options,
}: FormFieldProps<T>) => (
  <FormField
    control={form.control} // Ahora usa el control del formulario recibido
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    )}
  />
);
