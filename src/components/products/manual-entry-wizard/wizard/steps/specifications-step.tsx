'use client'

import { useState } from 'react'
import { CatalogueFormData } from '@/lib/products/types/catalogue'

interface Choice {
  category: string
  productId: string
}

interface SpecificationsStepProps {
  data: CatalogueFormData
  onChange: (data: Partial<CatalogueFormData>) => void
}

type SpecificationConfig = {
  id: string
  label: string
  type: 'text' | 'number' | 'select' | 'boolean'
  required?: boolean
  options?: string[]
  optionLabels?: Record<string, string>
  validation?: (value: any) => boolean | string
  unit?: string
  description?: string
  showWhen?: (specs: Record<string, any>) => boolean
  step?: number
  multiple?: boolean
  min?: number
}

const BASE_SPECIFICATIONS: SpecificationConfig[] = [
  {
    id: 'length',
    label: 'Length',
    type: 'number',
    required: true,
    unit: 'inches',
    validation: (value) => value > 0 || 'Length must be greater than 0'
  },
  {
    id: 'width',
    label: 'Width',
    type: 'number',
    required: true,
    unit: 'inches',
    validation: (value) => value > 0 || 'Width must be greater than 0'
  },
  {
    id: 'entryType',
    label: 'Entry Type',
    type: 'select',
    required: true,
    options: [
      'BARRIER_FREE',      // Zero threshold for wheelchair access
      'LOW_PROFILE',       // Minimal curb height (typically 1-2")
      'STANDARD_CURB',     // Standard height curb (typically 4-6")
      'HIGH_CURB'          // Higher curb for special applications
    ],
    optionLabels: {
      'BARRIER_FREE': 'Barrier Free (Roll-In)',
      'LOW_PROFILE': 'Low Profile Step',
      'STANDARD_CURB': 'Standard Step',
      'HIGH_CURB': 'High Step'
    },
    description: 'Determines the entry height and accessibility of the shower base'
  },
  {
    id: 'curbProfile',
    label: 'Curb Profile',
    type: 'select',
    required: true,
    options: [
      'FLAT',             // Flat top for barrier-free
      'BEVELED',          // Angled edge for easier stepping
      'ROUNDED',          // Curved top edge
      'DECORATIVE'        // Special decorative profile
    ],
    showWhen: (specs) => specs.entryType !== 'BARRIER_FREE',
    description: 'The shape and style of the curb edge'
  },
  {
    id: 'curbHeight',
    label: 'Curb Height',
    type: 'number',
    unit: 'inches',
    required: true,
    showWhen: (specs) => specs.entryType !== 'BARRIER_FREE',
    validation: (value) => {
      if (value <= 0) return 'Height must be greater than 0'
      if (value > 12) return 'Height cannot exceed 12 inches'
      return true
    },
    description: 'Exact height of the shower curb from floor level. Common heights: Low Profile (1-2"), Standard (4-6"), High (6-12")',
    step: 0.125 // Allows for 1/8" increments
  },
  {
    id: 'drainLocation',
    label: 'Drain Location',
    type: 'select',
    required: true,
    options: [
      'LEFT',
      'RIGHT',
      'CENTER',
      'LEFT_CENTER',
      'RIGHT_CENTER'
    ],
    optionLabels: {
      'LEFT': 'Left Side',
      'RIGHT': 'Right Side',
      'CENTER': 'Center',
      'LEFT_CENTER': 'Left of Center',
      'RIGHT_CENTER': 'Right of Center'
    }
  },
  {
    id: 'drainStyle',
    label: 'Drain Style',
    type: 'select',
    required: true,
    options: [
      'ROUND',
      'SQUARE',
      'LINEAR',
      'HIDDEN'
    ],
    optionLabels: {
      'ROUND': 'Round Drain',
      'SQUARE': 'Square Drain',
      'LINEAR': 'Linear Drain',
      'HIDDEN': 'Hidden Drain'
    }
  },
  {
    id: 'material',
    label: 'Material',
    type: 'select',
    required: true,
    options: [
      'ACRYLIC',
      'SOLID_SURFACE',
      'COMPOSITE',
      'CULTURED_MARBLE'
    ],
    optionLabels: {
      'ACRYLIC': 'Acrylic',
      'SOLID_SURFACE': 'Solid Surface',
      'COMPOSITE': 'Composite',
      'CULTURED_MARBLE': 'Cultured Marble'
    }
  },
  {
    id: 'color',
    label: 'Color',
    type: 'select',
    required: true,
    options: [
      'WHITE',
      'BISCUIT',
      'BONE',
      'ALMOND'
    ],
    optionLabels: {
      'WHITE': 'White',
      'BISCUIT': 'Biscuit',
      'BONE': 'Bone',
      'ALMOND': 'Almond'
    }
  },
  {
    id: 'texture',
    label: 'Surface Texture',
    type: 'select',
    options: [
      'SMOOTH',
      'TEXTURED',
      'SLATE',
      'STONE'
    ],
    optionLabels: {
      'SMOOTH': 'Smooth',
      'TEXTURED': 'Textured',
      'SLATE': 'Slate Pattern',
      'STONE': 'Stone Pattern'
    }
  },
  {
    id: 'slipResistance',
    label: 'Slip Resistance Rating',
    type: 'select',
    required: true,
    options: [
      'A',      // High slip resistance (≥0.45)
      'B',      // Moderate slip resistance (0.30-0.44)
      'C'       // Low slip resistance (<0.30)
    ],
    optionLabels: {
      'A': 'Class A (High Traction)',
      'B': 'Class B (Moderate Traction)',
      'C': 'Class C (Low Traction)'
    },
    description: 'ANSI A137.1/A326.3 Dynamic Coefficient of Friction (DCOF) rating'
  },
  {
    id: 'adaCompliant',
    label: 'ADA Compliant',
    type: 'boolean',
    description: 'Meets Americans with Disabilities Act requirements for accessible design'
  },
  {
    id: 'astmCompliant',
    label: 'ASTM F462 Compliant',
    type: 'boolean',
    description: 'Meets ASTM F462 standard for slip-resistant bathing facilities'
  },
  {
    id: 'safetyFeatures',
    label: 'Safety Features',
    type: 'select',
    multiple: true,
    options: [
      'TEXTURED_SURFACE',
      'GRIP_STRIPS',
      'MOLDED_SEAT',
      'GRAB_BAR_REINFORCEMENT',
      'LOW_THRESHOLD',
      'SLIP_RESISTANT_COATING'
    ],
    optionLabels: {
      'TEXTURED_SURFACE': 'Textured Surface',
      'GRIP_STRIPS': 'Anti-Slip Strips',
      'MOLDED_SEAT': 'Built-in Seat',
      'GRAB_BAR_REINFORCEMENT': 'Grab Bar Reinforcement',
      'LOW_THRESHOLD': 'Low Threshold Entry',
      'SLIP_RESISTANT_COATING': 'Slip-Resistant Coating'
    },
    description: 'Additional safety features included with the base'
  }
]

