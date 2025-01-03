export const DESIGN_TOOL_IMAGES = {
  steps: {
    'tub-to-shower': '/images/design-tool/steps/tub-to-shower.svg',
    'shower-replacement': '/images/design-tool/steps/shower-replacement.svg',
    shapes: {
      'rectangle-standard': '/images/design-tool/steps/shapes/rectangle-standard.svg',
      'rectangle-large': '/images/design-tool/steps/shapes/rectangle-large.svg',
      'neo-angle': '/images/design-tool/steps/shapes/neo-angle.svg',
      'square': '/images/design-tool/steps/shapes/square.svg',
      'curved': '/images/design-tool/steps/shapes/curved.svg'
    }
  },
  entry: {
    'hero-bg': '/images/design-tool/entry/hero-bg.svg',
    'designer-packages': '/images/design-tool/entry/designer-packages.svg',
    'custom-design': '/images/design-tool/entry/custom-design.svg'
  }
} as const

// Add type checking for image paths
export type DesignToolImagePath = typeof DESIGN_TOOL_IMAGES.steps[keyof typeof DESIGN_TOOL_IMAGES.steps] | 
  typeof DESIGN_TOOL_IMAGES.entry[keyof typeof DESIGN_TOOL_IMAGES.entry] 