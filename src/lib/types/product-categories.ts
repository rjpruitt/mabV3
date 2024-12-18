export const DESIGN_TOOL_CATEGORIES = {
  SHOWER_BASES: {
    id: 'shower_bases',
    subcategories: {
      TUB_TO_SHOWER: 'tub_to_shower',
      STANDARD_REPLACEMENT: 'standard_replacement',
      NEO_ANGLE: 'neo_angle',
      CURVED: 'curved',
      ALCOVE: 'alcove'
    }
  },
  WALL_SURROUNDS: {
    id: 'wall_surrounds',
    subcategories: {
      FULL_PANELS: 'full_panels',
      ACCENT_PANELS: 'accent_panels',
      TRIM: 'trim',
      CORNER_PIECES: 'corner_pieces'
    }
  },
  SHOWER_DOORS: {
    id: 'shower_doors',
    subcategories: {
      SLIDING: 'sliding',
      PIVOT: 'pivot',
      HINGED: 'hinged',
      NEO_ANGLE: 'neo_angle',
      CURVED: 'curved'
    }
  },
  ACCESSORIES: {
    id: 'accessories',
    subcategories: {
      GRAB_BARS: 'grab_bars',
      SEATS: 'seats',
      SHELVES: 'shelves',
      DRAIN_COVERS: 'drain_covers',
      HAND_SHOWERS: 'hand_showers'
    }
  }
} as const 