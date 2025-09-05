<script setup lang="ts">
import LottieAnimation from '../../ui/LottieAnimation.vue';

</script>

<template>
    <section id="logo-intro" class="relative flex flex-col  items-center justify-center py-20 overflow-hidden">
        <div class="relative">
            <LottieAnimation :animation-data="mascotAnimation" :height="400" :width="400" class="mx-auto" />
        </div>
        <div class="text-center flex my-10 font-medium text-5xl ">
            <h2>
                Welcome to the Digital Book of<br />
                Computer Engineering '25
            </h2>
        </div>
    </section>
</template>