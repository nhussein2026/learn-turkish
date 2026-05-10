# 🇹🇷 Learn Turkish (learn-turkish.io)

A premium, interactive web application designed to help users master the Turkish language through a structured, data-driven approach.

## 🚀 Key Features

- **🧩 Agglutination Visualizer**: A unique tool to understand how Turkish suffixes attach to word roots in real-time.
- **📚 Comprehensive Content**: Structured YAML-based content for Words, Grammar, Suffixes, and Example Sentences.
- **🧠 Practice Modes**:
  - **Flashcards**: Quick-fire memory training.
  - **Quiz Engine**: Test your knowledge on grammar and vocabulary.
  - **Sentence Builder**: Interactive drag-and-drop tool to construct Turkish sentences.
- **🔍 Advanced Search**: Find any word or suffix instantly using Fuse.js.
- **🌍 Multi-language Support**: Interface available in English, Arabic, and Turkish.
- **📊 Progress Tracking**: Built-in persistence to save your learning journey.

## 🛠️ Tech Stack

- **Framework**: [Astro 6.0](https://astro.build/) (Static Site Generation)
- **UI Components**: [Preact](https://preactjs.com/) for high-performance interactivity.
- **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com/) for a modern, responsive design.
- **State Management**: Nanostores for lightweight reactive state.
- **Deployment**: Optimized for [Netlify](https://www.netlify.com/).

## 🚦 Getting Started

### Prerequisites
- Node.js (>= 22.12.0)
- Yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/nhussein2026/learn-turkish.git

# Install dependencies
yarn install
```

### Development
```bash
# Start the local development server
yarn dev
```

### Build
```bash
# Build for production
yarn build
```

## 🌐 Deployment

This project is configured for **Netlify**. 

1. Push your changes to GitHub.
2. Connect your repo to Netlify.
3. Use the following settings (automatically handled by `netlify.toml`):
   - **Build Command**: `yarn build`
   - **Publish Directory**: `dist`

---
*Created by [Naser](https://github.com/nhussein2026)*
