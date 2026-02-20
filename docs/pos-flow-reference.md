---
sidebar_position: 10
title: POS Flow Reference
description: Combined reference of all sequence diagrams for platform flows
---

# POS Flow Reference

This page consolidates the key sequence diagrams from across the platform documentation into a single reference. Each diagram shows the interaction between actors (Borrower, Mortgage Specialist), the Platform Portal, the Platform API, and supporting services.

For detailed documentation on specific subsystems, see the linked pages within each section.

---

## Diagram Legend

| Symbol | Meaning |
|---|---|
| **Solid arrow** (`->>`) | Synchronous request |
| **Dashed arrow** (`-->>`) | Response / async callback |
| **rect** blocks | Grouped phases |
| **alt/else** blocks | Conditional branching |
| **loop** blocks | Repeated operations |
| **Note** | Additional context |

---

## 1. Borrower Application Flow

The complete flow from a borrower arriving at the portal through multi-step application submission. See [Borrower Portal](./b2c-borrower-portal) for full details.

```mermaid
sequenceDiagram
    autonumber
    participant B as Borrower
    participant Portal as Platform Portal
    participant API as Platform API
    participant Email as Email Service

    Note over B,Email: Phase 1 — Authentication

    B->>Portal: Visit portal link (branch-org.miralabs.ai)
    Portal->>API: Validate tenant from subdomain
    API-->>Portal: Tenant config and branding
    Portal-->>B: Show login page

    B->>Portal: Enter email address
    Portal->>API: Request magic link
    API->>Email: Send magic link email
    Email-->>B: Magic link email
    B->>Portal: Click magic link
    Portal->>API: Authenticate via callback token
    API-->>Portal: Set session and user profile
    Portal-->>B: Redirect to onboarding or dashboard

    Note over B,Email: Phase 2 — Consumer Onboarding

    B->>Portal: Select mortgage purpose (Purchase, Refinance, Switch)
    B->>Portal: Select employment type
    Portal->>API: Complete onboarding
    Note over API: Creates draft application, borrower<br/>profile, and employment record
    API-->>Portal: Onboarding complete
    Portal-->>B: Redirect to application pipeline

    Note over B,Email: Phase 3 — Multi-Step Profile Entry

    B->>Portal: Enter personal details and loan information
    Portal->>API: Update personal details and loan info
    API-->>Portal: Profile completion updated
    Portal-->>B: Show employment and income page

    B->>Portal: Add employment profiles and income details
    Portal->>API: Update employment and income
    API-->>Portal: Profile completion updated
    Portal-->>B: Show assets page

    B->>Portal: Enter assets (savings, investments, RRSP, TFSA, FHSA)
    Portal->>API: Update assets
    API-->>Portal: Profile completion updated
    Portal-->>B: Show liabilities page

    B->>Portal: Enter liabilities (debts, loans, credit cards)
    Portal->>API: Update liabilities
    API-->>Portal: Profile completion updated
    Portal-->>B: Show declarations page

    B->>Portal: Complete declarations and demographics
    Portal->>API: Update declarations
    API-->>Portal: Profile completion 100%

    Note over B,Email: Phase 4 — Application Submission

    B->>Portal: Submit application
    Portal->>API: Update application status to submitted
    API->>Email: Send confirmation to borrower
    API-->>Portal: Application submitted
    Portal-->>B: "Application submitted successfully"
```

---

## 2. Mortgage Specialist Authentication

See [Authentication](./authentication) for full details on the B2B authentication flow.

```mermaid
sequenceDiagram
    autonumber
    participant MS as Mortgage Specialist
    participant Portal as Platform Portal
    participant API as Platform API
    participant Auth as Auth Provider

    MS->>Portal: Navigate to B2B login
    MS->>Portal: Enter work email
    Portal->>API: Discover organizations for email
    API->>Auth: Organization discovery
    Auth-->>API: List of organizations
    API-->>Portal: Available organizations

    alt Multiple organizations
        Portal-->>MS: Show organization selector
        MS->>Portal: Select organization
    end

    Portal->>API: Send magic link
    API->>Auth: Send B2B magic link
    Auth-->>MS: Magic link email

    MS->>Portal: Click magic link
    Portal->>API: Authenticate callback
    API->>Auth: Validate and exchange token
    Auth-->>API: Member session with permissions

    API-->>Portal: Set session with user profile and permissions

    alt First-time login
        Portal-->>MS: Redirect to onboarding
    else Returning user
        Portal-->>MS: Redirect to dashboard (role-based)
    end

    Note over MS,Auth: Subsequent API Requests

    MS->>Portal: Navigate to pipeline
    Portal->>API: Request applications list
    API->>Auth: Validate session token
    Auth-->>API: Valid session
    API-->>Portal: Paginated applications
    Portal-->>MS: Render pipeline
```

