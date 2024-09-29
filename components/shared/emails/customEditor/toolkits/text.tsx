import React, { ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TextToolkitProps {
  component: any;
  updateComponent: (id: number, updatedProps: object) => void;
}

export default function TextToolkit({
  component,
  updateComponent,
}: TextToolkitProps) {
  const { styles = {}, content } = component;

  // Helper function to update styles
  const handleUpdate = (field: string, value: any) => {
    updateComponent(component.id, {
      styles: { ...styles, [field]: value },
    });
  };

  // Handle real-time content updates
  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    updateComponent(component.id, { content: e.target.value });
  };

  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-lg">Text Settings</h4>

      {/* Text Content */}
      <div className="space-y-2">
        <Label htmlFor="textContent">Text Content</Label>
        <textarea
          id="textContent"
          value={content || ""}
          onChange={handleContentChange}
          className="w-full border border-gray-300 rounded p-2"
          rows={4}
        />
      </div>

      {/* Font Size Slider */}
      <div className="space-y-2">
        <Label>Font Size</Label>
        <Slider
          min={8}
          max={60}
          step={1}
          value={[parseInt(styles.fontSize) || 14]}
          onValueChange={(value) => handleUpdate("fontSize", `${value[0]}px`)}
        />
        <span className="text-sm text-gray-500">
          {styles.fontSize || "14px"}
        </span>
      </div>

      {/* Font Color */}
      <div className="space-y-2">
        <Label htmlFor="fontColor">Font Color</Label>
        <Input
          id="fontColor"
          type="color"
          value={styles.color || "#000000"}
          onChange={(e) => handleUpdate("color", e.target.value)}
        />
      </div>

      {/* Font Family */}
      <div className="space-y-2">
        <Label htmlFor="fontFamily">Font Family</Label>
        <Select
          value={styles.fontFamily || "Arial"}
          onValueChange={(value) => handleUpdate("fontFamily", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select font family" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Arial">Arial</SelectItem>
            <SelectItem value="Helvetica">Helvetica</SelectItem>
            <SelectItem value="Times New Roman">Times New Roman</SelectItem>
            <SelectItem value="Courier New">Courier New</SelectItem>
            <SelectItem value="Verdana">Verdana</SelectItem>
            <SelectItem value="Georgia">Georgia</SelectItem>
            <SelectItem value="Palatino">Palatino</SelectItem>
            <SelectItem value="Garamond">Garamond</SelectItem>
            <SelectItem value="Bookman">Bookman</SelectItem>
            <SelectItem value="Comic Sans MS">Comic Sans MS</SelectItem>
            <SelectItem value="Trebuchet MS">Trebuchet MS</SelectItem>
            <SelectItem value="Arial Black">Arial Black</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
