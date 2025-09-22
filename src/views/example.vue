<!-- HomeView.vue - Digital Book Engineering '25 -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <section class="relative h-screen flex items-center justify-center overflow-hidden">
      <!-- Background Image dengan Parallax Effect -->
      <div 
        class="absolute inset-0 bg-cover bg-center"
        :style="{ 
          backgroundImage: `url('/images/hero-bg.svg')`,
          transform: `translateY(${scrollY * 0.5}px)` 
        }"
      ></div>
      
      <!-- Overlay -->
      <div class="absolute inset-0 bg-black/40"></div>
      
      <!-- Content -->
      <div class="relative z-10 container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <!-- Left Content -->
        <div class="text-white">
          <h1 class="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            Digital Book
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
              Engineering '25
            </span>
          </h1>
          <p class="text-xl lg:text-2xl mb-8 text-gray-200 max-w-2xl">
            Perjalanan kami sebagai calon insinyur masa depan. 
            Dari visi bersama hingga mimpi yang terwujud.
          </p>
          
          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4">
            <BaseButton
              variant="primary"
              size="lg"
              class="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              @click="scrollToSection('about')"
            >
              <Play class="w-5 h-5 mr-2" />
              Mulai Jelajahi
            </BaseButton>
            
            <BaseButton
              variant="outline"
              size="lg"
              class="border-white text-white hover:bg-white hover:text-gray-900"
              @click="router.push('/identity')"
            >
              <Users class="w-5 h-5 mr-2" />
              Kenali Kami
            </BaseButton>
          </div>
        </div>
        
        <!-- Right Content - Mascot Animation -->
        <div class="relative">
          <LottieAnimation
            :animation-data="mascotAnimation"
            :height="400"
            :width="400"
            class="mx-auto"
          />
          
          <!-- Floating Elements -->
          <div class="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
          <div class="absolute -bottom-8 -left-8 w-16 h-16 bg-blue-400 rounded-full opacity-30 animate-bounce"></div>
        </div>
      </div>
      
      <!-- Scroll Indicator -->
      <div 
        class="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce cursor-pointer"
        @click="scrollToSection('about')"
      >
        <ChevronDown class="w-8 h-8" />
      </div>
    </section>
    
    <!-- About Section -->
    <section id="about" class="py-20 relative overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-5">
        <div class="w-full h-full bg-repeat" style="background-image: url('data:image/svg+xml,<svg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;><g fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;><g fill=&quot;%23000&quot; fill-opacity=&quot;0.1&quot;><polygon points=&quot;0 0 60 0 60 30 0 30&quot;/></g></g></svg>')"></div>
      </div>
      
      <div class="container mx-auto px-6 relative z-10">
        <div class="text-center mb-16">
          <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Tentang <span class="text-blue-600">Angkatan Kami</span>
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Kami adalah generasi engineer yang siap menghadapi tantangan teknologi masa depan
          </p>
        </div>
        
        <!-- Stats Grid -->
        <div class="grid md:grid-cols-3 gap-8 mb-16">
          <div 
            v-for="(stat, index) in stats" 
            :key="index"
            class="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <component :is="stat.icon" class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-3xl font-bold text-gray-900 mb-2">{{ stat.value }}</h3>
            <p class="text-gray-600">{{ stat.label }}</p>
          </div>
        </div>
        
        <!-- Vision & Mission -->
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 class="text-3xl font-bold text-gray-900 mb-6">Visi & Misi Kami</h3>
            <div class="space-y-6">
              <div class="flex items-start space-x-4">
                <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Target class="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900 mb-2">Visi</h4>
                  <p class="text-gray-600">Menjadi engineer yang inovatif, berintegritas, dan berkontribusi positif untuk kemajuan teknologi Indonesia.</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-4">
                <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Zap class="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900 mb-2">Misi</h4>
                  <p class="text-gray-600">Belajar bersama, berkolaborasi, dan mengembangkan solusi teknologi yang bermanfaat untuk masyarakat.</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Interactive Element -->
          <div class="relative">
            <div class="relative bg-gradient-to-br from-blue-400 to-indigo-600 rounded-2xl p-8 text-white overflow-hidden">
              <div class="relative z-10">
                <h4 class="text-2xl font-bold mb-4">Engineering '25</h4>
                <p class="text-blue-100 mb-6">Generasi yang siap menghadapi era digital</p>
                <BaseButton 
                  variant="secondary" 
                  @click="router.push('/profile')"
                  class="bg-white text-blue-600 hover:bg-blue-50"
                >
                  Lihat Profil Lengkap
                  <ArrowRight class="w-4 h-4 ml-2" />
                </BaseButton>
              </div>
              
              <!-- Background Decoration -->
              <div class="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full"></div>
              <div class="absolute -right-8 -bottom-8 w-32 h-32 bg-white/5 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Class Photos Carousel -->
    <section class="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <h3 class="text-3xl lg:text-5xl font-bold text-gray-800 mb-6">
            Momen Berharga
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              Bersama
            </span>
          </h3>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Koleksi foto-foto terbaik dari berbagai kegiatan dan acara yang telah kita lalui bersama.
          </p>
        </div>
        
        <!-- Custom Carousel dengan Swiper -->
        <BaseCarousel
          :items="classPhotos"
          :slides-per-view="1"
          :space-between="30"
          :loop="true"
          :autoplay="{ delay: 4000 }"
          class="max-w-6xl mx-auto"
        >
          <template #default="{ item }">
            <div class="relative group cursor-pointer overflow-hidden rounded-2xl shadow-2xl">
              <LazyImage
                :src="item.image"
                :alt="item.title"
                class="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              <!-- Overlay Content -->
              <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div class="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h4 class="text-2xl font-bold mb-2">{{ item.title }}</h4>
                  <p class="text-gray-200 mb-2">{{ item.description }}</p>
                  <span class="text-sm text-blue-300">{{ item.date }}</span>
                </div>
              </div>
            </div>
          </template>
        </BaseCarousel>
        
        <!-- Gallery Button -->
        <div class="text-center mt-12">
          <BaseButton
            variant="primary"
            size="lg"
            @click="router.push('/gallery')"
            class="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            <Camera class="w-5 h-5 mr-2" />
            Lihat Galeri Lengkap
          </BaseButton>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { 
  Play, 
  Users, 
  ChevronDown, 
  ArrowRight, 
  Target, 
  Zap, 
  GraduationCap,
  Code,
  Trophy,
  Camera 
} from 'lucide-vue-next'