const WALL_SPECIFICATIONS: SpecificationConfig[] = [
  {
    id: 'height',
    label: 'Height',
    type: 'number',
    required: true,
    unit: 'inches',
    validation: (value) => value > 0 || 'Height must be greater than 0'
  },
  {
    id: 'width',
    label: 'Width',
    type: 'number',
    required: true,
    unit: 'inches',
    validation: (value) => value > 0 || 'Width must be greater than 0'
  },
  {
    id: 'material',
    label: 'Material',
    type: 'select',
    required: true,
    options: ['Acrylic', 'Composite', 'Tile']
  },
  {
    id: 'color',
    label: 'Color',
    type: 'select',
    required: true,
    options: ['White', 'Biscuit', 'Bone']
  },
  {
    id: 'pattern',
    label: 'Pattern',
    type: 'select',
    options: ['Smooth', 'Tile Pattern', 'Stone Pattern']
  }
]

const STANDARD_METALLIC_FINISHES = [
  'CHROME',                    // Bright chrome
  'BRUSHED_NICKEL',            // Brushed/satin nickel
  'MATTE_BLACK',               // Matte black
  'POLISHED_NICKEL',           // Polished nickel
  'BRUSHED_BRONZE',            // Brushed bronze
  'OIL_RUBBED_BRONZE',         // Oil-rubbed bronze
  'POLISHED_BRASS',            // Polished brass
  'BRUSHED_BRASS',             // Brushed/satin brass
  'GOLD',                      // Gold finish
  'BRUSHED_GOLD',              // Brushed gold
  'CHAMPAGNE_BRONZE',          // Champagne bronze
  'VENETIAN_BRONZE',           // Venetian bronze
  'STAINLESS_STEEL',           // Stainless steel
  'BRUSHED_STAINLESS'          // Brushed stainless
].map(finish => ({
  value: finish,
  label: finish.replace(/_/g, ' ').toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}))

const DOOR_SPECIFICATIONS: SpecificationConfig[] = [
  {
    id: 'height',
    label: 'Height',
    type: 'number',
    required: true,
    unit: 'inches',
    validation: (value) => value > 0 || 'Height must be greater than 0'
  },
  {
    id: 'width',
    label: 'Width',
    type: 'number',
    required: true,
    unit: 'inches',
    validation: (value) => value > 0 || 'Width must be greater than 0'
  },
  {
    id: 'style',
    label: 'Door Style',
    type: 'select',
    required: true,
    options: [
      'FRAMED',
      'SEMI_FRAMELESS',
      'FRAMELESS'
    ],
    optionLabels: {
      'FRAMED': 'Framed',
      'SEMI_FRAMELESS': 'Semi-Frameless',
      'FRAMELESS': 'Frameless'
    },
    description: 'The overall construction style of the shower door'
  },
  {
    id: 'type',
    label: 'Door Type',
    type: 'select',
    required: true,
    options: [
      'SLIDING',
      'PIVOT',
      'HINGED',
      'BIFOLD',
      'BYPASS'
    ],
    optionLabels: {
      'SLIDING': 'Sliding',
      'PIVOT': 'Pivot',
      'HINGED': 'Hinged',
      'BIFOLD': 'Bi-Fold',
      'BYPASS': 'Bypass'
    },
    description: 'The opening mechanism of the door'
  },
  {
    id: 'glass',
    label: 'Glass Type',
    type: 'select',
    required: true,
    options: ['Clear', 'Frosted', 'Rain', 'Obscure']
  },
  {
    id: 'finish',
    label: 'Finish',
    type: 'select',
    required: true,
    options: STANDARD_METALLIC_FINISHES.map(f => f.value),
    optionLabels: STANDARD_METALLIC_FINISHES.reduce((acc, f) => ({ ...acc, [f.value]: f.label }), {})
  }
]

