import { CategoryStep, ShowerType, ComponentType } from '../types'

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
        return ['SQUARE', 'NEO_ANGLE', 'ROUND']
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
    id: 'kitComponents',
    label: 'Kit Includes',
    options: Object.values(KIT_COMPONENT_GROUPS).flatMap(group => group.options),
    multiSelect: true,
    groupedOptions: KIT_COMPONENT_GROUPS,
    dependsOn: {
      step: 'productFormat',
      values: ['KIT']
    }
  }
]
