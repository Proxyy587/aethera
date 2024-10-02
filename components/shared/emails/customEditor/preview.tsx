import Image from "next/image";
import React, { useState } from "react";

interface ComponentStyle {
  [key: string]: string | number;
}

interface ComponentProps {
  id: number;
  type: string;
  styles: ComponentStyle;
  content?: string | null;
  href?: string | null;
  targetBlank?: boolean;
  src?: string | null;
  alt?: string | null;
}

interface PreviewWindowProps {
  components: ComponentProps[];
  setSelectedComponent: (component: ComponentProps | null) => void;
  updateComponent: (id: number, updatedProps: Partial<ComponentProps>) => void;
  deleteComponent: (id: number) => void;
  duplicateComponent: (id: number) => void;
}

const PreviewWindow = ({
  components,
  setSelectedComponent,
  updateComponent,
  deleteComponent,
  duplicateComponent,
}: PreviewWindowProps) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleComponentClick = (component: ComponentProps) => {
    setSelectedId(component.id);
    setSelectedComponent(component);
  };

  const renderComponentJsx = (component: ComponentProps) => {
    const isSelected = component.id === selectedId;

    const selectedStyle: React.CSSProperties = {
      border: isSelected ? "2px solid blue" : "none",
      padding: "4px",
      margin: "8px 0",
      display: "flex",
      justifyContent: (component.styles.justifyContent as React.CSSProperties['justifyContent']) || "center",
    };

    const onClickHandler = () => handleComponentClick(component);

    switch (component.type) {
      case "Heading":
        return (
          <div 
            key={component.id}
            style={selectedStyle} 
            onClick={onClickHandler}
          >
            <h1 style={component.styles}>{component.content}</h1>
          </div>
        );
      case "Text":
        return (
          <div 
            key={component.id}
            style={selectedStyle} 
            onClick={onClickHandler}
          >
            <p style={component.styles}>{component.content}</p>
          </div>
        );
      case "Button":
        return (
          <div 
            key={component.id}
            style={selectedStyle}
            onClick={onClickHandler}
          >
            <a 
              href={component.href || "#"} 
              target={component.targetBlank ? "_blank" : "_self"}
              rel={component.targetBlank ? "noopener noreferrer" : undefined}
              style={component.styles}
            >
              {component.content}
            </a>
          </div>
        );
      case "Divider":
        return (
          <div 
            key={component.id}
            style={selectedStyle} 
            onClick={onClickHandler}
          >
            <hr style={component.styles} />
          </div>
        );
      case "Image":
        return (
          <div 
            key={component.id}
            style={selectedStyle} 
            onClick={onClickHandler}
          >
            <Image
              width={400}
              height={400}
              src={component.src || "https://via.placeholder.com/150"}
              alt={component.alt || "picture"}
              style={component.styles}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="preview-container p-4">
      {components.length > 0 ? (
        components.map((component: ComponentProps) => renderComponentJsx(component))
      ) : (
        <p className="text-center text-muted-foreground">Click on the components to see the preview</p>
      )}
    </div>
  );
};

export default PreviewWindow;
