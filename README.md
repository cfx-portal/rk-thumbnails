# Thumbnail Maker

A modern, customizable thumbnail generator inspired by the stunning graphics used in CFX's announcements. Create professional-looking thumbnails with dynamic themes, custom text, and image integration.

## Inspiration

This project draws inspiration from the GFX used in CFX's official announcements in the CFX Discord.

## Tech Stack

- **Frontend Framework**: Vue 3
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Package Manager**: pnpm
- **Icons**: Font Awesome
- **Image Generation**: html2canvas

## Features

- **Dynamic Themes**: Multiple color schemes categorized as Dark, Light, and Colorful
- **Image Integration**: Add custom images via URL input
- **Text-Only Mode**: Toggle between layouts
- **Grid Overlay**: Optional background grid pattern
- **Real-time Preview**: Live preview of your thumbnail as you make changes
- **Responsive Design**: Modern UI with smooth transitions and hover effects

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/9zku/rk-thumbnails.git
   cd rk-thumbnails
   ```

2. **Install dependencies**
   ```bash
   pnpm i
   ```

3. **Start development server**
   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

## Important: Local Development Required

**This project is not currently hosted online and must be run on a local development server.**

This tool requires a local development environment to function properly. As I do NOT feel like making a website to host this.

## Customization

### Adding New Themes
Themes are defined in `src/stores/savedThemes.ts`. Each theme includes:
