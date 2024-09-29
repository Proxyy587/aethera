import React, { ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface ImageToolkitProps {
  component: any;
  updateComponent: (id: number, updatedProps: object) => void;
}

export default function ImageToolkit({
  component,
  updateComponent,
}: ImageToolkitProps) {
  const { styles, src, alt } = component;

  const handleUpdate = (field: string, value: any) => {
    updateComponent(component.id, {
      styles: { ...styles, [field]: value },
    });
  };

  const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateComponent(component.id, { src: e.target.value });
  };

  const handleAltTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateComponent(component.id, { alt: e.target.value });
  };

  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-lg">Image Settings</h4>

      <div className="space-y-2">
        <Label htmlFor="imageUrl">Image URL</Label>
        <Input
          id="imageUrl"
          type="text"
          value={src || ""}
          placeholder="https://example.com/image.jpg"
          onChange={handleUrlChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="altText">Alt Text</Label>
        <Input
          id="altText"
          type="text"
          value={alt || ""}
          onChange={handleAltTextChange}
        />
      </div>

      <div className="space-y-2">
        <Label>Image Width (%)</Label>
        <Slider
          min={10}
          max={100}
          step={1}
          value={[parseInt(styles.width) || 100]}
          onValueChange={(value) => handleUpdate("width", value[0])}
        />
        <span className="text-sm text-gray-500">{styles.width || '100'}%</span>
      </div>
    </div>
  );
}