export const productCategories = [
  {
    id: 'walls',
    name: 'Wall Styles',
    description: 'Choose your wall design and pattern',
    subcategories: [
      {
        id: 'modern',
        name: 'Modern',
        options: [
          { id: 'modern-white', name: 'Modern White', image: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Modern+White' },
          { id: 'modern-gray', name: 'Modern Gray', image: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Modern+Gray' }
        ]
      },
      {
        id: 'traditional',
        name: 'Traditional',
        options: [
          { id: 'trad-marble', name: 'Traditional Marble', image: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Traditional+Marble' },
          { id: 'trad-stone', name: 'Traditional Stone', image: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Traditional+Stone' }
        ]
      },
      {
        id: 'transitional',
        name: 'Transitional',
        options: [
          { id: 'trans-beige', name: 'Transitional Beige', image: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Transitional+Beige' },
          { id: 'trans-slate', name: 'Transitional Slate', image: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Transitional+Slate' }
        ]
      },
      {
        id: 'classic',
        name: 'Classic',
        options: [
          { id: 'classic-white', name: 'Classic White', image: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Classic+White' },
          { id: 'classic-cream', name: 'Classic Cream', image: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Classic+Cream' }
        ]
      }
    ]
  },
  {
    id: 'shower-base',
    name: 'Shower Base',
    description: 'Select your base style and drain location',
    subcategories: [
      {
        id: 'center-drain',
        name: 'Center Drain',
        options: [
          { id: 'center-48x36', name: '48" x 36"', image: 'https://placehold.co/800x600/016369/FFFFFF/png?text=48x36+Center' },
          { id: 'center-60x36', name: '60" x 36"', image: 'https://placehold.co/800x600/016369/FFFFFF/png?text=60x36+Center' }
        ]
      },
      {
        id: 'left-drain',
        name: 'Left Hand Drain',
        options: [
          { id: 'left-48x36', name: '48" x 36"', image: 'https://placehold.co/800x600/016369/FFFFFF/png?text=48x36+Left' },
          { id: 'left-60x36', name: '60" x 36"', image: 'https://placehold.co/800x600/016369/FFFFFF/png?text=60x36+Left' }
        ]
      },
      {
        id: 'right-drain',
        name: 'Right Hand Drain',
        options: [
          { id: 'right-48x36', name: '48" x 36"', image: 'https://placehold.co/800x600/016369/FFFFFF/png?text=48x36+Right' },
          { id: 'right-60x36', name: '60" x 36"', image: 'https://placehold.co/800x600/016369/FFFFFF/png?text=60x36+Right' }
        ]
      }
    ]
  },
  {
    id: 'fixtures',
    name: 'Fixtures & Faucets',
    description: 'Choose your shower fixtures',
    subcategories: [
      {
        id: 'handheld',
        name: 'Handheld',
        options: [
          { id: 'handheld-chrome', name: 'Chrome', image: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Handheld+Chrome' },
          { id: 'handheld-nickel', name: 'Brushed Nickel', image: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Handheld+Nickel' },
          { id: 'handheld-bronze', name: 'Bronze', image: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Handheld+Bronze' }
        ]
      },
      {
        id: 'rainfall',
        name: 'Rainfall',
        options: [
          { id: 'rainfall-chrome', name: 'Chrome', image: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Rainfall+Chrome' },
          { id: 'rainfall-nickel', name: 'Brushed Nickel', image: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Rainfall+Nickel' },
          { id: 'rainfall-bronze', name: 'Bronze', image: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Rainfall+Bronze' }
        ]
      },
      {
        id: 'massage',
        name: 'Massage',
        options: [
          { id: 'massage-chrome', name: 'Chrome', image: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Massage+Chrome' },
          { id: 'massage-nickel', name: 'Brushed Nickel', image: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Massage+Nickel' },
          { id: 'massage-bronze', name: 'Bronze', image: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Massage+Bronze' }
        ]
      },
      {
        id: 'standard',
        name: 'Standard',
        options: [
          { id: 'standard-chrome', name: 'Chrome', image: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Standard+Chrome' },
          { id: 'standard-nickel', name: 'Brushed Nickel', image: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Standard+Nickel' },
          { id: 'standard-bronze', name: 'Bronze', image: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Standard+Bronze' }
        ]
      }
    ]
  },
  {
    id: 'glass-doors',
    name: 'Glass Doors',
    description: 'Select your door style and finish',
    subcategories: [
      {
        id: 'framed',
        name: 'Framed',
        options: [
          {
            id: 'framed-chrome',
            name: 'Chrome Frame',
            glassOptions: [
              {
                id: 'clear',
                name: 'Clear Glass',
                image: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Framed+Chrome+Clear'
              },
              {
                id: 'rainfall',
                name: 'Rain Glass',
                image: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Framed+Chrome+Rain'
              },
              {
                id: 'pattern',
                name: 'Pattern Glass',
                image: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Framed+Chrome+Pattern'
              }
            ],
            image: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Framed+Chrome+Clear'
          },
          {
            id: 'framed-nickel',
            name: 'Brushed Nickel Frame',
            glassOptions: [
              {
                id: 'clear',
                name: 'Clear Glass',
                image: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Framed+Nickel+Clear'
              },
              {
                id: 'rainfall',
                name: 'Rain Glass',
                image: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Framed+Nickel+Rain'
              },
              {
                id: 'pattern',
                name: 'Pattern Glass',
                image: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Framed+Nickel+Pattern'
              }
            ],
            image: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Framed+Nickel+Clear'
          },
          {
            id: 'framed-bronze',
            name: 'Bronze Frame',
            glassOptions: [
              {
                id: 'clear',
                name: 'Clear Glass',
                image: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Framed+Bronze+Clear'
              },
              {
                id: 'rainfall',
                name: 'Rain Glass',
                image: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Framed+Bronze+Rain'
              },
              {
                id: 'pattern',
                name: 'Pattern Glass',
                image: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Framed+Bronze+Pattern'
              }
            ],
            image: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Framed+Bronze+Clear'
          }
        ]
      },
      {
        id: 'frameless',
        name: 'Frameless',
        options: [
          { id: 'frameless-chrome', name: 'Chrome Hardware', image: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Frameless+Chrome' },
          { id: 'frameless-nickel', name: 'Brushed Nickel Hardware', image: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Frameless+Nickel' },
          { id: 'frameless-bronze', name: 'Bronze Hardware', image: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Frameless+Bronze' }
        ]
      },
      {
        id: 'semi-frameless',
        name: 'Semi-Frameless',
        options: [
          { id: 'semi-chrome', name: 'Chrome Hardware', image: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Semi+Chrome' },
          { id: 'semi-nickel', name: 'Brushed Nickel Hardware', image: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Semi+Nickel' },
          { id: 'semi-bronze', name: 'Bronze Hardware', image: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Semi+Bronze' }
        ]
      }
    ]
  },
  {
    id: 'accessories',
    name: 'Accessories',
    description: 'Add functional accessories',
    subcategories: [
      {
        id: 'grab-rails',
        name: 'Grab Rails',
        options: [
          { id: 'grab-chrome', name: 'Chrome', image: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Grab+Chrome' },
          { id: 'grab-nickel', name: 'Brushed Nickel', image: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Grab+Nickel' },
          { id: 'grab-bronze', name: 'Bronze', image: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Grab+Bronze' }
        ]
      },
      {
        id: 'seats',
        name: 'Fold Down Seats',
        options: [
          { id: 'seat-white', name: 'White', image: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Seat+White' },
          { id: 'seat-beige', name: 'Beige', image: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Seat+Beige' }
        ]
      },
      {
        id: 'niches',
        name: 'Niches',
        options: [
          { id: 'niche-standard', name: 'Standard', image: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Standard+Niche' },
          { id: 'niche-large', name: 'Large', image: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Large+Niche' }
        ]
      },
      {
        id: 'shelves',
        name: 'Shelves',
        options: [
          { id: 'shelf-corner', name: 'Corner Shelf', image: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Corner+Shelf' },
          { id: 'shelf-straight', name: 'Straight Shelf', image: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Straight+Shelf' }
        ]
      }
    ]
  }
]

export const finishOptions = [
  { id: 'chrome', name: 'Chrome' },
  { id: 'nickel', name: 'Brushed Nickel' },
  { id: 'black', name: 'Matte Black' },
  { id: 'bronze', name: 'Oil-Rubbed Bronze' }
] 