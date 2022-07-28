# Documenting the Docker image to use.
FROM node:alpine

# Creating the app directory within the Docker image.
WORKDIR /app

# Copying only the initial file necessary to install what is needed on the Docker image: COPY <Source> <Destination>
COPY package.json .

# Install the necessary packages on the Docker image.
RUN npm install

# Copy remaining files necessary for the application to work: COPY <Source> <Destination>
COPY . .

# Command to start the Docker image with.
CMD ["npm", "start"]