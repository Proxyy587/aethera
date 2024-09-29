"use client";
import React, { ChangeEvent, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface ButtonToolkitProps {
  component: any;
  updateComponent: (id: number, updatedProps: object) => void;
}

export default function ButtonToolkit({
  component,
  updateComponent,
}: ButtonToolkitProps) {
  const [localStyles, setLocalStyles] = useState(component.styles || {});
  const [localContent, setLocalContent] = useState(component.content || "");

  useEffect(() => {
    setLocalStyles(component.styles || {});
    setLocalContent(component.content || "");
  }, [component]);

  const handleContentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalContent(e.target.value);
    updateComponent(component.id, { content: e.target.value });
  };

  const handleUpdateStyle = (field: string, value: any) => {
    setLocalStyles((prevStyles: any) => {
      const updatedStyles = { ...prevStyles, [field]: value };
      updateComponent(component.id, { styles: updatedStyles });
      return updatedStyles;
    });
  };

  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-lg">बटन गुण</h4>

      <div>
        <Label htmlFor="buttonLabel">बटन लेबल</Label>
        <Input
          id="buttonLabel"
          type="text"
          value={localContent}
          onChange={handleContentChange}
        />
      </div>

      <div>
        <Label htmlFor="bgColor">पृष्ठभूमि रंग</Label>
        <Input
          id="bgColor"
          type="color"
          value={localStyles.backgroundColor || "#007BFF"}
          onChange={(e) => handleUpdateStyle("backgroundColor", e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="textColor">टेक्स्ट रंग</Label>
        <Input
          id="textColor"
          type="color"
          value={localStyles.color || "#FFFFFF"}
          onChange={(e) => handleUpdateStyle("color", e.target.value)}
        />
      </div>

      <div>
        <Label>बटन चौड़ाई (%)</Label>
        <Slider
          min={10}
          max={100}
          step={1}
          value={[parseInt(localStyles.width) || 100]}
          onValueChange={(value) => handleUpdateStyle("width", `${value[0]}%`)}
        />
        <span>{localStyles.width || "100%"}</span>
      </div>

      <div>
        <Label>फ़ॉन्ट आकार</Label>
        <Slider
          min={8}
          max={60}
          step={1}
          value={[parseInt(localStyles.fontSize) || 14]}
          onValueChange={(value) => handleUpdateStyle("fontSize", `${value[0]}px`)}
        />
        <span>{localStyles.fontSize || "14px"}</span>
      </div>

      <div>
        <Label>पैडिंग Y</Label>
        <Slider
          min={0}
          max={50}
          step={1}
          value={[parseInt(localStyles.paddingTop) || 10]}
          onValueChange={(value) => {
            handleUpdateStyle("paddingTop", `${value[0]}px`);
            handleUpdateStyle("paddingBottom", `${value[0]}px`);
          }}
        />
        <span>{localStyles.paddingTop || "10px"}</span>
      </div>
    </div>
  );
}