// Components
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseCarousel from '@/components/ui/BaseCarousel.vue'
import LottieAnimation from '@/components/ui/LottieAnimation.vue'
import LazyImage from '@/components/ui/LazyImage.vue'

// Composables
import { useScrollAnimations } from '@/composables/useScrollAnimations'

const router = useRouter()
const { scrollY, scrollToElement } = useScrollAnimations()

// Data
const mascotAnimation = ref(null) // Load dari assets/animations/

// Stats data
const stats = ref([
  {
    icon: GraduationCap,
    value: '150+',
    label: 'Mahasiswa Aktif'
  },
  {
    icon: Code,
    value: '50+',
    label: 'Proyek Dikerjakan'
  },
  {
    icon: Trophy,
    value: '25+',
    label: 'Prestasi Diraih'
  }
])

const classPhotos = ref([
  {
    image: 'src/assets/images/orientation.JPG',
    title: 'Orientasi Mahasiswa Baru',
    description: 'Hari pertama kami bertemu dan memulai perjalanan bersama',
    date: 'Agustus 2025'
  },
  {
    image: 'src/assets/images/study-group.JPG',
    title: 'Belajar Bersama',
    description: 'Saling membantu dalam menghadapi tantangan akademik',
    date: 'September 2025'
  },
  {
    image: 'src/assets/images/project-demo.JPG',
    title: 'Demo Proyek',
    description: 'Menampilkan hasil karya dan inovasi terbaru',
    date: 'Oktober 2025'
  }
])

// Methods
const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    scrollToElement(element)
  }
}
</script>

<style scoped>
/* Custom animations */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

/* Gradient text animation */
@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animate-gradient {
  background: linear-gradient(-45deg, #3B82F6, #8B5CF6, #EF4444, #10B981);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
}
</style>
