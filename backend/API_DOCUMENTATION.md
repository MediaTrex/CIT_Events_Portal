# API Documentation

This file provides a complete reference for all backend endpoints defined in `swagger.yaml`. It is organized by resource groups (Authentication, Users, Events, Teams, Registrations, Notifications, Payments, Results, Announcements). Each section lists endpoints, HTTP methods, summary, request parameters, request body schemas, responses, and example payloads.

---

## Authentication

### POST `/auth/register`
- **Summary**: Register a new user (admin creates user)
- **Request Body**: `application/json`
  ```json
  {
    "email": "user@example.com",
    "password": "securePassword123",
    "role": "student"
  }
  ```
- **Responses**:
  - `201 Created`: User successfully registered.
  - `400 Bad Request`: Validation error.
  - `409 Conflict`: User already exists.

### POST `/auth/login`
- **Summary**: Authenticate a user and receive a JWT.
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "securePassword123"
  }
  ```
- **Responses**:
  - `200 OK`: Returns JWT token.
  - `401 Unauthorized`: Invalid credentials.

---

## Users

### GET `/users`
- **Summary**: Retrieve list of users (admin only).
- **Security**: Requires admin JWT.
- **Responses**:
  - `200 OK`: Array of user objects.

### GET `/users/{id}`
- **Summary**: Get user by ID.
- **Parameters**:
  - `id` (path) – User GUID.
- **Responses**:
  - `200 OK`: User object.
  - `404 Not Found`: User does not exist.

---

## Events

### POST `/events`
- **Summary**: Create a new event (organizer role).
- **Request Body**:
  ```json
  {
    "title": "Hackathon 2026",
    "description": "24‑hour coding competition",
    "startDate": "2026-09-01T09:00:00Z",
    "endDate": "2026-09-02T18:00:00Z",
    "location": "Campus Hall",
    "capacity": 200
  }
  ```
- **Responses**:
  - `201 Created`: Event created.
  - `400 Bad Request`: Validation error.

### GET `/events`
- **Summary**: List all public events.
- **Responses**:
  - `200 OK`: Array of event objects.

---

## Teams

### POST `/teams`
- **Summary**: Create a team for an event.
- **Request Body**:
  ```json
  {
    "eventId": "event‑uuid",
    "name": "Team Alpha",
    "maxMembers": 5
  }
  ```
- **Responses**:
  - `201 Created`: Team created.

### GET `/teams/{eventId}`
- **Summary**: List teams for a specific event.
- **Parameters**:
  - `eventId` (path) – Event GUID.
- **Responses**:
  - `200 OK`: Array of teams.

---

## Registrations

### POST `/registrations`
- **Summary**: Register a user for an event.
- **Request Body**:
  ```json
  {
    "eventId": "event‑uuid",
    "userId": "user‑uuid"
  }
  ```
- **Responses**:
  - `201 Created`: Registration saved.
  - `400 Bad Request`: Validation error.

---

## Notifications

### POST `/notifications`
- **Summary**: Send a notification (admin/organizer).
- **Request Body**:
  ```json
  {
    "title": "Event Reminder",
    "message": "Don't forget the hackathon tomorrow!",
    "userIds": ["user‑uuid1", "user‑uuid2"]
  }
  ```
- **Responses**:
  - `202 Accepted`: Notification queued.

---

## Payments

### POST `/payments`
- **Summary**: Process a payment for an event registration.
- **Request Body**:
  ```json
  {
    "registrationId": "reg‑uuid",
    "amount": 49.99,
    "currency": "USD",
    "paymentMethod": "credit_card",
    "paymentToken": "tok_visa_123"
  }
  ```
- **Responses**:
  - `200 OK`: Payment successful.
  - `402 Payment Required`: Payment failed.

---

## Results

### POST `/results`
- **Summary**: Publish results for an event (organizer).
- **Request Body**:
  ```json
  {
    "eventId": "event‑uuid",
    "winners": ["team‑uuid1", "team‑uuid2"]
  }
  ```
- **Responses**:
  - `201 Created`: Results published.

---

## Announcements

### POST `/announcements`
- **Summary**: Create a public announcement.
- **Request Body**:
  ```json
  {
    "title": "New Features",
    "content": "We have added new event categories!",
    "expiresAt": "2026-12-31T23:59:59Z"
  }
  ```
- **Responses**:
  - `201 Created`: Announcement created.

---

*All endpoints include standard error responses (`500 Internal Server Error` for unexpected failures) and use JWT authentication where indicated.*

---
