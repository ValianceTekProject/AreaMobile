FROM reactnativecommunity/react-native-android:latest

RUN apt-get update && apt-get install -y bash

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

COPY build_android.sh /app/build_android.sh
RUN chmod +x /app/build_android.sh

CMD ["bash", "-c", "./build_android.sh && cp /app/android/app/build/outputs/apk/release/app-release.apk /output/ && echo 'APK available in ./mobile/output/app-release.apk'"]
