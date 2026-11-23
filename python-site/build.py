#!/usr/bin/env python3
"""Render the independent static preview site using Jinja2."""
from __future__ import annotations

import json
import shutil
from pathlib import Path
from jinja2 import Environment, FileSystemLoader, StrictUndefined, select_autoescape

ROOT = Path(__file__).resolve().parent
OUTPUT = ROOT / "_site"


def build() -> None:
    config = json.loads((ROOT / "config.json").read_text(encoding="utf-8"))
    env = Environment(
        loader=FileSystemLoader(ROOT / "templates"),
        autoescape=select_autoescape(["html", "xml"]),
        undefined=StrictUndefined,
    )
    OUTPUT.mkdir(parents=True, exist_ok=True)
    data = json.loads((ROOT / "content" / "site-data.json").read_text(encoding="utf-8"))
    rendered = env.get_template("index.html").render(**config, leagues=data["leagues"], teams=data["teams"])
    (OUTPUT / "index.html").write_text(rendered, encoding="utf-8")

    for directory in ("assets",):
        source = ROOT / directory
        destination = OUTPUT / directory
        if destination.exists():
            shutil.rmtree(destination)
        shutil.copytree(source, destination)
    data_output = OUTPUT / "assets" / "data"
    data_output.mkdir(parents=True, exist_ok=True)
    shutil.copy2(ROOT / "content" / "site-data.json", data_output / "site-data.json")

    for filename in ("favicon.svg", "robots.txt"):
        shutil.copy2(ROOT / filename, OUTPUT / filename)

    base_url = config["site_url"].rstrip("/")
    (OUTPUT / "sitemap.xml").write_text(
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        f"  <url><loc>{base_url}/</loc></url>\n"
        "</urlset>\n",
        encoding="utf-8",
    )
    print(f"Built static site at {OUTPUT}")


if __name__ == "__main__":
    build()
