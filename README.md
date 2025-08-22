# Wealth and Asset Manager

A full-stack web application for managing personal finances, tracking assets, and monitoring portfolio growth over time.

## Features

- **Asset Tracking**: Add, edit, and delete financial assets with detailed information
- **Portfolio Visualization**: View asset allocation through interactive pie charts
- **Growth Monitoring**: Track portfolio value changes over time with line graphs
- **Conscious Spending Plan (CSP)**: Manage and categorize spending across:
  - Expenses
  - Savings
  - Investments
  - Guilt-free spending

## Tech Stack

### Frontend
- React + Vite
- TailwindCSS
- Flowbite React
- Recharts for data visualization
- Axios for API calls

### Backend
- Node.js
- Express
- MongoDB
- JWT for authentication

## Getting Started

### Prerequisites
- Node.js
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```sh
git clone [repository-url]
```

2. Install dependencies for client
```sh
cd client/wealth-and-asset-manager
npm install
```

3. Install dependencies for server
```sh
cd server
npm install
```

4. Create `.env` files:

Client `.env`:
```sh
VITE_SERVER_API=[your-api-url]
VITE_COMING_SOON_PROD=[true/false]
```

Server `.env`:
```sh
MONGODB_URI=[your-mongodb-uri]
PORT=3000
```

5. Start the development servers

For client:
```sh
npm run dev
```

For server:
```sh
npm start
```

## Features in Development

- Recent activity tracking
- Real-time API data integration for stock prices
- Enhanced portfolio analytics

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for
