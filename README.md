# Hotel Booking - INT3509

## Stack

### Frontend

1. Vite
2. React

### Backend

1. Spring (Spring Boot, Spring Security)
2. PostgreSQL

### Build

- [Docker](https://www.docker.com/)
- [Neon Database (Cloud Database)](https://neon.tech/)
- [Render (Cloud Application Platform)](https://render.com/)
- [Netlify (Hosting Frontend)](https://www.netlify.com/)

## Branch structure

![image.png](image.png)

### Explain

- **Main**: Store the code in production
- **Develop**: Store code, new develop features
- **Hotfix**: Quickly solve bugs in **Main** branch
- **Other branches**: Branch for each developer

### Flow

- Develop on **developer’s branch**
- Commit code to branch → Create **merge request** to **develop** branch
- Test in **develop** branch → Merge to **main** branch
- If have any minor bugs need to fix quickly, use **hotfix** branch

## Requirements

- Java 17
- NodeJS
- Node Package Manager (npm) or Yarn

## Installation

- Clone the repository

```jsx
git clone https://github.com/dngKwngg/Hotel_Booking.git
```

- Navigate to new created folder

```jsx
cd Hotel_Booking
```

### Frontend

- Navigate to frontend folder

```jsx
cd client
```

- Install packages

```jsx
npm i
```

- Start on localhost

```jsx
npm run dev
```

### Backend

- Navigate to backend folder

```jsx
cd server
```

- Build the project

```jsx
mvn clean install
```

- Run the project on port 8080

### Databases

- Relationship

| **Table** | **Related Table** | **Relationship Type** | **Description**                                                           |
| --- | --- |-----------------------|---------------------------------------------------------------------------|
| `roles` | `users` | One-to-Many           | A role can have many users, but a user has only one role.                 |
| `provinces` | `hotels` | One-to-Many           | A province can have many hotels, but a hotel belongs to one province.     |
| `hotels` | `rooms` | One-to-Many           | A hotel can have many rooms, but a room belongs to one hotel.             |
| `hotels` | `hotel_rooms` | One-to-Many           | A hotel can have multiple room types.                                     |
| `hotels` | `hotel_amenities` | One-to-Many           | A hotel can have multiple amenities.                                      |
| `room_types` | `hotel_rooms` | One-to-Many           | A room type can be available in multiple hotels.                          |
| `room_types` | `rooms` | One-to-Many           | A room type can be assigned to multiple rooms.                            |
| `rooms` | `booking_details` | One-to-Many           | A room can be booked multiple times.                                      |
| `users` | `bookings` | One-to-Many           | A user can have many bookings, but a booking belongs to one user.         |
| `hotels` | `bookings` | One-to-Many           | A hotel can have many bookings, but a booking belongs to one hotel.       |
| `bookings` | `booking_details` | One-to-Many           | A booking can include multiple room bookings.                             |
| `bookings` | `payments` | One-to-One            | A booking has only one payment record.                                    |
| `bookings` | `reviews` | One-to-Many           | A booking can have one review, but a review belongs to one user.          |
| `users` | `reviews` | One-to-Many           | A user can write multiple reviews, but a review belongs to one user.      |
| `amenities` | `hotel_amenities` | One-to-Many           | An amenity can belong to multiple hotels.                                 |
| `rooms` | `booking_details` | One-to-Many           | A room can be booked multiple times but belongs to one booking at a time. |