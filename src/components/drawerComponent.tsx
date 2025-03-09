"use client";

import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import {
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  Drawer,
} from "./ui/drawer";
import { openAndClose } from "@/store/taskSlice";

interface Props {
  children: React.ReactNode;
}

export const DrawerComponent = ({ children }: Props) => {
  const drawerState = useSelector((state: RootState) => state.drawer);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Drawer
      open={drawerState.value}
      onOpenChange={() => {
        dispatch(openAndClose(!drawerState.value));
      }}
    >
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Nueva Tarea</DrawerTitle>
            <DrawerDescription>Podras crear tus tareas</DrawerDescription>
          </DrawerHeader>
          <div className="p-4">{children}</div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
