# Truth Check Dashboard

## Project Overview

Truth Check Dashboard is a web-based fact-checking application developed to analyze and verify the authenticity of news articles, text claims, and URLs. The system helps users identify potentially fake or misleading information by generating authenticity scores and providing detailed verification results through an interactive dashboard.

The application also displays related content and similar news articles below the user's input, allowing users to compare information and gain additional context before making decisions.

## Features

* Text claim verification and analysis
* URL authenticity and trustworthiness analysis
* Fake vs Real score generation
* Related news and content recommendations
* Activity history tracking
* RESTful API implementation using Express.js
* Request logging and rate limiting
* Health monitoring endpoint
* User-friendly dashboard interface

## Technologies Used

* HTML5
* CSS3
* JavaScript
* Node.js
* Express.js
* CORS

## Project Structure

* `fake-info-dash.html` – Frontend dashboard interface
* `server.js` – Backend server and API endpoints
* `fast_check_service.js` – Fact-checking and analysis logic
* `SIM_DB.js` – Simulated database operations
* `Testing Dataset.txt` – Sample dataset for testing

## How the System Works

1. The user enters a news article, text claim, or URL.
2. The application processes the input using the fact-checking service.
3. Authenticity scores are generated based on predefined analysis logic.
4. The system classifies the content and provides verification results.
5. Related news and similar content are displayed below the user's input.
6. The query and analysis results are stored for history tracking.

## Installation & Usage

### 1. Clone Repository

```bash
git clone https://github.com/Sabthika-2503/truth-check-dashboard.git
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Server

```bash
node server.js
```

### 4. Open Application

Backend Server:

```text
http://localhost:3000
```

Frontend Application:

```text
http://127.0.0.1:5500/fake-info-dash.html
```

## API Endpoints

### Health Check

```http
GET /api/health
```

### Analyze Text

```http
POST /api/analyze/text
```

### Analyze URL

```http
POST /api/analyze/url
```

### View History

```http
GET /api/history
```

## Benefits

* Helps users identify misleading information
* Encourages informed decision-making
* Provides supporting content for comparison
* Improves awareness of fake news and misinformation
* Demonstrates full-stack web development concepts

## Future Enhancements

* AI-powered fact-checking using Machine Learning
* Real-time news source verification
* Integration with external fact-checking APIs
* MongoDB database integration
* User authentication and authorization
* Advanced analytics dashboard
* Multi-language support
* Real-time trending news analysis

## Author

**Sabthikaroselin**

## Project Type

Final Year Full Stack Development Project
