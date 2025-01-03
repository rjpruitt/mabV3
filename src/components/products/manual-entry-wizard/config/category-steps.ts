import { CategoryStep, CategoryOption } from '../types'

const KIT_COMPONENT_GROUPS = {
  SHOWER_BASE: {
    label: 'Shower Base',
    options: ['BASE', 'DRAIN']
  },
  WALLS: {
    label: 'Wall Panels',
    options: ['BACK_WALL', 'LEFT_END_WALL', 'RIGHT_END_WALL']
  },
  PLUMBING: {
    label: 'Plumbing Fixtures',
    options: ['SHOWER_HEAD', 'SHOWER_VALVE']
  },
  ENCLOSURE: {
    label: 'Enclosure',
    options: ['DOOR', 'CURTAIN_ROD']
  },
  ACCESSORIES: {
    label: 'Accessories',
    options: ['SHELF', 'NICHE', 'SEAT', 'GRAB_BAR']
  }
}

export const CATEGORY_STEPS: CategoryStep[] = [
  {
    id: 'topCategory',
    label: 'Product Category',
    options: ['SHOWERS', 'BATHTUBS', 'ACCESSIBILITY_SAFETY', 'WALLS_WAINSCOTTING', 'ACCESSORIES']
  },
  {
    id: 'showerType',
    label: 'Shower Type',
    options: ['WALK_IN', 'TUB_SHOWER_COMBO'],
    dependsOn: {
      step: 'topCategory',
      values: ['SHOWERS']
    }
  },
  {
    id: 'showerLocation',
    label: 'Shower Location',
    options: ['ALCOVE', 'CORNER'],
    dependsOn: {
      step: 'showerType',
      values: ['WALK_IN']
    }
  },
  {
    id: 'showerShape',
    label: 'Shower Shape',
    options: (selections) => {
      if (selections.showerLocation === 'ALCOVE') {
        return ['SQUARE', 'RECTANGULAR']
      }
      if (selections.showerLocation === 'CORNER') {
        return ['SQUARE', 'RECTANGULAR', 'NEO_ANGLE', 'ROUND']
      }
      return []
    },
    dependsOn: {
      step: 'showerLocation',
      values: ['ALCOVE', 'CORNER']
    }
  },
  {
    id: 'productFormat',
    label: 'Product Format',
    options: ['KIT', 'INDIVIDUAL_COMPONENT'],
    dependsOn: {
      step: 'showerShape',
      values: ['RECTANGULAR', 'SQUARE', 'NEO_ANGLE', 'ROUND']
    }
  },
  {
    id: 'kit_includes',
    title: 'Kit Includes',
    description: 'Select the components included in this kit',
    type: 'multiple',
    multiSelect: true,
    options: [
      { id: 'BASE', label: 'Base' },
      { id: 'DRAIN', label: 'Drain' },
      { id: 'BACK_WALL', label: 'Back Wall' },
      { id: 'LEFT_END_WALL', label: 'Left End Wall' },
      { id: 'RIGHT_END_WALL', label: 'Right End Wall' },
      { id: 'SHOWER_HEAD', label: 'Shower Head' },
      { id: 'SHOWER_VALVE', label: 'Shower Valve' },
      { id: 'DOOR', label: 'Door' },
      { id: 'CURTAIN_ROD', label: 'Curtain Rod' },
      { id: 'SHELF', label: 'Shelf' },
      { id: 'NICHE', label: 'Niche' },
      { id: 'SEAT', label: 'Seat' },
      { id: 'GRAB_BAR', label: 'Grab Bar' }
    ],
    dependsOn: {
      step: 'productFormat',
      values: ['KIT']
    }
  },
  {
    id: 'componentType',
    label: 'Component Type',
    options: ['BASE', 'WALL', 'DOOR', 'PLUMBING', 'ACCESSORIES'],
    dependsOn: {
      step: 'productFormat',
      values: ['INDIVIDUAL_COMPONENT']
    }
  },
  {
    id: 'wallType',
    label: 'Wall Type',
    options: ['WALL_PANEL', 'WALL_SET'],
    dependsOn: {
      step: 'componentType',
      values: ['WALL']
    }
  },
  {
    id: 'wallPanel',
    label: 'Wall Panel',
    options: ['BACK_WALL', 'LEFT_END_WALL', 'RIGHT_END_WALL'],
    dependsOn: {
      step: 'wallType',
      values: ['WALL_PANEL']
    }
  },
  {
    id: 'wallSet',
    label: 'Wall Set Configuration',
    type: 'multiple',
    multiSelect: true,
    options: [
      { id: 'BACK_WALL', label: 'Back Wall' },
      { id: 'LEFT_END_WALL', label: 'Left End Wall' },
      { id: 'RIGHT_END_WALL', label: 'Right End Wall' }
    ],
    dependsOn: {
      step: 'wallType',
      values: ['WALL_SET']
    }
  },
  {
    id: 'plumbingType',
    label: 'Plumbing Component',
    options: ['SHOWER_HEAD', 'SHOWER_VALVE'],
    dependsOn: {
      step: 'componentType',
      values: ['PLUMBING']
    }
  },
  {
    id: 'accessoryType',
    label: 'Accessory Type',
    options: ['SHELF', 'NICHE', 'SEAT', 'GRAB_BAR', 'CURTAIN_ROD'],
    dependsOn: {
      step: 'componentType',
      values: ['ACCESSORIES']
    }
  }
]
