# DumpTruckDB

## Overview
A lightweight, in-browser SQL database that lets you upload CSV files and run SQL queries on them instantly. Built using React and sql.js, this app runs entirely in your browser, requiring no server or backend.

## Features
- **CSV Upload** – Easily upload CSV files and perform SQL queries on them.
- **SQL Query Execution** – Write and execute SQL queries to interact with your data.
- **Table View** – View query results in a structured table format.
- **Intuitive UI** – Simple and efficient interface for a smooth user experience.
- **Seamless Data Processing** – Efficiently handle large datasets with optimized performance.
- **Predefined Queries** –  Quick access to common queries like SELECT, COUNT, etc.
- **Fully Client-Side** – No database setup, everything runs in the browser.

## Tech Stack
- **Frontend:** React (Vite)
- **Styling:** CSS
- **Deployment:** Vercel
- **Database:** None (Client-side processing)

---

## **Major Plugins & Packages**
| Package           | Purpose |
|------------------|-----------------|
| **React Router** | For client-side navigation |
| **Papaparse**   | Handling and processing CSV files |
| **Vite**         | Fast development and production builds |
| **sql.js**         | SQLite database engine that runs entirely in the browser |
---

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/spacedust26/DumpTruckDB.git
   cd DumpTruckDB
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm start
   ```

## Usage
1. Upload a CSV file.
2. Write SQL queries in the query editor.
3. Execute queries and view the results in a table format.

## **Page Load Time & Performance Measurement**
1. **Google Lighthouse** - Provides performance audits for web apps.
2. **Chrome DevTools** - Measures Time to Interactive (TTI), First Contentful Paint (FCP), and Total Blocking Time (TBT).

### **Current Load Time Metrics:**
- First Contentful Paint (FCP): 0.4s
- Largest Contentful Paint (LCP): 0.5s
- Cumulative Layout Shift (CLS): 0
- Total Blocking Time (TBT): 20ms
- Speed Index (SI): 0.7s

---

## **Optimizations to Improve Load Time & Performance**

### **Frontend Optimizations**
- **Optimized Assets**: Images are compressed and converted to WebP format to reduce load time.  
- **Efficient Code Management**: Unused JavaScript and CSS are removed to enhance performance.  
- **Minification**: CSS and JavaScript are minified using Terser and PurgeCSS to reduce file size.  
- **Optimized Script Loading**: JavaScript is deferred to prioritize rendering, improving initial page load speed.

---

## **System Design & Technical Design**

Since this project is a frontend-only application, the design primarily focuses on efficient **data processing, UI performance, and client-side storage**. Below are the key architectural considerations:  

## **1. Architecture Overview**  
- **Frontend**: Built using **React** for a dynamic UI  
- **State Management**: Local state and context API (no Redux for simplicity)  
- **Storage**: Uses **IndexedDB (via sql.js)** for local SQL-like data storage  
- **Performance Optimization**: Web Workers for async processing  
## **2. Key Technical Decisions & Justifications**  

| Decision | Justification |
|----------|--------------|
| **Client-Side SQL with sql.js** | Enables in-browser querying without needing a backend |
| **Using Vite instead of CRA** | Faster build times, smaller bundle size |
| **Deployed on Vercel** | Provides free static hosting with fast CDN caching |
| **Minified & Tree-Shaken JavaScript** | Reduces unnecessary code, improving performance |
| **PurgeCSS for Removing Unused CSS** | Reduces CSS file size and improves rendering speed |
| **Using WebP for Images** | Smaller file sizes for faster loading |

## **3. Challeneges and Solutions** 
| Challenge | Solution |
|-----------|----------|
| **404 Errors After Deployment** | Ensured correct routing setup and moved assets to `public/` |
| **Optimizing Page Load Speed** | Unused JavaScript and CSS are removed to enhance performance.  |
| **Ensuring Responsive UI** | Improved media queries |
| **SEO and Performance Optimization** | Added meta tags, improved Lighthouse scores, and minimized render-blocking resources |

---

## **Architecture Diagram**
Below is the high-level system architecture of **DumpTruckDB**.

```plaintext
            ┌──────────────────────┐
            │      Frontend        │
            │   (React, Vite)      │
            └──────────────────────┘
                    │                    
                    ▼                    
            ┌───────────────────┐
            │   CSV Processing   │
            │ (Client-side JS)   │
            └───────────────────┘
````
--- 
## **ER Diagram (Entity-Relationship Diagram)**
Since the project operates on the client-side, there's no traditional database schema. However, the following structure represents how data is handled in memory.

```plaintext
┌─────────────────┐  
│   CSV Data      │  
│ (Uploaded File) │  
└─────────────────┘  
        │        
        ▼        
┌───────────────────────┐  
│ Client-side Querying  │  
└───────────────────────┘  
```