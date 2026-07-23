<template>
  <section class="min-h-screen bg-slate-950 text-white px-4 py-12">
    <div class="mx-auto flex max-w-6xl flex-col gap-6">
      <header class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p class="text-sm uppercase tracking-[0.2em] text-slate-400">Admin</p>
          <h1 class="text-3xl font-semibold">Dashboard</h1>
          <p class="text-sm text-slate-400">Kelola konten melalui menu di bawah.</p>
        </div>
        <router-link to="/" class="text-sm font-semibold text-emerald-300 hover:text-emerald-200">
          ← Kembali ke beranda
        </router-link>
      </header>

      <div v-if="!isAdmin" class="rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-red-100">
        Anda tidak memiliki akses ke halaman ini.
      </div>

      <div v-else class="space-y-6">
        <div class="grid gap-4 sm:grid-cols-2">
          <router-link
            to="/admin/profiles"
            class="group rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg transition hover:border-emerald-300/60 hover:bg-white/10"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Data</p>
                <h2 class="text-xl font-semibold text-white">Edit Profiles</h2>
                <p class="text-sm text-slate-400">Kelola data mahasiswa & biodata.</p>
              </div>
              <span class="text-emerald-300">→</span>
            </div>
          </router-link>

          <router-link
            to="/admin/gallery"
            class="group rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg transition hover:border-emerald-300/60 hover:bg-white/10"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Media</p>
                <h2 class="text-xl font-semibold text-white">Edit Gallery</h2>
                <p class="text-sm text-slate-400">Kelola gambar dan urutan tampil.</p>
              </div>
              <span class="text-emerald-300">→</span>
            </div>
          </router-link>
        </div>

        <div class="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-lg">
          <router-view />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useAuth } from '@/composables/useAuth.js'

const { isAdmin } = useAuth()
</script>
