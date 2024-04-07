const adjective = [
  "Gentle", "Graceful", "Radiant", "Serene", "Charming", "Tranquil", "Polite", "Kind", 
  "Courteous", "Amiable", "Eloquent", "Thoughtful", "Gracious", "Elegant", "Respectful", 
  "Sincere", "Genuine", "Compassionate", "Empathetic", "Affable", "Humble", "Modest", 
  "Tactful", "Sophisticated", "Stylish", "Pleasant", "Cultured", "Majestic", "Regal", 
  "Enchanting", "Captivating", "Pristine", "Harmonious", "Mellow", "Blissful", "Cheerful", 
  "Delightful", "Enthusiastic", "Exuberant", "Vivacious", "Animated", "Lively", "Dynamic", 
  "Energetic", "Effervescent", "Sparkling", "Joyful", "Merry", "Radiant", "Spirited", 
  "Vibrant", "Whimsical", "Witty", "Brilliant",
  "Cordial", "Ingenious", "Persuasive", "Nurturing", "Stellar", "Dazzling", "Alluring", 
  "Enigmatic", "Epic", "Ravishing", "Exquisite", "Intriguing", "Mesmerizing", 
  "Irresistible", "Fantastic", "Phenomenal", "Splendid", "Opulent", "Luxurious", 
  "Svelte", "Sumptuous", "Luminous", "Radiant", "Transcendent", "Celestial", 
  "Ethereal", "Zenith", "Sublime", "Supreme", "Illustrious", "Majestic", "Grandiose", 
  "Sovereign", "Regal", "Palatial", "Imposing", "August", "Noble", "Magnanimous", 
  "Munificent", "Benevolent", "Prodigious", "Wondrous", "Marvelous", "Breathtaking", 
  "Awe-inspiring", "Enthralling", "Spellbinding", "Captivating", "Euphoric", 
  "Exhilarating", "Thrilling", "Enlivening", "Invigorating", "Uplifting", "Ecstatic", 
  "Blissful", "Rapturous", "Transcendental", "Eclectic", "Charismatic", "Idyllic", 
  "Quintessential", "Effulgent", "Resplendent", "Beaming", "Effervescent", "Coruscating", 
  "Lustrous", "Vivid", "Dynamic", "Electrifying", "Radiating", "Efflorescent", 
  "Incandescent", "Refulgent", "Scintillating", "Vivid", "Vibrant", "Zesty", "Exotic", 
  "Captivating", "Rhapsodic", "Ineffable", "Unforgettable", "Irreplaceable",
  "Sunshine", "Rainbow", "Lemonade", "Cherry", "Cupcake",  "Moonbeam", "Bubblegum", 
  "Butterfly", "Starlight",  "Laughter", "Petal", "Jubilant", "Giggly", "Peppermint",  
  "Sparkle", "Candy Cane", "Honeybee", "Peaches &", "Whispering",  "Dreamy", "Glowing", 
  "Breezy", "Sunny", "Lollipop",  "Carousel", "Fluffy", "Raindrop", "Cosmic", "Bouncing",  
  "Twinkling", "Golden", "Cuddle", "Sweet", "Radiant",  "Gentle", "Moonlit", "Laughing", 
  "Wonderland", "Serenading",  "Velvet", "Cotton Candy", "Whimsical", "Bubbly", "Harmony",  
  "Singing", "Enchanted", "Giggling", "Merry", "Glistening",  "Zesty", "Silly", "Sugarplum", 
  "Blissful", "Fancy",  "Tranquil", "Moonbeam", "Pleasant", "Wishing", "Sapphire",  "Radiant", 
  "Whispering", "Lavender", "Merry", "Delightful",  "Starlit", "Lemonade", "Blossom", "Twinkle", 
  "Butterfly",  "Sunflower", "Candyfloss", "Jolly", "Cherub", "Merry",  "Lullaby", "Jovial", "Petal", 
  "Dreamy", "Gleeful",  "Blissful", "Wishing", "Bubblegum", "Tropical", "Lavender",  "Starlit", "Rainbow", "Whispering", "Moonlight", "Fairy",  "Cherished", "Serene", "Jubilant", "Giggly", "Lemonade",  "Charming", "Bountiful", "Enchanted", "Twinkling", "Dreamy",  "Crimson", "Buttercup", "Golden", "Peachy", "Whimsical",  "Sapphire", "Starry", "Radiant", "Mellow", "Luminous",  "Blissful", "Tender", "Sunny", "Cherry", "Gentle",  "Harmonious", "Tranquil", "Delicate", "Joyful", "Velvet",  "Bubbly", "Lavish", "Whispering", "Zesty", "Pleasant",  "Majestic", "Glowing", "Whistling", "Mirthful", "Lavish",  "Serene", "Gentle", "Lush", "Lustrous", "Twinkling",  "Vibrant", "Soothing", "Tropical", "Harmonious", "Merry",  "Golden", "Radiant", "Velvet", "Tranquil", "Luminous",  "Whimsical", "Dreamy", "Peachy", "Crimson", "Whispering",  "Majestic", "Mellow", "Bubbly", "Glowing", "Radiant",  "Lush", "Serene"
]

