<template>
    <section class=" h-screen grid lg:grid-cols-2 overflow-hidden items-center">
        <div class="px-8 lg:px-16 space-y-6">
            <h1 class="text-6xl font-semibold leading-tight">
                Buku <span
                    class="bg-gradient-to-r from-[#EE7A13] to-[#FFB370] bg-clip-text text-transparent">Digital</span>
                <br>
                <span class="bg-gradient-to-r from-[#EE7A13] to-[#FFB370] bg-clip-text text-transparent">Teknik</span>
                Komputer
            </h1>

            <p class="text-xl font-normal leading-relaxed">
                Inilah identitas kami, Venco. Kami bukan cuma sekadar angkatan, tapi teman, partner, dan keluarga dalam
                satu perjalanan penuh tawa dan pengalaman.
                Yuk, kenalan dengan identitas kami lebih dekat✨
            </p>
        </div>

        <div class="relative h-screen flex items-center justify-center p-8">
            <img src="/images/mascott.png" alt="Hero Image" class="max-w-full max-h-full object-contain animate-float" />
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
</style>