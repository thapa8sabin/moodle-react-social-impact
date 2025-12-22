FROM node:20-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
# RUN npm install

# Copy the rest of the application code
COPY . .

# Expose Expo development ports
# EXPOSE 19000 19001 19002 19006

# Set environment for packager hostname (adjust IP as needed for LAN access)
ENV REACT_NATIVE_PACKAGER_HOSTNAME=0.0.0.0
ENV EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0

# Start the Expo development server
# CMD ["npx", "expo", "start", "--tunnel"]
CMD ["/bin/sh"]