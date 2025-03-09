import { BellDotIcon } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

export const Header = async () => {
  return (
    <div className=" flex justify-between py-3 items-center bg-primary text-white w-full fixed z-10">
      <div className="container flex justify-between">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage
              className="rounded-full size-7"
              src="https://media.licdn.com/dms/image/v2/D4E03AQEyuWL8coejTg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1683075281694?e=1744243200&v=beta&t=p85yRYfkaKIMhyu4Dcd-MZo8w1_S30L4ZBpYcCdA10Q"
              alt="@shadcn"
            />
            <AvatarFallback className="rounded-full size-12">CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <h4 className="scroll-m-20 text-[1rem] font-semibold tracking-tight text-white font-">
              Hola, Cristian
            </h4>
          </div>
        </div>
        <div className="flex gap-5 items-center">
          {/* <ModeToggle /> */}
          <BellDotIcon size={24} />
        </div>
      </div>
    </div>
  );
};
