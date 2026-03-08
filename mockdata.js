// Initial Mock Data Structure
const DEFAULT_PHARMAFLOW_DATA = {
    tenants: [
        { id: 'T001', name: 'Cipla India', region: 'South Asia', status: 'active', displayName: 'Cipla India Ltd' },
        { id: 'T002', name: 'BioNTech EU', region: 'Europe', status: 'active', displayName: 'BioNTech SE' }
    ],
    users: [
        { id: 'U001', tenant_id: 'SYSTEM', name: 'Admin User', email: 'admin@pharmaflow.com', password: 'admin123', role: 'SYSTEM' },
        { id: 'U002', tenant_id: 'T001', name: 'Arjun Mehta', email: 'client@cipla.com', password: 'client123', role: 'CLIENT', tenant_name: 'Cipla India' },
        { id: 'U003', tenant_id: 'T002', name: 'Eva Braun', email: 'client@biontech.com', password: 'client123', role: 'CLIENT', tenant_name: 'BioNTech EU' }
    ],
    shipments: [
        { id: 'SHP001', tenant_id: 'T001', product: 'Vaccine Adjuvant', temp_band: '2-8°C', setpoint: 5, current_temp: 5.2, status: 'in_transit', customs: 'Cleared - Duty Paid', risk_score: 22, cost_estimate: 4250, eta: '2026-03-10', origin: 'Mumbai', destination: 'Dubai' },
        { id: 'SHP002', tenant_id: 'T001', product: 'mRNA Lipid Nanoparticle', temp_band: '-20°C', setpoint: -20, current_temp: -12, status: 'at_risk', customs: 'Pending Clearance', risk_score: 74, cost_estimate: 6100, eta: '2026-03-09', origin: 'Mumbai', destination: 'London' },
        { id: 'SHP003', tenant_id: 'T002', product: 'Gene Therapy Vector', temp_band: '-70°C', setpoint: -70, current_temp: -69, status: 'in_transit', customs: 'HS Code Verified', risk_score: 35, cost_estimate: 9800, eta: '2026-03-12', origin: 'Frankfurt', destination: 'Boston' },
        { id: 'SHP004', tenant_id: 'T002', product: 'mRNA Lipid Nanoparticle', temp_band: '-20°C', setpoint: -20, current_temp: -20, status: 'delivered', customs: 'Import Authorized', risk_score: 10, cost_estimate: 5500, eta: '2026-03-05', origin: 'Berlin', destination: 'Paris' },
        { id: 'SHP005', tenant_id: 'T001', product: 'Vaccine Adjuvant', temp_band: '2-8°C', setpoint: 5, current_temp: 6.1, status: 'in_transit', customs: 'Cleared', risk_score: 48, cost_estimate: 3800, eta: '2026-03-11', origin: 'Delhi', destination: 'Singapore' }
    ],
    temperature_logs: {
        'SHP001': [5.1, 5.2, 5.0, 5.3, 5.1, 5.4, 5.2, 5.0, 5.1, 5.3, 5.2, 5.1, 5.0, 5.2, 5.3],
        'SHP002': [-20, -19.5, -18, -15, -12, -11.5, -12, -13, -12.5, -11, -10.5, -12, -13, -12, -11],
        'SHP003': [-70, -69.8, -70, -70.1, -69.9, -70, -70.2, -69.8, -70, -69.9, -70.1, -70, -69.8, -70, -70],
        'SHP004': [-20, -20, -19.9, -20, -20.1, -20, -20, -19.8, -20, -20, -20, -20, -19.9, -20, -20],
        'SHP005': [5.0, 5.2, 5.8, 6.0, 6.1, 6.3, 6.1, 5.9, 6.0, 6.2, 6.1, 5.8, 6.0, 6.1, 6.2]
    },
    orders: [
        { id: 'ORD001', tenant_id: 'T001', product: 'Vaccine Adjuvant', temp_band: '2-8°C', quantity: 500, origin: 'Mumbai', destination: 'Dubai', mode: 'Air', status: 'confirmed', created_at: '2026-03-01' },
        { id: 'ORD002', tenant_id: 'T001', product: 'mRNA Lipid Nanoparticle', temp_band: '-20°C', quantity: 200, origin: 'Mumbai', destination: 'London', mode: 'Air', status: 'in_transit', created_at: '2026-03-02' },
        { id: 'ORD003', tenant_id: 'T002', product: 'Gene Therapy Vector', temp_band: '-70°C', quantity: 50, origin: 'Frankfurt', destination: 'Boston', mode: 'Air', status: 'in_transit', created_at: '2026-03-03' },
        { id: 'ORD004', tenant_id: 'T001', product: 'Vaccine Adjuvant', temp_band: '2-8°C', quantity: 300, origin: 'Delhi', destination: 'Singapore', mode: 'Sea', status: 'pending', created_at: '2026-03-06' },
        { id: 'ORD005', tenant_id: 'T002', product: 'mRNA Lipid Nanoparticle', temp_band: '-20°C', quantity: 150, origin: 'Berlin', destination: 'Paris', mode: 'Road', status: 'delivered', created_at: '2026-02-28' }
    ],
    drug_licences: [
        { id: 'LIC001', tenant_id: 'T001', licence_number: 'DL-IND-001', drug_name: 'Vaccine Adjuvant', status: 'active', expiry_date: '2027-06-01' },
        { id: 'LIC002', tenant_id: 'T001', licence_number: 'DL-IND-002', drug_name: 'mRNA Lipid Nanoparticle', status: 'expiring', expiry_date: '2026-04-15' },
        { id: 'LIC003', tenant_id: 'T002', licence_number: 'DL-EU-001', drug_name: 'Gene Therapy Vector', status: 'expired', expiry_date: '2025-12-01' }
    ],
    materials: [
        { id: 'MAT001', name: 'Vaccine Adjuvant', temp_band: '2-8°C', lead_time_days: 3, availability: 'In Stock' },
        { id: 'MAT002', name: 'mRNA Lipid Nanoparticle', temp_band: '-20°C', lead_time_days: 5, availability: 'Low Stock' },
        { id: 'MAT003', name: 'Gene Therapy Vector', temp_band: '-70°C', lead_time_days: 7, availability: 'In Stock' }
    ],
    route_recommendations: {
        'default': [
            { type: 'Recommended', mode: 'Air', cost: 4250, eta_hours: 48, risk_score: 22, co2: '1.2t', breakdown: { fuel: 1800, carrier: 1900, handling: 400, customs: 150 } },
            { type: 'Cost-Optimized', mode: 'Sea + Rail', cost: 2800, eta_hours: 168, risk_score: 67, co2: '0.8t', breakdown: { fuel: 900, carrier: 1400, handling: 350, customs: 150 } },
            { type: 'Speed-Priority', mode: 'Charter Air', cost: 7100, eta_hours: 24, risk_score: 11, co2: '2.1t', breakdown: { fuel: 3200, carrier: 3200, handling: 500, customs: 200 } }
        ]
    },
    compliance_docs: [
        { shipment_id: 'SHP001', product: 'Vaccine Adjuvant', delivery_date: '2026-03-10', docs: ['Temp Log', 'CoA', 'Chain of Custody'], status: 'complete' },
        { shipment_id: 'SHP002', product: 'mRNA Lipid Nanoparticle', delivery_date: '2026-03-09', docs: ['Temp Log', 'CoA'], status: 'pending' },
        { shipment_id: 'SHP004', product: 'mRNA Lipid Nanoparticle', delivery_date: '2026-03-05', docs: ['Temp Log', 'CoA', 'Chain of Custody'], status: 'complete' }
    ],
    events: {
        'SHP001': [
            { time: '2026-03-07 08:00', event: 'Shipment picked up from Mumbai warehouse', actor: 'System' },
            { time: '2026-03-07 12:30', event: 'Cleared customs at Mumbai Airport', actor: 'Ops Team' },
            { time: '2026-03-07 15:00', event: 'Departed MUM → DXB (Air India Cargo)', actor: 'System' }
        ],
        'SHP002': [
            { time: '2026-03-07 06:00', event: 'Shipment picked up from Mumbai warehouse', actor: 'System' },
            { time: '2026-03-07 09:00', event: 'Temperature excursion detected: -12°C (setpoint: -20°C)', actor: 'Sensor' },
            { time: '2026-03-07 09:05', event: 'Alert sent to Ops and client QA Officer', actor: 'System' },
            { time: '2026-03-07 09:20', event: 'Mitigation initiated — backup cooling engaged', actor: 'Mysha Rahman' }
        ]
    },
    vendors: [
        { id: 'V001', name: 'Global Cold Logistics', type: 'Carrier', status: 'approved', joined_date: '2025-01-15' },
        { id: 'V002', name: 'Blue Sky Freight', type: 'Carrier', status: 'approved', joined_date: '2025-02-10' },
        { id: 'V003', name: 'SafeCare Transport', type: 'Carrier', status: 'pending', joined_date: '2026-03-01' }
    ],
    vendor_onboarding: [
        { id: 'APP001', company_name: 'FastTrack Airways', email: 'ops@fasttrack.com', status: 'pending', submitted_at: '2026-03-05', docs: { gst: true, pan: true, licence: true, bank: true } }
    ],
    hubs: [
        { id: 'H001', name: 'Mumbai Logistics Park', capacity: '85%', stock: { 'Vaccine Adjuvant': 5000, 'mRNA Lipid Nanoparticle': 1200, 'Gene Therapy Vector': 300 } },
        { id: 'H002', name: 'Frankfurt Air Gate', capacity: '42%', stock: { 'Vaccine Adjuvant': 2000, 'mRNA Lipid Nanoparticle': 800, 'Gene Therapy Vector': 1500 } }
    ],
    carrier_capacity: [
        { id: 'CAR001', name: 'Air India Cargo', type: 'Air', available: '12.5 Tons', utilization: 78, price_index: 'Market Rate' },
        { id: 'CAR002', name: 'Maersk Cold-Chain', type: 'Sea', available: '45 TEUs', utilization: 62, price_index: 'Negotiated' },
        { id: 'CAR003', name: 'SafeCare Road', type: 'Road', available: '8 Trucks', utilization: 45, price_index: 'Fixed' }
    ],
    global_audit_trail: [
        { id: 'AUD001', timestamp: '2026-03-07 14:22', action: 'Dossier Authorized', user: 'Admin User', target: 'SHP001', details: 'Passed quality check' },
        { id: 'AUD002', timestamp: '2026-03-07 16:05', action: 'Route Overruled', user: 'Arjun Mehta', target: 'ORD004', details: 'Switch to Air due to urgency' }
    ],
    compliance_checklists: {
        'default': [
            { id: 'CL001', task: 'Temperature setpoint verification', status: 'completed' },
            { id: 'CL002', task: 'Driver GPS authentication', status: 'completed' },
            { id: 'CL003', task: 'Seal integrity check at pickup', status: 'pending' },
            { id: 'CL004', task: 'GDP documentation review', status: 'pending' }
        ]
    },
    procurement_catalog: [
        { id: 'MC001', name: 'Vaccine Adjuvant', stock: 5200, price_per_unit: 14.50, grade: 'Pharma-Grade', cert: 'GMP Certified' },
        { id: 'MC002', name: 'mRNA Lipid Nanoparticles', stock: 850, price_per_unit: 85.00, grade: 'Research-Grade', cert: 'ISO-9001' },
        { id: 'MC003', name: 'Gene Therapy Vectors', stock: 120, price_per_unit: 450.00, grade: 'Clinical-Grade', cert: 'EMA Approved' }
    ]
};

