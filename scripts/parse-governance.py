#!/usr/bin/env python3
"""Migrate the 5 governance docs:
- 2 markdown files → copy with frontmatter
- 3 HTML files → wrap content in DocLayout with extracted body
"""
import re
import html
from pathlib import Path

SOURCE_DIR = Path('/mnt/user-data/outputs')
TARGET_DIR = Path('/tmp/gps-build/src/content/governance')

GOV_DOCS = [
    {
        'src': 'gps-content-promotion-overview-v3_2.html',
        'slug': 'overview',
        'title': '制度導讀',
        'titleEn': 'Operating Model Overview',
        'description': '內容推廣的運作藍圖：橫切守門、以作品與貢獻肯認、分散式治理、跨組 Pod、四個建構塊。新成員理解整體制度的起點。',
        'order': 1,
        'type': 'html',
    },
    {
        'src': 'gps-content-promotion-charter-v1_3.html',
        'slug': 'charter',
        'title': '工作章程',
        'titleEn': 'Working Charter',
        'description': '工作公約與七張口袋卡的完整章程版：當責、Pod 成立與解散、紅線攔截、喘息與退出的程序細節。',
        'order': 2,
        'type': 'html',
    },
    {
        'src': 'gps-content-promotion-group-cards-v1_0.html',
        'slug': 'group-cards',
        'title': '六組導覽卡',
        'titleEn': 'Six Groups Guide',
        'description': '六個內容小組的職能總覽：什麼時候找哪一組、各組的三級難度路徑、如何協作。跨組協作的入口。',
        'order': 3,
        'type': 'html',
    },
    {
        'src': 'gps-content-promotion-working-covenant-v2_6.md',
        'slug': 'covenant',
        'title': '工作公約',
        'titleEn': 'Working Covenant',
        'description': '六組共同的十二條做事方式與兩個底線：承諾自訂、一事一 DRI、對外作品要 Pod、紅線即時攔、喘息與退出皆走流程。',
        'order': 4,
        'type': 'md',
    },
    {
        'src': 'gps-content-promotion-pocket-cards-v1_6.md',
        'slug': 'pocket-cards',
        'title': '口袋卡',
        'titleEn': 'Pocket Cards',
        'description': '工作公約十二條的程序展開版，七張獨立卡片：Pod 成立、紅線攔截、喘息、季度 Memo、站會清單、退出轉籍、新血評估。',
        'order': 5,
        'type': 'md',
    },
]


def extract_body_from_html(raw):
    """Extract the body content from a self-contained HTML file.
    Strip <html>/<head>/<style>/<script>; keep just the rendered body inner HTML.
    """
    body_m = re.search(r'<body[^>]*>(.*?)</body>', raw, re.S)
    if not body_m:
        return raw
    body = body_m.group(1)
    # Strip inline styles/scripts that target standalone layout (we have our own)
    body = re.sub(r'<style[^>]*>.*?</style>', '', body, flags=re.S)
    body = re.sub(r'<script[^>]*>.*?</script>', '', body, flags=re.S)
    return body.strip()


def extract_inline_styles(raw):
    """Extract inline <style> blocks for governance HTML — we'll scope them to the doc."""
    styles = re.findall(r'<style[^>]*>(.*?)</style>', raw, re.S)
    return '\n'.join(styles)


def migrate_md(doc):
    src = (SOURCE_DIR / doc['src']).read_text(encoding='utf-8')
    # Strip leading title if it duplicates the slug
    fm = f"""---
title: "{doc['title']}"
titleEn: "{doc['titleEn']}"
slug: "{doc['slug']}"
description: "{doc['description']}"
order: {doc['order']}
type: governance
---

"""
    out = TARGET_DIR / f"{doc['slug']}.md"
    out.write_text(fm + src, encoding='utf-8')
    return out


def migrate_html(doc):
    """For HTML governance docs, wrap body content in an MDX file with scoped styles."""
    raw = (SOURCE_DIR / doc['src']).read_text(encoding='utf-8')
    body = extract_body_from_html(raw)
    styles = extract_inline_styles(raw)

    # Wrap styles in a scoped wrapper so they don't leak
    scoped_styles = ''
    if styles:
        # Wrap in is:inline style tag with scope class
        scoped_styles = f'<style is:global>\n.gov-doc-{doc["slug"]} {{}}\n{styles}\n</style>\n'

    fm = f"""---
title: "{doc['title']}"
titleEn: "{doc['titleEn']}"
slug: "{doc['slug']}"
description: "{doc['description']}"
order: {doc['order']}
type: governance
isHtml: true
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import DocNav from '../../components/DocNav.astro';

<BaseLayout title={{frontmatter.title + " · GPS 內容推廣"}}>
  <DocNav title={{frontmatter.title}} subtitle={{frontmatter.titleEn}} />
  <div class="gov-doc gov-doc-{doc['slug']}">
{body}
  </div>
{scoped_styles}
</BaseLayout>
"""
    out = TARGET_DIR / f"{doc['slug']}.mdx"
    out.write_text(fm, encoding='utf-8')
    return out


def main():
    TARGET_DIR.mkdir(parents=True, exist_ok=True)
    for doc in GOV_DOCS:
        if doc['type'] == 'md':
            out = migrate_md(doc)
        else:
            out = migrate_html(doc)
        size = out.stat().st_size
        print(f"  ✓ {doc['slug']}: {size//1024} KB → {out.name}")
    print(f"\n{len(GOV_DOCS)} governance docs migrated.")


if __name__ == '__main__':
    main()
