'use client'
import React from 'react'
import GoogleMap from '../components/GoogleMap'
import { MapProvider } from '../hooks/MapProvider'
import Marker from '../components/Marker'

const locations = [
	{ lat: 44.938255265678244, lng: -93.11162606015404 },
	{ lat: 44.83623033897452, lng: -92.95792745396419 },
]

const Maps = () => {
	// use fetch() to pull Random User Data
	// store in state
	// pass to GoogleMap
	return (
		<MapProvider mapApiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY as string}>
			<GoogleMap zoom={12} center={{ lat: 44.980553, lng: -93.270035 }}>
				{locations.map((location, idx) => {
					return <Marker key={idx} position={location} />
				})}
			</GoogleMap>
		</MapProvider>
	)
}

export default Maps
