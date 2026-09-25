# EcoSanctuary AI - Smart Waste & Sanitization Management Frontend

## 1. Project Overview

This project is a smart city frontend dashboard designed to improve urban cleanliness, waste management, and public sanitation. It gives a municipal admin or city worker a single control panel where they can monitor garbage bins, identify overflowing bins, manage route planning for garbage collection trucks, and track public hygiene conditions.

The app is built as a frontend prototype for SIH (Smart India Hackathon) and focuses on real-world smart city problems. It uses mock data to simulate IoT sensors, citizen complaints, route planning, waste classification, analytics, and sanitation operations.

The main goal of the project is to show how technology can make city services faster, cleaner, and more efficient.

---

## 2. What Problem This Project Solves

In many cities, waste management is still done manually. Common issues include:

- bins becoming full without being noticed
- collection trucks taking inefficient routes
- unsegregated waste causing pollution
- citizens having no easy way to report dirty areas
- poor sanitation in public facilities
- no proper monitoring of waste trends or impact

This project solves these problems by creating a digital command center for handling waste and sanitation efficiently.

---

## 3. Frontend Structure and Design Philosophy

The project is built using React and Vite, which makes it a modern single-page application. It uses reusable components and state to manage different sections of the application.

The interface is designed like a futuristic smart-city dashboard with:

- dark theme with green/cyan accents
- modern glass panels and gradient effects
- tiles and cards for KPIs
- charts and route visuals
- alerts, badges, and statuses
- role-based navigation for admin, citizen, driver, and inspector personas

This design makes the app look like a command center, which is suitable for a municipal operations dashboard.

---

## 4. Detailed Feature Explanation

### Feature 1: Navigation Bar and Role Switching

The top navigation bar acts like a smart-city home shell. It contains:

- app logo and brand name: EcoSanctuary
- navigation tabs like Command Hub, AI Segregator, Smart Bins, Routes, Citizen Portal, Public Sanitization, and Analytics
- role switcher dropdown for different users such as Municipal Admin, Citizen Portal, Sanitation Driver, and Inspector
- alert bell showing critical issues
- important banner showing SIH project identity and city cleanliness index

Why it matters:

- it makes the dashboard feel like a real operational platform
- it allows different personas to use the same app from different viewpoints
- it gives a quick summary of the system status at a glance

---

### Feature 2: Command Center Dashboard

This is the main landing screen of the app. It is designed like a control room dashboard and provides quick information on the city’s cleanliness and operations.

It includes:

- large hero section with project message and call-to-action buttons
- cleanliness index or city health score
- KPI cards for smart bins, AI accuracy, fleet routes, and sanitation hubs
- live ward telemetry map simulation
- incident summaries and active alerts

This dashboard helps an administrator understand the current operational health of the city without going into each feature separately.

The purpose is to create a summary page that immediately tells the operator:

- how many bins are active
- how many are critical
- whether the fleet is functioning well
- whether sanitation compliance is strong
- whether the city is clean and performing efficiently

---

### Feature 3: AI Waste Classifier

This component demonstrates an intelligent waste sorting system. It simulates a vision-based AI model that detects the type of waste item and tells the user which bin it belongs to.

Features inside this section:

- sample waste image cards for different materials
- upload custom image option
- scanning animation with live detection overlay
- AI confidence score and category label
- automatic triggering of confetti and reward points after correct classification
- different disposal instructions for bins depending on the material type
- reward points for citizens or users contributing to correct sorting

Examples of waste categories shown in the app include:

- wet organic waste
- dry recyclable waste
- electronic waste
- hazardous waste

Why it matters:

- proper segregation reduces landfill pollution
- recyclable items can be recovered efficiently
- hazardous waste can be isolated to avoid health risks
- the app shows how AI can support cleaner behavior in the city

This section also gives a gamified experience by awarding points, which encourages people to properly sort waste.

---

### Feature 4: Smart Bin Monitoring System

This is one of the most important sections of the frontend. It simulates an IoT-based smart waste bin system.

The smart bin cards show information such as:

- bin ID
- location and zone
- fill level percentage
- status like Normal, Warning, or Critical
- gas concentration (like methane or H2S)
- temperature
- weight
- battery status
- lid lock state
- compactor activity

The user can interact with each bin by:

- adjusting fill level with a slider
- adjusting methane or gas sensor values
- changing internal temperature
- toggling emergency lock or lid secure mode
- triggering hydraulic compaction to reduce bin volume

This simulates real sensor-driven waste monitoring and demonstrates how the system can detect dangers such as:

- overloaded bins
- combustible gas buildup
- high temperature causing fire risk
- leakage or unsafe waste condition

This section is important because it shows how IoT sensors can convert waste management from reactive to proactive.

---

### Feature 5: Route Optimization and Green Fleet Management

This section models a waste collection route planning system for municipal trucks.

It includes:

