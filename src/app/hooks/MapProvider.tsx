import React, { createContext, useState, useContext, ReactNode } from 'react'

interface MapContextType {
	mapApiKey: string
	updateApiKey: (key: string) => void
}

const MapContext = createContext<MapContextType | undefined>(undefined)

export const MapProvider: React.FC<{
	mapApiKey: string
	children: ReactNode
}> = ({ mapApiKey, children }) => {
	const [apiKey, setApiKey] = useState(mapApiKey)

	const updateApiKey = (newKey: string) => {
		setApiKey(newKey)
	}

	return (
		<MapContext.Provider value={{ mapApiKey, updateApiKey }}>
			{children}
		</MapContext.Provider>
	)
}

// Custom hook
export const useMapContext = (): MapContextType => {
	const context = useContext(MapContext)
	if (!context) {
		throw new Error('useMapContext must be used within a MapProvider')
	}
	return context
}
