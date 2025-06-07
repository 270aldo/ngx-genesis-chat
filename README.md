# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/a7bc901c-f7e7-4551-ab21-949f9d00b0a3

## Purpose and Features

NGX Genesis Chat is a front‑end application showcasing a multi‑agent chat
experience. The project demonstrates a premium user interface and includes
several key features:

- **Advanced AI agents** – specialized agents capable of complex reasoning and
  task execution.
- **Real‑time processing** – quick streaming responses with instant feedback.
- **Premium interface** – a modern glassmorphism style with fluid animations.

## Installation

Clone the repository and install the dependencies using npm:

```sh
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
npm install
```

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/a7bc901c-f7e7-4551-ab21-949f9d00b0a3) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## Development

Use the following commands during development:

```sh
npm run dev   # Start the local dev server
npm run lint  # Lint the project with ESLint
```

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Architecture

The source code resides in the `src/` folder and is organized as follows:

- **pages/** – top‑level routes rendered via React Router.
- **components/** – reusable UI pieces including chat and dashboard widgets.
- **store/** – Zustand stores for application state management.
- **styles/** – global styles built with Tailwind CSS.

`Vite` handles bundling and development, while the application entry point is
`src/main.tsx`, which mounts the `App` component.

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/a7bc901c-f7e7-4551-ab21-949f9d00b0a3) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