const SHOWER_HEAD_SPECIFICATIONS: SpecificationConfig[] = [
  {
    id: 'type',
    label: 'Shower Head Type',
    type: 'select',
    required: true,
    options: [
      'FIXED',
      'HANDHELD',
      'RAIN_HEAD',
      'BODY_SPRAY',
      'COMBO_UNIT'
    ],
    optionLabels: {
      'FIXED': 'Fixed Head',
      'HANDHELD': 'Hand Shower',
      'RAIN_HEAD': 'Rain Head',
      'BODY_SPRAY': 'Body Spray',
      'COMBO_UNIT': 'Combo Unit (Fixed + Hand)'
    }
  },
  {
    id: 'finish',
    label: 'Finish',
    type: 'select',
    required: true,
    options: STANDARD_METALLIC_FINISHES.map(f => f.value),
    optionLabels: STANDARD_METALLIC_FINISHES.reduce((acc, f) => ({ ...acc, [f.value]: f.label }), {})
  },
  {
    id: 'style',
    label: 'Style',
    type: 'select',
    required: true,
    options: ['TRADITIONAL', 'CONTEMPORARY', 'TRANSITIONAL'],
    optionLabels: {
      'TRADITIONAL': 'Traditional',
      'CONTEMPORARY': 'Contemporary',
      'TRANSITIONAL': 'Transitional'
    }
  },
  {
    id: 'flowRate',
    label: 'Flow Rate',
    type: 'select',
    required: true,
    options: [
      'GPM_2_5',
      'GPM_2_0',
      'GPM_1_8',
      'GPM_1_5'
    ],
    optionLabels: {
      'GPM_2_5': '2.5 GPM (Federal Standard)',
      'GPM_2_0': '2.0 GPM (NY, MA, CO, ME, VT)',
      'GPM_1_8': '1.8 GPM (CA, WA, OR, HI)',
      'GPM_1_5': '1.5 GPM (Water Saving)'
    },
    description: 'Flow rate in Gallons Per Minute (GPM). Different states have different maximum flow rate requirements.'
  },
  {
    id: 'sprayPatterns',
    label: 'Spray Patterns',
    type: 'select',
    multiple: true,
    options: [
      'FULL',
      'MASSAGE',
      'MIST',
      'RAIN',
      'POWER_SPRAY',
      'ECO'
    ],
    optionLabels: {
      'FULL': 'Full Coverage',
      'MASSAGE': 'Massage',
      'MIST': 'Mist/Gentle',
      'RAIN': 'Rain/Soft',
      'POWER_SPRAY': 'Power Spray',
      'ECO': 'Water Saving'
    }
  },
  {
    id: 'waterSense',
    label: 'WaterSense Certified',
    type: 'boolean',
    description: 'EPA WaterSense certified for water efficiency'
  },
  {
    id: 'pressureCompensating',
    label: 'Pressure Compensating',
    type: 'boolean',
    description: 'Maintains consistent flow rate regardless of water pressure'
  }
]

const VALVE_SPECIFICATIONS: SpecificationConfig[] = [
  {
    id: 'type',
    label: 'Valve Type',
    type: 'select',
    required: true,
    options: [
      'PRESSURE_BALANCE',
      'THERMOSTATIC',
      'VOLUME_CONTROL',
      'DIVERTER',
      'TRANSFER'
    ],
    optionLabels: {
      'PRESSURE_BALANCE': 'Pressure Balance',
      'THERMOSTATIC': 'Thermostatic',
      'VOLUME_CONTROL': 'Volume Control',
      'DIVERTER': 'Diverter',
      'TRANSFER': 'Transfer Valve'
    }
  },
  {
    id: 'finish',
    label: 'Finish',
    type: 'select',
    required: true,
    options: STANDARD_METALLIC_FINISHES.map(f => f.value),
    optionLabels: STANDARD_METALLIC_FINISHES.reduce((acc, f) => ({ ...acc, [f.value]: f.label }), {})
  },
  {
    id: 'style',
    label: 'Style',
    type: 'select',
    required: true,
    options: ['TRADITIONAL', 'CONTEMPORARY', 'TRANSITIONAL'],
    optionLabels: {
      'TRADITIONAL': 'Traditional',
      'CONTEMPORARY': 'Contemporary',
      'TRANSITIONAL': 'Transitional'
    }
  },
  {
    id: 'handleType',
    label: 'Handle Type',
    type: 'select',
    required: true,
    options: [
      'LEVER',
      'CROSS',
      'KNOB',
      'PUSH_BUTTON'
    ],
    optionLabels: {
      'LEVER': 'Lever Handle',
      'CROSS': 'Cross Handle',
      'KNOB': 'Knob Handle',
      'PUSH_BUTTON': 'Push Button'
    }
  },
  {
    id: 'temperatureLimit',
    label: 'Temperature Limit Stop',
    type: 'boolean',
    description: 'Includes adjustable hot limit stop for scald prevention'
  },
  {
    id: 'serviceStops',
    label: 'Service Stops',
    type: 'boolean',
    description: 'Includes integral service stops for maintenance'
  }
]

