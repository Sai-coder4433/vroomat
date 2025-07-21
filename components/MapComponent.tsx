import React, { useEffect, useRef } from 'react';
import ReactDOMServer from 'react-dom/server';
import { CarIcon, MapPinIcon, BuildingOfficeIcon } from './Icons';

// Leaflet is loaded from CDN in index.html
declare const L: any;

interface MapComponentProps {
    userLocation: [number, number];
    garageLocation: [number, number];
    mechanicLocation: [number, number];
}

const MapComponent: React.FC<MapComponentProps> = ({ userLocation, garageLocation, mechanicLocation }) => {
    const mapRef = useRef<any>(null);
    const mechanicMarkerRef = useRef<any>(null);

    // Creates a custom Leaflet icon from a React component
    const createSvgIcon = (iconComponent: React.ReactElement) => {
        const iconHtml = ReactDOMServer.renderToString(iconComponent);
        return L.divIcon({
            html: iconHtml,
            className: 'custom-leaflet-icon', // custom class to remove default styles
            iconSize: [40, 40],
            iconAnchor: [20, 40],
            popupAnchor: [0, -40],
        });
    };

    // Initialize map on first render
    useEffect(() => {
        if (mapRef.current) return; // a map is already initialized

        const map = L.map('map', {
            zoomControl: false,
            attributionControl: false,
        }).setView(userLocation, 13);

        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 20
        }).addTo(map);

        // Add markers for user, garage, and mechanic
        const userIcon = createSvgIcon(<MapPinIcon className="w-10 h-10 text-brand-red drop-shadow-lg" />);
        L.marker(userLocation, { icon: userIcon }).addTo(map).bindPopup("<b>Your Location</b>").openPopup();

        const garageIcon = createSvgIcon(<BuildingOfficeIcon className="w-10 h-10 text-yellow-400 drop-shadow-lg" />);
        L.marker(garageLocation, { icon: garageIcon }).addTo(map).bindPopup("<b>Garage</b>");

        const mechanicIcon = createSvgIcon(<CarIcon className="w-10 h-10 text-white bg-brand-dark p-2 rounded-full shadow-lg" />);
        mechanicMarkerRef.current = L.marker(mechanicLocation, { icon: mechanicIcon }).addTo(map).bindPopup("<b>Mechanic</b>");
        
        mapRef.current = map;
        
        // Fit map to show both user and garage
        const bounds = L.latLngBounds([userLocation, garageLocation]);
        map.fitBounds(bounds, { padding: [50, 50] });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Run only once

    // Update mechanic's position whenever it changes
    useEffect(() => {
        if (mechanicMarkerRef.current && mechanicLocation) {
            mechanicMarkerRef.current.setLatLng(mechanicLocation);
            
            // Pan map to keep mechanic in view if they go out of bounds
            if (mapRef.current && !mapRef.current.getBounds().contains(mechanicLocation)) {
                 mapRef.current.panTo(mechanicLocation);
            }
        }
    }, [mechanicLocation]);

    return (
        // The map container
        <div id="map" className="h-full w-full">
            <style>{`
                .custom-leaflet-icon {
                    background: transparent;
                    border: none;
                }
            `}</style>
        </div>
    );
};

export default MapComponent;
