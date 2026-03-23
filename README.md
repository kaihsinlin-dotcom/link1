# Technician Assignment Planner

An Angular 19 application for simulating and comparing automatic technician assignments for meeting sessions. Converted from React (Figma-generated) to Angular Material components.

## Screenshots

### Runs Page
![Runs Page](https://github.com/user-attachments/assets/1f8bf655-8b12-47ae-81c2-6c1a678e12bb)

### New Assignment Run Dialog
![New Run Dialog](https://github.com/user-attachments/assets/9beaff49-5ebf-4cc7-bcab-afe9bed85c74)

### Parameter Sets Page
![Parameter Sets Page](https://github.com/user-attachments/assets/07e6c281-8e1e-429d-a726-d034489d3938)

## Tech Stack

- **Angular 19** (NgModule-based)
- **Angular Material** – tables, dialogs, chips, progress bars, forms
- **Angular CDK** – `SelectionModel` for checkbox selection
- **Reactive Forms** – New Run dialog with dynamic validation
- Custom SCSS for styling to match the Figma design

## Project Structure

```
src/app/
├── app.module.ts                  # Root NgModule
├── app-routing.module.ts          # Routes: /runs, /parameter-sets
├── app.component.*                # App shell
├── shared/
│   └── material.module.ts         # Shared Angular Material module
├── types/
│   └── assignment.ts              # TypeScript interfaces
├── data/
│   └── mock-data.ts               # Mock assignment runs & parameter sets
└── features/
    ├── runs/                      # Runs page (table + filters + selection)
    ├── parameter-sets/            # Parameter Sets page
    └── new-run-dialog/            # New Assignment Run modal (Reactive Form)
```

## Features

### Runs Page (`/runs`)
- **mat-table** with all columns: expand/collapse chevron, checkbox selection, Run ID, Description, Week of Run (with colored dot), Started, Assigned by, Score (progress bar), Last Improvement, Mode (chip), Snapshot count, Actions menu
- **Expand/collapse** version history rows (shown only when versions > 1)
- **Checkbox selection** with master checkbox (`SelectionModel`)
- **Compare** button (enabled only when exactly 2 runs are selected)
- **Filters**: Mode (All/Fixed/Continuous), Users, Weeks (`mat-select`)
- **Mode chips**: Fixed (filled blue), Continuous (outlined purple)
- **Actions menu**: Save, Stop, Delete per row

### Parameter Sets Page (`/parameter-sets`)
- **mat-table** with columns: Parameter Set ID, Name, Description, Created, Created By, Usage Count, Parameters (color-coded chips), Actions menu
- Parameter chips: Max Sessions, Skills Priority (color-coded), Overtime OK, Penalty Weight

### New Assignment Run Dialog
- **Week of Run**: dropdown with "Week X (2026)" labels (1–52)
- **Parameter Set**: dropdown populated from mock data
- **Mode**: Fixed / Continuous
- **Duration**: dropdown (0.5–24 hours) shown only for Fixed mode
- **Auto Snapshot Save**: toggle; when enabled shows interval input (minutes, required > 0)
- **Run** button disabled until form is valid
- On submit: logs the created run payload to the console

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Install & Run

```bash
npm install
npm start
```

Then open [http://localhost:4200](http://localhost:4200) in your browser. The app automatically redirects to `/runs`.

### Build

```bash
npm run build
```

Production output is placed in `dist/link1`.

### Run Tests

```bash
npm test
```
