"use client";
import React, { ChangeEvent, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface ComponentProperties {
  id: number;
  type: string;
  styles: Record<string, string | number>;
  content?: string;
  href?: string;
  targetBlank?: boolean;
}

interface ButtonToolkitProps {
  component: ComponentProperties;
  updateComponent: (id: number, updatedProps: Partial<ComponentProperties>) => void;
}

export default function ButtonToolkit({ component, updateComponent }: ButtonToolkitProps) {
  const [localStyles, setLocalStyles] = useState(component.styles);
  const [localContent, setLocalContent] = useState(component.content || "Button");
  const [localHref, setLocalHref] = useState(component.href || "#");
  const [localTargetBlank, setLocalTargetBlank] = useState(component.targetBlank || false);

  useEffect(() => {
    setLocalStyles(component.styles);
    setLocalContent(component.content || "Button");
    setLocalHref(component.href || "#");
    setLocalTargetBlank(component.targetBlank || false);
  }, [component]);

  const handleStyleChange = (field: string, value: string | number) => {
    const updatedStyles = { ...component.styles, [field]: value };
    updateComponent(component.id, { styles: updatedStyles });
  };

  const handleContentChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateComponent(component.id, { content: e.target.value });
  };

  const handleHrefChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateComponent(component.id, { href: e.target.value });
  };

  const handleTargetBlankChange = (checked: boolean) => {
    updateComponent(component.id, { targetBlank: checked });
  };

  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-lg">Button Properties</h4>

      <div>
        <Label htmlFor="buttonLabel">Button Label</Label>
        <Input
          id="buttonLabel"
          type="text"
          value={localContent}
          onChange={handleContentChange}
        />
      </div>

      <div>
        <Label htmlFor="buttonHref">Button Link</Label>
        <Input
          id="buttonHref"
          type="text"
          value={localHref}
          onChange={handleHrefChange}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="targetBlank"
          checked={localTargetBlank}
          onCheckedChange={handleTargetBlankChange}
        />
        <Label htmlFor="targetBlank">Open in New Tab</Label>
      </div>

      <div className="flex flex-row space-x-4">
        <div className="flex-1">
          <Label htmlFor="bgColor">Background Color</Label>
          <Input
            id="bgColor"
            type="color"
            value={localStyles.backgroundColor as string}
            onChange={(e) => handleStyleChange("backgroundColor", e.target.value)}
          />
        </div>
        <div className="flex-1">
          <Label htmlFor="textColor">Text Color</Label>
          <Input
            id="textColor"
            type="color"
            value={localStyles.color as string}
            onChange={(e) => handleStyleChange("color", e.target.value)}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="alignment">Button Alignment</Label>
        <Select
          value={localStyles.justifyContent as string}
          onValueChange={(value) => handleStyleChange("justifyContent", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Choose alignment" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="flex-start">Left</SelectItem>
            <SelectItem value="center">Center</SelectItem>
            <SelectItem value="flex-end">Right</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Button Width</Label>
        <Slider
          min={10}
          max={100}
          step={1}
          value={[parseInt(localStyles.width as string) || 100]}
          onValueChange={(value) => handleStyleChange("width", `${value[0]}%`)}
        />
        <span>{localStyles.width}</span>
      </div>

      <div>
        <Label>Font Size</Label>
        <Slider
          min={8}
          max={60}
          step={1}
          value={[parseInt(localStyles.fontSize as string) || 14]}
          onValueChange={(value) => handleStyleChange("fontSize", `${value[0]}px`)}
        />
        <span>{localStyles.fontSize}</span>
      </div>

      <div>
        <Label>Padding Y</Label>
        <Slider
          min={0}
          max={50}
          step={1}
          value={[parseInt(localStyles.paddingTop as string) || 10]}
          onValueChange={(value) => {
            handleStyleChange("paddingTop", `${value[0]}px`);
            handleStyleChange("paddingBottom", `${value[0]}px`);
          }}
        />
        <span>{localStyles.paddingTop}</span>
      </div>
    </div>
  );
}