const ACCESSORY_SPECIFICATIONS: SpecificationConfig[] = [
  {
    id: 'type',
    label: 'Accessory Type',
    type: 'select',
    required: true,
    options: ['Grab Bar', 'Shelf', 'Seat', 'Soap Dish', 'Towel Bar']
  },
  {
    id: 'finish',
    label: 'Finish',
    type: 'select',
    required: true,
    options: STANDARD_METALLIC_FINISHES.map(f => f.value),
    optionLabels: STANDARD_METALLIC_FINISHES.reduce((acc, f) => ({ ...acc, [f.value]: f.label }), {})
  },
  {
    id: 'material',
    label: 'Material',
    type: 'select',
    required: true,
    options: ['Metal', 'Plastic', 'Composite']
  }
]

const DRAIN_SPECIFICATIONS: SpecificationConfig[] = [
  {
    id: 'type',
    label: 'Drain Type',
    type: 'select',
    required: true,
    options: [
      'STANDARD_ROUND',
      'DECORATIVE_ROUND',
      'SQUARE',
      'LINEAR',
      'HIDDEN_LINEAR',
      'TRENCH',
      'NO_CAULK'
    ],
    optionLabels: {
      'STANDARD_ROUND': 'Standard Round',
      'DECORATIVE_ROUND': 'Decorative Round',
      'SQUARE': 'Square',
      'LINEAR': 'Linear',
      'HIDDEN_LINEAR': 'Hidden Linear',
      'TRENCH': 'Trench',
      'NO_CAULK': 'No-Caulk'
    },
    description: 'Style and type of drain'
  },
  {
    id: 'finish',
    label: 'Finish',
    type: 'select',
    required: true,
    options: STANDARD_METALLIC_FINISHES.map(f => f.value),
    optionLabels: STANDARD_METALLIC_FINISHES.reduce((acc, f) => ({ ...acc, [f.value]: f.label }), {}),
    description: 'Finish of the visible drain components'
  },
  {
    id: 'material',
    label: 'Material',
    type: 'select',
    required: true,
    options: [
      'PVC',
      'ABS',
      'BRASS',
      'STAINLESS_STEEL'
    ],
    optionLabels: {
      'PVC': 'PVC',
      'ABS': 'ABS',
      'BRASS': 'Brass',
      'STAINLESS_STEEL': 'Stainless Steel'
    }
  },
  {
    id: 'size',
    label: 'Drain Size',
    type: 'number',
    required: true,
    unit: 'inches',
    step: 0.125, // Allows for 1/8" increments
    validation: (value) => {
      if (value < 1.5) return 'Size must be at least 1.5 inches'
      if (value > 4) return 'Size cannot exceed 4 inches'
      return true
    },
    description: 'Diameter of drain outlet. Common sizes: 2", 3", 4"'
  },
  {
    id: 'coverStyle',
    label: 'Cover Style',
    type: 'select',
    required: true,
    options: [
      'SNAP_IN',
      'SCREW_IN',
      'DECORATIVE_PLATE',
      'GRATE'
    ],
    optionLabels: {
      'SNAP_IN': 'Snap-In',
      'SCREW_IN': 'Screw-In',
      'DECORATIVE_PLATE': 'Decorative Plate',
      'GRATE': 'Grate'
    }
  },
  {
    id: 'hasHairCatcher',
    label: 'Hair Catcher',
    type: 'boolean',
    description: 'Includes built-in hair catching feature'
  }
]

const CURTAIN_ROD_FINISHES = [
  'WHITE',                     // White powder coat
  ...STANDARD_METALLIC_FINISHES.map(f => f.value)
].map(finish => ({
  value: finish,
  label: finish.replace(/_/g, ' ').toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}))

