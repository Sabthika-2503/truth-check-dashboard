# Truth Check Dashboard

## Project Overview

Truth Check Dashboard is a web-based fact-checking application developed to analyze the authenticity of news content, text claims, and URLs. The system helps users identify potentially fake or misleading information by generating authenticity scores and providing detailed verification results through an interactive dashboard.

In addition to fact-checking, the application displays related content and similar news articles below the user's input, helping users compare information and gain additional context before making conclusions.

## Key Features

* Text claim verification and analysis
* URL authenticity and trustworthiness analysis
* Fake vs Real score generation
* Related news/content recommendations
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

1. The user enters a news article, claim, or URL.
2. The application processes the input using the fact-checking service.
3. Authenticity scores are generated based on predefined analysis logic.
4. The system classifies the content and provides a verification result.
5. Related news and similar content are displayed below the user's input to provide additional context.
6. The query and analysis results are stored in the database for history tracking.

## API Endpoints

### Health Check

GET /api/health

### Analyze Text

POST /api/analyze/text

### Analyze URL

POST /api/analyze/url

### View History

GET /api/history

## Benefits

* Helps users identify misleading information
* Encourages informed decision-making
* Provides supporting related content for comparison
* Improves awareness of fake news and misinformation
* Demonstrates full-stack web development concepts

## Installation

1. Clone repository

git clone https://github.com/yourusername/truth-check-dashboard.git

2. Install dependencies

npm install

3. Run server

node server.js

4. Open application

http://localhost:3000

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

Sabthikaroselin

## Project Type

Final Year Full Stack Development Project
