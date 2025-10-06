# Nima Afshar Far - Portfolio Website

A modern, motion-driven portfolio website built with React, TypeScript, and Framer Motion. This portfolio showcases my work as a full-stack developer and creative engineer, featuring smooth animations, interactive elements, and a beautiful design system.

## ✨ Features

- **Motion-Driven Design**: Smooth animations and transitions using Framer Motion
- **Custom Cursor Effects**: Interactive cursor with ripple effects
- **Smooth Scrolling**: Buttery smooth scrolling with Lenis
- **Responsive Design**: Fully responsive across all devices
- **Project Showcase**: Detailed case studies for featured projects
- **Creative Playground**: Experimental demos and creative coding projects
- **Modern Tech Stack**: Built with the latest web technologies

## 🚀 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion
- **Smooth Scrolling**: Lenis
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **Deployment**: Vercel (recommended)

## 🎨 Design System

### Colors

- **Primary**: Electric Violet (#8A63FF)
- **Secondary**: Teal Cyan (#00FFC6)
- **Accent**: Warm Orange (#FFB547)
- **Background**: Near Black (#0A0A0A)
- **Foreground**: Soft White (#EDEDED)

### Typography

- **Display**: Space Grotesk
- **Body**: Inter
- **Mono**: JetBrains Mono

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── CursorRipple.tsx
│   ├── DitherImage.tsx
│   ├── MotionText.tsx
│   └── SmoothScrollProvider.tsx
├── sections/           # Page sections
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Work.tsx
│   ├── Playground.tsx
│   └── Contact.tsx
├── pages/              # Route components
│   ├── Home.tsx
│   └── CaseStudy.tsx
├── content/            # Project data
│   └── projects/
├── lib/                # Utility functions
│   ├── utils.ts
│   ├── motion.ts
│   └── scroll.ts
└── styles/             # Global styles
    └── globals.css
```

## 🛠️ Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd portfo
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 Key Features Explained

### Custom Cursor

The portfolio features a custom cursor that follows mouse movement and creates ripple effects on click, adding an interactive and playful element to the user experience.

### Smooth Scrolling

Implemented with Lenis for buttery smooth scrolling with momentum and easing, creating a premium feel throughout the site.

### Motion Design

Every element is carefully animated using Framer Motion, from text reveals to hover effects, creating a cohesive and engaging experience.

### Project Showcase

Each project has its own detailed case study page with:

- Project overview and challenges
- Technical solutions and results
- Interactive gallery
- Technology stack
- Live links and source code

### Creative Playground

A dedicated section for experimental projects and creative coding demos, showcasing technical creativity and innovation.

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with zero configuration

### Other Platforms

The project can be deployed to any static hosting platform:

- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Firebase Hosting

## 📱 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized for excellent user experience
- **Image Optimization**: Lazy loading and optimized formats
- **Code Splitting**: Automatic route-based code splitting
- **Bundle Size**: Optimized for fast loading

## 🎨 Customization

### Adding New Projects

1. Create a new JSON file in `src/content/projects/`
2. Follow the existing structure with required fields
3. Add project images to the assets folder
4. Update the projects array in `src/sections/Work.tsx`

### Modifying Colors

Update the color palette in `tailwind.config.js`:

```javascript
colors: {
  primary: {
    DEFAULT: 'hsl(258, 100%, 66%)', // Your primary color
    // ... other shades
  }
}
```

### Adding New Sections

1. Create a new component in `src/sections/`
2. Import and add to `src/pages/Home.tsx`
3. Style with Tailwind classes and Framer Motion animations

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📞 Contact

- **Email**: nima@example.com
- **LinkedIn**: [linkedin.com/in/nimaafsharfar](https://linkedin.com/in/nimaafsharfar)
- **GitHub**: [github.com/nimaafsharfar](https://github.com/nimaafsharfar)

---

Made with ❤️ in Budapest, Hungary
