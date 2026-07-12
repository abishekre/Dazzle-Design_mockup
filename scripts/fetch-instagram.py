#!/usr/bin/env python3
"""
Download Dazzle Designs' own Instagram photos at FULL RESOLUTION, plus captions
and dates, so they can be added to the website.

This uses `instaloader` — the standard, open-source Instagram downloader. It is
NOT a hack that defeats bot-detection; it's the normal way to pull your own
public posts. Logging in with YOUR OWN account makes it reliable and gets the
full 1080px+ originals (the website's current photos are low-res because they
came from Facebook's public thumbnail — this fixes that).

--------------------------------------------------------------------------------
SETUP (one time):
    pip install instaloader

RUN:
    # Simple (public, may rate-limit after a while):
    python fetch-instagram.py

    # Recommended — log in as yourself for full-resolution + all 86 posts.
    # You'll be asked for YOUR Instagram password. It is typed locally and is
    # NOT stored or sent anywhere by this script.
    python fetch-instagram.py --login your_instagram_username

OUTPUT:
    ./downloaded/dazz_ledesigns/   — JPGs (full res) + .txt captions + metadata

THEN:
    Zip that folder and share it back, or drop the images straight into
    ./public/images/ and tell me — I'll curate and wire the high-res photos
    into the right occasions with correct captions.
--------------------------------------------------------------------------------
"""
import argparse
import sys

try:
    import instaloader
except ImportError:
    sys.exit("Missing dependency. Run:  pip install instaloader")

TARGET = "dazz_ledesigns"  # the Dazzle Designs Instagram handle


def main() -> None:
    ap = argparse.ArgumentParser(description="Download @%s posts at full resolution." % TARGET)
    ap.add_argument("--login", metavar="USERNAME", help="your Instagram username (recommended for full-res)")
    args = ap.parse_args()

    loader = instaloader.Instaloader(
        dirname_pattern="downloaded/{target}",
        download_videos=False,
        download_video_thumbnails=False,
        save_metadata=True,
        post_metadata_txt_pattern="{date_utc:%Y-%m-%d} | {caption}",
        compress_json=False,
        quiet=False,
    )

    if args.login:
        # Prompts for YOUR password locally; never stored by this script.
        loader.interactive_login(args.login)

    try:
        profile = instaloader.Profile.from_username(loader.context, TARGET)
    except Exception as e:  # noqa: BLE001
        sys.exit(
            "Couldn't open the profile (%s).\n"
            "Instagram often blocks anonymous downloads — re-run with:\n"
            "    python fetch-instagram.py --login your_instagram_username" % e
        )

    print("Downloading %d posts from @%s ..." % (profile.mediacount, TARGET))
    count = 0
    for post in profile.get_posts():
        loader.download_post(post, target=TARGET)
        count += 1
    print("\nDone — %d posts saved to ./downloaded/%s/ (full resolution)." % (count, TARGET))


if __name__ == "__main__":
    main()
