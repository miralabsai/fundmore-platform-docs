---
sidebar_position: 9
title: Product & Pricing
description: Product rates, fees worksheets, and loan comparison tools
---

# Product & Pricing

:::info Roadmap — Integration In Progress
The product and pricing module is being built to integrate with the external LOS APIs. The full roadmap is being defined in collaboration with the end client to understand:

- **Product rate sheets** — Lender-specific product offerings and rate structures
- **Product guidelines and policies** — Eligibility rules, LTV limits, amortization options, and qualification criteria per product
- **Fees worksheet structure** — Fee categories, line items, and calculation rules

This page documents the planned capabilities and will be updated as the integration is finalized.
:::

---

## Planned Capabilities

### Product & Rate Quoting

Product rates and pricing will be sourced from the **external LOS API**. The platform will allow loan officers to:

- **Search available products** — Query products based on loan parameters (amount, LTV, amortization, property type, occupancy)
- **View rate options** — See available rates, terms, and monthly payment estimates for qualifying products
- **Compare scenarios** — Compare multiple product/rate combinations side by side
- **Send quotes** — Generate and send rate quotes to borrowers via email or PDF

### Fees Worksheet

Each loan application will have a fees worksheet for tracking all associated costs. The fees worksheet will:

- **Auto-populate from product selection** — When a product/rate is selected, associated fees are populated automatically
- **Support manual entry** — Officers can add, edit, and remove individual fee line items
- **Calculate totals** — Running totals of all fees, broken down by category
- **Integrate with external LOS** — Fee structures and calculations will align with the external LOS

### Product Guidelines & Policies

Once the end client's product guidelines are received, the platform will support:

- **Eligibility checks** — Validate borrower qualification against product-specific rules
- **LTV and GDS/TDS limits** — Enforce maximum ratios per product type
- **Documentation requirements** — Product-specific document checklists
- **CMHC insurance rules** — Mortgage insurance requirements based on down payment and product type

---

## Loan Tools

The following loan analysis tools are available today for both officers and borrowers:

### B2B Loan Tool Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/b2b/loan/tools/get_amortization_schedule/application/{id}` | Monthly payment breakdown over the loan term |
| `GET` | `/api/v1/b2b/loan/tools/get_current_offer/application/{id}` | Summary of the current loan offer |
| `POST` | `/api/v1/b2b/loan/tools/compare_offer_by_user_input` | Compare loan scenarios by adjusting parameters |
| `POST` | `/api/v1/b2b/loan/tools/download_quote/application/{id}` | Download a loan quote as PDF |

### B2C Loan Tool Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/b2c/loan/tools/get_amortization_schedule_consumer` | Consumer amortization schedule |
| `GET` | `/api/v1/b2c/loan/tools/get_current_offer_consumer` | Consumer current offer |
| `POST` | `/api/v1/b2c/loan/tools/compare_offer_by_user_input_consumer` | Consumer offer comparison |
| `POST` | `/api/v1/b2c/loan/tools/download_quote_consumer/application/{id}` | Consumer quote PDF download |

---

## Related Pages

- [Loan Officer Portal](./b2b-loan-officer-portal) — Loan Tools within the officer workflow
- [Borrower Portal](./b2c-borrower-portal) — Consumer-facing loan tools
- [External LOS](./external-los) — External LOS integration details
- [Credit Reports](./credit) — Credit integration (also via external LOS)