const CURTAIN_ROD_SPECIFICATIONS: SpecificationConfig[] = [
  {
    id: 'length',
    label: 'Length',
    type: 'number',
    required: true,
    unit: 'inches',
    step: 0.125,
    validation: (value) => {
      if (value < 24) return 'Length must be at least 24 inches'
      if (value > 144) return 'Length cannot exceed 144 inches'
      return true
    },
    description: 'Total length of curtain rod. Common sizes: 36", 48", 60", 72"'
  },
  {
    id: 'type',
    label: 'Rod Type',
    type: 'select',
    required: true,
    options: [
      'STRAIGHT',
      'CURVED',
      'L_SHAPED',
      'U_SHAPED',
      'TENSION'
    ],
    optionLabels: {
      'STRAIGHT': 'Straight Rod',
      'CURVED': 'Curved Rod',
      'L_SHAPED': 'L-Shaped Rod',
      'U_SHAPED': 'U-Shaped Rod',
      'TENSION': 'Tension Rod'
    },
    description: 'Style and configuration of the curtain rod'
  },
  {
    id: 'finish',
    label: 'Finish',
    type: 'select',
    required: true,
    options: CURTAIN_ROD_FINISHES.map(f => f.value),
    optionLabels: CURTAIN_ROD_FINISHES.reduce((acc, f) => ({ ...acc, [f.value]: f.label }), {}),
    description: 'Color or metallic finish of the rod and mounting hardware'
  },
  {
    id: 'material',
    label: 'Material',
    type: 'select',
    required: true,
    options: [
      'ALUMINUM',
      'STAINLESS_STEEL',
      'BRASS',
      'PLASTIC'
    ],
    optionLabels: {
      'ALUMINUM': 'Aluminum',
      'STAINLESS_STEEL': 'Stainless Steel',
      'BRASS': 'Brass',
      'PLASTIC': 'Plastic'
    }
  },
  {
    id: 'diameter',
    label: 'Rod Diameter',
    type: 'number',
    required: true,
    unit: 'inches',
    step: 0.125,
    validation: (value) => {
      if (value < 0.5) return 'Diameter must be at least 0.5 inches'
      if (value > 2) return 'Diameter cannot exceed 2 inches'
      return true
    },
    description: 'Diameter of the rod. Common sizes: 3/4", 1", 1-1/4"'
  },
  {
    id: 'mountingType',
    label: 'Mounting Type',
    type: 'select',
    required: true,
    options: [
      'WALL_MOUNT',
      'CEILING_MOUNT',
      'TENSION_MOUNT',
      'COMBO_MOUNT'
    ],
    optionLabels: {
      'WALL_MOUNT': 'Wall Mount',
      'CEILING_MOUNT': 'Ceiling Mount',
      'TENSION_MOUNT': 'Tension Mount',
      'COMBO_MOUNT': 'Wall/Ceiling Mount'
    }
  },
  {
    id: 'adjustable',
    label: 'Adjustable Length',
    type: 'boolean',
    description: 'Rod can be adjusted within a range of lengths'
  },
  {
    id: 'returnLength',
    label: 'Return Length',
    type: 'number',
    unit: 'inches',
    step: 0.125,
    showWhen: (specs) => ['CURVED', 'L_SHAPED', 'U_SHAPED'].includes(specs.type as string),
    description: 'Distance rod extends from wall on curved or corner sections',
    validation: (value) => {
      if (value < 2) return 'Return length must be at least 2 inches'
      if (value > 24) return 'Return length cannot exceed 24 inches'
      return true
    }
  }
]

const SHELF_SPECIFICATIONS: SpecificationConfig[] = [
  {
    id: 'type',
    label: 'Shelf Type',
    type: 'select',
    required: true,
    options: [
      'CORNER',
      'STRAIGHT',
      'FLOATING',
      'RECESSED'
    ],
    optionLabels: {
      'CORNER': 'Corner Shelf',
      'STRAIGHT': 'Straight Shelf',
      'FLOATING': 'Floating Shelf',
      'RECESSED': 'Recessed Shelf'
    }
  },
  {
    id: 'width',
    label: 'Width',
    type: 'number',
    required: true,
    unit: 'inches',
    step: 0.125,
    min: 6,
    validation: (value) => {
      if (value < 6) return 'Width must be at least 6 inches'
      if (value > 36) return 'Width cannot exceed 36 inches'
      return true
    },
    description: 'Width of the shelf. Common sizes: 8", 12", 16"'
  },
  {
    id: 'depth',
    label: 'Depth',
    type: 'number',
    required: true,
    unit: 'inches',
    step: 0.125,
    min: 3,
    validation: (value) => {
      if (value < 3) return 'Depth must be at least 3 inches'
      if (value > 12) return 'Depth cannot exceed 12 inches'
      return true
    },
    description: 'Depth of the shelf from wall. Common sizes: 4", 6", 8"'
  },
  {
    id: 'material',
    label: 'Material',
    type: 'select',
    required: true,
    options: [
      'ACRYLIC',
      'SOLID_SURFACE',
      'COMPOSITE',
      'METAL',
      'GLASS'
    ],
    optionLabels: {
      'ACRYLIC': 'Acrylic',
      'SOLID_SURFACE': 'Solid Surface',
      'COMPOSITE': 'Composite',
      'METAL': 'Metal',
      'GLASS': 'Glass'
    }
  },
  {
    id: 'finish',
    label: 'Finish',
    type: 'select',
    required: true,
    options: STANDARD_METALLIC_FINISHES.map(f => f.value),
    optionLabels: STANDARD_METALLIC_FINISHES.reduce((acc, f) => ({ ...acc, [f.value]: f.label }), {}),
    showWhen: (specs) => specs.material === 'METAL',
    description: 'Finish for metal shelves'
  },
  {
    id: 'color',
    label: 'Color',
    type: 'select',
    required: true,
    options: [
      'WHITE',
      'BISCUIT',
      'BONE',
      'ALMOND'
    ],
    optionLabels: {
      'WHITE': 'White',
      'BISCUIT': 'Biscuit',
      'BONE': 'Bone',
      'ALMOND': 'Almond'
    },
    showWhen: (specs) => ['ACRYLIC', 'SOLID_SURFACE', 'COMPOSITE'].includes(specs.material as string)
  }
]

