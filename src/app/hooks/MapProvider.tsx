import React, { createContext, useState, useContext, ReactNode } from 'react'

interface MapContextType {
	apiKey: string
	updateApiKey: (key: string) => void
}

const MapContext = createContext<MapContextType | undefined>(undefined)

export const MapProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [apiKey, setApiKey] = useState('')

	const updateApiKey = (newKey: string) => {
		setApiKey(newKey)
	}

	return (
		<MapContext.Provider value={{ apiKey, updateApiKey }}>
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
