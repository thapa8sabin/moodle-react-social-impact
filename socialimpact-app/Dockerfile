FROM node:20-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
# RUN npm install

# Copy the rest of the application code
COPY . .

# Set environment for packager hostname (adjust IP as needed for LAN access)
ENV REACT_NATIVE_PACKAGER_HOSTNAME=0.0.0.0
ENV EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0

# Start the Expo development server
CMD ["npx", "expo", "start"]
# for debugging purposes only
# CMD ["/bin/sh"]