const NICHE_SPECIFICATIONS: SpecificationConfig[] = [
  {
    id: 'width',
    label: 'Width',
    type: 'number',
    required: true,
    unit: 'inches',
    step: 0.125,
    min: 12,
    validation: (value) => {
      if (value < 12) return 'Width must be at least 12 inches'
      if (value > 48) return 'Width cannot exceed 48 inches'
      return true
    },
    description: 'Width of the niche. Common sizes: 12", 14", 16", 24", 32"'
  },
  {
    id: 'height',
    label: 'Height',
    type: 'number',
    required: true,
    unit: 'inches',
    step: 0.125,
    min: 12,
    validation: (value) => {
      if (value < 12) return 'Height must be at least 12 inches'
      if (value > 48) return 'Height cannot exceed 48 inches'
      return true
    },
    description: 'Height of the niche. Common sizes: 12", 16", 24"'
  },
  {
    id: 'depth',
    label: 'Depth',
    type: 'number',
    required: true,
    unit: 'inches',
    step: 0.125,
    min: 3.5,
    validation: (value) => {
      if (value < 3.5) return 'Depth must be at least 3.5 inches'
      if (value > 6) return 'Depth cannot exceed 6 inches'
      return true
    },
    description: 'Depth of the niche. Standard depth is 3.5" to 4"'
  },
  {
    id: 'material',
    label: 'Material',
    type: 'select',
    required: true,
    options: [
      'ACRYLIC',
      'SOLID_SURFACE',
      'COMPOSITE',
      'TILE_READY'
    ],
    optionLabels: {
      'ACRYLIC': 'Acrylic',
      'SOLID_SURFACE': 'Solid Surface',
      'COMPOSITE': 'Composite',
      'TILE_READY': 'Tile Ready'
    }
  },
  {
    id: 'shelves',
    label: 'Interior Shelves',
    type: 'select',
    required: true,
    options: ['NONE', 'ONE', 'TWO'],
    optionLabels: {
      'NONE': 'No Shelves',
      'ONE': 'One Shelf',
      'TWO': 'Two Shelves'
    }
  }
]

const SEAT_SPECIFICATIONS: SpecificationConfig[] = [
  {
    id: 'type',
    label: 'Seat Type',
    type: 'select',
    required: true,
    options: [
      'FOLD_DOWN',
      'CORNER',
      'BUILT_IN',
      'REMOVABLE'
    ],
    optionLabels: {
      'FOLD_DOWN': 'Fold-Down Seat',
      'CORNER': 'Corner Seat',
      'BUILT_IN': 'Built-In Bench',
      'REMOVABLE': 'Removable Seat'
    }
  },
  {
    id: 'width',
    label: 'Width',
    type: 'number',
    required: true,
    unit: 'inches',
    step: 0.125,
    min: 16,
    validation: (value) => {
      if (value < 16) return 'Width must be at least 16 inches'
      if (value > 36) return 'Width cannot exceed 36 inches'
      return true
    },
    description: 'Width of the seat. Common sizes: 18", 24", 32"'
  },
  {
    id: 'depth',
    label: 'Depth',
    type: 'number',
    required: true,
    unit: 'inches',
    step: 0.125,
    min: 14,
    validation: (value) => {
      if (value < 14) return 'Depth must be at least 14 inches'
      if (value > 24) return 'Depth cannot exceed 24 inches'
      return true
    },
    description: 'Depth of the seat. Common sizes: 15", 17", 22"'
  },
  {
    id: 'material',
    label: 'Material',
    type: 'select',
    required: true,
    options: [
      'PHENOLIC',
      'TEAK',
      'COMPOSITE',
      'ACRYLIC'
    ],
    optionLabels: {
      'PHENOLIC': 'Phenolic',
      'TEAK': 'Teak Wood',
      'COMPOSITE': 'Composite',
      'ACRYLIC': 'Acrylic'
    }
  },
  {
    id: 'weightCapacity',
    label: 'Weight Capacity',
    type: 'select',
    required: true,
    options: [
      'LBS_300',
      'LBS_400',
      'LBS_500'
    ],
    optionLabels: {
      'LBS_300': '300 lbs',
      'LBS_400': '400 lbs',
      'LBS_500': '500 lbs'
    }
  },
  {
    id: 'adaCompliant',
    label: 'ADA Compliant',
    type: 'boolean',
    description: 'Meets ADA requirements for shower seating'
  }
]

