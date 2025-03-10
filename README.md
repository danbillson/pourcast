# Pourcast

Pourcast is a cocktail recommendation app that helps you discover cocktail recipes based on the ingredients you have at home. It's built with Next.js, React, and TypeScript.

## Features

- **Ingredient-Based Search**: Input the ingredients you have, and get cocktail recommendations that match what's in your bar.
- **Smart Filtering**: Cocktails are sorted by how closely they match your available ingredients.
- **Persistent Selections**: Your ingredient selections are saved in the URL, making it easy to share and revisit.
- **Recipe Details**: View detailed instructions, ingredients, and preparation steps for each cocktail.
- **Recipe Submission**: Share your own cocktail recipes with the community through a user-friendly form.
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices.
- **Accessible UI**: Designed with accessibility in mind, including keyboard navigation and screen reader support.
- **Server-Side Rendering**: Fast initial load times with server-rendered content.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom color palette (cream and espresso theme)
- **UI Components**: Custom components built with Radix UI primitives
- **State Management**: React Hooks, URL Search Params (nuqs)
- **Fonts**: Mix of serif and sans-serif typography for a distinctive look

## Project Structure

```
pourcast/
├── public/          # Static assets
├── src/
│   ├── app/         # Next.js App Router pages
│   │   ├── page.tsx             # Home page
│   │   └── recipe/[id]/page.tsx # Recipe detail page
│   ├── components/  # React components
│   │   ├── cocktail-card.tsx    # Card component for cocktail listings
│   │   ├── cocktail-list.tsx    # List of filtered cocktails
│   │   ├── hero.tsx             # Hero section on homepage
│   │   ├── ingredient-input.tsx # Ingredient selector with dropdown
│   │   ├── recipe-detail.tsx    # Detailed view of a recipe
│   │   └── recipe-submission-form.tsx # Form for submitting new recipes
│   ├── data/        # Static data
│   │   ├── cocktails.ts         # Cocktail recipes
│   │   └── ingredients.ts       # Available ingredients list
│   ├── hooks/       # Custom React hooks
│   │   └── useIngredients.ts    # Hook for managing ingredient state
│   └── lib/         # Utility functions and configuration
│       ├── client-params.ts     # Client-side query param configuration
│       └── search-params.ts     # Server-side query param handling
```

## Key Features Implementation

### Ingredient Selection and Filtering

The app uses a custom dropdown interface for ingredient selection, with the selected ingredients stored in the URL query parameters using nuqs. This allows for:

- Sharing filtered results via URL
- Persisting selections across browser sessions
- Server-side rendering of results

### Server and Client Integration

Pourcast leverages Next.js App Router for hybrid rendering:

- Server Components for static content and initial data loading
- Client Components for interactive elements
- URL state synchronization between server and client

## Workflow

This project is really a bit of a play around with _vibe coding_, I created the Product Requirements Doc with [ChatPRD](https://www.chatprd.ai/), tried [v0](https://v0.dev/) and [lovable](https://lovable.dev/) but ended up settling on using cursor with [cursor-tools](https://github.com/eastlondoner/cursor-tools/tree/main?tab=readme-ov-file#asking-gemini-for-a-plan) with Gemini, making use of the PRD to scaffold the app each time.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
