<script setup lang="ts">
import ShowcaseCarousel from '../../ui/ShowcaseCarousel.vue';

</script>

<template>
    <section class="relative min-h-screen flex py-32 w-full">
        <div class="flex flex-col justify-center align-center mt-12">
            <div class="flex justify-between w-full mx-12">
                <div class="flex-1 justify-center flex">
                    <span class="text-6xl font-bold text-gray-700">
                        MASKOT
                    </span>
                </div>
                <div class="flex-2">
                    <span class="text-xl ">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
                        aute irure dolor in
                    </span>
                </div>

            </div>

            <div>
                <ShowcaseCarousel />
            </div>
        </div>


    </section>
</template>