const GRAB_BAR_SPECIFICATIONS: SpecificationConfig[] = [
  {
    id: 'type',
    label: 'Grab Bar Type',
    type: 'select',
    required: true,
    options: [
      'STRAIGHT',
      'L_SHAPED',
      'U_SHAPED',
      'ANGLED',
      'FLIP_UP'
    ],
    optionLabels: {
      'STRAIGHT': 'Straight Bar',
      'L_SHAPED': 'L-Shaped Bar',
      'U_SHAPED': 'U-Shaped Bar',
      'ANGLED': 'Angled Bar',
      'FLIP_UP': 'Flip-Up Bar'
    }
  },
  {
    id: 'length',
    label: 'Length',
    type: 'number',
    required: true,
    unit: 'inches',
    step: 0.125,
    min: 12,
    validation: (value) => {
      if (value < 12) return 'Length must be at least 12 inches'
      if (value > 48) return 'Length cannot exceed 48 inches'
      return true
    },
    description: 'Length of the grab bar. Common sizes: 12", 16", 18", 24", 32", 36"'
  },
  {
    id: 'diameter',
    label: 'Bar Diameter',
    type: 'select',
    required: true,
    options: [
      'INCH_1',
      'INCH_1_25',
      'INCH_1_5'
    ],
    optionLabels: {
      'INCH_1': '1 inch',
      'INCH_1_25': '1.25 inches',
      'INCH_1_5': '1.5 inches'
    }
  },
  {
    id: 'finish',
    label: 'Finish',
    type: 'select',
    required: true,
    options: STANDARD_METALLIC_FINISHES.map(f => f.value),
    optionLabels: STANDARD_METALLIC_FINISHES.reduce((acc, f) => ({ ...acc, [f.value]: f.label }), {})
  },
  {
    id: 'material',
    label: 'Material',
    type: 'select',
    required: true,
    options: [
      'STAINLESS_STEEL',
      'BRASS',
      'ALUMINUM',
      'COMPOSITE'
    ],
    optionLabels: {
      'STAINLESS_STEEL': 'Stainless Steel',
      'BRASS': 'Brass',
      'ALUMINUM': 'Aluminum',
      'COMPOSITE': 'Composite'
    }
  },
  {
    id: 'mounting',
    label: 'Mounting Type',
    type: 'select',
    required: true,
    options: [
      'CONCEALED',
      'EXPOSED',
      'SNAP_FIT'
    ],
    optionLabels: {
      'CONCEALED': 'Concealed Mount',
      'EXPOSED': 'Exposed Mount',
      'SNAP_FIT': 'Snap-Fit Mount'
    }
  },
  {
    id: 'gripTexture',
    label: 'Grip Texture',
    type: 'select',
    required: true,
    options: [
      'SMOOTH',
      'PEENED',
      'KNURLED'
    ],
    optionLabels: {
      'SMOOTH': 'Smooth',
      'PEENED': 'Peened',
      'KNURLED': 'Knurled'
    }
  },
  {
    id: 'adaCompliant',
    label: 'ADA Compliant',
    type: 'boolean',
    description: 'Meets ADA requirements for grab bars'
  }
]

interface Specifications {
  [key: string]: {
    [key: string]: string | number | boolean
  }
}

type SpecificationValue = string | number | boolean | string[]

type ProductSpecifications = Record<string, SpecificationValue>