- list of trucks with assigned driver, payload, battery, status, and route efficiency
- route priority for bins that are near critical fill level
- manifest or sequence of bins to be collected
- mark collected button to simulate emptying a bin after collection
- automatic updates to truck payload and fuel saved after collection
- notifications when a collection is complete

The real concept behind this feature is route optimization. The app tries to show that trucks should not roam randomly; rather, they should:

- go to bins with the highest fill level first
- reduce fuel usage
- save time
- reduce carbon emissions
- improve response time for critical areas

This helps turn waste collection into a more scientific and efficient operation.

---

### Feature 6: Citizen Portal and Grievance Reporting

This feature is designed for public participation. It allows citizens to report sanitation problems in their area.

It includes:

- issue reporting form
- fields like issue headline, location, category, and urgency
- submission success message
- auto-credit of GreenPoints for valid reports
- reward wallet and streak tracking
- reward marketplace for vouchers and offers
- leaderboard for active citizens

Citizen benefits include:

- becoming part of the smart city system
- reporting local issues quickly
- earning digital rewards for public cleanliness participation
- building eco-conscious habits

This makes the project more engaging because it not only focuses on government operations but also on public involvement.

The app is using a gamification model, where rewards encourage people to contribute to cleanliness and waste reduction.

---

### Feature 7: Sanitization Monitor

This is the public hygiene monitoring section. It is designed to measure whether public sanitary facilities and community spaces are clean and safe.

It contains:

- list of sanitation facilities such as public restrooms, parks, or cleaning hubs
- facility health score
- odor index
- water tank percentage
- soap dispenser level
- footfall counts
- current hygiene status
- UV-C disinfection trigger button
- user rating feedback section

This feature simulates how institutions can monitor hygiene by using IoT sensors and human feedback. It can detect whether a public facility is:

- clean
- needs disinfection
- running low on supplies
- under poor hygiene conditions

The UV-C trigger button is a good demonstration of automation in sanitation, showing that a facility can be cleaned or disinfected with minimal human effort.

---

### Feature 8: Analytics Dashboard

This section provides data-driven insights for decision making.

It shows charts and statistics such as:

- 24-hour waste inflow trends
- waste composition distribution
- landfill diversion rate
- revenue from recyclable materials
- compost generation
- carbon credit value
- monthly circular economy growth

The app uses Recharts to create interactive graphs and dashboards. This makes the project look like a professional data intelligence system.

Why it matters:

- city officials can review trends over time
- they can see which waste categories dominate
- they can plan campaigns for recycling and composting
- they can measure impact in terms of revenue and carbon savings

This transforms data into a strategic tool rather than just a display page.

---

### Feature 9: Notification and Feedback System

Although not a standalone module, notifications are used throughout the app to create a dynamic experience.

Examples:

- a toast message when a bin is dispatched
- notification when a citizen report is accepted
- alert when a facility is disinfected
- export success message when generating a report

These notifications make the app feel alive and responsive, which improves user experience.

---

## 5. How the Frontend Works Internally

The application is controlled using React state. For example:

- active tab state decides which page is displayed
- selected role changes the interface context
- bins state tracks all bin conditions
- trucks state tracks route and payload values
- grievances state updates when a citizen reports a problem
- facilities state updates sanitation metrics

This shows the project is not just visually designed; it also demonstrates dynamic frontend application logic.

---

## 6. Role of Mock Data

This project relies on mock data instead of a real backend. Mock data is used to simulate:

- bin locations and statuses
- truck details
- grievance entries
- facility health values
- analytics charts

This is common in early-stage frontend prototypes because it allows the UI and logic to be tested before connecting to a real database or API.

---

## 7. Practical Learning Value for a First-Year Student

This project helps a student learn several frontend and software engineering concepts:

- React components
- props and state management
- conditional rendering
- event handling
- forms and user input
- UI/UX design
- charts and dashboards
- notifications and interactivity
- project structure organization
- mock data handling
- building a prototype for a real-life problem

This is a good beginner-to-intermediate project because it combines multiple frontend features into one complete interface.

---

## 8. Final Summary

EcoSanctuary AI is a smart city waste and sanitation dashboard that uses a modern frontend to demonstrate how technology can improve cleanliness in urban environments. It integrates important features like smart bin monitoring, AI waste sorting, route optimization, citizen problem reporting, sanitation tracking, and analytics dashboards.

Even though it is a frontend prototype, it effectively communicates the full vision of a real smart-city system. It is a strong SIH-style project because it addresses a social problem using technology, design, and data.

---

## 9. Short Viva Summary

“This project is a smart waste and sanitation management system for a city. It monitors smart bins, sorts waste using AI, optimizes truck routes, allows citizens to report issues, tracks hygiene in public facilities, and provides charts to understand overall city cleanliness. The goal is to make urban sanitation more efficient, cleaner, and more sustainable.”
