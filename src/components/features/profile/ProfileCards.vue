<template>
    <div class="min-h-screen bg-white">
      <div class="flex justify-center mt-3">
        <div class="p-6 grid grid-cols-4 gap-6">
          <div
            v-for="(item, index) in data"
            :key="index"
            class="border border-[#d9d9d9] rounded-xl shadow-sm p-4 flex flex-col items-start"
          >
            <!-- Image -->
            <div class="w-full flex justify-center">
              <img
                v-if="item.img"
                :src="item.img"
                alt="profile"
                class="w-40 h-40 object-cover rounded-xl mb-4"
              />
              <div v-else class="w-40 h-40 bg-[#d9d9d9] rounded-xl mb-4"></div>
            </div>
  
            <!-- Content -->
            <h2 class="font-medium text-sm text-left">{{ item.title }}</h2>
            <p class="text-xs text-gray-700 text-left">{{ item.subtitle }}</p>
            <p class="text-xs text-gray-500 text-left">{{ item.id }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import Arsa02 from "@/assets/images/demoProfile/21120125120002.jpg";
  import Diaz03 from "@/assets/images/demoProfile/21120125120003.jpg";
  import Dinda04 from "@/assets/images/demoProfile/21120125120004.jpg";
  import Octa12 from "@/assets/images/demoProfile/21120125120012.jpg";
  import Andra18 from "@/assets/images/demoProfile/21120125120018.jpg";
  import Danis21 from "@/assets/images/demoProfile/21120125120021.jpg";
  import Alisha23 from "@/assets/images/demoProfile/21120125120023.jpg";
  import Jati28 from "@/assets/images/demoProfile/21120125120028.jpg";
  
  const data = [
    {
      img: Arsa02,
      title: "Arsa",
      subtitle: "Arsa Rafif Parama",
      id: "21120125120002",
    },
    {
      img: Diaz03,
      title: "Diaz",
      subtitle: "Diaz Ridho Yuristianto",
      id: "21120125120003",
    },
    {
      img: Dinda04,
      title: "Nay",
      subtitle: "Dinda Naysilla Aziz",
      id: "21120125120004",
    },
    {
      img: Octa12,
      title: "Octa",
      subtitle: "Octavian Dwi Ramadhan",
      id: "21120125120012",
    },
    {
      img: Andra18,
      title: "Andra",
      subtitle: "Ardiva Arya Diandra",
      id: "21120125120018",
    },
    {
      img: Danis21,
      title: "Danis",
      subtitle: "Danis Audric Mahadana",
      id: "21120125120021",
    },
    {
      img: Alisha23,
      title: "Alisha",
      subtitle: "Alisha Putri Cahya Kirani",
      id: "21120125120023",
    },
    {
      img: Jati28,
      title: "Jati",
      subtitle: "Dwi Jati Nugroho",
      id: "21120125120028",
    },
  ];
  </script>
