# PriorityAI - Feature Prioritization Tool 🚀

> Because deciding what to build next shouldn't be rocket science (but here we are with AI anyway)

A smart feature prioritization tool I built to help teams (and myself) figure out what features to work on next. It's got drag-and-drop, sentiment analysis, and some pretty charts because who doesn't love a good chart?

## What does it do? 🤔

- **📊 Dashboard**: See all your features and metrics at a glance with activity feed
- **📝 Feature Management**: Add, edit, delete features with filtering and sorting  
- **🎲 Priority Matrix**: Drag features around a 2x2 matrix (Impact vs Effort) - satisfying AF
- **🧠 Smart Prioritization**: AI-powered algorithm that combines 6 different metrics
- **😊 Feedback System**: People can leave feedback and get real-time sentiment analysis
- **📈 Analytics**: Usage trends, sentiment tracking, and performance metrics
- **🎯 Export & Demo**: Export data in multiple formats + interactive demo tour
- **⚡ Real-time Everything**: Instant sentiment analysis, live algorithm adjustments
- **📱 Responsive Design**: Works perfectly on mobile, tablet, and desktop

## Tech Stack 💻

- **React 18** - Because hooks are life
- **TypeScript** - Type safety is my love language
- **Tailwind CSS** - Utility classes go brrrr
- **Vite** - Fast builds, happy developer
- **Lucide React** - Pretty icons

No backend needed - everything runs in the browser with mock data. Perfect for demos and prototypes!

## Getting Started 🏃‍♂️

```bash
# Clone this bad boy
git clone https://github.com/yourusername/priority-ai.git
cd priority-ai

# Install the goods
npm install

# Fire it up
npm run dev
```

Open `http://localhost:5173` and you're golden ✨

## How to Use 📖

### Adding Features
1. Click the blue "Add Feature" button (hard to miss)
2. Fill out the form - title, description, impact/effort sliders
3. Hit save and watch it appear in your list

### Prioritizing Features
1. Go to the "Prioritization" page
2. Drag features between the quadrants:
   - **Quick Wins** (High Impact, Low Effort) - Do these first!
   - **Major Projects** (High Impact, High Effort) - Plan these carefully
   - **Fill-ins** (Low Impact, Low Effort) - When you're bored
   - **Questionable** (Low Impact, High Effort) - Maybe don't do these?

### Getting Feedback
1. Head to the "Feedback" section
2. Select a feature and add some feedback
3. Watch the sentiment analysis work its magic (😊 😐 😞)

## Project Structure 📁

```
src/
├── components/     # Reusable UI stuff
├── pages/         # Main app pages
├── hooks/         # Custom React hooks
├── utils/         # Helper functions (including my sentiment analyzer)
├── types/         # TypeScript definitions
└── data/          # Mock data for demo
```

## Features I'm Proud Of 😎

- **Smart Algorithm**: Combines 6 different metrics with customizable weights
- **AI Reasoning**: Algorithm explains WHY each feature gets its score
- **Drag & Drop**: Spent way too much time making this smooth but it's worth it
- **Real-time Sentiment**: Analyzes feedback instantly with emoji indicators
- **Usage Analytics**: Tracks trends and growth patterns
- **Responsive Design**: Works on your phone (tested it myself)
- **Clean Code**: TypeScript + proper component structure + good separation of concerns
- **No Backend**: Everything runs client-side with smart mock data
- **Interactive Demo**: Built-in tour that shows off all features
- **Export Ready**: CSV, JSON, and Markdown reports for stakeholders

## Known Issues 🐛

- Drag and drop might be wonky on mobile (working on it)
- Sentiment analysis only works in English (sorry international friends)
- No data persistence (refresh = data gone, it's a feature not a bug)

## Future Ideas 💡

- [ ] **User Authentication**: Multi-user support with roles and permissions
- [ ] **Data Persistence**: Local storage or real database integration
- [ ] **Advanced ML**: Better sentiment analysis with NLP models
- [ ] **Export Features**: CSV/PDF reports for stakeholders
- [ ] **Dark Mode**: Because every app needs it these days
- [ ] **Real Backend**: PostgreSQL + proper API
- [ ] **Team Features**: User roles, comments, notifications
- [ ] **Integrations**: Jira, GitHub, Slack webhooks
- [ ] **Mobile App**: React Native version
- [ ] **Predictive Analytics**: Forecast which features will succeed
- [ ] **A/B Testing**: Connect prioritization decisions to actual results

## Why I Built This 🤷‍♂️

Started as a weekend project to learn more about React drag-and-drop and ended up building a full prioritization tool with AI! Turns out organizing features is actually pretty fun when you have the right tools.

Also wanted to try building my own sentiment analysis instead of using an API - it's surprisingly effective for a simple keyword-based approach! The AI prioritization algorithm was the real challenge though - combining 6 different metrics in a way that actually makes sense.

**Fun fact**: The drag-and-drop matrix automatically updates your feature scores based on where you drop them. Drag something to "Quick Wins" and it becomes high impact, low effort. It's like magic, but with math! ✨

## Contributing 🤝

Found a bug? Have an idea? Feel free to:
- Open an issue
- Submit a PR
- Roast my code (constructively please) 
- Try the demo and let me know what you think
- Suggest new prioritization metrics or algorithm improvements

## License 📄

MIT - Do whatever you want with it, just don't blame me if it breaks 😅

---

Built with ☕, lots of Stack Overflow, and way too much time perfecting the drag-and-drop animations

*P.S. - Click the "Demo" button when you run it. I spent way too much time making that tour and I'm proud of it! 🎯*

*P.P.S. - If you're reading this and thinking "I could build this better," you're probably right. Show me how! 🚀*