---

## 3. Pipeline and Application Review

See [Mortgage Specialist Portal](./b2b-loan-officer-portal) for full details.

```mermaid
sequenceDiagram
    autonumber
    participant MS as Mortgage Specialist
    participant Portal as Platform Portal
    participant API as Platform API
    participant AI as Mira AI

    Note over MS,AI: Pipeline Management

    MS->>Portal: Open pipeline
    Portal->>API: Get applications with status filters
    API-->>Portal: Applications list with borrower details and completion %
    Portal-->>MS: Render pipeline table with filters

    Note over MS,AI: Application Detail Review

    MS->>Portal: Click application row
    Portal->>API: Get application details
    API-->>Portal: Complete application detail
    Portal-->>MS: Show borrower profile

    Note over MS,AI: Borrower Profile Editing

    MS->>Portal: Edit borrower profile
    MS->>Portal: Update personal details, employment, income
    Portal->>API: Save borrower profile updates
    API-->>Portal: Updated profile with completion %
    Portal-->>MS: Show updated completion percentage

    Note over MS,AI: Co-Borrower Management

    MS->>Portal: Invite co-borrower
    Portal->>API: Send co-borrower invitation
    Note over API: Creates co-borrower record and<br/>sends invitation email
    API-->>Portal: Invitation sent

    Note over MS,AI: AI Pre-Underwriting Analysis

    MS->>Portal: Navigate to pre-underwriting tab
    Portal->>API: Queue underwriting analysis
    API->>AI: Analyze borrower profile, documents, income
    AI-->>API: Risk summary and recommendations
    API-->>Portal: Pre-underwriting report
    Portal-->>MS: Display AI analysis with risk flags
```

---

## 4. Co-Borrower Flow

The platform supports adding co-borrowers (spouse or external) to a loan application. The co-borrower receives their own invitation and completes onboarding independently.

```mermaid
sequenceDiagram
    autonumber
    participant PB as Primary Borrower
    participant Portal as Platform Portal
    participant API as Platform API
    participant Email as Email Service
    participant CB as Co-Borrower

    Note over PB,CB: Step 1 — Invite Co-Borrower

    PB->>Portal: Add co-borrower (spouse or external)
    Portal->>API: Send co-borrower invitation
    Note over API: Creates co-borrower record with type<br/>(spouse or external) and sends invitation
    API->>Email: Send invitation email
    Email-->>CB: Co-borrower invitation link
    API-->>Portal: Invitation sent
    Portal-->>PB: "Co-borrower invitation sent"

    Note over PB,CB: Step 2 — Co-Borrower Onboarding

    CB->>Portal: Click invitation link
    Portal->>API: Authenticate via magic link
    API-->>Portal: Session established
    Portal-->>CB: Show co-borrower onboarding

    CB->>Portal: Complete personal details
    Portal->>API: Complete co-borrower onboarding
    Note over API: Updates profile, links to application,<br/>creates employment record
    API-->>Portal: Onboarding complete
    Portal-->>CB: Redirect to co-borrower dashboard

    Note over PB,CB: Step 3 — Co-Borrower Profile Completion

    CB->>Portal: Fill employment, income, assets, liabilities
    Portal->>API: Update co-borrower profile sections
    API-->>Portal: Profile completion updated

    Note over PB,CB: Limits

    Note over API: Max 1 spouse co-borrower<br/>Max 4 external co-borrowers<br/>Max 5 total co-borrowers
```

---

## 5. Document Lifecycle

See [Borrower Portal](./b2c-borrower-portal) and [Mortgage Specialist Portal](./b2b-loan-officer-portal) for endpoint details.

