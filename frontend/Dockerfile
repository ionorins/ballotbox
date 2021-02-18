# pull official base image
FROM node

# add `/app/node_modules/.bin` to $PATH
ENV PATH /node_modules/.bin:$PATH

# install app dependencies
RUN npm install -g increase-memory-limit
COPY package.json ./
COPY package-lock.json ./
RUN node --max-old-space-size=4096 $(which npm) install --silent
RUN node --max-old-space-size=4096 $(which npm) install react-scripts@4.0.0 -g --silent

# start app
CMD ["npm", "start"]