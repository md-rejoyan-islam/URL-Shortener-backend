# URL Shortener Backend

✂️ A simple, fast, and efficient URL shortening service built with Node.js and Express.

## 🌟 Overview

Welcome to the **URL Shortener Backend**! This project powers a sleek and modern URL shortening service, allowing users to transform long, unwieldy URLs into short, shareable links. Paired with its [frontend counterpart](https://github.com/md-rejoyan-islam/URL-Shortener-frontend), this backend provides a robust API for creating, retrieving, and redirecting shortened URLs.

🔗 **Live Preview**: [https://url-shortener-client-app.vercel.app/](https://url-shortener-client-app.vercel.app/)  
🌐 **Frontend Repository**: [github.com/md-rejoyan-islam/URL-Shortener-frontend](https://github.com/md-rejoyan-islam/URL-Shortener-frontend)

## 🚀 Features

- **Shorten URLs**: Convert long URLs into concise, unique short codes.
- **Redirect**: Seamlessly redirect users from short URLs to their original destinations.
- **Scalable**: Built with Node.js and Express for performance and scalability.
- **Easy Integration**: RESTful API designed for effortless frontend connectivity.

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js, TypeScript, REST API
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT
- **Languages**: JavaScript (ES6+)

## 🌐 API Routes

Here are all the available API endpoints with details:

| Method | Endpoint                | Description                               |
| ------ | ----------------------- | ----------------------------------------- |
| GET    | `/ `                    | Welcome to URL                            |
| GET    | `/health`               | Health check endpoint                     |
| GET    | `/:id`                  | Redirects to the URL of short url         |
| POST   | `/api/v1/auth/register` | Registers a new user                      |
| POST   | `/api/v1/auth/login`    | Logs in a user                            |
| GET    | `/api/v1/auth/me`       | Retrieves logged-in user details          |
| GET    | `/api/v1/url`           | Retrieves all URLs for the logged-in user |
| POST   | `/api/v1/url`           | Creates a new shortened URL               |
| GET    | `/api/v1/url/analytics` | Retrieves analytics for user's URLs       |
| GET    | `/api/v1/url/:shortUrl` | Retrieves details of a specific short URL |
| PATCH  | `/api/v1/url/:shortUrl` | Updates a specific short URL              |
| DELETE | `/api/v1/url/:id`       | Deletes a specific URL by ID              |
| GET    | `/:shortCode`           | Redirects to the original URL             |

## 📬 Contact

Got questions, ideas, or just want to say hi? Reach out!

- **Author**: Md Rejoyan Islam
- **GitHub**: [md-rejoyan-islam](https://github.com/md-rejoyan-islam)
- **LinkedIn**: [Md Rejoyan Islam](https://www.linkedin.com/in/md-rejoyan-islam/)
- **Portfolio**: [https://md-rejoyan-islam.github.io](https://md-rejoyan-islam.github.io)
- **Email**: [rejoyanislam0014@gmail.com](mailto:rejoyanislam0014@gmail.com)

## 🌟 Show Your Support

If you like this project, give it a ⭐ on GitHub! It means the world to me and keeps the motivation flowing.
