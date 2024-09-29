import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DividerToolkitProps {
  component: any;
  updateComponent: (id: number, updatedProps: object) => void;
}

export default function DividerToolkit({
  component,
  updateComponent,
}: DividerToolkitProps) {
  const { styles } = component;

  const handleUpdate = (field: string, value: any) => {
    updateComponent(component.id, {
      styles: { ...styles, [field]: value },
    });
  };

  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-lg">Divider Properties</h4>

      <div className="space-y-2">
        <Label>Divider Width (%)</Label>
        <Slider
          min={10}
          max={100}
          step={1}
          value={[parseInt(styles.width) || 100]}
          onValueChange={(value) => handleUpdate("width", `${value[0]}%`)}
        />
        <span className="text-sm text-gray-500">{styles.width || '100%'}</span>
      </div>

      <div className="space-y-2">
        <Label htmlFor="lineStyle">Line Style</Label>
        <Select
          value={styles.lineStyle || "solid"}
          onValueChange={(value) => handleUpdate("lineStyle", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select line style" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="solid">Solid</SelectItem>
            <SelectItem value="dashed">Dashed</SelectItem>
            <SelectItem value="dotted">Dotted</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="dividerColor">Divider Color</Label>
        <Input
          id="dividerColor"
          type="color"
          value={styles.color || "#000000"}
          onChange={(e) => handleUpdate("color", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="alignment">Alignment</Label>
        <Select
          value={styles.textAlign || "center"}
          onValueChange={(value) => handleUpdate("textAlign", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select alignment" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="left">Left</SelectItem>
            <SelectItem value="center">Center</SelectItem>
            <SelectItem value="right">Right</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}