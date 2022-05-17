FROM node:16.13.0

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/src/careassistant.ai

# Installing dependencies
COPY package*.json ./
COPY mdb*.tgz ./
RUN npm install

# Copying source files
COPY . .

# Building app
RUN npm run build

# Running the app
CMD [ "npm", "run", "start" ]
