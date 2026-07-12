# Getting your real photos & info (high resolution)

The website photos currently look a little soft because they came from Facebook's
**public thumbnail** (≈590px). Your real originals are ~3072px. Here are the two
legitimate ways to get everything in full quality. Do **either** (Option A is
fastest for photos; Option B gets literally everything, best quality).

---

## Option A — Instagram photos via the downloader (fast)

Gets all your Instagram posts at full resolution, with captions and dates.

```bash
pip install instaloader
python scripts/fetch-instagram.py --login your_instagram_username
```

- You'll be asked for **your own** Instagram password — it's entered locally and
  is **not stored or sent** by the script.
- Output lands in `downloaded/dazz_ledesigns/` (JPGs + `.txt` captions).

> Why `--login`? Instagram blocks anonymous bulk downloads. Logging in as
> yourself is the normal, allowed way to export your own posts, and it's what
> unlocks full resolution + all 86 posts.

---

## Option B — Official Meta export (everything, highest quality)

This is Meta's own "download my data" tool — the best-quality originals for
**both** Instagram and Facebook, plus your business info.

**Instagram**
1. Instagram app → Profile → ☰ → **Accounts Center**
2. **Your information and permissions** → **Download your information**
3. Request a download → pick the Dazzle Designs account →
   **Format: JSON**, **Media quality: High**, Date range: All time
4. You'll get a ZIP by email in a little while.

**Facebook** (same Accounts Center)
1. **Download your information** → select the **Dazzle Designs** Page
2. Choose **Posts / Photos**, **High** quality, **JSON**
3. Download the ZIP when ready.

---

## Then hand it back

Zip the `downloaded/` folder (Option A) **or** the Meta export ZIP (Option B) and
share it — or just drop the best images straight into `public/images/` and tell
me. I'll:

- pick the strongest shots per occasion (birthdays, showers, weddings, balloon
  work, communions…),
- swap out the current low-res photos for the full-res originals,
- pull real captions/dates into the gallery,
- and fill in the occasion pages that are placeholders right now.

That single step is what takes the site from "looks good" to "looks premium."