const object = ["Smile", "Umbrella", "Stand", "Blossom", "Castle",  "Lullaby", "Dream", "Kiss", "Symphony", "Lantern",  "Pillow", "Jigsaw", "Gazebo", "Palace", "Sprinkle",  "Carousel", "Haven", "Cream", "Willow", "Delight",  "Gratitude", "Bubbles", "Smiles", "Lane", "Charm",  "Cloud", "Ripple", "Carousel", "Bubble", "Star",  "Glow", "Cove", "Serenity", "Rainbow", "Breeze",  "Meadow", "Lily", "Wish", "Songbird", "Vine",  "Cloud", "Whirl", "Brook", "Harbor", "Swallow",  "Echo", "Glimpse", "Melody", "Paradise", "Glade",  "Zephyr", "Symphony", "Spark", "Breeze", "Dazzle",  "Flutter", "Treasure", "Side", "Magic", "Plume",  "Well", "Skies", "Rapture", "Wind", "Lullaby",  "Mirage", "Drizzle", "Symphony", "Lagoon", "Breeze",  "Twirl", "Bliss", "Symphony", "Cloud", "Jigsaw",  "Charm", "Moonbeam", "Lantern", "Jive", "Parade",  "Dance", "Gaze", "Bounce", "Well", "Bliss",  "Tango", "Lagoon", "Serenade", "Rhapsody", "Waters",  "Melody", "Floss", "Chime", "Sanctuary", "Jewel",  "Gala", "Luminary", "Chorus", "Blossom", "Embrace",  "Tide", "Dazzle", "Cascade", "Boulevard", "Glade",  "Paradise", "Waltz", "Symphony", "Spell", "Reef",  "Melody", "Lagoon", "Breeze", "Twilight", "Serenade",  "Cheer", "Glow", "Haven", "Twist", "Dream",  "Journey", "Voyage", "Brook", "Lagoon", "Willow",  "Zenith", "Pasture", "Meadow", "Glade", "Wind",  "Mosaic", "Lagoon", "Splash", "Gust", "Lullaby",  "Lagoon", "Tranquility", "Vista", "Sanctuary", "Treasure",  "Haven", "Mirage", "Grove", "Reef", "Valley",  "Treetop", "Land", "Waterfall", "Desert", "Peak",  "Canyon", "Waters", "Mountain", "Meadow", "Beach",  "Glen", "Ravine", "Lagoon", "Summit"]


export function randomNameGenerator(sep: string = ' ') {
  return adjective[Math.floor(Math.random() * adjective.length)] 
    + sep + object[Math.floor(Math.random() * object.length)];
}
