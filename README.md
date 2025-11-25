# Hamden Zoning & Elementary School Districts Map

An interactive web map showing zoning areas and elementary school districts in Hamden, CT. Users can hover over areas to see detailed information about zoning types and assigned schools.

## Current Status

**Zoning Data**: Real Hamden zoning data has been loaded from the Town of Hamden GIS system. The map displays actual zoning districts including R1-R5 (Residential), T1-T5 (Transitional/Rural to Urban), NC (Neighborhood Commercial), M (Mixed Use), and MIH (Mixed Income Housing).

**School Districts**: Sample school district data is included. To add official elementary school attendance zone boundaries, see the School Districts section below.

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
3. The zoning layer shows all current Hamden zoning districts
4. To add school district boundaries, see instructions below

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

### Zoning Data (Already Loaded)

The zoning data (`data/zoning.geojson`) has been obtained from the official Town of Hamden ArcGIS server:
- **Source**: https://server1.mapxpress.net/arcgis/rest/services/Hamden/Active/MapServer/13
- **Last Updated**: Current as of the Town's GIS system
- **Coverage**: Complete Hamden zoning districts

To refresh the zoning data in the future, you can query the ArcGIS REST service:
```bash
curl "https://server1.mapxpress.net/arcgis/rest/services/Hamden/Active/MapServer/13/query?where=1%3D1&outFields=ZONING,DESCRIPTION,TYPE&outSR=4326&f=geojson" -o data/zoning.geojson
```

### School Districts (Needs Real Data)

The school district boundaries are currently sample data. To add official elementary school attendance zone boundaries:

**Option 1: Contact Hamden Public Schools**
- Phone: 203-407-2000
- Website: https://www.hamden.org/families/attendance-zones
- Request GeoJSON or shapefile data for elementary school attendance zones

**Option 2: Use the Street Directory**
- Hamden provides a [street-by-street attendance directory](https://www.hamden.org/families/attendance-zones)
- You can manually create zones using tools like [geojson.io](https://geojson.io/)

**Hamden Elementary Schools:**
- Bear Path: 10 Kirk Rd., Hamden, CT 06514
- Church Street: 95 Church St., Hamden, CT 06514
- Dunbar Hill: 315 Lane St., Hamden, CT 06514
- Helen Street: 285 Helen St., Hamden, CT 06514
- Ridge Hill: 120 Carew Rd., Hamden, CT 06517
- Spring Glen: 1908 Whitney Ave., Hamden, CT 06517
- West Woods: 350 West Todd St., Hamden, CT 06518

## GeoJSON File Format

### Zoning Data (`data/zoning.geojson`)

The current zoning data uses these properties (from Hamden GIS):
- `ZONING`: The zoning designation (e.g., "R1", "R4", "T5", "NC", "M")
- `DESCRIPTION`: Zone description (e.g., "RESIDENTIAL", "URBAN CENTER")
- `TYPE`: Additional type information (optional)

Hamden Zoning Types:
- **R1-R5**: Residential zones (R1 = least dense, R5 = most dense)
- **T1-T5**: Transitional zones (T1 = Natural/Rural, T5 = Urban Center)
- **TG**: Town Green
- **NC**: Neighborhood Commercial
- **M**: Mixed Use
- **MIH**: Mixed Income Housing

### School District Data (`data/schools.geojson`)

Required properties for each feature:
- `school_name`: Name of the elementary school
- `address`: Full address of the school

Example:
```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "school_name": "Bear Path Elementary",
        "address": "121 Circular Ave, Hamden, CT 06514"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [...]
      }
    }
  ]
}
```

## Converting Shapefiles to GeoJSON

If you have Shapefile (.shp) data:

### Using QGIS (Free Desktop Software)
1. Download [QGIS](https://qgis.org/)
2. Open your shapefile in QGIS
3. Right-click the layer → Export → Save Features As
4. Select format: GeoJSON
5. Choose WGS84 (EPSG:4326) coordinate system

### Using ogr2ogr (Command Line)
```bash
ogr2ogr -f GeoJSON -t_srs EPSG:4326 output.geojson input.shp
```

### Using Online Tools
- [MyGeoData Converter](https://mygeodata.cloud/converter/)
- [MapShaper](https://mapshaper.org/)

## Customizing Colors

Edit the color schemes in `map.js`:

```javascript
// Zoning colors
const zoningColors = {
    'R-1': '#90EE90',
    'R-2': '#7CFC00',
    // Add more zone types as needed
};

// School colors
const schoolColors = {
    'Bear Path': '#FF6B6B',
    'Church Street': '#4ECDC4',
    // Add more schools as needed
};
```

## Deployment

### Local Testing
Simply open `index.html` in a web browser.

### Web Hosting
Upload all files to any web hosting service:
- GitHub Pages
- Netlify
- Vercel
- Traditional web hosting

No server-side processing is required.

## Browser Compatibility

Works in all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Resources

- [Leaflet.js Documentation](https://leafletjs.com/)
- [GeoJSON Specification](https://geojson.org/)
- [Connecticut Open Data](https://data.ct.gov/)
- [Town of Hamden Official Website](https://www.hamden.com/)

## Troubleshooting

**Map doesn't load:**
- Check browser console for errors (F12)
- Ensure GeoJSON files are in the `data/` folder
- Verify GeoJSON format is valid at [geojsonlint.com](https://geojsonlint.com/)

**Areas not showing:**
- Check that coordinate system is WGS84 (EPSG:4326)
- Verify coordinates are in [longitude, latitude] order
- Confirm Hamden coordinates are approximately [-72.90, 41.40]

**Colors not displaying correctly:**
- Ensure zone_type/school_name values match the color definitions in map.js
- Check for typos in property names

## License

This project is open source and available for use in civic and educational projects.
