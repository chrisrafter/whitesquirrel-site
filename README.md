# WhiteSquirrel.ai Website

Static site deployed to Hostinger. Source of truth is this folder — edit here, then deploy.

## Structure

```
website/
  index.html          ← main landing page (Coming Soon → launch mode)
  meetup/index.html   ← meetup landing page (whitesquirrel.ai/meetup)
  launch/index.html   ← campaign pages as needed
  assets/             ← images, logo
```

## Deploy Option A — Manual (start here)

1. Zip the contents of this folder (not the folder itself)
2. hPanel → Websites → whitesquirrel.ai → File Manager → `public_html`
3. Upload zip → right-click → Extract → overwrite
4. Verify at whitesquirrel.ai (hard refresh)

## Deploy Option B — Git auto-deploy (set up once, then hands-free)

1. Create a private GitHub repo `whitesquirrel-site`; push this folder to it
2. hPanel → Websites → whitesquirrel.ai → Advanced → **Git**
3. Add repository: paste repo URL, branch `main`, directory `public_html`
4. Copy the webhook URL hPanel provides → GitHub repo → Settings → Webhooks → add it
5. From then on: any push to `main` auto-deploys. Claude edits files here, Chris runs `git push` (or Claude does via shell)

## Rules

- No build step, no frameworks — plain HTML/CSS/JS, single file per page where possible
- Newsletter forms post directly to the email provider's form endpoint
- Booking CTA: Cal.com/Calendly embed
- Test on mobile before every deploy
