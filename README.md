# Hotel Booking - INT3509

## Stack

### Frontend

1. Vite
2. React

### Backend

1. Spring
2. MySQL

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

### Backend (Pending)