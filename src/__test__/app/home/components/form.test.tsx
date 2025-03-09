import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { taskReducer, drawerReducer } from "@/store/taskSlice";
import { FormTask } from "@/app/home/components/form";

const renderWithRedux = (component: React.ReactElement) => {
  const store = configureStore({
    reducer: {
      tasks: taskReducer,
      drawer: drawerReducer,
    },
    preloadedState: {
      drawer: { value: true },
    },
  });
  return render(<Provider store={store}>{component}</Provider>);
};

describe("FormTask", () => {
  it("renderiza sin errores", () => {
    renderWithRedux(<FormTask />);

    expect(screen.getByText("Guardar")).toBeInTheDocument();
  });

  it("renderiza los campos del formulario", () => {
    renderWithRedux(<FormTask />);

    expect(screen.getByLabelText("Titulo")).toBeInTheDocument();
  });

  it("valida los campos requeridos", async () => {
    renderWithRedux(<FormTask />);

    // Try to submit without filling required fields
    const saveButton = screen.getByText("Guardar");
    fireEvent.click(saveButton);

    // Use waitFor to handle async state updates
    await waitFor(() => {
      expect(
        screen.getByText("El titulo debe tener al menos 5 caracteres")
      ).toBeInTheDocument();
    });
  });

  it("maneja el envío del formulario", async () => {
    renderWithRedux(<FormTask />);

    // Fill in title with at least 5 characters
    const titleInput = screen.getByLabelText("Titulo");
    fireEvent.change(titleInput, {
      target: { value: "Nueva tarea de prueba" },
    });

    // Submit form
    const saveButton = screen.getByText("Guardar");
    fireEvent.click(saveButton);

    // Use waitFor to handle async state updates
    await waitFor(() => {
      // After submission, form should be reset
      expect(titleInput).toHaveValue("");
    });
  });
});
