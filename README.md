# Raisearch

Raisearch is a research paper assistant that helps you work with web sources. You can input web sources and chat with a content-aware LLM, which uses Retrieval-Augmented Generation (RAG) to retrieve relevant data from your sources. The application also features a markdown rich text editor for taking notes and drafting papers.

## Key Features

*   **Web Source Ingestion**: Import web articles and documents as sources for your research.
*   **Content-Aware AI Assistant**: Chat with an LLM that is aware of the content of your imported sources, using RAG to provide relevant and context-aware answers.
*   **Rich Text Editor**: A full-featured markdown editor based on Tiptap for drafting and writing.
*   **User Authentication**: Secure user login and registration handled by Supabase.
*   **Paper Management Dashboard**: A personal dashboard to manage and organize your research papers and associated sources.

## Tech Stack

*   **Framework**: [Next.js](https://nextjs.org/) (with Turbopack)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **UI**: [React](https://react.dev/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **Backend & Auth**: [Supabase](https://supabase.io/)
*   **Rich Text Editor**: [Tiptap](https://tiptap.dev/)
*   **LLM**: [Google Gemini](https://ai.google.dev/)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js (v20.x or higher)
*   npm, yarn, or pnpm

### Installation

1.  Clone the repo:
    ```sh
    git clone https://github.com/your_username/raisearch.git
    ```
2.  Install NPM packages:
    ```sh
    npm install
    ```
3.  Set up your environment variables by creating a `.env.local` file. You'll need to add your Supabase and Google Gemini API keys.
    ```
    NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
    NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
    GEMINI_API_KEY=YOUR_GEMINI_API_KEY
    ```

### Running the Application

*   **Development**:
    ```sh
    npm run dev
    ```
    This will start the development server with Turbopack.

*   **Build**:
    ```sh
    npm run build
    ```

*   **Start**:
    ```sh
    npm run start
    ```

## Project Structure

```
/
├── public/              # Static assets
├── src/
│   ├── app/             # Next.js App Router pages and layouts
│   │   ├── (auth)/      # Authentication routes
│   │   └── dashboard/   # User dashboard
│   ├── components/      # React components
│   │   ├── ui/          # UI components (buttons, cards, etc.)
│   │   └── PaperForm/
│   ├── lib/             # Core application logic
│   │   ├── db_service.ts # Database services
│   │   ├── llmService.ts # LLM services
│   │   └── search.ts    # RAG and search functionality
│   └── utils/           # Utility functions
│       └── supabase/    # Supabase client and middleware
└── ...
```