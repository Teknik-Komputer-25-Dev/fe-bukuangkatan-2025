/**
 * Vencobolt Carousel Data
 * Central data source for the Vencobolt carousel section
 */

export const vencoboltCarouselData = [
  {
    id: 1,
    title: "Venti Cinco (ven·ti sin·ko)",
    description: "Berasal dari bahasa spanyol Veinticinco, yang artinya 25 yang menandakan kita angkatan 25",
    additionalDescription: "Venco sendiri juga memiliki arti Visionary Engineers in Networking & Computers",
    tags: ["Visionary Engineers", "Networking", "Computing"],
    image: "/images/vencobolt/venco-state.png",
    imageAlt: "VENCOBOLT Full State"
  },
  {
    id: 2,
    title: "Bytes Optimized for Learning & Teamwork",
    description: "Bytes melambangkan individu angkatan '25 yang dibentuk (Optimized) untuk berkembang (Learning) bersama (Teamwork)",
    additionalDescription: null,
    tags: null,
    image: "/images/vencobolt/bolt-state.png",
    imageAlt: "VENCOBOLT Venco State"
  },
  {
    id: 3,
    title: "United By Code, Solid By Bolt",
    description: "Merupakan jargon dari angkatan 25 yang berarti kita dieratkan oleh code, dan dikuatkan oleh baut.",
    additionalDescription: null,
    tags: null,
    image: "/images/vencobolt/mur-baut.png",
    imageAlt: "VENCOBOLT murbaut State"
  }
]

export const tagDescriptions = {
  "Visionary Engineers": "Visionary Engineers melambangkan mahasiswa Teknik Komputer angkatan '25 yang memiliki keinginan untuk berwawasan yang maju ke depan.",
  "Networking": "berhubungan dengan dunia jaringan komputer dan relasi sosial (kebersamaan).",
  "Computing": "merupakan inti bidang Teknik Komputer."
}

export const carouselConfig = {
  duplicateCount: 1,
  transitionDuration: 500,
  fadeOutDelay: 300,
  dragThreshold: 50,
  styling: {
    mainBackground: "bg-[#B47EDE]/20",
    cardBackground: "bg-[#B47EDE]/10",
    tagBackground: "bg-purple-400",
    underlineColor: "bg-orange-500",
    previewOpacity: "opacity-60",
    hoverOpacity: "hover:opacity-90"
  }
}