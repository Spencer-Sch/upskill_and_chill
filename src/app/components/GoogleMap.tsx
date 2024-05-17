'use client'

import React, { useEffect, useRef, ReactNode } from 'react'
import { Loader } from '@googlemaps/js-api-loader'
import { useMapContext } from '../hooks/MapProvider'
// import Market component

interface Props {
	zoom: number
	center: { lat: number; lng: number }
	// children: ReactNode
}

const GoogleMap: React.FC<Props> = ({ zoom, center }) => {
	const mapRef = useRef<HTMLDivElement>(null)

	const { mapApiKey } = useMapContext()

	useEffect(() => {
		const initializeMap = async () => {
			const loader = new Loader({
				apiKey: mapApiKey,
				version: 'quarterly',
			})

			const { Map } = await loader.importLibrary('maps')

			const defaultCenter = {
				lat: 44.980553,
				lng: -93.270035,
			}

			const childrenIsArray = Array.isArray(children)
			const childrenIsNotNull =
				typeof children === 'object' && children !== null ? true : false

			const center = childrenIsNotNull
				? childrenIsArray
					? children[0].props.position
					: children.props.position
				: defaultCenter

			// MARKER
			const { Marker } = (await loader.importLibrary(
				'marker'
			)) as google.maps.MarkerLibrary

			const options: google.maps.MapOptions = {
				center: center,
				zoom: zoom,
				mapId: 'MASSIVE_MAP_TEST',
			}

			const map = new Map(mapRef.current as HTMLDivElement, options)

			// add marking into the map
			const marker = new Marker({
				map: map,
				position: center,
			})
		}

		initializeMap()
	}, [])

	return <div className="h-[600px]" ref={mapRef} />
}

export default GoogleMap
