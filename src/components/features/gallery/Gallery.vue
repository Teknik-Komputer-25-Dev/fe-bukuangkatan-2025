<template>
  <div class="p-4 md:p-10">
    <!-- Header -->
    <div class="mb-10 text-center md:text-left">
      <h1 class="text-3xl md:text-4xl font-bold">TEKKOM 25.</h1>
      <p class="text-gray-500 mt-2">OUR GALLERY.</p>
    </div>

    <!-- Card 0-5 -->
    <!-- Layout -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
      <!-- Kiri -->
      <div class="flex flex-col gap-6 md:gap-12">
        <!-- Card Besar Kiri-->
        <div
          v-if="gallery[0]"
          class="relative bg-gray-300 rounded-lg bg-cover bg-center cursor-pointer"
          :class="gallery[0].aspect === 'portrait' ? 'aspect-[9/16]' : 'aspect-[16/9]'"
          :style="{ backgroundImage: `url(${gallery[0].image})` }"
          @click="openCard(gallery[0])"
        >
          <div class="absolute inset-0 bg-black/30 rounded-lg"></div>
          <div class="absolute bottom-4 left-4 text-white">
            <p class="text-xs uppercase">Teknik Komputer 2025</p>
            <h2 class="text-xl font-bold">{{ gallery[0].title }}</h2>
          </div>
        </div>

        <!-- 2 Card Kecil -->
        <div class="grid grid-cols-2 gap-6 md:gap-12">
          <div
            v-for="(item, i) in gallery.slice(1, 3)"
            :key="i"
            class="relative bg-gray-200 rounded-lg bg-cover bg-center cursor-pointer"
            :class="item.aspect === 'portrait' ? 'aspect-[9/16]' : 'aspect-[16/9]'"
            :style="{ backgroundImage: `url(${item.image})` }"
            @click="openCard(item)"
          >
            <div class="absolute inset-0 bg-black/20 rounded-lg"></div>
            <div class="absolute bottom-3 left-3 text-white">
              <p class="text-xs uppercase">Teknik Komputer 2025</p>
              <h2 class="text-lg font-semibold">{{ item.title }}</h2>
            </div>
          </div>
        </div>
      </div>

      <!-- Kanan -->
      <div class="flex flex-col gap-6 md:gap-12">
        <!-- 2 Card Kecil -->
        <div class="grid grid-cols-2 gap-6 md:gap-12">
          <div
            v-for="(item, i) in gallery.slice(3, 5)"
            :key="i"
            class="relative bg-gray-200 rounded-lg bg-cover bg-center cursor-pointer"
            :class="item.aspect === 'portrait' ? 'aspect-[9/16]' : 'aspect-[16/9]'"
            :style="{ backgroundImage: `url(${item.image})` }"
            @click="openCard(item)"
          >
            <div class="absolute inset-0 bg-black/20 rounded-lg"></div>
            <div class="absolute bottom-3 left-3 text-white">
              <p class="text-xs uppercase">Teknik Komputer 2025</p>
              <h2 class="text-lg font-semibold">{{ item.title }}</h2>
            </div>
          </div>
        </div>

        <!-- Card Besar -->
        <div
          v-if="gallery[5]"
          class="relative bg-gray-300 rounded-lg bg-cover bg-center cursor-pointer"
          :class="gallery[5].aspect === 'portrait' ? 'aspect-[9/16]' : 'aspect-[16/9]'"
          :style="{ backgroundImage: `url(${gallery[5].image})` }"
          @click="openCard(gallery[5])"
        >
          <div class="absolute inset-0 bg-black/30 rounded-lg"></div>
          <div class="absolute bottom-4 left-4 text-white">
            <p class="text-xs uppercase">Teknik Komputer 2025</p>
            <h2 class="text-xl font-bold">{{ gallery[5].title }}</h2>
          </div>
        </div>
      </div>
      <!-- Card 6-12 -->

        <div class="flex flex-col gap-6 md:gap-12">
        <!-- Card Besar Kiri-->
        <div
          v-if="gallery[6]"
          class="relative bg-gray-300 rounded-lg bg-cover bg-center cursor-pointer"
          :class="gallery[6].aspect === 'portrait' ? 'aspect-[9/16]' : 'aspect-[16/9]'"
          :style="{ backgroundImage: `url(${gallery[6].image})` }"
          @click="openCard(gallery[6])"
        >
          <div class="absolute inset-0 bg-black/30 rounded-lg"></div>
          <div class="absolute bottom-4 left-4 text-white">
            <p class="text-xs uppercase">Teknik Komputer 2025</p>
            <h2 class="text-xl font-bold">{{ gallery[6].title }}</h2>
          </div>
        </div>

        <!-- 2 Card Kecil -->
        <div class="grid grid-cols-2 gap-6 md:gap-12">
          <div
            v-for="(item, i) in gallery.slice(7, 9)"
            :key="i"
            class="relative bg-gray-200 rounded-lg bg-cover bg-center cursor-pointer"
            :class="item.aspect === 'portrait' ? 'aspect-[9/16]' : 'aspect-[16/9]'"
            :style="{ backgroundImage: `url(${item.image})` }"
            @click="openCard(item)"
          >
            <div class="absolute inset-0 bg-black/20 rounded-lg"></div>
            <div class="absolute bottom-3 left-3 text-white">
              <p class="text-xs uppercase">Teknik Komputer 2025</p>
              <h2 class="text-lg font-semibold">{{ item.title }}</h2>
            </div>
          </div>
        </div>
      </div>

      <!-- Kanan -->
      <div class="flex flex-col gap-6 md:gap-12">
        <!-- 2 Card Kecil -->
        <div class="grid grid-cols-2 gap-6 md:gap-12">
          <div
            v-for="(item, i) in gallery.slice(9, 11)"
            :key="i"
            class="relative bg-gray-200 rounded-lg bg-cover bg-center cursor-pointer"
            :class="item.aspect === 'portrait' ? 'aspect-[9/16]' : 'aspect-[16/9]'"
            :style="{ backgroundImage: `url(${item.image})` }"
            @click="openCard(item)"
          >
            <div class="absolute inset-0 bg-black/20 rounded-lg"></div>
            <div class="absolute bottom-3 left-3 text-white">
              <p class="text-xs uppercase">Teknik Komputer 2025</p>
              <h2 class="text-lg font-semibold">{{ item.title }}</h2>
            </div>
          </div>
        </div>

        <!-- Card Besar -->
        <div
          v-if="gallery[11]"
          class="relative bg-gray-300 rounded-lg bg-cover bg-center cursor-pointer"
          :class="gallery[11].aspect === 'portrait' ? 'aspect-[9/16]' : 'aspect-[16/9]'"
          :style="{ backgroundImage: `url(${gallery[11].image})` }"
          @click="openCard(gallery[11])"
        >
          <div class="absolute inset-0 bg-black/30 rounded-lg"></div>
          <div class="absolute bottom-4 left-4 text-white">
            <p class="text-xs uppercase">Teknik Komputer 2025</p>
            <h2 class="text-xl font-bold">{{ gallery[11].title }}</h2>
          </div>
        </div>
      </div>

    </div>

    <Card
      v-if="selectedCard"
      :card="selectedCard"
      @close="selectedCard = null"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import Card from "./Card.vue";

