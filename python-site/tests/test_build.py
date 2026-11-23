from pathlib import Path
import sys
import unittest

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import build


class StaticBuildTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        build.build()
        cls.output = Path(build.OUTPUT)

    def test_homepage_has_core_content_and_accessible_landmarks(self):
        html = (self.output / "index.html").read_text(encoding="utf-8")
        self.assertIn('<html lang="en">', html)
        self.assertIn('<main id="main-content">', html)
        self.assertIn("2025/26 Season", html)
        self.assertIn("Fixtures 2025/26", html)
        self.assertIn('id="app"', html)
        self.assertIn('data-site-data="/assets/data/site-data.json"', html)
        self.assertIn("101", html)

    def test_all_referenced_static_assets_exist(self):
        html = (self.output / "index.html").read_text(encoding="utf-8")
        referenced_assets = ("assets/css/main.css", "assets/js/site.js", "favicon.svg")
        for asset in referenced_assets:
            with self.subTest(asset=asset):
                self.assertTrue((self.output / asset).is_file())
                self.assertIn("/" + asset, html)
        for asset in ("robots.txt", "sitemap.xml"):
            with self.subTest(asset=asset):
                self.assertTrue((self.output / asset).is_file())

    def test_no_typescript_sources_in_the_python_site(self):
        sources = list(build.ROOT.rglob("*.ts")) + list(build.ROOT.rglob("*.tsx"))
        self.assertEqual([], sources)


if __name__ == "__main__":
    unittest.main()
