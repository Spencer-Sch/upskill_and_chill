'use client'

import React, { useEffect, useRef } from 'react'
import { Loader } from '@googlemaps/js-api-loader'

export default function GoogleMap() {
	const mapRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const initializeMap = async () => {
			const loader = new Loader({
				apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
				version: 'quarterly',
			})

			const { Map } = await loader.importLibrary('maps')

			const location = {
				lat: 44.980553,
				lng: -93.270035,
			}

			// MARKER
			const { Marker } = (await loader.importLibrary(
				'marker'
			)) as google.maps.MarkerLibrary

			const options: google.maps.MapOptions = {
				center: location,
				zoom: 12,
				mapId: 'MASSIVE_MAP_TEST',
			}

			const map = new Map(mapRef.current as HTMLDivElement, options)

			// add marking into the map
			const marker = new Marker({
				map: map,
				position: location,
			})
		}

		initializeMap()
	}, [])

	return (
		<div className="h-[600px]" ref={mapRef}>
			GoogleMap
		</div>
	)
}
