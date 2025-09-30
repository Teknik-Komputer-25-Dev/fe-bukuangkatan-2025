# Utils

Direktori ini berisi utility functions dan constants yang dapat digunakan di seluruh aplikasi.

## Files

### `constants.js`
Berisi konstanta dan konfigurasi yang digunakan di seluruh aplikasi:
- **BREAKPOINTS**: Responsive breakpoints mengikuti Tailwind CSS
- **ANIMATION_SIZES**: Konfigurasi ukuran animasi untuk berbagai screen size
- **getScreenSize()**: Helper function untuk menentukan kategori ukuran layar

## Contoh Penggunaan

```javascript
import { BREAKPOINTS, ANIMATION_SIZES, getScreenSize } from '@/utils/constants';

// Menggunakan breakpoints
if (windowWidth < BREAKPOINTS.md) {
  // mobile logic
}

// Mendapatkan screen size category
const screenCategory = getScreenSize(1024); // returns 'large'

// Menggunakan animation sizes
const size = ANIMATION_SIZES.mobile; // { width: 250, height: 250 }
```