export function SpecificationsStep({ data, onChange }: SpecificationsStepProps) {
  console.log('Raw data:', {
    choices: data.choices,
    specifications: data.specifications
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [expandedProducts, setExpandedProducts] = useState<Set<string>>(new Set(['BASE']))

  const toggleProduct = (productId: string) => {
    setExpandedProducts(prev => {
      const next = new Set(prev)
      if (next.has(productId)) {
        next.delete(productId)
      } else {
        next.add(productId)
      }
      return next
    })
  }

  // Get all products that need specifications
  const getProductsWithSpecs = () => {
    console.log('All Choices:', data.choices)
    console.log('Raw Choices Data:', JSON.stringify(data.choices, null, 2))
    
    // Find the format choice (KIT or INDIVIDUAL_COMPONENT)
    const formatChoice = data.choices?.find(c => c.category === 'product_type' || c.category === 'productFormat')
    console.log('Format Choice:', formatChoice)
    
    // For individual components
    if (formatChoice?.productId === 'INDIVIDUAL_COMPONENT') {
      // Find the component type selection
      const componentChoice = data.choices?.find(c => c.category === 'componentType')
      console.log('Component Choice:', componentChoice)
      const componentType = componentChoice?.productId

      if (componentType) {
        switch (componentType) {
          case 'BASE':
            return [{ id: 'BASE', label: 'Base' }]
          case 'WALL':
            const wallType = data.choices?.find(c => c.category === 'wallType')?.productId
            const wallPanel = data.choices?.find(c => c.category === 'wallPanel')?.productId
            const wallSet = data.choices?.filter(c => c.category === 'wallSet').map(c => c.productId)
            
            console.log('Wall Type:', wallType)
            console.log('Wall Panel:', wallPanel)
            console.log('Wall Set:', wallSet)
            
            if (wallType === 'WALL_PANEL' && wallPanel) {
              return [{ id: wallPanel, label: wallPanel.replace(/_/g, ' ') }]
            }
            if (wallType === 'WALL_SET' && wallSet?.length) {
              return wallSet.map(id => ({
                id,
                label: id.replace(/_/g, ' ')
              }))
            }
            return []
          case 'DOOR':
            return [{ id: 'DOOR', label: 'Door' }]
          case 'PLUMBING':
            const plumbingType = data.choices?.find(c => c.category === 'plumbingType')?.productId
            return plumbingType ? [{ id: plumbingType, label: plumbingType.replace(/_/g, ' ') }] : []
          case 'ACCESSORIES':
            const accessoryType = data.choices?.find(c => c.category === 'accessoryType')?.productId
            return accessoryType ? [{ id: accessoryType, label: accessoryType.replace(/_/g, ' ') }] : []
          default:
            return []
        }
      }
    }

    // If we're in kit mode
    if (formatChoice?.productId === 'KIT') {
      const kitIncludes = data.choices?.filter(c => c.category === 'kit_includes').map(c => c.productId)
      return kitIncludes?.map(id => ({
        id,
        label: id.replace(/_/g, ' ')
      })) || []
    }

    return []
  }

  // Get specifications for the active product
  const getSpecifications = (productId: string) => {
    switch (productId) {
      case 'BASE':
        return BASE_SPECIFICATIONS
      case 'BACK_WALL':
      case 'LEFT_END_WALL':
      case 'RIGHT_END_WALL':
        return WALL_SPECIFICATIONS
      case 'DOOR':
        return DOOR_SPECIFICATIONS
      case 'SHOWER_HEAD':
        return SHOWER_HEAD_SPECIFICATIONS
      case 'SHOWER_VALVE':
        return VALVE_SPECIFICATIONS
      case 'SHELF':
        return SHELF_SPECIFICATIONS
      case 'NICHE':
        return NICHE_SPECIFICATIONS
      case 'SEAT':
        return SEAT_SPECIFICATIONS
      case 'GRAB_BAR':
        return GRAB_BAR_SPECIFICATIONS
      case 'DRAIN':
        return DRAIN_SPECIFICATIONS
      case 'CURTAIN_ROD':
        return CURTAIN_ROD_SPECIFICATIONS
      default:
        return []
    }
  }

  const handleChange = (productId: string, specId: string, value: SpecificationValue) => {
    const spec = getSpecifications(productId).find(s => s.id === specId)
    if (!spec) return

    // Validate
    if (spec.validation) {
      const validationResult = spec.validation(value)
      if (typeof validationResult === 'string') {
        setErrors(prev => ({ ...prev, [specId]: validationResult }))
        return
      }
      setErrors(prev => {
        const next = { ...prev }
        delete next[specId]
        return next
      })
    }

    // Update specifications
    const currentSpecs = data.specifications || {}
    const updatedSpecs: Record<string, SpecificationValue> = {
      ...currentSpecs,
      [`${productId}_${specId}`]: value
    }

    onChange({
      specifications: updatedSpecs
    })
  }

  const products = getProductsWithSpecs()

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-900">Product Specifications</h2>
      
      <div className="space-y-4">
        {products.map(product => (
          <div key={product.id} className="border rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => toggleProduct(product.id)}
              className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100"
            >
              <span className="text-sm font-medium text-gray-900">{product.label}</span>
              {expandedProducts.has(product.id) ? (
                <span className="text-gray-500">▲</span>
              ) : (
                <span className="text-gray-500">▼</span>
              )}
            </button>

            {expandedProducts.has(product.id) && (
              <div className="p-4 space-y-4 bg-white">
                {getSpecifications(product.id)
                  .filter(spec => !spec.showWhen || spec.showWhen(data.specifications || {}))
                  .map(spec => (
                    <div key={spec.id} className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        {spec.label}
                        {spec.required && <span className="text-red-500 ml-1">*</span>}
                      </label>
                      
                      {spec.type === 'select' && (
                        <div>
                          <select
                            value={spec.multiple 
                              ? (data.specifications?.[`${product.id}_${spec.id}`] as string[] || [])
                              : String(data.specifications?.[`${product.id}_${spec.id}`] ?? '')}
                            multiple={spec.multiple}
                            onChange={(e) => {
                              if (spec.multiple) {
                                const selectedOptions = Array.from(e.target.selectedOptions).map(opt => opt.value)
                                handleChange(product.id, spec.id, selectedOptions)
                              } else {
                                handleChange(product.id, spec.id, e.target.value)
                              }
                            }}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900"
                          >
                            {!spec.multiple && <option value="">Select {spec.label}</option>}
                            {spec.options?.map(option => (
                              <option 
                                key={option} 
                                value={option}
                              >
                                {spec.optionLabels?.[option] || option}
                              </option>
                            ))}
                          </select>
                          {spec.multiple && (
                            <p className="mt-1 text-xs text-gray-500">
                              Hold Ctrl (Windows) or Command (Mac) to select multiple options
                            </p>
                          )}
                        </div>
                      )}

                      {spec.type === 'number' && (
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <input
                            type="number"
                            value={String(data.specifications?.[`${product.id}_${spec.id}`] ?? '')}
                            onChange={(e) => {
                              const value = e.target.valueAsNumber
                              if (!isNaN(value)) {
                                handleChange(product.id, spec.id, value)
                              }
                            }}
                            step={spec.step}
                            min={spec.min}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900"
                          />
                          {spec.unit && (
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                              <span className="text-gray-500 sm:text-sm">{spec.unit}</span>
                            </div>
                          )}
                        </div>
                      )}

                      {spec.type === 'boolean' && (
                        <div className="mt-1">
                          <input
                            type="checkbox"
                            checked={!!data.specifications?.[`${product.id}_${spec.id}`]}
                            onChange={(e) => handleChange(product.id, spec.id, e.target.checked)}
                            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                      )}

                      {errors[spec.id] && (
                        <p className="mt-1 text-sm text-red-600">{errors[spec.id]}</p>
                      )}

                      {spec.description && (
                        <p className="mt-1 text-sm text-gray-500">{spec.description}</p>
                      )}
                    </div>
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
} 