import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Monitor, Smartphone } from "lucide-react";

interface ResponsiveToggleProps {
  device: "desktop" | "phone";
  setDevice: (d: "desktop" | "phone") => void;
}

const ResponsiveToggle = ({ device, setDevice }: ResponsiveToggleProps) => {
  return (
    <div className="flex justify-end mb-4">
      <ToggleGroup type="single" value={device} onValueChange={(value: any) => setDevice(value)}>
        <ToggleGroupItem value="desktop" aria-label="Toggle desktop view">
          <Monitor className="h-4 w-4 mr-2" />
          Desktop
        </ToggleGroupItem>
        <ToggleGroupItem value="phone" aria-label="Toggle phone view">
          <Smartphone className="h-4 w-4 mr-2" />
          Phone
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default ResponsiveToggle;