const selectedCard = ref(null);

const gallery = ref([
  //card 0-5
  {
    title: "Foto Angkatan",
    image: "/src/assets/images/foto-angkatan.jpeg",
    description: [
      "Hari itu menjadi salah satu momen yang paling berkesan bagi kami, Mahasiswa Teknik Komputer Angkatan 2025 Universitas Diponegoro. Bertempat di kawasan Widya Puraya, kami berkumpul untuk mengabadikan kebersamaan dalam sebuah foto angkatan. Di balik senyum dan canda yang terekam, tersimpan semangat baru untuk memulai perjalanan panjang sebagai bagian dari keluarga besar Teknik Komputer. Foto ini bukan sekadar dokumentasi, tetapi juga pengingat akan awal langkah kami menempuh kehidupan perkuliahan."
    ],
    aspect: "landscape",
  },
  {
    title: "POR TEKKOM 25 - FUTSAL",
    image: "/src/assets/images/por-tekkom-futsal.jpg",
    description: [
      "Dalam ajang Pekan Olahraga Program Studi Teknik Komputer, tim futsal angkatan 2025 tampil dengan semangat dan kerja sama yang luar biasa. Setiap pertandingan dijalani dengan kompak dan penuh determinasi hingga berhasil melangkah ke partai final.",
      "Meskipun harus puas di posisi juara 2 setelah kalah dari angkatan 2023, perjuangan tim menjadi bukti nyata semangat pantang menyerah dan sportivitas yang tinggi. Hasil ini menjadi motivasi untuk terus berlatih dan berprestasi lebih baik di kesempatan berikutnya."
    ],
    aspect: "portrait",
  },
  {
    title: "POR TEKKOM 25 - BADMINTON",
    image: "/src/assets/images/por-tekkom-badminton.jpg",
    description: [
      "Pada Pekan Olahraga Program Studi Teknik Komputer, cabang olahraga badminton menjadi salah satu ajang yang paling seru dan dinanti. Tim angkatan 2025 berpartisipasi dengan penuh semangat, menampilkan permainan yang solid dan kerja sama yang kompak di setiap pertandingan."
    ],
    aspect: "portrait",
  },
  {
    title: "POR TEKKOM 25 - BASKET",
    image: "/src/assets/images/por-tekkom-basket.jpg",
    description: [
      "Pada Pekan Olahraga Program Studi Teknik Komputer, angkatan 2025 ikut berpartisipasi dalam cabang olahraga bola basket. Tim kami tampil dengan penuh semangat, menunjukkan kekompakan dan kerja sama terbaik di setiap pertandingan.",
      "Meskipun belum berhasil membawa pulang gelar juara, semangat pantang menyerah tetap menjadi kebanggaan tersendiri. Dari setiap pertandingan, kami belajar arti kebersamaan, sportivitas, dan tekad untuk terus berkembang."
    ],
    aspect: "portrait",
  },
  {
    title: "POR TEKKOM 25 - FIFA",
    image: "/src/assets/images/por-tekkom-fifa.jpg",
    description: [
      "Dalam ajang Pekan Olahraga Program Studi Teknik Komputer, tim E-Sport angkatan 2025 turut berpartisipasi dalam kompetisi game FIFA. Dengan strategi yang matang dan kerja sama yang solid, tim kami berhasil menunjukkan performa terbaik di setiap pertandingan.",
      "Usaha dan semangat yang konsisten akhirnya membuahkan hasil dengan diraihnya posisi juara 3. Walaupun belum mendapatkan hasil yang maksimal, perjuangan dan kerja keras tim tetap patut diapresiasi. Setiap pertandingan menjadi pengalaman berharga yang mengajarkan arti kerja sama, konsistensi, dan sportivitas."
    ],
    aspect: "portrait",
  },
  {
    title: "Foto Angkatan",
    image: "/src/assets/images/foto-angkatan-1.jpg",
    description: [
      "Keluarga besar Teknik Komputer Undip. Berbeda latar, satu tujuan, berkembang bersama sama. Momen ini bukan sekadar foto, tapi bukti awal perjalanan kami sebagai satu angkatan."
    ],
    aspect: "landscape",
  },
  //card 6-11
  {
    title: "Kumpul Angkatan",
    image: "/src/assets/images/kumpang.jpg",
    description: [
      "Hari itu menjadi salah satu momen yang paling berkesan bagi kami, Mahasiswa Teknik Komputer Angkatan 2025 Universitas Diponegoro. Bertempat di kawasan Widya Puraya, kami berkumpul untuk mengabadikan kebersamaan dalam sebuah foto angkatan. Di balik senyum dan canda yang terekam, tersimpan semangat baru untuk memulai perjalanan panjang sebagai bagian dari keluarga besar Teknik Komputer. Foto ini bukan sekadar dokumentasi, tetapi juga pengingat akan awal langkah kami menempuh kehidupan perkuliahan."
    ],
    aspect: "landscape",
  },
  {
    title: "PKKMB DAY 3",
    image: "/src/assets/images/pkkmb-day2-2.jpg",
    description: [
      "Sesi presentasi kelompok jadi salah satu bagian seru di hari ketiga PKKMB. Tiap kelompok maju ke depan buat ngenalin identitas dan makna dari elemen yang udah mereka buat bareng-bareng. Ada yang tampil percaya diri, ada juga yang masih keliatan gugup, tapi semuanya tetap kompak dan saling dukung. Dari sinilah mulai keliatan karakter tiap kelompok, sekaligus kekompakan yang pelan-pelan mulai kebentuk di antara anak Tekkom angkatan baru."
    ],
    aspect: "portrait",
  },
  {
    title: "Simulasi Kebakaran",
    image: "/src/assets/images/simulasi-kebakaran.jpg",
    description: [
      "Suasana makin seru waktu simulasi kebakaran dimulai. Mahasiswa baru diajarin cara menghadapi keadaan darurat, dari pakai alat pemadam sampai kerja sama bareng tim. Awalnya banyak yang kikuk, tapi lama-lama suasananya jadi ramai dan penuh semangat. Di balik keseruannya, semua dapat pelajaran berharga tentang tanggung jawab dan kekompakan dalam situasi nyata."
    ],
    aspect: "portrait",
  },
  {
    title: "PKKMB DAY 1",
    image: "/src/assets/images/mars-tekkom.jpg",
    description: [
      "Hari pertama PKKMB Teknik Komputer jadi momen penuh semangat dan vibes positif dari para maba yang akhirnya resmi turun ke lapangan. Dengan outfit hitam putih dan atribut kebanggaan fakultas, mereka berdiri rapi sambil nyimak arahan panitia dengan antusias. Suasananya campur antara deg-degan, excited, dan rasa bangga bisa mulai perjalanan bareng keluarga baru di Tekkom."
    ],
    aspect: "portrait",
  },
  {
    title: "PKKMB DAY 2",
    image: "/src/assets/images/pkkmb-day2-1.jpg",
    description: [
      "Hari kedua PKKMB suasananya udah mulai cair. Tiap kelompok dapet giliran buat ngenalin elemen yang mewakili identitas tim mereka, lengkap dengan cerita di balik simbol yang dibuat bareng-bareng. Nggak cuma serius, tapi juga banyak momen lucu dan spontan yang bikin suasana makin hidup. Semua orang keliatan lebih akrab, udah mulai lepas dari rasa canggung di hari pertama."
    ],
    aspect: "portrait",
  },
  {
    title: "Study Group",
    image: "/src/assets/images/study-group.jpg",
    description: [
      "Kegiatan diskusi kelompok berlangsung seru. Setiap mahasiswa tampak antusias menyampaikan pendapat, sementara yang lain menyimak dengan penuh perhatian. Suasana ruangan yang ramai tapi teratur menunjukkan semangat belajar dan kolaborasi yang kuat di antara mereka."
    ],
    aspect: "landscape",
  },
]);

function openCard(item) {
  selectedCard.value = item;
}
</script>
