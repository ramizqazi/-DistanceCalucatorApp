# Distance Calculator APP

## Description  

This is a react native distance calculator app

## Installation Guide  

To set up locally, follow these steps:  

1. **Clone the repository**  
   Open a terminal and run:  
   ```bash
   git clone https://github.com/ramizqazi/DistanceCalucatorApp.git
   cd DistanceCalucatorApp
   ```  

2. **Install dependencies**  
   Using `npm`:  
   ```bash
   npm install
   ```  
   Or using `yarn`:  
   ```bash
   yarn install
   ```  

3. **Add API KEY**  
   Navigate to /android/app/src/main/AndroidManifest.xml and add your api key in this block
   ```bash
     <meta-data
     android:name="com.google.android.geo.API_KEY"
     android:value="${ENTER GOOGLE API KEY HERE}"/>
   ```

4. **Start the development server**  
   Using `npm`:  
   ```bash
   npm start
   ```  
   Or using `yarn`:  
   ```bash
   yarn start
   ```  

5. **Start Build**
   ```bash
   npm run android
    ```  
   Or using `yarn`:  
   ```bash
   yarn andorid
   ``` 