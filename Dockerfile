FROM node:18-alpine3.15
RUN apk add --no-cache python2 g++ make
WORKDIR /app
COPY . .

ENV JWT_SECRET="1q2w3e4r"
ENV API_PORT=3001

RUN yarn install --production
CMD ["node", "./dist/src/index.js"]
EXPOSE 3001
