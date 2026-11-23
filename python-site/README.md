# Python/Jinja static-site migration scaffold

This is an independent static generator, built with Python and Jinja2. It does not import, execute, or modify the existing Vite/ReScript application. Production remains untouched during migration.

## Build

```sh
python3 -m venv .venv
. .venv/bin/activate
pip install -r requirements.txt
python build.py
```

The generated static site is in `_site/`. Run `python -m http.server 8000 --directory _site` to preview it. For a Render staging static site rooted here, use build command `pip install -r requirements.txt && python build.py` and publish directory `_site`. Do not apply those settings to production until the full feature and content parity review is complete.

The page now includes local fixture filtering and selection, team-vs-team analysis, probability and goals-market estimates, historical H2H summaries, featured player stats, and projected league standings. The checked-in JSON is a deterministic snapshot extracted from the prior reference modules. This is still an incremental port: original edge-case parity and full browser-level review remain outstanding before any Render staging or production change.
