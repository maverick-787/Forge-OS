QuadCore presents 

-Arav D A 
-Devang S R 
-Nandagopal A 
-Dhananjayan Sreeraj 

# 🏭 Forge-OS

> AI-powered Industrial Incident Response & Decision Intelligence Platform built using NitroStack MCP.

## 📌 Overview

Forge-OS is an intelligent manufacturing operations platform that assists factories in analyzing industrial incidents, identifying root causes, estimating business impact, and recommending the optimal recovery strategy.

Instead of relying on manual decision-making during production failures, Forge-OS uses an AI Decision Twin with deterministic business logic to generate structured incident analysis and automate operational workflows.

Built for the **NitroStack Agentic AI Hackathon**.

---

# 🚀 Features

- 🔍 Industrial Incident Analysis
- 🧠 AI Decision Twin
- 📈 Business Impact Estimation
- 🛠 Automated Maintenance Ticket Generation
- 📦 Spare Part Reservation
- 🚚 Supplier Ordering
- 🏭 Production Notification
- 💰 Finance Notification
- 📄 Automated Incident Report Generation
- ✅ Incident Closure Workflow

---

# 🏗 Architecture

```
                +----------------------+
                |   NitroStack Agent   |
                +----------+-----------+
                           |
      ---------------------------------------------
      |                  |                       |
 Resources            Decision Twin            Tools
      |                  |                       |
Machine Logs       Incident Analysis      Maintenance Ticket
Engineering Manual Root Cause             Reserve Spare
Inventory          Recovery Plan          Order Spare
Production ScheduleBusiness Impact        Notify Production
Safety SOP         Recommendations        Notify Finance
Maintenance History                      Generate Report
Supplier Data                          Close Incident
```

---

# 📚 Resources

Forge-OS connects the AI agent to multiple manufacturing resources.

- Machine Logs
- Engineering Manual
- Inventory
- Production Schedule
- Safety SOP
- Supplier Data
- Maintenance History
- Health Checks
- Decision Twin

---

# 🔧 MCP Tools

| Tool | Description |
|------|-------------|
| analyze_incident | Performs complete incident analysis |
| create_maintenance_ticket | Creates maintenance tickets |
| reserve_spare | Reserves spare parts |
| order_spare | Orders replacement parts |
| notify_production | Alerts production teams |
| notify_finance | Estimates and reports financial impact |
| generate_incident_report | Creates detailed incident reports |
| close_incident | Closes completed incidents |

---

# 🧠 Decision Twin

The Decision Twin evaluates incidents using deterministic decision logic.

It generates:

- Executive Summary
- Incident Details
- Root Cause Analysis
- Business Impact
- Recovery Strategies
- Recommended Strategy
- Step-by-step Execution Plan

This ensures consistent and explainable decision-making during industrial disruptions.

---

# ⚙ Tech Stack

- NitroStack MCP
- TypeScript
- Node.js
- NitroStudio
- MCP Resources
- MCP Tools

---

# 📂 Project Structure

```
src/
├── ForgeModule
├── ForgeResources
├── ForgeTools
├── ForgeService
└── widgets/
```

---

# ▶ Running Locally

```bash
npm install
npm run dev
```

---

# 💡 Example Workflow

1. Industrial machine failure occurs
2. Operator submits incident
3. Forge-OS analyzes machine logs
4. Root cause is identified
5. Business impact is calculated
6. Best recovery strategy is generated
7. Maintenance ticket is created
8. Spare parts are reserved
9. Production & finance teams are notified
10. Incident report is generated

---

# 🎯 Use Cases

- Manufacturing Plants
- Smart Factories
- Industrial Automation
- Predictive Maintenance
- Factory Operations
- Incident Management

---

# 👥 Team

**Forge-OS**

Built for the **NitroStack Agentic AI Hackathon** by Team QuadCore.

---

# 📄 License

MIT License