```mermaid
sequenceDiagram
    autonumber
    participant MS as Mortgage Specialist
    participant B as Borrower
    participant B2B as Specialist Portal
    participant B2C as Borrower Portal
    participant API as Platform API
    participant Storage as Document Storage
    participant Email as Email Service

    Note over MS,Email: Step 1 — Specialist Requests Documents

    MS->>B2B: Request documents from borrower
    B2B->>API: Create document requirement
    API->>Email: "Documents requested" notification to borrower
    API-->>B2B: Requirement created
    Email-->>B: "Please upload your documents"

    Note over MS,Email: Step 2 — Borrower Uploads Document

    B->>B2C: Select file to upload
    B2C->>API: Upload document
    Note over API: Content moderation, file storage,<br/>document type auto-detection
    API->>Storage: Store file in tenant container
    Storage-->>API: Storage confirmation
    API-->>B2C: Document uploaded successfully
    B2C-->>B: "Document uploaded"
    API->>Email: Notify specialist of new upload

    Note over MS,Email: Step 3 — Specialist Reviews Document

    MS->>B2B: Open documents tab
    B2B->>API: Get documents for application
    API-->>B2B: Documents with status
    B2B-->>MS: Show document list

    alt Document Approved
        MS->>B2B: Approve document
        B2B->>API: Approve document
        API->>Email: "Document approved" notification
        API-->>B2B: Status updated to approved
    else Document Rejected
        MS->>B2B: Reject document with reason
        B2B->>API: Reject document with reason
        API->>Email: "Please re-upload" notification with feedback
        API-->>B2B: Status updated to rejected
        Email-->>B: Re-upload request with rejection reason
    end

    Note over MS,Email: Step 4 — Borrower Re-uploads (if rejected)

    B->>B2C: Upload corrected document
    B2C->>API: Upload new version
    API->>Storage: Store new version
    API->>Email: Notify specialist of re-upload
    API-->>B2C: New version uploaded
```

---

## 6. AI Pre-Underwriting Analysis

See [AI Platform](./ai-platform) for full details on AI capabilities.

```mermaid
sequenceDiagram
    autonumber
    participant MS as Mortgage Specialist
    participant Portal as Platform Portal
    participant API as Platform API
    participant AI as Mira AI

    MS->>Portal: Navigate to pre-underwriting tab
    MS->>Portal: Click "Run Analysis"
    Portal->>API: Queue underwriting analysis for application

    API->>AI: Analyze application
    Note over AI: Income verification<br/>Asset analysis<br/>Liability review<br/>Document completeness<br/>Risk assessment

    AI-->>API: Pre-underwriting report
    API-->>Portal: Analysis results
    Portal-->>MS: Display risk summary, recommendations, and flags

    alt Issues Found
        MS->>Portal: Review flagged items
        Note over Portal: e.g., "Large deposit needs explanation"<br/>"Employment gap detected"
        MS->>Portal: Request additional information from borrower
    else Clean Report
        MS->>Portal: Proceed to update application status
    end
```

:::info Roadmap — Credit Integration Planned
Credit bureau pulls will be integrated through FundMore LOS's existing Equifax Canada connection. See [Credit Reports](./credit) for the planned flow. Once available, the credit data will feed into the AI pre-underwriting analysis.
:::

---

## 7. FundMore LOS Application Sync

When a mortgage specialist submits a loan, the platform syncs the application and documents to FundMore LOS. See [FundMore LOS Integration](./external-los) for the full sync flow, data mapping, and API reference.

```mermaid
sequenceDiagram
    autonumber
    participant MS as Mortgage Specialist
    participant Portal as Platform Portal
    participant API as Platform API
    participant Storage as Document Storage
    participant LOS as FundMore LOS

    MS->>Portal: Click "Submit Loan" on borrower profile
    Portal->>API: Sync application to FundMore LOS

    API->>API: Load complete borrower profile
    Note over API: Personal details, loan info, employment,<br/>income, assets, liabilities, real estate

    API->>API: Transform to FundMore LOS format
    API->>API: Validate required fields

    API->>LOS: Create application in FundMore
    LOS-->>API: Application created
    API->>API: Store FundMore reference ID

    alt Document Upload Enabled
        API->>API: Fetch approved documents
        loop Each document
            API->>LOS: Request upload URL
            LOS-->>API: Upload URL ready
            API->>Storage: Download document file
            Storage-->>API: File content
            API->>LOS: Upload document and link to application
        end
    end

    API-->>Portal: Sync completed
    Portal-->>MS: "Loan submitted to FundMore LOS"
```

---

## 8. End-to-End Loan Lifecycle

A high-level summary combining all flows from application through to close.

