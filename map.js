// Initialize map centered on Hamden, CT
const map = L.map('map').setView([41.3959, -72.8968], 13);

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19
}).addTo(map);

// Color schemes for different zone types (Hamden CT actual zoning)
const zoningColors = {
    'R1': '#90EE90',       // Light green - Residential 1
    'R2': '#7CFC00',       // Lawn green - Residential 2
    'R3': '#66CDAA',       // Medium aquamarine - Residential 3
    'R4': '#3CB371',       // Medium sea green - Residential 4
    'R5': '#2E8B57',       // Sea green - Residential 5
    'T1': '#98FB98',       // Pale green - Natural/Rural 1
    'T2': '#90EE90',       // Light green - Rural 2
    'T3': '#8FBC8F',       // Dark sea green - Transitional 3
    'T3.5': '#7CCC7C',     // Green - Transitional 3.5
    'T4': '#6CAA6C',       // Medium green - Transitional 4
    'T5': '#5A995A',       // Dark green - Urban Center
    'TG': '#487848',       // Darker green - Town Green
    'NC': '#FFB6C1',       // Light pink - Neighborhood Commercial
    'M': '#FF69B4',        // Hot pink - Mixed Use
    'MIH': '#DDA0DD'       // Plum - Mixed Income Housing
};

const schoolColors = {
    'Bear Path': '#FF6B6B',
    'Church Street': '#4ECDC4',
    'Dunbar Hill': '#45B7D1',
    'Helen Street': '#FFA07A',
    'Ridge Hill': '#98D8C8',
    'Shepherd Glen': '#E8A87C',
    'Spring Glen': '#F7DC6F',
    'West Woods': '#BB8FCE'
};

// Layer groups for toggling
let zoningLayer = L.layerGroup().addTo(map);
let schoolLayer = L.layerGroup().addTo(map);

// Store current hover state
let currentHoverData = {
    zoning: null,
    school: null
};

// Style function for zoning areas
function zoningStyle(feature) {
    return {
        fillColor: zoningColors[feature.properties.ZONING] || '#CCCCCC',
        weight: 2,
        opacity: 0.8,
        color: '#333',
        fillOpacity: 0.4
    };
}

// Style function for school districts
function schoolStyle(feature) {
    return {
        fillColor: schoolColors[feature.properties.school_name] || '#CCCCCC',
        weight: 3,
        opacity: 1,
        color: schoolColors[feature.properties.school_name] || '#CCCCCC',
        dashArray: '8, 4',
        fillOpacity: 0.05
    };
}

// Highlight style on hover
function highlightFeature(e) {
    const layer = e.target;
    layer.setStyle({
        weight: 3,
        opacity: 1,
        fillOpacity: 0.7
    });
    layer.bringToFront();
}

// Reset style when mouse leaves
function resetHighlight(e, layerType) {
    if (layerType === 'zoning') {
        e.target.setStyle(zoningStyle(e.target.feature));
    } else {
        e.target.setStyle(schoolStyle(e.target.feature));
    }
}

// Update info panel with current data
function updateInfoPanel() {
    const panel = document.getElementById('info-panel');

    if (!currentHoverData.zoning && !currentHoverData.school) {
        panel.innerHTML = `
            <h3>Hover over an area</h3>
            <p>Move your cursor over the map to see zoning and school district information.</p>
        `;
        return;
    }

    let html = '<h3>Area Information</h3>';

    if (currentHoverData.school) {
        html += `
            <div class="data-row">
                <div class="data-label">Elementary School</div>
                <div class="data-value">${currentHoverData.school.school_name}</div>
            </div>
            <div class="data-row">
                <div class="data-label">School Address</div>
                <div class="data-value">${currentHoverData.school.address}</div>
            </div>
        `;
    }

    if (currentHoverData.zoning) {
        html += `
            <div class="data-row">
                <div class="data-label">Zoning Type</div>
                <div class="data-value">${currentHoverData.zoning.ZONING}</div>
            </div>
            <div class="data-row">
                <div class="data-label">Zoning Description</div>
                <div class="data-value">${currentHoverData.zoning.DESCRIPTION || 'N/A'}</div>
            </div>
        `;
    }

    panel.innerHTML = html;
}

