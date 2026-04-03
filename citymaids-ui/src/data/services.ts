export interface Service {
  id: number
  name: string
  slug: string
  description: string
  shortDescription: string
  price: number
  duration: number
  icon: string
  image: string
  features: string[]
  isPopular?: boolean
  isActive: boolean
}

export const services: Service[] = [
  { id: 1, name: 'Standard Cleaning', slug: 'standard-cleaning', description: 'Our standard cleaning service covers all the basics to keep your home fresh and tidy. Perfect for regular maintenance cleaning.', shortDescription: 'Regular maintenance cleaning for a fresh home.', price: 79, duration: 2, icon: '\uD83E\uDDF9', image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80', features: ['Vacuuming & mopping', 'Dusting surfaces', 'Bathroom cleaning', 'Kitchen wipe-down', 'Trash removal'], isActive: true },
  { id: 2, name: 'Deep Cleaning', slug: 'deep-cleaning', description: 'A thorough top-to-bottom clean of your entire home. Ideal for move-in/move-out, spring cleaning, or when your home needs extra attention.', shortDescription: 'Thorough top-to-bottom clean for every corner.', price: 149, duration: 4, icon: '\u2728', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', features: ['Everything in Standard', 'Inside oven & fridge', 'Baseboards & window sills', 'Cabinet interiors', 'Deep scrub bathrooms'], isPopular: true, isActive: true },
  { id: 3, name: 'Move In/Out Cleaning', slug: 'move-in-out-cleaning', description: 'Specialized cleaning for moving transitions. We ensure the property is spotless for new occupants or to get your deposit back.', shortDescription: 'Spotless cleaning for moving transitions.', price: 199, duration: 5, icon: '\uD83C\uDFE0', image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=600&q=80', features: ['Full deep clean', 'Inside all appliances', 'Window cleaning', 'Wall spot cleaning', 'Garage sweep'], isActive: true },
  { id: 4, name: 'Office Cleaning', slug: 'office-cleaning', description: 'Professional cleaning for offices and commercial spaces. Keep your workspace clean and productive.', shortDescription: 'Professional cleaning for offices and workspaces.', price: 129, duration: 3, icon: '\uD83C\uDFE2', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80', features: ['Desk & surface cleaning', 'Restroom sanitizing', 'Kitchen/break room', 'Trash & recycling', 'Floor care'], isActive: true },
  { id: 5, name: 'Post-Construction Cleaning', slug: 'post-construction-cleaning', description: 'Remove construction dust, debris, and residue after renovation or new construction work.', shortDescription: 'Remove dust and debris after construction.', price: 249, duration: 6, icon: '\uD83D\uDD28', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80', features: ['Dust & debris removal', 'Window & glass cleaning', 'Paint splatter removal', 'Floor polishing', 'Final inspection'], isActive: true },
  { id: 6, name: 'Carpet Cleaning', slug: 'carpet-cleaning', description: 'Deep steam cleaning for carpets and rugs. Remove stains, allergens, and odors for a fresh feel.', shortDescription: 'Deep steam cleaning for carpets and rugs.', price: 99, duration: 2, icon: '\uD83D\uDECB\uFE0F', image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&q=80', features: ['Steam extraction', 'Stain treatment', 'Deodorizing', 'Quick dry process', 'Pet hair removal'], isActive: true },
]
