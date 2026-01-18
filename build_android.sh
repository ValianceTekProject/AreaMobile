#!/bin/bash

set -e

PROJECT_DIR="/app"
ANDROID_DIR="$PROJECT_DIR/android"

API_IP="${API_IP:-192.168.1.41}"

echo -e "API IP : $API_IP"

cd "$PROJECT_DIR"

npx expo prebuild --platform android --clean

mkdir -p "$ANDROID_DIR/app/src/main/res/xml"

cat > "$ANDROID_DIR/app/src/main/res/xml/network_security_config.xml" << EOF
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <domain-config cleartextTrafficPermitted="true">
        <domain includeSubdomains="true">$API_IP</domain>
        <domain includeSubdomains="true">localhost</domain>
        <domain includeSubdomains="true">127.0.0.1</domain>
    </domain-config>
</network-security-config>
EOF

MANIFEST_FILE="$ANDROID_DIR/app/src/main/AndroidManifest.xml"

if ! grep -q "android:networkSecurityConfig" "$MANIFEST_FILE"; then
    cp "$MANIFEST_FILE" "$MANIFEST_FILE.bak"
    sed -i 's/<application/<application\n        android:networkSecurityConfig="@xml\/network_security_config"/' "$MANIFEST_FILE"
fi

if ! grep -q "android:usesCleartextTraffic" "$MANIFEST_FILE"; then
    sed -i 's/<application/<application\n        android:usesCleartextTraffic="true"/' "$MANIFEST_FILE"
fi

echo "sdk.dir=${ANDROID_SDK_ROOT}':-/root/Android/Sdk}" > "$ANDROID_DIR/local.properties"

echo -e "Build APK Release..."
cd "$ANDROID_DIR"
./gradlew clean
./gradlew assembleRelease

APK_PATH="$ANDROID_DIR/app/build/outputs/apk/release/app-release.apk"

if [ -f "$APK_PATH" ]; then
    echo -e "Build Successful !"
    echo -e "APK : $APK_PATH"
    
    SIZE=$(du -h "$APK_PATH" | cut -f1)
    echo -e "Width : $SIZE"
    echo -e "API IP: http://$API_IP:8080"
else
    echo -e "Error : APK not found"
    exit 1
fi