```mermaid
sequenceDiagram
    autonumber
    participant B as Borrower
    participant MS as Mortgage Specialist
    participant System as Platform
    participant LOS as FundMore LOS

    rect rgb(230, 245, 255)
        Note over B,LOS: Application Phase
        B->>System: Authenticate via magic link
        B->>System: Complete onboarding (purpose, employment type)
        B->>System: Fill profile (personal, loan, income, assets, liabilities)
        B->>System: Upload documents
        B->>System: Submit application
    end

    rect rgb(255, 243, 224)
        Note over B,LOS: Processing Phase
        System-->>MS: Notification — new application
        MS->>System: Review application in pipeline
        MS->>System: Edit and complete borrower profile
        MS->>System: Request additional documents
        System-->>B: Notification — documents requested
        B->>System: Upload additional documents
        MS->>System: Review and approve documents
        MS->>System: Run AI pre-underwriting analysis
    end

    rect rgb(232, 245, 233)
        Note over B,LOS: Underwriting Phase
        MS->>System: Submit application to FundMore LOS
        System->>LOS: Sync application and documents
        LOS-->>System: Application received
        Note over LOS: Adjudication and fulfillment teams<br/>review in FundMore LOS
        LOS-->>System: Decision event via inbound webhook
    end

    rect rgb(243, 229, 245)
        Note over B,LOS: Decision Phase
        alt Approved
            System-->>MS: Notification — approved
            System-->>B: Notification — "Your application has been approved"
            MS->>System: Update status to approved
            MS->>System: Proceed to closing
            System-->>B: "Your loan has closed"
        else Conditionally Approved
            System-->>MS: Conditions list
            MS->>System: Request conditions from borrower
            System-->>B: "Additional items needed"
            B->>System: Submit condition documents
            MS->>System: Clear conditions
            MS->>System: Update status to approved
        else Denied
            System-->>MS: Denial reasons
            MS->>System: Update status to denied
            System-->>B: "We have an update regarding your application"
        end
    end
```

---

## 9. Loan Status Lifecycle

```mermaid
stateDiagram-v2
    [*] --> Draft: Application created
    Draft --> Submitted: Borrower submits
    Draft --> Cancelled: Borrower cancels
    Submitted --> Processing: Specialist picks up
    Submitted --> Cancelled: Specialist cancels
    Processing --> Underwriting: Sent to underwriting
    Processing --> Denied: Specialist denies
    Processing --> Cancelled: Specialist cancels
    Underwriting --> Approved: Approved
    Underwriting --> ConditionallyApproved: Conditions required
    Underwriting --> Denied: Denied
    ConditionallyApproved --> Approved: Conditions met
    ConditionallyApproved --> Denied: Conditions not met
    Approved --> Closed: Loan closes
    Approved --> Cancelled: Withdrawn
    Denied --> [*]
    Closed --> [*]
    Cancelled --> [*]
```

### Status Definitions

| Status | Description |
|---|---|
| Draft | Application started but not yet submitted |
| Submitted | Borrower has completed and submitted the application |
| Processing | Mortgage specialist is reviewing and gathering documentation |
| Underwriting | Application is under formal underwriting review |
| Approved | Loan has been fully approved |
| Conditionally Approved | Approved with conditions that must be met before final approval |
| Denied | Application has been denied |
| Closed | Loan has closed (funded) |
| Cancelled | Application withdrawn or cancelled |

---

## 10. Multi-Tenant Resolution

```mermaid
sequenceDiagram
    autonumber
    participant User as User (B2B or B2C)
    participant Portal as Platform Portal
    participant API as Platform API

    User->>Portal: Navigate to branch-org.miralabs.ai
    Portal->>API: API request with host header
    API->>API: Extract subdomain from host
    API->>API: Resolve organization and branch
    API->>API: Validate user belongs to this tenant
    API->>API: Check user roles and permissions
    API->>API: Execute query with tenant isolation
    API-->>Portal: Tenant-scoped response
    Portal-->>User: Render tenant-branded UI
```

---

## 11. Notification Flow

The platform delivers notifications through in-app, email, digest, and real-time channels. For the full notification system documentation including all triggers, digest schedules, preferences, reminders, and FundMore LOS inbound notification processing, see [Notifications](./notifications).

---

## 12. Real-Time AI Chat

Real-time AI interaction is delivered via WebSocket for the Mira AI assistant. For full details on the WebSocket connection, message types, voice input, and AI capabilities, see [AI Platform](./ai-platform).

---

## Related Pages

- [Introduction](/) — Platform overview
- [Authentication](./authentication) — Login flows and RBAC
- [Borrower Portal](./b2c-borrower-portal) — Borrower self-service experience
- [Mortgage Specialist Portal](./b2b-loan-officer-portal) — Specialist workflow
- [AI Platform](./ai-platform) — Mira AI capabilities and WebSocket
- [FundMore LOS Integration](./external-los) — LOS sync, webhooks, and external integrations
- [Notifications](./notifications) — Notification system
- [Credit Reports](./credit) — Credit integration (planned, via FundMore LOS)
- [Product & Pricing](./product-pricing) — Product rates and loan tools
