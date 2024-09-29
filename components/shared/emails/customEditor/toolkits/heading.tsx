import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface HeadingToolkitProps {
  component: any;
  updateComponent: (id: number, updatedProps: object) => void;
}

export default function HeadingToolkit({
  component,
  updateComponent,
}: HeadingToolkitProps) {
  const { styles = {}, content } = component;

  const handleUpdate = (field: string, value: any) => {
    updateComponent(component.id, {
      styles: { ...styles, [field]: value },
    });
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateComponent(component.id, { content: e.target.value });
  };

  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-lg">Heading Settings</h4>

      <div className="space-y-2">
        <Label htmlFor="headingContent">Heading Text</Label>
        <Input
          id="headingContent"
          value={content || ""}
          onChange={handleContentChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="headingLevel">Heading Level</Label>
        <Select
          value={styles.level?.toString() || "1"}
          onValueChange={(value) => handleUpdate("level", parseInt(value))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select heading level" />
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4, 5, 6].map((level) => (
              <SelectItem key={level} value={level.toString()}>
                H{level}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="headingColor">Heading Color</Label>
        <Input
          id="headingColor"
          type="color"
          value={styles.color || "#000000"}
          onChange={(e) => handleUpdate("color", e.target.value)}
        />
      </div>

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