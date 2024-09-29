import React from "react";
import { Button } from "@/components/ui/button";
import { Type, Heading, Square, Minus, Image } from "lucide-react";

const ELEMENTS = [
  { name: "Heading", icon: Heading },
  { name: "Text", icon: Type },
  { name: "Button", icon: Square },
  { name: "Divider", icon: Minus },
  { name: "Image", icon: Image },
];

interface ToolbarProps {
  addComponent: (element: string) => void;
}

const Toolbar = ({ addComponent }: ToolbarProps) => {
  return (
    <div className="grid grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
      {ELEMENTS.map((element, index) => (
        <Button
          key={index}
          onClick={() => addComponent(element.name)}
          variant="outline"
          className="flex flex-col items-center justify-center p-4 h-24"
        >
          <element.icon className="w-6 h-6 mb-2" />
          <span className="text-sm">{element.name}</span>
        </Button>
      ))}
    </div>
  );
};

export default Toolbar;