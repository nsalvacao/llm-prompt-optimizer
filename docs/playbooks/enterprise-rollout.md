# Enterprise Rollout Playbook · Prompt Governance

> **Objective:** Guide consultancies and software houses in introducing the LLM Prompt Optimizer to internal teams or client organizations, maintaining the OSS and free nature of the project.

---

## Target Audience

- **Consultancies** deploying AI solutions for enterprise clients
- **Software houses** building internal AI tooling for product teams
- **AI providers** offering prompt engineering as part of their service stack
- **Enterprise IT teams** establishing governance over LLM usage

---

## Day 0 · Preparation (Product/AI Lead)

| Activity | Owner | Deliverable |
|----------|-------|-------------|
| Validate legal requirements (browser-only, no backend data processing) | Compliance Lead | GDPR Art. 25 assessment |
| Gather existing internal templates and map mandatory variables | Product Lead | Template inventory (2-5 samples) |
| Define initial success metric (e.g., revision time, approval rate) | AI Lead | Baseline measurement framework |

**Expected Duration:** 2-3 hours

---

## Day 1-2 · Guided Demo & Customization

**Focus:** Demonstrate core functionality and adapt to client context.

### Activities

| Task | Details | Files to Review |
|------|---------|-----------------|
| **Present base flow** | Show `App.tsx` + `SettingsModal`, explain Gemini/OpenAI switching | `src/App.tsx`, `src/components/SettingsModal.tsx` |
| **Create proprietary templates** | Add 2-3 client-specific templates to `constants.tsx` | `src/constants.tsx` |
| **Demonstrate history/favorites** | Export entries for knowledge base integration | `src/hooks/useHistory.ts` |

**Expected Duration:** 4-6 hours over 2 days

**Key Discussion Points:**
- Multi-provider strategy (cost vs. latency vs. quality trade-offs)
- Variable templating for reusable prompt libraries
- localStorage persistence model (no backend = zero infrastructure cost)

---

## Day 3-4 · Governance & Enablement

**Focus:** Establish operational processes and team autonomy.

### Co-Design Activities

1. **Validation Checklist** (security, tone of voice, legal disclaimers)
   - Define approval workflow for new templates
   - Assign template ownership (Product, Legal, Compliance)
   - Document variable naming conventions

2. **Role Assignment**
   - **Template Approver:** Product/Legal Lead
   - **Variable Manager:** Content Ops
   - **Quality Auditor:** AI/ML Engineer

3. **Documentation**
   - Create lightweight SOP in client wiki or internal repo
   - Include escalation path for edge cases

**Expected Duration:** 4-6 hours over 2 days

**Deliverable:** 1-page governance document + RACI matrix

---

## Day 5 · Transition to Operations

**Focus:** Measure impact, gather feedback, define next steps.

### Measurement & Handoff

| Metric | Baseline (Day 0) | Post-Rollout (Day 5) | Target Improvement |
|--------|------------------|----------------------|--------------------|
| Prompt revision time | 15-20 min | 8-12 min | ~40% reduction |
| Onboarding per user | 30 min | <5 min | 80%+ faster |
| Template approval cycle | 2-3 days | Same day | Maintain velocity |

### Next Steps Identification

**Common Evolution Paths:**
- **Observability Integration:** Langfuse/Helicone for production trace analysis
- **Multi-Provider Routing:** LiteLLM for cost-aware load balancing
- **Automated QA:** RAGAS-style evaluation for prompt quality scoring
- **Backend Mode:** PostgreSQL + pgvector for team collaboration (optional)

**Expected Duration:** 2-3 hours

**Deliverable:** Light report (2-3 pages) with recommendations and effort estimates

---

## Supporting Materials

| Resource | Purpose | Audience |
|----------|---------|----------|
| [README.md](../../README.md) | Consultative narrative & product vision | Technical stakeholders |
| [Landing Page](../index.html) | Stakeholder-facing overview | Non-technical decision-makers |
| [ADR-001: Browser-Only Architecture](adr-001-browser-only.md) | Architecture rationale | Engineering teams |
| [ADR-002: Discriminated Unions](adr-002-discriminated-unions.md) | Type safety patterns | TypeScript developers |
| [ADR-003: Gemini as Meta-LLM](adr-003-gemini-meta-llm.md) | Provider selection reasoning | AI/ML teams |

---

## Industry-Specific Adaptations

### Regulated Industries (Healthcare, Finance)

**Additional Steps:**
- Day 0: Add audit trail requirements (record-of-processing for GDPR Art. 30)
- Day 3: Include compliance officer in template approval workflow
- Day 5: Document data retention policies (localStorage clearing procedures)

**Estimated Additional Effort:** +2-3 hours

### Marketing Agencies

**Customization Focus:**
- Day 2: White-label UI rebrand (logo, colors, domain)
- Day 3: Client-specific tone templates (formal/casual/technical per account)
- Day 4: Isolated prompt libraries per client

**Estimated Additional Effort:** +2-4 hours per client

### SaaS Startups

**Integration Priorities:**
- Day 2: Multi-language routing (EN/ES/PT/DE optimization frameworks)
- Day 3: Cost-aware model selection (GPT-4 for production, Claude for internal)
- Day 5: Department-level cost allocation reporting

**Estimated Additional Effort:** +6-8 hours

---

## Total Estimated Effort

| Phase | Duration | Billable Hours (approx.) |
|-------|----------|--------------------------|
| Preparation | 2-3 hours | 0.5 days |
| Demo & Customization | 4-6 hours | 1 day |
| Governance & Enablement | 4-6 hours | 1 day |
| Transition | 2-3 hours | 0.5 days |
| **Total Base Rollout** | **12-18 hours** | **3-4 days** |
| Industry Adaptations | +2-8 hours | +0.5-1 days |

**Recommended Engagement Model:** Fixed-price engagement or time-and-materials with cap.

---

## Success Criteria

**Minimum Viable Outcome (End of Week 1):**
- ✅ 3+ team members actively using the tool
- ✅ 2+ proprietary templates in production use
- ✅ Governance workflow documented and approved
- ✅ Baseline metric showing measurable improvement

**Ideal Outcome (End of Month 1):**
- ✅ 10+ team members with <5min onboarding time
- ✅ 5+ templates with variable libraries
- ✅ Integration roadmap approved (Langfuse/LiteLLM)
- ✅ 40%+ reduction in prompt revision time

---

## Troubleshooting Common Issues

| Issue | Root Cause | Resolution |
|-------|------------|-----------|
| "API costs too high" | Using premium models for all requests | Implement cost tiers (GPT-4 production, GPT-3.5 internal) |
| "Templates not specific enough" | Generic examples used | Co-create 2-3 templates with actual client use cases |
| "Team not adopting tool" | Unclear value proposition | Run side-by-side demo (manual vs. optimized prompt) |
| "GDPR concerns" | Misunderstanding of browser-only model | Provide Art. 25 compliance brief + localStorage audit |

---

## Contact & Support

For questions about adapting this playbook to your organization:

📧 **Email:** [nuno.salvacao@gmail.com](mailto:nuno.salvacao@gmail.com)
🌐 **Portfolio:** [https://github.com/nsalvacao](https://github.com/nsalvacao)
💼 **LinkedIn:** [https://www.linkedin.com/in/nsalvacao/](https://www.linkedin.com/in/nsalvacao/)

---

**Version:** 1.0
**Last Updated:** 2025-01-10
**License:** MIT (same as parent project)
