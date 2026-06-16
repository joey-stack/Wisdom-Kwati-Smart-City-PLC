<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Antigravity Testing Instructions

You are working on a real estate web application.

You MUST follow this workflow before approving or modifying any UI-related code:

1. When UI or frontend changes are made, ALWAYS trigger automated tests.

2. Trigger tests using ONE of the available methods:
   - Run the local Playwright tests command: `npm run test:e2e` (or `npx playwright test`)
   - Trigger the GitHub Actions workflow: `gh workflow run "UI Tests (Playwright + BrowserStack)"`
   - Or trigger the BrowserStack execution: `npx browserstack-node-sdk playwright test`

3. After triggering tests:
   - Wait for results
   - Retrieve logs, screenshots, and failures

4. Analyze results focusing on:
   - Mobile responsiveness (iPhone + Android)
   - Safari/WebKit layout issues
   - Property card layout stability
   - CTA visibility and usability
   - Typography hierarchy

5. If any test fails:
   - Identify root cause (CSS, layout, component logic)
   - Propose a fix at code level
   - Do NOT ignore failures

6. Treat the following as CRITICAL failures:
   - Layout breaking on Safari
   - Mobile overflow or horizontal scrolling
   - Missing or invisible CTA buttons
   - Broken property listing grids

7. Do not finalize any UI change until tests pass.

This system is a production QA gate.
