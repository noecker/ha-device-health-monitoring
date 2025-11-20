# Device Health Exclusions Frontend

This directory contains the frontend components for the Device Health Exclusions Manager custom panel.

## Development

### Prerequisites
- Node.js 18+ and npm

### Setup
```bash
npm install
```

### Build
```bash
npm run build
```

This will compile the TypeScript sources and output the bundled JavaScript to `../www/device-health-panel.js`.

### Watch Mode
```bash
npm run watch
```

## Architecture

- **src/device-health-panel.ts** - Main panel component
- **src/components/** - UI components (table, filters, etc.)
- **src/data/** - WebSocket API client
- **src/styles/** - Shared styles
- **src/types.ts** - TypeScript type definitions

## Built with

- [Lit](https://lit.dev/) - Web components library
- TypeScript
- Rollup - Module bundler
