<template>
    <section class="min-h-screen grid grid-cols-1 lg:grid-cols-2 overflow-hidden items-center py-8 lg:py-0">
        <!-- Text Content -->
        <div class="px-4 md:px-8 lg:px-16 space-y-6 order-2 lg:order-1">
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-white">
                Buku <span
                    class="bg-gradient-to-r from-[#EE7A13] to-[#FFB370] bg-clip-text text-transparent">Digital</span>
                <br>
                <span class="bg-gradient-to-r from-[#EE7A13] to-[#FFB370] bg-clip-text text-transparent">Teknik</span>
                Komputer
            </h1>

            <p class="text-base md:text-lg lg:text-xl font-normal leading-relaxed text-gray-300 lg:max-w-2xl">
                Inilah identitas kami, Venco. Kami bukan cuma sekadar angkatan, tapi teman, partner, dan keluarga dalam
                satu perjalanan penuh tawa dan pengalaman.
                Yuk, kenalan dengan identitas kami lebih dekat✨
            </p>
        </div>

        <div class="relative h-80 md:h-96 lg:h-screen flex items-center justify-center p-6 md:p-8 order-1 lg:order-2">
            <img 
                src="/images/mascott.png" 
                alt="Hero Image" 
                class="max-w-full max-h-full object-contain animate-float w-auto h-auto"
            />
        </div>

    </section>
</template>

<script setup>
</script>

<style scoped>
@keyframes float {

    0%,
    100% {
        transform: translateY(0px);
    }

    50% {
        transform: translateY(-20px);
    }
}

.animate-float {
    animation: float 3s ease-in-out infinite;
}

/* Let Tailwind handle all responsiveness */
</style>