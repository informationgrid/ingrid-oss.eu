import os
import re
import json
from mkdocs.plugins import BasePlugin

WIKILINK_PATTERN = re.compile(r'\[[^\]]+\]\(<([^>]+)>\)')

MDLINK_PATTERN = re.compile(r'\[[^\]]+\]\(([^)]+\.md)\)')



class Plugin(BasePlugin):

    POSTS_DIR = "blog/posts"
    # POSTS_DIR = "/"

    def on_config(self, config):
        # Collect unique nodes + edges
        self.nodes = {}
        self.edges = []
        return config


    def _is_post_page(self, page):
        """
        Returns True for pages inside docs/blog/posts/.
        """
        # src_path = blog/posts/foo.md relative to docs/
        return page.file.src_path.startswith(self.POSTS_DIR + "/")


    def _normalize_markdown_link(self, src, target):
        # Remove ./ or ../
        if target.startswith("./"):
            target = target[2:]
        elif target.startswith("../"):
            target = target[3:]

        # Prepend posts directory if target has no folder
        # (Obsidian-style)
        if "/" not in target:
            target = f"{self.POSTS_DIR}/{target}"
        else:
            # Resolve relative folder paths correctly:
            src_dir = os.path.dirname(src)  # e.g. blog/posts
            target = os.path.normpath(os.path.join(src_dir, target))

        return target


    def on_page_markdown(self, markdown, page, config, files):
        """
        Only scan pages inside blog/posts, and only extract Obsidian wikilinks.
        """

        if not self._is_post_page(page):
            return markdown

        src = page.file.src_uri  # e.g. blog/posts/example.md
        title = page.meta.get("title", page.title)  # fallback to MkDocs page title
        # shortTitle = page.meta.get("shortTitle", page.shortTitle)  # fallback to MkDocs page title
        # description = page.meta.get("description", page.description)  # fallback to MkDocs page title
        url = page.url
        self.nodes[src] ={
            "url": url,
            "title": title,
            "shortTitle": "shortTitle",
            "description": "description"
        }
        # self.nodes.add(src)

        # Extract wikilinks like [[Note]]
        # for raw_target in MDLINK_PATTERN.findall(markdown):    
        for raw_target in WIKILINK_PATTERN.findall(markdown):
            target = self._normalize_markdown_link(src, raw_target)
            self.edges.append((src, target))

        return markdown


    def on_post_build(self, config):
        """
        Create graph.json in site/assets/ using the required structure.
        """
        site_dir = config["site_dir"]
        assets_dir = os.path.join(site_dir, "assets")
        os.makedirs(assets_dir, exist_ok=True)

        graph = {
            "nodes": [
                {
                    "id": src,
                    "url": data["url"],
                    "title": data["title"],
                    "shortTitle": data["shortTitle"],
                    "description": data["description"]
                }
                for src, data in self.nodes.items()
            ],
            "links": [
                {"source": s, "target": t}
                for s, t in self.edges
            ],
        }

        out_path = os.path.join(assets_dir, "graph.json")
        with open(out_path, "w") as f:
            json.dump(graph, f, indent=2)

        print(f"[knowledge-graph] Created {out_path}")
