# Stores

Direktori ini berisi Pinia stores untuk state management.

## Struktur yang Direkomendasikan

Untuk setiap store, buat file terpisas dengan nama yang deskriptif:

```
stores/
├── useAuthStore.js      # Authentication state
├── useUserStore.js      # User data
├── useUIStore.js        # UI state (theme, modals, etc)
└── useDataStore.js      # Application data
```

## Contoh Store

```javascript
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0
  }),
  
  getters: {
    doubleCount: (state) => state.count * 2
  },
  
  actions: {
    increment() {
      this.count++
    }
  }
})
```