import React, { useState, useEffect, useCallback } from "react";
import ResponsiveToggle from "./toggle";
import PreviewWindow from "./preview";
import Toolbar from "./toolbar";
import ButtonToolkit from "./toolkits/button";
import TextToolkit from "./toolkits/text";
import DividerToolkit from "./toolkits/divider";
import ImageToolkit from "./toolkits/image";
import HeadingToolkit from "./toolkits/heading";
import { ScrollArea } from "@/components/ui/scroll-area";

// Types for device modes and components
type DeviceMode = "desktop" | "phone";

interface ComponentProperties {
  id: number;
  type: string;
  styles: any;
  content?: string | null;
  src?: string | null;
  alt?: string | null;
  width?: number | null;
}

export default function CustomEditor({ onHtmlChange, initialHtml }: { onHtmlChange: (html: string) => void, initialHtml?: string }) {
  // Declare state
  const [components, setComponents] = useState<ComponentProperties[]>([]);
  const [device, setDevice] = useState<DeviceMode>("desktop");
  const [selectedComponent, setSelectedComponent] = useState<ComponentProperties | null>(null);

  // Function to add a new component of the specified type
  const addComponent = (elementType: string) => {
    const newComponent: ComponentProperties = {
      id: Date.now(),
      type: elementType,
      styles: {},
      content:
        elementType === "Button"
          ? "Click Me"
          : elementType === "Text"
          ? "Your Text Here"
          : elementType === "Heading"
          ? "Heading"
          : null,
      src: elementType === "Image" ? "https://via.placeholder.com/600x300" : null,
      alt: elementType === "Image" ? "Image Description" : null,
      width: elementType === "Image" ? 600 : null,
    };
    setComponents((prev) => [...prev, newComponent]);
  };

  // Function to update an existing component
  const updateComponent = useCallback(
    (id: number, updatedProps: Partial<ComponentProperties>) => {
      setComponents((prevComponents) =>
        prevComponents.map((component) =>
          component.id === id ? { ...component, ...updatedProps } : component
        )
      );
    },
    []
  );

  const deleteComponent = (id: number) => {
    setComponents((prevComponents) => prevComponents.filter((component) => component.id !== id));
    setSelectedComponent(null);
  };

  const duplicateComponent = (id: number) => {
    const componentToDuplicate = components.find((component) => component.id === id);
    if (componentToDuplicate) {
      const duplicatedComponent = { ...componentToDuplicate, id: Date.now() };
      setComponents((prev) => [...prev, duplicatedComponent]);
    }
  };

  const getStyleString = (styles: any) => {
    return Object.entries(styles)
      .map(([key, value]) => `${key.replace(/([A-Z])/g, "-$1").toLowerCase()}: ${value}`)
      .join(";");
  };

  const getEditorContent = useCallback(() => {
    const htmlContent = components
      .map((component) => {
        const styles = getStyleString(component.styles);
        switch (component.type) {
          case "Heading":
            return `<h${component.styles.level || 1} style="${styles}">${component.content}</h${component.styles.level || 1}>`;
          case "Text":
            return `<p style="${styles}">${component.content}</p>`;
          case "Button":
            return `<button style="${styles}">${component.content}</button>`;
          case "Divider":
            return `<hr style="${styles}" />`;
          case "Image":
            return `<img src="${component.src}" alt="${component.alt}" style="${styles}" />`;
          default:
            return "";
        }
      })
      .join("");

    return `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; }
          </style>
        </head>
        <body>
          ${htmlContent}
        </body>
      </html>
    `;
  }, [components]);

  // Effect to propagate the changes back to the parent component for HTML output update
  useEffect(() => {
    const newHtmlContent = getEditorContent();
    onHtmlChange(newHtmlContent);
  }, [components, getEditorContent, onHtmlChange]);

  useEffect(() => {
    if (initialHtml) {
      // Parse the initial HTML and set the components
      const parser = new DOMParser();
      const doc = parser.parseFromString(initialHtml, 'text/html');
      const body = doc.body;
      
      const newComponents: ComponentProperties[] = [];
      body.childNodes.forEach((node, index) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const element = node as Element;
          const component: ComponentProperties = {
            id: Date.now() + index,
            type: element.tagName,
            styles: {},
            content: element.textContent || '',
          };
          
          if (element.tagName === 'IMG') {
            component.src = element.getAttribute('src') || '';
            component.alt = element.getAttribute('alt') || '';
          }
          
          // Parse inline styles
          const styleAttr = element.getAttribute('style');
          if (styleAttr) {
            const styles = styleAttr.split(';').reduce((acc, style) => {
              const [key, value] = style.split(':').map(s => s.trim());
              if (key && value) {
                acc[key] = value;
              }
              return acc;
            }, {} as Record<string, string>);
            component.styles = styles;
          }
          
          newComponents.push(component);
        }
      });
      
      setComponents(newComponents);
    }
  }, [initialHtml]);

  return (
    <div className="h-screen p-4 flex bg-gray-100">
      {/* Main content area */}
      <div className="w-3/5 p-4 bg-white border rounded-lg shadow-lg mr-4">
        <ResponsiveToggle device={device} setDevice={setDevice} />
        <ScrollArea className="w-full h-[calc(100vh-180px)]">
          <PreviewWindow
            components={components}
            setSelectedComponent={setSelectedComponent} // Passing selection logic
            updateComponent={updateComponent}
            deleteComponent={deleteComponent}
            duplicateComponent={duplicateComponent}
          />
        </ScrollArea>
      </div>

      {/* Editor toolbar & toolkit */}
      <div className="w-2/5 bg-white p-4 rounded-lg shadow-lg flex flex-col">
        <Toolbar addComponent={addComponent} />
        <ScrollArea className="flex-grow mt-4">
          {/* Render toolkits conditionally based on the selected component */}
          {selectedComponent && (
            <div className="p-4 bg-gray-50 rounded-lg">
              {selectedComponent.type === "Button" && (
                <ButtonToolkit
                  component={selectedComponent}
                  updateComponent={updateComponent}
                />
              )}
              {selectedComponent.type === "Text" && (
                <TextToolkit
                  component={selectedComponent}
                  updateComponent={updateComponent}
                />
              )}
              {selectedComponent.type === "Heading" && (
                <HeadingToolkit
                  component={selectedComponent}
                  updateComponent={updateComponent}
                />
              )}
              {selectedComponent.type === "Divider" && (
                <DividerToolkit
                  component={selectedComponent}
                  updateComponent={updateComponent}
                />
              )}
              {selectedComponent.type === "Image" && (
                <ImageToolkit
                  component={selectedComponent}
                  updateComponent={updateComponent}
                />
              )}
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
}