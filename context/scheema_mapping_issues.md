# EFRAG XBRL Mapping Guide - Where Everything Is

## Enumeration Lists Location
**File:** VSME-Digital-Template-sample-latest_3_.xlsx  
**Sheet:** "Enumeration Lists"  
**Format:** Each taxonomy is a column starting from Row 1

---

## 1. POLLUTANTS (94 Total) - Column G (Index 6)

**Source:** Regulation (EU) 2024/1244 on reporting of environmental data from industrial installations

### Your Current Data Problem:
```javascript
// YOUR DATA:
pollutants: [
  {
    pollutionType: "Chlorides (total Cl)",  // This MATCHES! ✓
    emissionType: "Water",
    amount: 10000,
    unit: "kilograms (kg)"
  },
  {
    pollutionType: "Aldrin",  // This MATCHES! ✓
    emissionType: "Air",
    amount: 2345,
    unit: "kilograms (kg)"
  }
]
```

### EFRAG's 94 Pollutants (Sample):
```
1. 1,1,1-trichloroethane
2. 1,1,2,2-tetrachloroethane
...
21. Chlorides (total Cl)  ← YOUR DATA MATCHES
...
6. Aldrin  ← YOUR DATA MATCHES
...
94. Zinc and compounds (Zn)
```

### THE FIX (Minimal):
Your pollutant names already match EFRAG! Just standardize units:

```javascript
pollutants: [
  {
    pollutantCode: "Chlorides (total Cl)",  // Use exact EFRAG name
    medium: "Water",  // Not "emissionType"
    amount: 10000,
    unitCode: "kg"  // Not "kilograms (kg)"
  },
  {
    pollutantCode: "Aldrin",
    medium: "Air",
    amount: 2345,
    unitCode: "kg"
  },
  {
    pollutantCode: "Alachlor",  // Another example from your data
    medium: "Soil",
    amount: 5678,
    unitCode: "kg"
  }
]
```

**Unit codes allowed:** `kg`, `t` (tonnes), `g`, `mg`  
**Medium values:** `Air`, `Water`, `Soil` (your schema already has this!)

---

## 2. WASTE TYPES (973 Total) - Column I (Index 8)

**Source:** EU Decision 2014/955/EU updating the waste list (Commission Decision 2000/532/EC)

### Structure:
**4-level hierarchy:** Category → Group → Subgroup → Code

```
01 - WASTES RESULTING FROM EXPLORATION, MINING...
├─ 01 01 - Wastes from mineral excavation
│  ├─ 01 01 01 - Non-Hazardous - Wastes from mineral metalliferous excavation
│  └─ 01 01 02 - Non-Hazardous - Wastes from mineral non-metalliferous excavation
├─ 01 03 - Wastes from physical and chemical processing...
│  ├─ 01 03 04 - Hazardous - Acid-generating tailings...
│  └─ 01 03 05 - Hazardous - Other tailings containing hazardous substances
```

### Your Current Data Problem:
```javascript
recycledMaterials: [
  {
    materialType: "Plastic",  // TOO VAGUE - not an EU waste code
    amount: 1500,
    unit: "tonn"
  },
  {
    materialType: "test1",  // Not even a real material
    amount: 100,
    unit: "tonn"
  }
]
```

### EFRAG Doesn't Track "Materials by Type"
EFRAG tracks **waste by classification code**, not "plastic" or "wood". Waste code determines if it's hazardous/non-hazardous.

Examples of valid waste codes:
- `07 02 43 - Non-Hazardous - Waste plastic`
- `20 01 01 - Non-Hazardous - Paper and cardboard`
- `08 01 11 - Hazardous - Waste paint and varnish containing hazardous substances`

### THE FIX (Structural Change):
Instead of "recycled materials", XBRL wants waste BY DESTINATION:

