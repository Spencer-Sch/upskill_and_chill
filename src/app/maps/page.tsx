'use client'
import React from 'react'
import GoogleMap from '../components/GoogleMap'
import { MapProvider } from '../hooks/MapProvider'

const Maps = () => {
	// use fetch() to pull Random User Data
	// store in state
	// pass to GoogleMap
	return (
		<MapProvider mapApiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY as string}>
			<GoogleMap
				zoom={12}
				center={{ lat: 44.980553, lng: -93.270035 }}
			></GoogleMap>
		</MapProvider>
	)
}

export default Maps
