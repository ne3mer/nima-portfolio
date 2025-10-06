# 🖼️ Hero Image Setup Guide

## How to Add Your Image to the Hero Section

### Step 1: Add Your Image

1. Place your image file in the `public/images/` folder
2. Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`
3. Recommended size: 1920x1080 or higher for best quality

### Step 2: Update the Image Path

In `src/pages/Home.tsx`, update the `heroImageSrc` variable:

```typescript
const heroImageSrc = "/images/your-image-name.jpg";
```

### Step 3: Alternative Options

#### Option A: Local Image

```typescript
const heroImageSrc = "/images/my-hero-image.jpg";
```

#### Option B: External URL

```typescript
const heroImageSrc = "https://example.com/your-image.jpg";
```

#### Option C: No Image (Fallback)

```typescript
const heroImageSrc = undefined; // Will use animated gradient background
```

## 🎨 What the Hero Image Component Does

The `HeroImage` component creates a **mind-blowing blur effect** with:

### ✨ Multiple Blur Layers

- **Base Layer**: 40px blur with 30% brightness
- **Medium Layer**: 20px blur with 50% brightness
- **Light Layer**: 10px blur with 70% brightness
- **Focus Layer**: 2px blur with 80% brightness (center focus)

### 🌈 Dynamic Color Overlays

- Animated gradient overlays that cycle through purple, cyan, and orange
- 10-second color transitions for a living, breathing effect
- Radial gradients that enhance the image colors

### 🎭 Visual Effects

- **Scaling Animations**: Each layer scales independently
- **Opacity Pulsing**: Creates depth and movement
- **Noise Texture**: Adds subtle texture overlay
- **Mask Effects**: Center focus with radial mask

### 🎯 Performance Features

- **Lazy Loading**: Image loads only when needed
- **Smooth Transitions**: 1-second fade-in when loaded
- **GPU Acceleration**: All effects use CSS transforms
- **Responsive**: Works on all screen sizes

## 🚀 Example Usage

```typescript
// In src/pages/Home.tsx
export default function Home() {
  const heroImageSrc = "/images/portrait.jpg";

  return (
    <div className="relative">
      <CursorRipple />
      <Hero heroImageSrc={heroImageSrc} />
      {/* ... other sections */}
    </div>
  );
}
```

## 🎨 Customization Options

You can modify the blur effects in `src/components/HeroImage.tsx`:

- **Blur Amounts**: Change the `blur()` values (2px, 10px, 20px, 40px)
- **Brightness**: Adjust the `brightness()` values (0.3, 0.5, 0.7, 0.8)
- **Animation Speed**: Modify the `duration` values in transitions
- **Color Overlays**: Change the gradient colors in the overlay section

## 📱 Responsive Behavior

The image automatically:

- Scales to cover the full viewport
- Maintains aspect ratio
- Works on mobile, tablet, and desktop
- Adapts to different screen orientations

## 🔧 Troubleshooting

### Image Not Showing?

1. Check the file path is correct
2. Ensure the image is in the `public/images/` folder
3. Verify the file extension matches the path
4. Check browser console for any errors

### Performance Issues?

1. Optimize your image size (recommended: under 2MB)
2. Use WebP format for better compression
3. Consider using a CDN for large images

### Want Different Effects?

1. Modify the blur values in `HeroImage.tsx`
2. Adjust the gradient colors
3. Change animation durations
4. Add more layers for different effects

---

**Ready to create a mind-blowing hero section? Just add your image and watch the magic happen! ✨**
