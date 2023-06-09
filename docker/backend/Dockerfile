FROM gradle:6-jdk11 as build

ARG GITHUB_REPOSITORY
ARG GITHUB_REPOSITORY_BRANCH

RUN apt install git

WORKDIR /app
RUN git clone -b ${GITHUB_REPOSITORY_BRANCH} ${GITHUB_REPOSITORY} .
RUN mkdir -p src/main/resources/order-submodule
RUN touch src/main/resources/order-submodule/application-prod.yml
RUN gradle bootJar

RUN cp /app/build/libs/*.jar ./app.jar
CMD java -jar ./app.jar --spring.profiles.active=local
