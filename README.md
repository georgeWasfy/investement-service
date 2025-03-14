# Investement-Module

### User
* Exposed Endpoints:

  * [GET] /api/v1/user/{userId}/transactions
  <code>**description**: Get transactions for a single user</code>

    **response**
      ```json
        {
          "data": {
            "transactions": [
              {
                "id": 36,
                "amount": "11400",
                "userId": 9,
                "currency": "USD",
                "status": "success",
                "metadata": {
                  "originalAmount": 10000,
                  "originalCurrency": "EUR",
                  "exchangeRateDate": "2025-03-14T13:55:11.271Z"
                },
                "createdAt": "2025-03-14T13:55:11.280Z",
                "updatedAt": "2025-03-14T13:55:11.280Z"
              }
            ]
          }
       }
      ```

### Transactions
* Exposed Endpoints:

  * [POST] /api/v1/transactions
  <code>**description**: Create a single investement transaction</code>

    **body**
      ```json
        {
          "amount": "10000",
          "currency": "EUR",
       }
      ```

      **Response**
      ```json
        {
          "data": {
              "id": 41,
              "amount": "100.5",
              "userId": 9,
              "currency": "USD",
              "status": "success",
              "metadata": {
                "originalAmount": 100.5,
                "originalCurrency": "USD",
                "exchangeRateDate": "2025-03-14T16:06:11.734Z"
              },
              "createdAt": "2025-03-14T16:06:11.735Z",
              "updatedAt": "2025-03-14T16:06:11.735Z"
           }
        }
      ```


### Auth
* Exposed Endpoints:

  * [POST] /api/v1/auth/local/signup
  <code>**description**:  create a user and obtain access and refresh tokens</code>
   **body**
    ```json
      {
          "name": "test",
          "email": "test@gmail.com",
          "password": "123456"
      }
    ```
    **response**
      ```json
        {
            "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE4LCJlbWFpbCI6InRlc3QyQGdtYWlsLmNvbSIsImlhdCI6MTcyMzE5Nzk2MSwiZXhwIjoxNzIzMjAxNTYxfQ.ADRBHxQsMPzz1E4ghfgc4LoUpLkEsy8AkeO1oOmsDAE"
        }
      ```

  * [POST] /api/v1/auth/local/signin
    <code>**description**:  sign in user and obtain access and refresh token</code>
    **body**
    ```json
    {
        "email": "test@gmail.com",
        "password": "123456"
    }
    ```

    **response**
      ```json
        {
                "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE4LCJlbWFpbCI6InRlc3QyQGdtYWlsLmNvbSIsImlhdCI6MTcyMzE5ODUwNiwiZXhwIjoxNzIzMjAyMTA2fQ.OYCX9fH9Sfp3bfBhpNJnD_d8O150Sxs2Q5GifnvzkY8",
        }
      ```

  * [POST] /api/v1/auth/local/refresh
  <code>**description**:  obtain new access token </code>
   **body**
    ```json
      {}
    ```
    **response**
      ```json
        {
            "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE4LCJlbWFpbCI6InRlc3QyQGdtYWlsLmNvbSIsImlhdCI6MTcyMzE5Nzk2MSwiZXhwIjoxNzIzMjAxNTYxfQ.ADRBHxQsMPzz1E4ghfgc4LoUpLkEsy8AkeO1oOmsDAE"
        }
      ```

```yaml
> All endpoints are authenticated except signin&signup and should have bearer token header obtained from signin or signup endpoints
```

### How to run locally
```yaml
> create a .env file using .env.example as reference.
> create a database locally on your machine with same name as provided in .env file (postgres).
> npm install
> npm run start
```

### How to run using docker
```yaml
> create a .env file using .env.example as reference.
> docker compose up
```

# API Documentation and Testing

To test the API endpoints, you can use the Swagger documentation available at:  
[http://localhost:3000/docs](http://localhost:3000/docs)

## Steps to Test Endpoints

1. **Open Swagger UI**: Navigate to the above link in your web browser.
   
2. **Explore Endpoints**: Browse through the available endpoints listed in the Swagger UI.
   
3. **Try It Out**: Click on an endpoint to view its details, then click the "Try it out" button to test it.
   
4. **Enter Parameters**: Fill in any required parameters (e.g., headers, body) as specified in the endpoint documentation.
   
5. **Execute Request**: Click the "Execute" button to send the request.
   
6. **View Response**: The response will be displayed below, including the status code and response body.
