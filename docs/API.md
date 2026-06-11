# BuilderMint API

All routes return:

```json
{ "ok": true, "data": {} }
```

or

```json
{ "ok": false, "error": "message" }
```

## Profile

### `GET /api/profile`

Returns the current user's skill profile.

### `POST /api/profile`

Body:

```json
{
  "skills": ["TypeScript"],
  "domainExperience": ["SaaS"],
  "tools": ["Next.js"],
  "audiences": ["founders"],
  "preferredProductTypes": ["B2B"],
  "weeklyTimeBudget": 10,
  "moneyBudget": 500,
  "monetizationPreference": "subscription"
}
```

## Opportunities

### `POST /api/opportunities/generate`

Generates five opportunities for the current user's profile.

### `GET /api/opportunities`

Lists opportunities for the current user.

### `GET /api/opportunities/[id]`

Returns one opportunity.

### `POST /api/opportunities/[id]/build-plan`

Generates an MVP build plan.

### `POST /api/opportunities/[id]/launch-plan`

Generates a launch plan.

## Plans

### `GET /api/plans/[id]?type=launch`

Returns a build plan by default, or a launch plan when `type=launch`.