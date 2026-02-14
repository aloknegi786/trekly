import { Calendar, Mountain, TrendingUp, MapPin } from "lucide-react"

export function TrekMetaBar() {
  return (
    <div className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 px-4 py-6 text-sm">
        {/* Duration */}
        <MetaItem 
          icon={<Calendar className="w-5 h-5" />} 
          label="2 Days | 1 Night" 
        />
        
        {/* Difficulty */}
        <MetaItem 
          icon={<TrendingUp className="w-5 h-5" />} 
          label="Easy to Moderate" 
        />
        
        {/* Altitude */}
        <MetaItem 
          icon={<Mountain className="w-5 h-5" />} 
          label="9,915 ft" 
        />
        
        {/* Start Point */}
        <MetaItem 
          icon={<MapPin className="w-5 h-5" />} 
          label="Dehradun Start" 
        />
      </div>
    </div>
  )
}

function MetaItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-3 justify-center md:justify-start">
      <span className="text-orange-600 bg-orange-50 p-2 rounded-full">
        {icon}
      </span>
      <span className="font-semibold text-gray-700">{label}</span>
    </div>
  )
}