```javascript
waste: {
  reportingYear: "2025",
  generatedAndTreated: [
    {
      wasteCode: "07 02 43",  // Use EU waste classification
      wasteName: "Waste plastic",
      hazardous: false,
      totalAmount: 2167,  // All plastic generated
      treatment: [
        { destination: "Recycling", amount: 1500 },
        { destination: "Landfill", amount: 50 },
        { destination: "Incineration", amount: 40 },
        { destination: "EnergyRecovery", amount: 40 },
        { destination: "Other", amount: 537 }
      ],
      unitCode: "t"
    }
  ]
}
```

---

## 3. MATERIAL FLOWS (Not in EFRAG's Enumeration Lists)

Your schema has `annualMassFlows` with materials like "plastic", "wood", "metal".

**EFRAG doesn't have a predefined list for this.** It's company-specific.

### But Your Data Structure Breaks XBRL:
```javascript
annualMassFlows: [
  { materialType: "plastic", volume: 1200, unit: "kg" },  // unit is fine
  { materialType: "wood", volume: 997, unit: "tonn" }     // unit is DIFFERENT
]
```

### THE FIX (Normalize):
```javascript
materialFlows: [
  {
    materialType: "Plastic",
    volume: 1200,
    unitCode: "kg"  // All same unit
  },
  {
    materialType: "Wood",
    volume: 997,
    unitCode: "t"  // Normalized: "t" not "tonn"
  }
]
```

**Allowed units for material flows:** `kg`, `t`, `m³` (cubic meters)  
**Pick ONE unit system and stick to it.**

---

## 4. ENERGY & EMISSIONS - Multi-Dimensional Structure

EFRAG doesn't have an "enumeration" for these - it's a **dimensional model**.

### The Named Range Pattern:
```
EnergyConsumptionFromElectricity_RenewableEnergyMember
EnergyConsumptionFromElectricity_NonRenewableEnergyMember
EnergyConsumptionFromFuels_RenewableEnergyMember
EnergyConsumptionFromFuels_NonRenewableEnergyMember
EnergyConsumptionFromSelfGeneratedElectricity_RenewableEnergyMember
EnergyConsumptionFromSelfGeneratedElectricity_NonRenewableEnergyMember
```

**This is a matrix:**

```
                          Renewable  | Non-Renewable
Electricity                  18,197   |   145,978
Fuels (stationary)                0   |    1,096
Self-Generated Electricity        0   |        0
```

### Your Current Data (WRONG STRUCTURE):
```javascript
energyEmissions: {
  renewableElectricity: 18197,      // ✓ Has value for renewable electricity
  nonRenewableElectricity: 145978,  // ✓ Has value for non-renewable electricity
  stationaryCombustion: 1096,       // ✗ This is value for NON-RENEWABLE FUELS, but field name doesn't say that
  mobileCombustion: 0,              // ✗ Mobile combustion is a separate category in Scope 3
  renewableFuels: 0,                // ✓ Has value for renewable fuels
  otherEnergySources: 0,            // ✗ What is "other"? XBRL won't recognize it
  selfGeneratedEnergy: 0,           // ✗ Self-generated from what source? Renewable or not?
}
```

### THE FIX:
```javascript
energyConsumption: {
  reportingYear: "2025",
  data: [
    // Electricity
    { source: "Electricity", renewable: true, value: 18197, unitCode: "MWh" },
    { source: "Electricity", renewable: false, value: 145978, unitCode: "MWh" },
    
    // Fuels (stationary/heating)
    { source: "Fuels", renewable: true, value: 0, unitCode: "MWh" },
    { source: "Fuels", renewable: false, value: 1096, unitCode: "MWh" },
    
    // Self-generated
    { source: "SelfGeneratedElectricity", renewable: true, value: 0, unitCode: "MWh" },
    { source: "SelfGeneratedElectricity", renewable: false, value: 0, unitCode: "MWh" },
  ]
}
```

---

## 5. SCOPE 3 CATEGORIES (15 Total) - Pre-defined by GHG Protocol

