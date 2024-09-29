import React, { useState } from "react";

// Type declaration for style objects
interface ComponentStyle {
  [key: string]: string | number;
}

interface ComponentProps {
  id: number;
  type: string;
  styles: ComponentStyle;
  content?: string | null;
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

// PreviewWindow Component
const PreviewWindow = ({
  components,
  setSelectedComponent,
  updateComponent,  // Ensure these three props are defined
  deleteComponent,  // ...
  duplicateComponent,  // ...
}: PreviewWindowProps) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // Handle clicking on a component to select it
  const handleComponentClick = (component: ComponentProps) => {
    setSelectedId(component.id); // Set the selected component's ID
    setSelectedComponent(component); // Update the selected component state in the CustomEditor
  };

  // Function to render each component type & apply selection functionality
  const renderComponentJsx = (component: ComponentProps) => {
    // Add a border if the component is selected
    const isSelected = component.id === selectedId;

    const selectedStyle: React.CSSProperties = {
      border: isSelected ? "2px solid blue" : "none", // Highlight selected component
      padding: "4px",
      margin: "8px 0",
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
            <button style={component.styles}>{component.content}</button>
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
            <img
              src={component.src || "https://via.placeholder.com/150"}
              alt={component.alt || "image"}
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
        <p>No components added yet</p>
      )}
    </div>
  );
};

export default PreviewWindow;