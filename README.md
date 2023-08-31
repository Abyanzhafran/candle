# Candle

This is a project demonstrating RESTful API using the Go programming language with the Gin web framework and GORM for database interactions.

## Prerequisites

- Go installed on your machine
- Mysql RDBMS installed on your machine

## Installation

1. Clone the repository :

   ```bash
   git clone https://github.com/Abyanzhafran/candle.git
   ```

   ```bash
   git checkout backend-experimental
   ```

   ```bash
   cd backend
   ```

2. run this for synchronize the package :

   ```bash
   go mod tidy
   ```

3. Configure the database:
   - Config you database setting like `.env.example` file.

## Usage

1. Run the application:

   ```bash
   go run main.go
   ```

2. The API will be available at `http://localhost:8080`.

## Endpoints

- For detailed api endpoint, look at api-spec.yml file, and run it using swagger editor.

## How does it work ?

- It can CRUD book entity based on provided endpoint on apis-spec.yml
- The user entity have Ge tAllUsers, GetUserByUsername, and UserLogin api endpoint.
- There are an image_data folder and uploaded_image folder.
- The image_data folder is just the example book images that you can use for updating the book an.
- The uploaded_image folder, is used to visualize online file storage, so the added book cover, saved at that folder. It also applies to CRUD method for the images.
  ``

## Notes

- When you try to update the book in postman using PUT method and for example you don't want to update the image, then don't include the image as form-data.
