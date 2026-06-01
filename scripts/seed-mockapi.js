/**
 * Seed mockapi.io with data from ListOfOrchids.js
 * Run: node scripts/seed-mockapi.js
 */

const BASE_URL = "https://6a1cd2f18858a003817c0ad0.mockapi.io/api/v1/orchids";

const orchids = [
  { name: "Cattleya Taichung Beauty", rating: 5, isSpecial: true, isNatural: false, image: "/images/Taichung.jpg", color: "purple", numberOfLike: 192, origin: "Taiwan", category: "Cattleya", description: "A stunning hybrid with vibrant pink petals..." },
  { name: "Dendrobium Sonia", rating: 4, isSpecial: false, isNatural: true, image: "/images/GoldenShower.jpg", color: "yellow", numberOfLike: 156, origin: "Philippines", category: "Dendrobium", description: "Native to the Philippines..." },
  { name: "Phalaenopsis Blue Mystique", rating: 5, isSpecial: true, isNatural: false, image: "/images/BlueMystique.jpg", color: "blue", numberOfLike: 245, origin: "Netherlands", category: "Phalaenopsis", description: "A rare dyed blue orchid..." },
  { name: "Cattleya White Swan", rating: 4, isSpecial: false, isNatural: true, image: "/images/WhiteSwan.jpg", color: "white", numberOfLike: 178, origin: "Vietnam", category: "Cattleya", description: "Elegant white petals..." },
  { name: "Dendrobium Purple Gem", rating: 5, isSpecial: true, isNatural: true, image: "/images/PurpleEmpress.webp", color: "purple", numberOfLike: 210, origin: "Thailand", category: "Dendrobium", description: "Royal purple blooms..." },
  { name: "Cymbidium Red Dragon", rating: 4, isSpecial: false, isNatural: true, image: "/images/RedDragon.jpg", color: "pink", numberOfLike: 134, origin: "China", category: "Cymbidium", description: "Fiery red petals..." },
  { name: "Phalaenopsis Moonlight", rating: 3, isSpecial: false, isNatural: true, image: "/images/MoonlightOrchid.jpg", color: "white", numberOfLike: 98, origin: "Brazil", category: "Phalaenopsis", description: "A moon-white orchid..." },
  { name: "Cattleya Sunset", rating: 4, isSpecial: true, isNatural: false, image: "/images/SunsetGlow.jpg", color: "orange", numberOfLike: 167, origin: "Australia", category: "Cattleya", description: "A mesmerizing gradient..." },
  { name: "Dendrobium Green Lantern", rating: 5, isSpecial: true, isNatural: true, image: "/images/GreenJade.jpg", color: "green", numberOfLike: 189, origin: "Vietnam", category: "Dendrobium", description: "Rare green orchids..." },
  { name: "Phalaenopsis Pink Sugar", rating: 3, isSpecial: false, isNatural: false, image: "/images/PinkSugar.jpg", color: "pink", numberOfLike: 145, origin: "Japan", category: "Phalaenopsis", description: "Sweet pink blooms..." },
  { name: "Cattleya Royal Velvet", rating: 4, isSpecial: true, isNatural: false, image: "/images/RoyalVelvet.jpg", color: "purple", numberOfLike: 223, origin: "Colombia", category: "Cattleya", description: "Deep velvety purple petals..." },
  { name: "Cymbidium Cinnamon", rating: 4, isSpecial: false, isNatural: true, image: "/images/CinnamonStar.jpg", color: "brown", numberOfLike: 88, origin: "India", category: "Cymbidium", description: "Uniquely patterned brown and cream blooms..." },
  { name: "Dendrobium Ocean Blue", rating: 5, isSpecial: true, isNatural: false, image: "/images/OceanBreeze.jpg", color: "blue", numberOfLike: 256, origin: "Singapore", category: "Dendrobium", description: "An award-winning hybrid..." },
  { name: "Phalaenopsis Coral", rating: 3, isSpecial: false, isNatural: true, image: "/images/CoralReef.jpg", color: "pink", numberOfLike: 112, origin: "Indonesia", category: "Phalaenopsis", description: "Coral-orange blooms..." },
  { name: "Cattleya Frosty", rating: 4, isSpecial: true, isNatural: false, image: "/images/FrostDiamond.jpg", color: "white", numberOfLike: 201, origin: "Switzerland", category: "Cattleya", description: "Crystal-white petals..." },
  { name: "Cattleya Black Pearl", rating: 5, isSpecial: true, isNatural: false, image: "/images/BlackPearl.jpg", color: "black", numberOfLike: 278, origin: "USA", category: "Cattleya", description: "The legendary near-black orchid..." }
];

async function seed() {
  // First delete all existing records
  const existing = await fetch(BASE_URL).then(r => r.json());
  for (const item of existing) {
    await fetch(`${BASE_URL}/${item.id}`, { method: "DELETE" });
    console.log(`🗑️ Deleted id=${item.id}`);
  }

  // Then post all orchids
  for (const orchid of orchids) {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orchid),
    });
    const data = await res.json();
    console.log(`✅ Created: ${data.name} (id=${data.id})`);
  }
  console.log(`\n🎉 Done! ${orchids.length} orchids pushed to mockapi.io`);
}

seed().catch(console.error);