These are **NOT in EFRAG's Enumeration Lists** - they're universal GHG Protocol.

```
Category 1: Purchased Goods and Services
Category 2: Capital Goods
Category 3: Fuel and Energy-Related Activities
Category 4: Upstream Transportation and Distribution
Category 5: Waste Generated in Operations
Category 6: Business Travel
Category 7: Employee Commuting
Category 8: Upstream Leased Assets
Category 9: Downstream Transportation and Distribution
Category 10: Processing of Sold Products
Category 11: Use of Sold Products
Category 12: End-of-Life Treatment of Sold Products
Category 13: Downstream Leased Assets
Category 14: Franchises
Category 15: Investments
```

### Your Current Data (Correct Structure!):
```javascript
scope3Emissions: {
  category1: 0,
  category2: 0,
  category3: 1.07,    // ✓ Category 3 = Fuel and Energy
  category4: 0.11,    // ✓ Category 4 = Transportation
  category8: 2.38,    // ✓ Category 8 = Upstream Leased Assets
  totalScope3Emissions: 3.56  // ✓ Sum checks out
}
```

**This is already XBRL-compliant!** Just add units:

```javascript
scope3Emissions: {
  reportingYear: "2025",
  unitCode: "tCO2e",
  byCategory: [
    { category: 1, categoryName: "PurchasedGoodsAndServices", value: 0 },
    { category: 3, categoryName: "FuelAndEnergyRelated", value: 1.07 },
    { category: 4, categoryName: "UpstreamTransportation", value: 0.11 },
    { category: 8, categoryName: "UpstreamLeasedAssets", value: 2.38 }
    // ... all 15 categories, even if zero
  ],
  total: 3.56
}
```

---

## Summary: What You Need to Change

| Data Type | Current Issue | Fix |
|-----------|---------------|-----|
| **Pollutants** | Unit format ("kilograms" vs code) | Use unit codes: `kg`, `t`, etc. |
| **Waste** | Free text "Plastic" instead of EU code | Use EU waste classification codes (973 options) |
| **Materials** | Inconsistent units per row | Standardize to one unit system |
| **Energy** | Flat fields missing dimensions | Create matrix: Source × Renewable |
| **Scope 3** | Structure is OK! | Just add unit codes |

---

## How to Access EFRAG Enumerations in Your Code

### Option 1: Export as CSV/JSON
1. Open EFRAG template in Excel
2. Copy "Enumeration Lists" sheet
3. Extract columns you need
4. Save as JSON:

```json
{
  "pollutants": ["Alachlor", "Aldrin", ...],
  "wasteTypeCodes": ["01 01 01", "01 01 02", ...],
  "countries": ["AT", "BE", "CH", ...]
}
```

### Option 2: Query EFRAG's Official Source
EFRAG publishes open taxonomies here: https://xbrl.efrag.org

---

## Immediate Action Items

**P0 (Blocking XBRL):**
1. Add unit standardization (kg, t, m³, MWh, tCO2e)
2. Change energy data to multi-dimensional matrix
3. Map waste data to EU classification codes

**P1 (Will fail validation):**
4. Remove fake material types ("test1", "test2")
5. Add explicit renewable/non-renewable dimensions to fuels

**P2 (Nice to have):**
6. Add LEI field to company info
7. Document data sources for each metric

---

## Python Converter Won't Fix This

Once your schema is correct, the Python converter is simple:

```python
def map_convex_to_xbrl(convex_form_data):
    # For each field in convex_form_data
    # Look up the XBRL named range from the mapping config
    # Return XBRL-formatted payload
    
    xbrl_payload = {}
    for convex_field, convex_value in convex_form_data.items():
        xbrl_element = FIELD_MAPPING[convex_field]
        xbrl_payload[xbrl_element] = convex_value
    
    return xbrl_payload
```

But if your schema sends wrong data (flat vs multi-dimensional, free text vs codes), no script will fix it.

**Fix schema first. Build converter second.**