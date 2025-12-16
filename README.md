# 🌊 MediWave App - Supply Chain & Blockchain Tracking

![MediWave Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.0-blue?style=for-the-badge&logo=react)
![Tailwind](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)

Welcome to **MediWave App**, an advanced technological solution designed to revolutionize pharmaceutical supply chain management and traceability. This project fuses the power of **IoT (Internet of Things)** with the immutable security of **Blockchain** to ensure medication quality and transparency in real-time.

---

## 🛠️ Technologies Used

The project leverages a robust modern stack to deliver performance and scalability:

- **Core**: [Next.js 16](https://nextjs.org/) (App Router), [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/), [Tw-animate-css](https://www.npmjs.com/package/tw-animate-css)
- **Data Visualization**: [Recharts](https://recharts.org/), [React Icons](https://react-icons.github.io/react-icons/)
- **Visual Effects**: [tsparticles](https://particles.js.org/)
- **Utilities**: [Axios](https://axios-http.com/), [React Toastify](https://fkhadra.github.io/react-toastify/), [clsx](https://www.npmjs.com/package/clsx), [tailwind-merge](https://www.npmjs.com/package/tailwind-merge)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Linting**: [ESLint](https://eslint.org/)

---

## 🎯 General Objective

To develop a comprehensive platform enabling real-time monitoring, efficient management, and decentralized verification of pharmaceutical batches. MediWave ensures each medication maintains its integrity from the laboratory to the final patient, mitigating risks of counterfeiting and cold chain breaches.

## 👥 Target Audience

- **Logistics Administrators**: To manage shipments and warehouses.
- **Medical & Pharmaceutical Staff**: To verify authenticity and supply status.
- **Quality Auditors**: To review temperature histories and transport conditions.
- **End Patients**: Who desire guarantees regarding their medication safety.

---

## 🏗️ Project Structure

The project follows a modern architecture based on **Next.js 16** with **App Router**.

```bash
📦 src
 ┣ 📂 app              # Application routes and pages
 ┃ ┣ 📂 dashboard      # Main data visualization panel
 ┃ ┣ 📂 documentation  # Technical and user documentation
 ┃ ┣ 📂 history        # Status history and traceability
 ┃ ┣ 📂 login          # User authentication
 ┃ ┣ 📂 management     # Administrative management
 ┃ ┗ 📜 page.tsx       # Landing Page
 ┣ 📂 components       # Reusable components (UI, Layouts)
 ┣ 📂 interfaces       # TypeScript type definitions (Batch, Shipment, etc.)
 ┣ 📂 services         # API request logic (Axios)
 ┣ 📂 lib              # Utilities and library configuration
 ┗ 📂 styles           # Global styles and CSS modules
```

---

## 🚀 Key Features

### 📡 Real-Time IoT Traceability

Visualize critical data such as temperature, humidity, and exact location of batches during transport.

### ⛓️ Blockchain Verification

Every step of the supply chain is recorded on an immutable blockchain, ensuring data has not been tampered with.

### 📊 Interactive Dashboard

Control panels with dynamic charts (Recharts) and statistics cards for informed decision-making.

### 🔔 Alert System

Immediate notifications (React Toastify) when shipment parameters go out of safe ranges (e.g., cold chain breach).

### 📱 Modern Responsive Design

Interface built with Tailwind CSS and Framer Motion for a fluid and aesthetic user experience on any device.

---

## 🗺️ Roadmap

- [x] **v1.0**: Core tracking features, Dashboard, and Blockchain verification.
- [ ] **v1.1**: Integration with physical IoT sensors via MQTT.
- [ ] **v1.2**: Mobile application (React Native) for field operators.
- [ ] **v2.0**: AI-driven predictive analytics for supply chain optimization.
- [ ] **v2.1**: Multi-language support (i18n) for global scalability.

---

## 🔄 Scrum Methodology

This project was developed under the **Scrum** framework, promoting continuous delivery and rapid adaptation.

- **Sprints**: Iterative development cycles to implement new features.
- **Daily Standups**: Daily meetings to sync the team and remove blockers.
- **Sprint Review & Retroperspective**: Constant evaluation to improve both the product and development process.
- **Clear Roles**: Derived responsibilities to maximize team efficiency.

---

## 🤝 Contributing

We welcome contributions! Please follow these steps to contribute:

1.  **Fork the Repository**: Click the "Fork" button at the top right of this page.
2.  **Clone your Fork**:
    ```bash
    git clone https://github.com/your-username/MediWave-App-Frontend.git
    ```
3.  **Create a Branch**:
    ```bash
    git checkout -b feature/AmazingFeature
    ```
4.  **Commit your Changes**:
    ```bash
    git commit -m 'Add some AmazingFeature'
    ```
5.  **Push to the Branch**:
    ```bash
    git push origin feature/AmazingFeature
    ```
6.  **Open a Pull Request**: Submit your PR for review.

---

## 🛠️ Getting Started

Follow these steps to run the development environment locally:

1.  **Clone the repository**

    ```bash
    git clone https://github.com/your-username/MediWave-App-Frontend.git
    cd MediWave-App-Frontend
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Configure environment variables**
    Create a `.env.local` file in the root and configure necessary variables (API URL, keys, etc.).

4.  **Start the development server**

    ```bash
    npm run dev
    ```

5.  **Open in browser**
    Visit `http://localhost:3000` to view the application.

---

## 🤝 Team Members

A multidisciplinary team committed to technical excellence.

| Name                  | Role                           | Specialty                    |
| :-------------------- | :----------------------------- | :--------------------------- |
| **Juan Felipe Marín** | 🧠 **Scrum Master (Frontend)** | Technical Leadership & UI/UX |
| **David Zapata**      | 🧠 **Scrum Master (Backend)**  | Architecture & Database      |
| **Emanuel Gaviria**   | 💻 Frontend Developer          | Componentization & Logic     |
| **Andrés Severino**   | 💻 Frontend Developer          | Integration & Styling        |
| **Miguel Molina**     | ⚙️ Backend Developer           | API REST & Security          |
| **Juan José Quiroz**  | ⚙️ Backend Developer           | Blockchain & Services        |

---

## 💬 Feedback

We value your comments! If you find any errors or have suggestions to improve MediWave, please open an _issue_ in the repository or contact the development team.

> _"Technology at the service of health."_ 💙
