#!/usr/bin/env python3
"""Automated verification test for site structure, SEO metadata, and design tokens."""

import json
import os
import re
import unittest
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent


class TestSiteStructure(unittest.TestCase):
    """Test suite verifying presence, semantics, and standards compliance of site assets."""

    @classmethod
    def setUpClass(cls):
        cls.index_path = REPO_ROOT / "index.html"
        cls.css_path = REPO_ROOT / "assets" / "css" / "styles.css"
        cls.js_path = REPO_ROOT / "assets" / "js" / "main.js"
        cls.robots_path = REPO_ROOT / "robots.txt"
        cls.sitemap_path = REPO_ROOT / "sitemap.xml"

    def test_01_index_file_exists(self):
        """Verify index.html exists."""
        self.assertTrue(self.index_path.exists(), "index.html must exist at repo root")

    def test_02_html5_doctype_and_root_attributes(self):
        """Verify HTML5 doctype, lang attribute, charset, and responsive viewport."""
        self.assertTrue(self.index_path.exists(), "index.html missing")
        content = self.index_path.read_text(encoding="utf-8")

        self.assertRegex(
            content,
            r"<!DOCTYPE\s+html>",
            "index.html must declare <!DOCTYPE html>",
        )
        self.assertRegex(
            content,
            r"<html\s+[^>]*lang=[\"']en[\"']",
            "<html> root tag must include lang='en'",
        )
        self.assertRegex(
            content,
            r"<meta\s+charset=[\"']utf-8[\"']",
            "index.html must specify utf-8 charset",
        )
        self.assertRegex(
            content,
            r"<meta\s+name=[\"']viewport[\"']\s+content=[\"']width=device-width,\s*initial-scale=1\.0[\"']",
            "index.html must configure standard responsive viewport",
        )

    def test_03_seo_and_social_metadata(self):
        """Verify essential SEO tags, canonical URL, OpenGraph, and Twitter card tags."""
        self.assertTrue(self.index_path.exists(), "index.html missing")
        content = self.index_path.read_text(encoding="utf-8")

        self.assertRegex(
            content,
            r"<title>.*ConsultAnythingTech.*</title>",
            "<title> must include 'ConsultAnythingTech'",
        )
        self.assertRegex(
            content,
            r"<meta\s+name=[\"']description[\"']\s+content=[\"'][^\"']+[\"']",
            "Meta description must be defined and non-empty",
        )
        self.assertRegex(
            content,
            r"<link\s+[^>]*rel=[\"']canonical[\"']\s+[^>]*href=[\"']https://consultanything-tech\.github\.io/?[\"']",
            "Canonical link must point to https://consultanything-tech.github.io",
        )

        # OpenGraph tags
        for og_prop in ["og:title", "og:description", "og:type", "og:url"]:
            self.assertRegex(
                content,
                rf"<meta\s+property=[\"']{re.escape(og_prop)}[\"']\s+content=[\"'][^\"']+[\"']",
                f"Missing or invalid OpenGraph property: {og_prop}",
            )

        # Twitter Card tags
        for twitter_name in ["twitter:card", "twitter:title", "twitter:description"]:
            self.assertRegex(
                content,
                rf"<meta\s+name=[\"']{re.escape(twitter_name)}[\"']\s+content=[\"'][^\"']+[\"']",
                f"Missing or invalid Twitter Card property: {twitter_name}",
            )

    def test_04_json_ld_structured_data(self):
        """Verify valid JSON-LD schema for Organization / ProfessionalService."""
        self.assertTrue(self.index_path.exists(), "index.html missing")
        content = self.index_path.read_text(encoding="utf-8")

        pattern = r"<script\s+type=[\"']application/ld\+json[\"']>(.*?)</script>"
        matches = re.findall(pattern, content, flags=re.DOTALL)
        self.assertGreater(
            len(matches),
            0,
            "index.html must contain at least one JSON-LD script block",
        )

        parsed_any = False
        for block in matches:
            try:
                data = json.loads(block.strip())
                parsed_any = True
                type_val = data.get("@type", "")
                name_val = data.get("name", "")
                url_val = data.get("url", "")

                is_org_or_service = type_val in ["Organization", "ProfessionalService"]
                has_name = "ConsultAnythingTech" in name_val
                has_url = "consultanything-tech.github.io" in url_val

                if is_org_or_service and has_name and has_url:
                    break
            except json.JSONDecodeError as err:
                self.fail(f"Invalid JSON in application/ld+json: {err}")
        else:
            self.fail(
                "JSON-LD must specify @type as Organization or ProfessionalService with name 'ConsultAnythingTech' and URL 'https://consultanything-tech.github.io'"
            )

    def test_05_navigation_and_accessibility(self):
        """Verify navigation header, key links, brand, and accessible mobile toggle."""
        self.assertTrue(self.index_path.exists(), "index.html missing")
        content = self.index_path.read_text(encoding="utf-8")

        # Brand name
        self.assertIn("ConsultAnythingTech", content, "Navigation must display ConsultAnythingTech brand")

        # Required section links
        expected_links = ["#services", "#products", "#capabilities", "#about", "#contact"]
        for target in expected_links:
            self.assertRegex(
                content,
                rf"href=[\"']{re.escape(target)}[\"']",
                f"Navigation must contain link with target {target}",
            )

        # Mobile menu toggle button accessibility attributes
        self.assertRegex(
            content,
            r"<button[^>]*aria-label=[\"'][^\"']+[\"'][^>]*aria-expanded=[\"'](true|false)[\"']",
            "Mobile navigation button must specify accessible aria-label and aria-expanded attributes",
        )

    def test_06_external_scripts_and_styles(self):
        """Verify Tailwind CSS script and custom stylesheet inclusion."""
        self.assertTrue(self.index_path.exists(), "index.html missing")
        content = self.index_path.read_text(encoding="utf-8")

        self.assertRegex(
            content,
            r"<script[^>]*src=[\"']https://cdn\.tailwindcss\.com[\"']",
            "Tailwind CDN script must be linked in index.html",
        )
        self.assertRegex(
            content,
            r"<link[^>]*href=[\"']assets/css/styles\.css[\"']",
            "Custom stylesheet assets/css/styles.css must be linked in index.html",
        )

    def test_07_css_motion_tokens_and_reduced_motion(self):
        """Verify motion tokens and prefers-reduced-motion media query in styles.css."""
        self.assertTrue(self.css_path.exists(), "assets/css/styles.css must exist")
        css_content = self.css_path.read_text(encoding="utf-8")

        required_tokens = ["--duration-fast", "--ease-standard"]
        for token in required_tokens:
            self.assertIn(token, css_content, f"Missing motion token {token} in styles.css")

        self.assertIn(
            "@media (prefers-reduced-motion: reduce)",
            css_content,
            "styles.css must contain @media (prefers-reduced-motion: reduce) block",
        )

    def test_08_robots_and_sitemap(self):
        """Verify presence and validity of robots.txt and sitemap.xml."""
        self.assertTrue(self.robots_path.exists(), "robots.txt must exist at repo root")
        self.assertTrue(self.sitemap_path.exists(), "sitemap.xml must exist at repo root")

        robots_content = self.robots_path.read_text(encoding="utf-8")
        self.assertIn(
            "Sitemap: https://consultanything-tech.github.io/sitemap.xml",
            robots_content,
            "robots.txt must reference sitemap.xml",
        )
        self.assertIn("User-agent: *", robots_content, "robots.txt must declare User-agent: *")
        self.assertIn("Allow: /", robots_content, "robots.txt must declare Allow: /")

        sitemap_content = self.sitemap_path.read_text(encoding="utf-8")
        self.assertIn("https://consultanything-tech.github.io", sitemap_content)
        self.assertIn("<urlset", sitemap_content)
        self.assertIn("<url>", sitemap_content)


if __name__ == "__main__":
    unittest.main()
