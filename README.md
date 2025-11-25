# Hamden Zoning & Elementary School Districts Map

An interactive web map showing zoning areas and elementary school districts in Hamden, CT. Users can hover over areas to see detailed information about zoning types and assigned schools.

## Current Status

**Zoning Data**: Real Hamden zoning data has been loaded from the Town of Hamden GIS system. The map displays actual zoning districts including R1-R5 (Residential), T1-T5 (Transitional/Rural to Urban), NC (Neighborhood Commercial), M (Mixed Use), and MIH (Mixed Income Housing).

**School Districts**: School district data is based on street locations: https://www.hamden.org/families/attendance-zones.

## Features

- **Interactive Hover Information**: Hover over any area to see zoning type and school district details
- **Layer Toggle Controls**: Show/hide zoning areas and school districts independently
- **Color-Coded Legends**: Clear visual identification of different zones and schools
- **Responsive Design**: Works on desktop and mobile devices
- **Click to Zoom**: Click on any area to zoom into that region
- **Real Hamden Zoning Data**: Loaded directly from Town of Hamden ArcGIS services

## Getting Started

### Quick Start

1. Open `index.html` in a web browser
2. The map will load with real Hamden zoning data
3. The zoning layer shows all current Hamden zoning districts and school zones

### Project Structure

```
Maps/
├── index.html          # Main HTML file
├── styles.css          # Styling for the map interface
├── map.js              # JavaScript map logic
├── data/
│   ├── zoning.geojson  # Zoning district boundaries and data
│   └── schools.geojson # School district boundaries and data
└── README.md           # This file
```

## Data Sources

### Zoning Data 

The zoning data (`data/zoning.geojson`) has been obtained from the official Town of Hamden ArcGIS server:
- **Source**: https://server1.mapxpress.net/arcgis/rest/services/Hamden/Active/MapServer/13
- **Last Updated**: Current as of the Town's GIS system
- **Coverage**: Complete Hamden zoning districts

 ### Attendance Data 

The school zone data (`data/zoning.geojson`) has been obtained from the official Town of Hamden website:
- **Source**: [https://server1.mapxpress.net/arcgis/rest/services/Hamden/Active/MapServer/13](https://www.hamden.org/families/attendance-zones)
- **Last Updated**: 11/25/2025
- **Coverage**: Complete Hamden school districts



This project is open source and available for use in civic and educational projects.
