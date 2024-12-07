# AI-Powered SOP Creator

A modern web application for creating and managing Standard Operating Procedures with AI assistance, resource tracking, and cost analysis.

## Features

- 🤖 AI-assisted SOP creation
- 📊 Resource and task management dashboard
- 📈 Cost analysis and tracking
- 🔄 Gantt chart visualization
- 🔐 Secure authentication with Clerk
- 💾 Database support (SQLite for development, PostgreSQL for production)

## Tech Stack

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- Tremor for UI components
- Prisma with SQLite/PostgreSQL
- OpenAI API
- Clerk Authentication
- Mermaid.js for Gantt charts

## Getting Started

1. Clone the repository:
\`\`\`bash
git clone https://github.com/MaxRonchi/sop-ai-creator.git
cd sop-ai-creator
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables:
Create a .env file with the following variables:
\`\`\`
# For development (SQLite)
DATABASE_URL="file:./prisma/dev.db"

# For production (PostgreSQL)
# DATABASE_URL="postgresql://postgres:postgres@localhost:5432/sop_creator"

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key
OPENAI_API_KEY=your_openai_api_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
\`\`\`

4. Initialize the database:
\`\`\`bash
# Generate Prisma Client
npx prisma generate

# Push the schema to the database
npx prisma db push

# If using PostgreSQL in production, you'll need to run migrations:
# npx prisma migrate dev
\`\`\`

5. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

Visit http://localhost:3000 to see the application.

## Database Configuration

### Development (SQLite)
The project uses SQLite by default for development, which requires no additional setup. The database file will be created automatically at `prisma/dev.db`.

### Production (PostgreSQL)
For production, it's recommended to use PostgreSQL:

1. Install PostgreSQL on your system
2. Create a new database:
\`\`\`bash
createdb sop_creator
\`\`\`
3. Update the DATABASE_URL in your .env file
4. Run migrations:
\`\`\`bash
npx prisma migrate deploy
\`\`\`

## Project Structure

- `/src/app` - Next.js application routes and API endpoints
- `/src/components` - Reusable React components
- `/src/lib` - Utility functions and database client
- `/prisma` - Database schema and migrations

## Contributing

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
