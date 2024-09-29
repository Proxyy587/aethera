"use client"
import React, { ChangeEvent, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Toggle } from "@/components/ui/toggle";
import ReactMarkdown from 'react-markdown';
import { Button } from "@/components/ui/button";

interface TextToolkitProps {
  component: any;
  updateComponent: (id: number, updatedProps: object) => void;
}

export default function TextToolkit({
  component,
  updateComponent,
}: TextToolkitProps) {
  const [localStyles, setLocalStyles] = useState(component.styles || {});
  const [localContent, setLocalContent] = useState(component.content || "");

  useEffect(() => {
    setLocalStyles(component.styles || {});
    setLocalContent(component.content || "");
  }, [component]);

  const handleUpdate = (field: string, value: any) => {
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
      <h4 className="font-semibold text-lg">पाठ सेटिंग्स</h4>

      <div className="space-y-2">
        <Label htmlFor="textContent">पाठ सामग्री</Label>
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
        <Label>फ़ॉन्ट आकार</Label>
        <Slider
          min={8}
          max={60}
          step={1}
          value={[parseInt(localStyles.fontSize as string) || 14]}
          onValueChange={(value) => handleUpdate("fontSize", `${value[0]}px`)}
        />
        <span className="text-sm text-gray-500">
          {localStyles.fontSize || "14px"}
        </span>
      </div>

      <div className="space-y-2">
        <Label htmlFor="fontColor">फ़ॉन्ट रंग</Label>
        <Input
          id="fontColor"
          type="color"
          value={localStyles.color || "#000000"}
          onChange={(e) => handleUpdate("color", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="fontFamily">फ़ॉन्ट परिवार</Label>
        <Select
          value={localStyles.fontFamily || "Arial"}
          onValueChange={(value) => handleUpdate("fontFamily", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="फ़ॉन्ट परिवार चुनें" />
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
        <Label htmlFor="textAlign">पाठ संरेखण</Label>
        <Select
          value={localStyles.textAlign || "left"}
          onValueChange={(value) => handleUpdate("textAlign", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="संरेखण चुनें" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="left">बाएं</SelectItem>
            <SelectItem value="center">केंद्र</SelectItem>
            <SelectItem value="right">दाएं</SelectItem>
            <SelectItem value="justify">समायोजित</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
