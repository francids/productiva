![Productiva Mente Icon](./resources/Icon.svg)

# Productiva Mente

![Productiva Mente Web Version](https://img.shields.io/badge/Productiva%20Mente%20Web-v1.3.1-6cfe8f)
[![Frontend Netlify Status](https://api.netlify.com/api/v1/badges/765e73e4-2d31-4ea1-958c-fea0d7118eaa/deploy-status)](https://app.netlify.com/sites/productiva-mente/deploys)
[![docs-pages-build-deployment](https://github.com/francids/productiva-mente/actions/workflows/pages/pages-build-deployment/badge.svg?branch=docs%2Fproduction)](https://github.com/francids/productiva-mente/actions/workflows/pages/pages-build-deployment)

**Productiva Mente** is a task and note management application designed with the Material design guidelines.

<picture>
  <source media="(prefers-color-scheme: light)" srcset="./resources/screenshots/Home%20screen%20(light).png">
  <source media="(prefers-color-scheme: dark)" srcset="./resources/screenshots/Home%20screen%20(dark).png">
  <img alt="Home screen" src="./resources/screenshots/Home%20screen%20(light).png">
</picture>

## Features

- **Free and Open Source**: Use and contribute to this project at no cost.
- **Guaranteed Privacy**: Your data is stored locally, ensuring your privacy.
- **Ad-Free**: Enjoy an interruption-free experience.

## Application Access

The web app is available at: [https://productiva.francids.com/](https://productiva.francids.com/)s

## Monorepo Structure

This repository uses [pnpm](https://pnpm.io/) to manage multiple applications:

- `web`: Angular web application
- `desktop`: Electron desktop application

Workspace configuration is in `pnpm-workspace.yaml`.

> **Note**: The mobile application code is included in this repository under [`mobile`](./mobile). It is developed separately using Jetpack Compose.

## Getting Started

- Install dependencies with `pnpm install`
- Run the web app with `pnpm --prefix web start`
- Build the web app with `pnpm --prefix web build`
- Run the desktop app with `pnpm --prefix desktop start`
- Build the desktop app with `pnpm --prefix desktop package`

See each package's `README.md` for more details.