// Event handlers for zoning layers
function onEachZoningFeature(feature, layer) {
    layer.on({
        mouseover: function(e) {
            highlightFeature(e);
            currentHoverData.zoning = feature.properties;
            updateInfoPanel();
        },
        mouseout: function(e) {
            resetHighlight(e, 'zoning');
            currentHoverData.zoning = null;
            updateInfoPanel();
        },
        click: function(e) {
            map.fitBounds(e.target.getBounds());
        }
    });
}

// Event handlers for school district layers
function onEachSchoolFeature(feature, layer) {
    layer.on({
        mouseover: function(e) {
            highlightFeature(e);
            currentHoverData.school = feature.properties;
            updateInfoPanel();
        },
        mouseout: function(e) {
            resetHighlight(e, 'school');
            currentHoverData.school = null;
            updateInfoPanel();
        },
        click: function(e) {
            map.fitBounds(e.target.getBounds());
        }
    });
}

// Load and display GeoJSON data
async function loadMapData() {
    try {
        // Load zoning data
        const zoningResponse = await fetch('data/zoning.geojson');
        const zoningData = await zoningResponse.json();

        L.geoJSON(zoningData, {
            style: zoningStyle,
            onEachFeature: onEachZoningFeature
        }).addTo(zoningLayer);

        // Load school district data
        const schoolResponse = await fetch('data/schools.geojson');
        const schoolData = await schoolResponse.json();

        L.geoJSON(schoolData, {
            style: schoolStyle,
            onEachFeature: onEachSchoolFeature
        }).addTo(schoolLayer);

        // Build legends
        buildLegends(zoningData, schoolData);

    } catch (error) {
        console.error('Error loading map data:', error);
        document.getElementById('info-panel').innerHTML = `
            <h3>Data Not Found</h3>
            <p>Please add GeoJSON files to the data/ folder. See README for instructions.</p>
        `;
    }
}

// Build legend items dynamically from data
function buildLegends(zoningData, schoolData) {
    // Zoning legend
    const zoningLegend = document.getElementById('zoning-legend');
    const zoneTypes = new Set();
    zoningData.features.forEach(f => zoneTypes.add(f.properties.ZONING));

    zoningLegend.innerHTML = Array.from(zoneTypes).sort().map(type => `
        <div class="legend-item">
            <div class="legend-color" style="background-color: ${zoningColors[type] || '#CCCCCC'}"></div>
            <span class="legend-label">${type}</span>
        </div>
    `).join('');

    // School legend
    const schoolLegend = document.getElementById('school-legend');
    const schools = new Set();
    schoolData.features.forEach(f => schools.add(f.properties.school_name));

    schoolLegend.innerHTML = Array.from(schools).sort().map(school => `
        <div class="legend-item">
            <div class="legend-color" style="background-color: ${schoolColors[school] || '#CCCCCC'}"></div>
            <span class="legend-label">${school}</span>
        </div>
    `).join('');
}

// Layer toggle controls
document.getElementById('toggle-zoning').addEventListener('change', function(e) {
    if (e.target.checked) {
        map.addLayer(zoningLayer);
    } else {
        map.removeLayer(zoningLayer);
    }
});

document.getElementById('toggle-schools').addEventListener('change', function(e) {
    if (e.target.checked) {
        map.addLayer(schoolLayer);
    } else {
        map.removeLayer(schoolLayer);
    }
});

// Legend toggle functionality
function toggleLegend() {
    const content = document.getElementById('legend-content');
    const toggle = document.getElementById('legend-toggle');

    content.classList.toggle('collapsed');
    toggle.classList.toggle('collapsed');
}

// Initialize the map
loadMapData();
