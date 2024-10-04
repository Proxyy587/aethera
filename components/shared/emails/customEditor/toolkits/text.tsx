"use client"
import React, { ChangeEvent, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Toggle } from "@/components/ui/toggle";
import ReactMarkdown from 'react-markdown';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface ComponentProperties {
  id: number;
  type: string;
  styles: Record<string, string | number>;
  content?: string;
}

interface TextToolkitProps {
  component: ComponentProperties;
  updateComponent: (id: number, updatedProps: Partial<ComponentProperties>) => void;
}

export default function TextToolkit({ component, updateComponent }: TextToolkitProps) {
  const [localStyles, setLocalStyles] = useState(component.styles);
  const [localContent, setLocalContent] = useState(component.content || "");

  useEffect(() => {
    setLocalStyles(component.styles);
    setLocalContent(component.content || "");
  }, [component]);

  const handleStyleChange = (field: string, value: string | number) => {
    const updatedStyles = { ...localStyles, [field]: value };
    setLocalStyles(updatedStyles);
    updateComponent(component.id, { styles: updatedStyles });
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setLocalContent(e.target.value);
    updateComponent(component.id, { content: e.target.value });
  };

  const toggleStyle = (style: string) => {
    const updatedContent = wrapSelectedText(style);
    setLocalContent(updatedContent);
    updateComponent(component.id, { content: updatedContent });
  };

  const wrapSelectedText = (style: string) => {
    const textarea = document.getElementById('textContent') as HTMLTextAreaElement;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = localContent.substring(start, end);
    const before = localContent.substring(0, start);
    const after = localContent.substring(end);

    let wrappedText;
    switch (style) {
      case 'bold':
        wrappedText = `**${selectedText}**`;
        break;
      case 'italic':
        wrappedText = `*${selectedText}*`;
        break;
      case 'underline':
        wrappedText = `__${selectedText}__`;
        break;
      default:
        wrappedText = selectedText;
    }

    return `${before}${wrappedText}${after}`;
  };

  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-lg">Text Settings</h4>

      <div className="space-y-2">
        <Label htmlFor="textContent">Text Content</Label>
        <div className="flex space-x-2 mb-2">
          <Toggle onClick={() => toggleStyle('bold')}>B</Toggle>
          <Toggle onClick={() => toggleStyle('italic')}>I</Toggle>
          <Toggle onClick={() => toggleStyle('underline')}>U</Toggle>
        </div>
        <textarea
          id="textContent"
          value={localContent}
          onChange={handleContentChange}
          className="w-full border border-gray-300 rounded p-2"
          rows={4}
        />
        <div className="mt-2 p-2 border rounded">
          <ReactMarkdown>{localContent}</ReactMarkdown>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Font Size</Label>
        <Slider
          min={8}
          max={60}
          step={1}
          value={[parseInt(localStyles.fontSize as string) || 14]}
          onValueChange={(value) => handleStyleChange("fontSize", `${value[0]}px`)}
        />
        <span className="text-sm text-gray-500">
          {localStyles.fontSize || "14px"}
        </span>
      </div>

      <div className="space-y-2">
        <Label htmlFor="fontColor">Font Color</Label>
        <Input
          id="fontColor"
          type="color"
          value={localStyles.color as string || "#000000"}
          onChange={(e) => handleStyleChange("color", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="fontFamily">Font Family</Label>
        <Select
          value={localStyles.fontFamily as string || "Arial"}
          onValueChange={(value) => handleStyleChange("fontFamily", value)}
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

      <div className="space-y-2">
        <Label htmlFor="textAlign">Text Alignment</Label>
        <Select
          value={localStyles.textAlign as string || "left"}
          onValueChange={(value) => handleStyleChange("textAlign", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select alignment" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="left">Left</SelectItem>
            <SelectItem value="center">Center</SelectItem>
            <SelectItem value="right">Right</SelectItem>
            <SelectItem value="justify">Justify</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Line Height</Label>
        <Slider
          min={1}
          max={3}
          step={0.1}
          value={[parseFloat(localStyles.lineHeight as string) || 1.5]}
          onValueChange={(value) => handleStyleChange("lineHeight", value[0])}
        />
        <span className="text-sm text-gray-500">
          {localStyles.lineHeight || "1.5"}
        </span>
      </div>

      <div className="space-y-2">
        <Label>Letter Spacing</Label>
        <Slider
          min={-2}
          max={10}
          step={0.5}
          value={[parseFloat(localStyles.letterSpacing as string) || 0]}
          onValueChange={(value) => handleStyleChange("letterSpacing", `${value[0]}px`)}
        />
        <span className="text-sm text-gray-500">
          {localStyles.letterSpacing || "0px"}
        </span>
      </div>

      <div className="space-y-2">
        <Label>Text Transform</Label>
        <ToggleGroup type="single" value={localStyles.textTransform as string || "none"} onValueChange={(value) => handleStyleChange("textTransform", value)}>
          <ToggleGroupItem value="none">None</ToggleGroupItem>
          <ToggleGroupItem value="uppercase">Upper</ToggleGroupItem>
          <ToggleGroupItem value="lowercase">Lower</ToggleGroupItem>
          <ToggleGroupItem value="capitalize">Cap</ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
}