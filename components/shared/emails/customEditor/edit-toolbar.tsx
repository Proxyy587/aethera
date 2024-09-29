import React, { useState } from "react";

export default function EditToolbar({
	onStyleChange,
}: {
	onStyleChange: (s: object) => void;
}) {
	const [bgColor, setBgColor] = useState<string>("#ffffff");
	const [fontFamily, setFontFamily] = useState<string>("Arial, sans-serif");

	const handleBgColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const color = e.target.value;
		setBgColor(color);
		onStyleChange({ backgroundColor: color });
	};

	const handleFontFamilyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const font = e.target.value;
		setFontFamily(font);
		onStyleChange({ fontFamily: font });
	};

	return (
		<div className="bg-gray-200 p-4 rounded mt-4">
			<h4 className="font-semibold mb-4">Edit Body</h4>
			<div className="space-y-4">
				<div>
					<label>Background Color </label>
					<input type="color" value={bgColor} onChange={handleBgColorChange} />
				</div>
				<div>
					<label>Font Family </label>
					<select value={fontFamily} onChange={handleFontFamilyChange}>
						<option value="Arial, sans-serif">Arial</option>
						<option value="'Courier New', Courier, monospace">
							Courier New
						</option>
						<option value="'Times New Roman', Times, serif">
							Times New Roman
						</option>
					</select>
				</div>
			</div>
		</div>
	);
}
