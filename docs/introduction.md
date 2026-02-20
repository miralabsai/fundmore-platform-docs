---
sidebar_position: 1
slug: /
title: Platform Overview
description: Introduction to the mortgage origination platform
---

# Platform Overview

The platform is a modern mortgage origination system designed for the Canadian market. It streamlines the entire loan lifecycle — from borrower application through closing — by combining borrower self-service, mortgage specialist workflow management, and AI-powered analysis into a single Point of Sale (POS) system.

This documentation provides a comprehensive guide to the platform's capabilities, user flows, API endpoints, and integration points. Each section is organized by domain to help you quickly find the information relevant to your use case.

---

## Key Components

| Component | Description |
|-----------|-------------|
| **Borrower Portal** | Self-service application portal where borrowers complete mortgage applications, upload documents, and track status |
| **Mortgage Specialist Portal** | Pipeline management, borrower profile review, document handling, and AI-assisted pre-underwriting |
| **Admin Console** | Organization setup, user management, branch configuration, and platform settings |
| **Mira AI** | AI-powered pre-underwriting analysis and intelligent chat assistance |

---

## User Roles

The platform supports a role-based access model with the following primary roles:

| Role | Description |
|------|-------------|
| **Borrower (Consumer)** | End-user applying for a mortgage through the Borrower Portal. Can create applications, upload documents, and track loan status. |
| **Mortgage Specialist** | Manages the loan pipeline. Reviews applications, edits borrower profiles, requests and reviews documents, and submits loans to FundMore LOS for underwriting. |
| **Branch Admin** | Manages mortgage specialists and operations within a branch. |
| **Organization Admin** | Full administration of the organization — users, branches, settings, and integrations. |

---

## Key Capabilities

### Borrower Self-Service
- Magic link (passwordless) authentication
- Multi-step mortgage application with real-time progress tracking
- Document upload and status tracking
- Real-time status notifications (in-app and email)
- Co-borrower support (spouse and external co-borrowers)
- Canadian-specific fields (SIN, RRSP, TFSA, FHSA, CPP, OAS)

### Mortgage Specialist Workflow
- Pipeline management with filtering, sorting, and status tracking
- Full borrower profile editing (personal details, employment, income, assets, liabilities)
- Document request, review, approval, and rejection workflows
- AI-assisted pre-underwriting analysis with risk flags and recommendations
- Application submission to FundMore LOS with document sync
- Co-borrower invitation and management

### AI-Powered Features
- **Pre-Underwriting Analysis** — AI-driven risk assessment covering income, assets, liabilities, and document completeness
- **Intelligent Chat** — Conversational AI assistant (Mira) for mortgage-related queries
- **Speech Support** — Speech-to-text and text-to-speech for accessibility
- **Borrower Tools** — Built-in calculators for GDS/TDS ratios, mortgage payments, and more

### Multi-Tenant Architecture
- Each organization operates on its own branded subdomain (e.g., `branch-org.miralabs.ai`)
- Branch-level isolation for mortgage specialists and applications
- Customizable branding per organization

### Notifications
- In-app notifications for borrowers and mortgage specialists
- Email notifications for key events (application submitted, documents requested, status changes)
- Configurable digest emails (daily and weekly summaries)
- Automated reminders for incomplete applications
- Borrower notification preferences with quiet hours

### FundMore LOS Integration
- Application and document sync to FundMore LOS
- Inbound webhook processing for loan status updates, document events, and borrower updates
- Outbound webhook delivery for external system integration

:::info Roadmap — Planned Integrations
Credit bureau pulls (Equifax Canada), product and rate sheet access, AVM/appraisal ordering, and mortgage insurance submissions will be available through FundMore LOS APIs. See [FundMore LOS Integration](./external-los) and [Credit Reports](./credit) for details.
:::

---

## Next Steps

- [Authentication](./authentication) — Login flows, RBAC, and session management
- [Borrower Portal](./b2c-borrower-portal) — Borrower self-service experience
- [Mortgage Specialist Portal](./b2b-loan-officer-portal) — Pipeline management and application review
- [AI Platform](./ai-platform) — Mira AI capabilities and WebSocket
- [FundMore LOS Integration](./external-los) — LOS sync, webhooks, and external integrations
- [Notifications](./notifications) — Notification system
- [Credit Reports](./credit) — Credit integration (planned, via FundMore LOS)
- [Product & Pricing](./product-pricing) — Product rates and loan tools
- [POS Flow Reference](./pos-flow-reference) — All sequence diagrams in one place
