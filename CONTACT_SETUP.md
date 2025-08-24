# Contact Form Backend Setup

This guide will help you set up the contact form backend with MongoDB Atlas.

## Prerequisites

1. MongoDB Atlas account
2. A MongoDB cluster set up in Atlas
3. Database user with read/write permissions

## Setup Steps

### 1. MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a new cluster or use an existing one
3. Create a database user with read/write permissions
4. Get your connection string from the cluster

### 2. Environment Variables

1. Create a `.env.local` file in your project root
2. Add your MongoDB connection string:

```env
MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/cloud-it-solution?retryWrites=true&w=majority
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NODE_ENV=development
```

**Important:** Replace the following in your connection string:
- `your_username`: Your MongoDB Atlas username
- `your_password`: Your MongoDB Atlas password
- `your_cluster`: Your cluster name
- `cloud-it-solution`: Your database name (you can change this)

### 3. Network Access

In MongoDB Atlas:
1. Go to Network Access
2. Add your IP address or use `0.0.0.0/0` for development (allows all IPs)

### 4. Test the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Go to your contact page and submit a form
3. Check your MongoDB Atlas database to see if the contact was saved

## API Endpoints

### POST /api/contact
Submits a new contact form entry

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "subject": "General Inquiry",
  "message": "Hello, I have a question..."
}
```

**Response:**
```json
{
  "message": "Contact form submitted successfully",
  "id": "contact_id_here"
}
```

### GET /api/contact
Retrieves recent contact submissions (for admin use)

**Response:**
```json
{
  "contacts": [
    {
      "_id": "contact_id",
      "name": "John Doe",
      "email": "john@example.com",
      "subject": "General Inquiry",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

## Database Schema

The contact form data is stored with the following structure:

```javascript
{
  name: String (required, max 100 chars),
  email: String (required, validated),
  phone: String (optional, max 20 chars),
  subject: String (optional, max 200 chars),
  message: String (required, max 1000 chars),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

## Error Handling

The API includes comprehensive error handling for:
- Missing required fields
- Invalid email format
- Database connection issues
- Validation errors

## Security Notes

1. Never commit your `.env.local` file to version control
2. Use environment variables for sensitive data
3. Consider adding rate limiting for production
4. Add CORS configuration if needed for cross-origin requests

## Troubleshooting

### Connection Issues
- Verify your MongoDB Atlas connection string
- Check if your IP is whitelisted in Atlas
- Ensure your database user has proper permissions

### Form Submission Issues
- Check browser console for errors
- Verify the API endpoint is accessible
- Check server logs for detailed error messages
