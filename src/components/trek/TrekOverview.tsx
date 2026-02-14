import { ShieldCheck, Leaf, Map, CheckCircle2 } from "lucide-react";

export function TrekOverview() {
  return (
    <div className="space-y-12">
      
      {/* --- 1. SEO Description --- */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">About the Trek</h2>
        <p className="text-gray-700 leading-relaxed"> {/* Changed text-black to gray-700 for better contrast */}
          <span className="font-semibold text-gray-900">Nag Tibba</span> ("Serpent's Peak") 
          stands as the highest summit in the lower Himalayas of Uttarakhand. 
          Whether you are a first-time trekker or looking to witness magical 
          snowfall on a weekend, this trek is your perfect escape.
        </p>
        <p className="text-gray-700 leading-relaxed">
          From the summit, you are rewarded with a majestic 360-degree view of Himalayan giants 
          like <span className="font-semibold text-gray-900">Swargarohini, Bandarpoonch, and Nanda Devi</span>. 
          The trail takes you through dense oak and rhododendron forests, offering a true 
          wilderness experience just a short drive from Dehradun.
        </p>
      </section>

      {/* --- 2. Inclusions --- */}
      <section className="bg-orange-50/50 p-6 md:p-8 rounded-2xl border border-orange-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">What's Included</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-4">
          {[
            "Transport (Dehradun to Dehradun)",
            "Professional Guide & Cook",
            "Camping Gear (Tents, Sleeping Bags, Mats)",
            "All Meals (Day 1 Lunch to Day 2 Lunch)",
            "Forest Permits & Entry Fees",
            "Bonfire & Stargazing Experience"
          ].map((item, index) => (
            <div key={index} className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 text-sm">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* --- 3. Why Us --- */}
      <div className="space-y-8 border-t pt-8">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Experience the Magic of the Himalayas</h2>
          <p className="text-gray-700 leading-relaxed">
            At <span className="font-semibold text-[#E12106]">Divya Tour and Treks</span>, 
            we specialize in turning a simple trek into a life-changing adventure. Based in the 
            heart of the Garhwal region, our Nag Tibba expeditions are designed for everyone.
          </p>
        </section>

        <section className="bg-orange-50/50 p-6 md:p-8 rounded-2xl border border-orange-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            Why Trek With Us?
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-blue-700">
                <Map className="w-5 h-5" />
                <h4 className="font-bold text-gray-900">Local Expertise</h4>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Our guides aren't just experts; they are locals who know every trail, 
                viewpoint, and story of the Nag Tibba range.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-orange-600">
                <ShieldCheck className="w-5 h-5" />
                <h4 className="font-bold text-gray-900">Safety First</h4>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                We prioritize your well-being with high-quality camping gear, 
                nutritious meals, and experienced trek leaders.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-green-600">
                <Leaf className="w-5 h-5" />
                <h4 className="font-bold text-gray-900">Sustainable Travel</h4>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                We believe in "Leave No Trace." We ensure our treks preserve the pristine 
                beauty of the forests for generations to come.
              </p>
            </div>
          </div>
        </section>
      </div>
      
    </div>
  )
}