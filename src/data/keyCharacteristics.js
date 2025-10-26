/**
 * Key Characteristics Data
 * Central data source for the Key Characteristics section
 */

export const keyCharacteristicsData = [
  {
    id: 1,
    title: "SALING MENGERATKAN",
    description: "Baut yang melambangkan simbol unik dari angkatan 25 yang bermakna mengeratkan kebersamaan.",
    position: "top-left"
  },
  {
    id: 2,
    title: "INGIN BERKEMBANG",
    description: "Semangat untuk terus berkembang dan belajar dalam bidang teknologi dan komputer.",
    position: "top-right"
  },
  {
    id: 3,
    title: "RASA INGIN TAHU TINGGI",
    description: "Curiosity yang tinggi untuk mengeksplorasi teknologi baru dan inovasi.",
    position: "bottom-left"
  },
  {
    id: 4,
    title: "WADAH BERCERITA TENTANG MOTIVASI & SOLUSI",
    description: "Platform untuk berbagi motivasi, pengalaman, dan solusi dalam perjalanan akademik.",
    position: "bottom-right"
  }
]

export const characteristicsConfig = {
  centerLogo: {
    src: "/images/Logo/full-logo.png",
    alt: "VENCOBOLT Logo"
  },
  layout: {
    desktop: {
      minHeight: "600px",
      cardWidth: "w-64 md:w-72 lg:w-80",
      cardHeight: "h-28 md:h-32",
      logoHeight: "h-40 md:h-48 lg:h-64 xl:h-80"
    },
    mobile: {
      logoHeight: "h-40",
      cardSpacing: "space-y-6"
    }
  },
  styling: {
    cardBackground: "bg-[#B47EDE]/7",
    cardBlur: "backdrop-blur-md",
    borderStyle: "border border-transparent",
    numberBackground: "bg-purple-600/20",
    hoverScale: "hover:scale-110",
    mobileHoverScale: "hover:scale-105"
  }
}