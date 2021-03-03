# pull official base image
FROM node

# add `/app/node_modules/.bin` to $PATH
ENV PATH /node_modules/.bin:$PATH

# install app dependencies
RUN npm install -g increase-memory-limit
RUN npm install react-scripts@4.0.0 -g --silent
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent

# start app
CMD ["npm", "start"]
