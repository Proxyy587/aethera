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

export default function CustomEditor({
	onHtmlChange,
	initialHtml,
}: {
	onHtmlChange: (html: string) => void;
	initialHtml?: string;
}) {
	// Declare state
	const [components, setComponents] = useState<ComponentProperties[]>([]);
	const [device, setDevice] = useState<DeviceMode>("desktop");
	const [selectedComponent, setSelectedComponent] =
		useState<ComponentProperties | null>(null);

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
			src:
				elementType === "Image" ? "https://via.placeholder.com/600x300" : null,
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
		setComponents((prevComponents) =>
			prevComponents.filter((component) => component.id !== id)
		);
		setSelectedComponent(null);
	};

	const duplicateComponent = (id: number) => {
		const componentToDuplicate = components.find(
			(component) => component.id === id
		);
		if (componentToDuplicate) {
			const duplicatedComponent = { ...componentToDuplicate, id: Date.now() };
			setComponents((prev) => [...prev, duplicatedComponent]);
		}
	};

	const getStyleString = (styles: any) => {
		return Object.entries(styles)
			.map(
				([key, value]) =>
					`${key.replace(/([A-Z])/g, "-$1").toLowerCase()}: ${value}`
			)
			.join(";");
	};

	const getEditorContent = useCallback(() => {
		const htmlContent = components
			.map((component) => {
				const styles = getStyleString(component.styles);
				switch (component.type) {
					case "Heading":
						return `<h${component.styles.level || 1} style="${styles}">${
							component.content
						}</h${component.styles.level || 1}>`;
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
      <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta name="x-apple-disable-message-reformatting">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <style type="text/css">
                  @media only screen and (min-width: 520px) {
                    .u-row {
                      width: 500px !important;
                    }
                    .u-row .u-col {
                      vertical-align: top;
                    }
                        .u-row .u-col-100 {
                          width: 500px !important;
                        }   
                  }
                  @media only screen and (max-width: 520px) {
                    .u-row-container {
                      max-width: 100% !important;
                      padding-left: 0px !important;
                      padding-right: 0px !important;
                    }
                    .u-row {
                      width: 100% !important;
                    }
                    .u-row .u-col {
                      display: block !important;
                      width: 100% !important;
                      min-width: 320px !important;
                      max-width: 100% !important;
                    }
                    .u-row .u-col > div {
                      margin: 0 auto;
                    }
                    .u-row .u-col img {
                      max-width: 100% !important;
                    }
            }   
            body {
              margin: 0;
              padding: 0;
            }
            table,
            tr,
            td {
              vertical-align: top;
              border-collapse: collapse;
            }
            p {
              margin: 0;
            }
            .ie-container table,
            .mso-container table {
              table-layout: fixed;
            }
            * {
              line-height: inherit;
            }
            a[x-apple-data-detectors='true'] {
              color: inherit !important;
              text-decoration: none !important;
            }
            table, td { color: #000000; } #u_body a { color: #000000; text-decoration: underline; }
                </style>
        </head>
        <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #FFFFFF;color: #000000">
        	<table
              id="u_body"
              style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;margin: 0 auto;background-color: #ffffff;width: 100%;"
              cellpadding="0"
              cellspacing="0"
            >
              ${htmlContent}
            </table>
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
			const doc = parser.parseFromString(initialHtml, "text/html");
			const body = doc.body;

			const newComponents: ComponentProperties[] = [];
			body.childNodes.forEach((node, index) => {
				if (node.nodeType === Node.ELEMENT_NODE) {
					const element = node as Element;
					const component: ComponentProperties = {
						id: Date.now() + index,
						type: element.tagName,
						styles: {},
						content: element.textContent || "",
					};

					if (element.tagName === "IMG") {
						component.src = element.getAttribute("src") || "";
						component.alt = element.getAttribute("alt") || "";
					}

					// Parse inline styles
					const styleAttr = element.getAttribute("style");
					if (styleAttr) {
						const styles = styleAttr.split(";").reduce((acc, style) => {
							const [key, value] = style.split(":").map((s) => s.trim());
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
