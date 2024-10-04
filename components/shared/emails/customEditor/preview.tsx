import React, { useState } from "react";
import Image from "next/image";

interface ComponentProps {
  id: number;
  type: string;
  styles: Record<string, string | number>;
  content?: string;
  src?: string;
  alt?: string;
  href?: string;
  targetBlank?: boolean;
}

interface PreviewWindowProps {
  components: ComponentProps[];
  setSelectedComponent: (component: ComponentProps | null) => void;
  updateComponent: (id: number, updatedProps: Partial<ComponentProps>) => void;
  deleteComponent: (id: number) => void;
  duplicateComponent: (id: number) => void;
}

const PreviewWindow: React.FC<PreviewWindowProps> = ({
  components,
  setSelectedComponent,
  updateComponent,
  deleteComponent,
  duplicateComponent,
}) => {
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

    const componentStyle = {
      ...component.styles,
      boxSizing: 'border-box' as const,
    };

    const onClickHandler = () => handleComponentClick(component);

    switch (component.type) {
      case "Heading":
        const HeadingTag = `h${component.styles.level || 1}` as keyof JSX.IntrinsicElements;
        return (
          <div key={component.id} style={selectedStyle} onClick={onClickHandler}>
            <HeadingTag style={componentStyle}>{component.content}</HeadingTag>
          </div>
        );
      case "Text":
        return (
          <div key={component.id} style={selectedStyle} onClick={onClickHandler}>
            <p style={componentStyle}>{component.content}</p>
          </div>
        );
      case "Button":
        return (
          <div key={component.id} style={selectedStyle} onClick={onClickHandler}>
            <a 
              href={component.href || "#"} 
              target={component.targetBlank ? "_blank" : "_self"}
              rel={component.targetBlank ? "noopener noreferrer" : undefined}
              style={componentStyle}
            >
              {component.content}
            </a>
          </div>
        );
      case "Divider":
        return (
          <div key={component.id} style={selectedStyle} onClick={onClickHandler}>
            <hr style={componentStyle} />
          </div>
        );
      case "Image":
        return (
          <div key={component.id} style={selectedStyle} onClick={onClickHandler}>
            <img
              src={component.src || "https://via.placeholder.com/150"}
              alt={component.alt || "picture"}
              style={componentStyle}
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
