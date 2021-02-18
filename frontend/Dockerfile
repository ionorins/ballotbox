# pull official base image
FROM node

# add `/app/node_modules/.bin` to $PATH
ENV PATH /node_modules/.bin:$PATH

# install app dependencies
RUN npm install -g increase-memory-limit
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent --max-old-space-size=4096
RUN npm install react-scripts@4.0.0 -g --silent --max-old-space-size=4096

# start app
CMD ["npm", "start"]