const PHARMAFLOW_CITY_COORDS = {
    'Mumbai': { lat: 19.0760, lng: 72.8777 },
    'Delhi': { lat: 28.6139, lng: 77.2090 },
    'London': { lat: 51.5074, lng: -0.1278 },
    'Frankfurt': { lat: 50.1109, lng: 8.6821 },
    'Berlin': { lat: 52.5200, lng: 13.4049 },
    'Dubai': { lat: 25.2048, lng: 55.2708 },
    'Paris': { lat: 48.8566, lng: 2.3522 },
    'Boston': { lat: 42.3601, lng: -71.0589 },
    'Tokyo': { lat: 35.6895, lng: 139.6917 },
    'Singapore': { lat: 1.3521, lng: 103.8198 }
};

// Singleton Data Management with Multi-Field Validation
let PHARMAFLOW_DATA = JSON.parse(localStorage.getItem('pharmaflow_data'));

// Robustness: Reset if key schema fields (added in upgrades) are missing to prevent rendering crashes
if (!PHARMAFLOW_DATA || !PHARMAFLOW_DATA.materials || !PHARMAFLOW_DATA.hubs || !PHARMAFLOW_DATA.procurement_catalog || !PHARMAFLOW_DATA.events) {
    PHARMAFLOW_DATA = DEFAULT_PHARMAFLOW_DATA;
    localStorage.setItem('pharmaflow_data', JSON.stringify(PHARMAFLOW_DATA));
}

function savePharmaData() {
    localStorage.setItem('pharmaflow_data', JSON.stringify(PHARMAFLOW_DATA));
}

// Reset data (optional helper)
function resetPharmaData() {
    localStorage.removeItem('pharmaflow_data');
    window.location.reload();
}
