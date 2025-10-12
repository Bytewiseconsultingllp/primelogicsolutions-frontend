# Backend Setup Required

## Overview
This frontend application requires a backend server running on `http://localhost:8000` with specific API endpoints. The project submission feature will not work without the backend.

## Required Backend Endpoints

### 1. User Registration
**Endpoint:** `POST /api/v1/auth/register`

**Request Body:**
```json
{
  "username": "string",
  "fullName": "string",
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "success": true,
  "status": 200,
  "message": "User registered successfully",
  "data": {
    "id": "uuid",
    "username": "string",
    "fullName": "string",
    "email": "string"
  }
}
```

### 2. Email Verification
**Endpoint:** `POST /api/v1/auth/verifyEmail`

**Request Body:**
```json
{
  "email": "string",
  "OTP": "string"
}
```

**Response:**
```json
{
  "success": true,
  "status": 200,
  "message": "Email verified successfully",
  "data": {
    "token": "JWT_TOKEN"
  }
}
```

### 3. User Login
**Endpoint:** `POST /api/v1/auth/login`

**Request Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "success": true,
  "status": 200,
  "message": "Login successful",
  "data": {
    "token": "JWT_TOKEN",
    "user": {
      "id": "uuid",
      "username": "string",
      "email": "string"
    }
  }
}
```

### 4. Create Visitor
**Endpoint:** `POST /api/v1/visitors`

**Request Body:**
```json
{
  "fullName": "string",
  "businessEmail": "string",
  "phoneNumber": "string",
  "companyName": "string",
  "companyWebsite": "string",
  "businessAddress": "string",
  "businessType": "string",
  "referralSource": "string"
}
```

**Response:**
```json
{
  "success": true,
  "status": 200,
  "message": "Visitor created successfully",
  "data": {
    "id": "uuid",
    "fullName": "string",
    "businessEmail": "string",
    ...
  }
}
```

### 5. **Create Project (REQUIRED)**
**Endpoint:** `POST /api/v1/project-builder`

**Headers:**
```
Authorization: Bearer JWT_TOKEN
Content-Type: application/json
```

**Request Body:**
```json
{
  "projectName": "E-commerce Mobile App",
  "projectDescription": "A comprehensive mobile application for e-commerce...",
  "projectType": "Mobile Development",
  "technologies": ["React Native", "Node.js", "MongoDB"],
  "features": ["User Authentication", "Payment Processing"],
  "budget": 25000,
  "timeline": "3-4 months",
  "priority": "HIGH",
  "status": "SUBMITTED",
  "clientName": "ABC",
  "clientEmail": "abc@gmail.com",
  "clientPhone": "+1234567890",
  "clientCompany": "ABC Corp",
  "additionalNotes": "Looking for experienced team"
}
```

**Response:**
```json
{
  "success": true,
  "status": 200,
  "message": "Operation was successful",
  "data": {
    "id": "uuid",
    "projectName": "E-commerce Mobile App",
    "projectDescription": "A comprehensive mobile application...",
    "projectType": "Mobile Development",
    "technologies": ["React Native", "Node.js", "MongoDB"],
    "features": ["User Authentication", "Payment Processing"],
    "budget": 25000,
    "timeline": "3-4 months",
    "priority": "HIGH",
    "status": "SUBMITTED",
    "clientName": "ABC",
    "clientEmail": "abc@gmail.com",
    "clientPhone": "+1234567890",
    "clientCompany": "ABC Corp",
    "additionalNotes": "Looking for experienced team",
    "createdAt": "2025-09-20T10:19:16.213Z",
    "updatedAt": "2025-09-20T10:19:16.213Z"
  }
}
```

### 6. Create Checkout Session (Optional - for Stripe payment)
**Endpoint:** `POST /api/v1/payment/create-checkout-session`

**Headers:**
```
Authorization: Bearer JWT_TOKEN
Content-Type: application/json
```

**Request Body:**
```json
{
  "amount": 135000,
  "currency": "usd",
  "customerEmail": "user@example.com",
  "customerName": "John Doe",
  "successUrl": "http://localhost:3000/get-started/success?session_id={CHECKOUT_SESSION_ID}",
  "cancelUrl": "http://localhost:3000/get-started?step=payment",
  "description": "Project Development - 25% Deposit",
  "metadata": {
    "visitorId": "uuid",
    "userId": "uuid",
    "projectId": "uuid",
    "projectType": "custom_development",
    "depositPercentage": "25"
  }
}
```

## How to Start Backend Server

1. **Ensure your backend server is running on port 8000**
   ```bash
   # Example command (adjust based on your backend setup)
   cd path/to/backend
   npm start
   # or
   python manage.py runserver 8000
   # or
   node server.js
   ```

2. **Verify the server is accessible**
   ```bash
   curl http://localhost:8000/health
   ```

3. **Check that all required endpoints exist**
   - Test each endpoint with Postman or similar tool
   - Ensure JWT authentication is properly configured

## Common Issues

### Issue: "This Route(/api/v1/project-builder) doesn't exist on server!!"
**Solution:** 
- Ensure your backend server is running on `http://localhost:8000`
- Verify the `/api/v1/project-builder` endpoint exists in your backend
- Check backend logs for any errors

### Issue: "Unable to connect to backend server"
**Solution:**
- Make sure the backend is running: `http://localhost:8000`
- Check if the port is not blocked by firewall
- Verify CORS is properly configured in your backend to allow requests from `http://localhost:3000`

### Issue: "Failed to authenticate user for project submission"
**Solution:**
- Ensure the user has registered and verified their email
- Check that the JWT token is being properly returned from `/api/v1/auth/verifyEmail`
- Verify the token is being stored in localStorage after verification

## Testing the Flow

1. **Start your backend server**
   ```bash
   cd backend
   npm start  # or appropriate command
   ```

2. **Start the frontend**
   ```bash
   npm run dev
   ```

3. **Test the complete flow:**
   - Navigate to `http://localhost:3000/get-started`
   - Complete all 10 steps
   - At step 10, click "Secure My Project"
   - Register with username and password
   - Verify email with OTP
   - Project should be submitted automatically

4. **Check the browser console for logs:**
   - "Submitting project data:" - shows the data being sent
   - "Project submitted successfully:" - confirms successful submission
   - Any errors will be displayed in the console

## Environment Variables

Make sure your `.env.local` file has:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Frontend Changes Made

### Fixed Issues:
1. ✅ **Infinite loop in register.tsx** - Removed `onUpdate` from useEffect dependency array
2. ✅ **Timeline mapping** - Converts form values (fast-track, rapid) to readable formats (25 days, 1 month)
3. ✅ **Technologies array** - Correctly extracts `tech.technology` from form data
4. ✅ **Features array** - Correctly extracts `feature.feature` from form data
5. ✅ **Services and Industries** - Correctly extracts `service.service` and `industry.industry`
6. ✅ **Payment endpoint** - Fixed from `/api/payment/create-checkout-session` to `/api/payment/checkout-session`
7. ✅ **Better error handling** - Added network error detection and user-friendly messages

## Support

If you continue to experience issues:
1. Check browser console for detailed error messages
2. Check backend logs for API errors
3. Verify all required endpoints are implemented
4. Ensure JWT authentication is working correctly
5. Test each endpoint individually with Postman

