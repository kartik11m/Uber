import React from "react";

const LocationSearchPanel = ({
    suggestions = [],
    loading = false,
    setPanelOpen,
    setVehiclePanel,
    onSuggestionClick,
    activeField
}) => {
    return (
        <div>
            <div className="font-semibold mb-2">Location Suggestions:</div>
            {loading && <div className="text-gray-500">Loading...</div>}
            {!loading && suggestions.length === 0 && <div className="text-gray-400">No suggestions</div>}
            {suggestions.map((elem, idx) => (
                <div
                    key={idx}
                    onClick={() => {
                        if (onSuggestionClick) onSuggestionClick(elem);
                        setPanelOpen(false);
                    }}
                    className="flex items-center justify-center gap-2 my-4 border-2 active:border-black  p-3 rounded-xl border-gray-50 cursor-pointer hover:border-black"
                >
                    <h2 className="bg-[#eee] p-2 rounded-full h-8 w-8 flex items-center justify-center">
                        <i className="ri-map-pin-line"></i>
                    </h2>
                    <h4 className="font-medium">{elem.description || elem}</h4>
                </div>
            ))}
        </div>
    );
};
export default LocationSearchPanel;