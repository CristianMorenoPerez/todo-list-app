import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./ui/form";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

interface FormFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>; // Pasamos el formulario entero
  name: Path<T>; // Extraemos el nombre de los campos dinámicamente
  label: string;
  options: { value: string; label: string }[];
}

export const FormRadio = <T extends FieldValues>({
  form,
  name,
  label,
  options,
}: FormFieldProps<T>) => (
  <FormField
    control={form.control} // Ahora usa el control del formulario recibido
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <RadioGroup
            onValueChange={field.onChange}
            defaultValue={field.value}
            className="flex  space-y-1"
          >
            {options.map((x) => (
              <FormItem
                key={x.value}
                className="flex items-center space-x-3 space-y-0"
              >
                <FormControl>
                  <RadioGroupItem value={x.label} />
                </FormControl>
                <FormLabel className="font-normal">{x.label}</FormLabel>
              </FormItem>
            ))}
          </RadioGroup>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
