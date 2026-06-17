#!/usr/bin/env python3
"""Parse existing toolkit HTML files and extract structured data into MDX frontmatter.

This is a one-time migration script. Reads from /mnt/user-data/outputs/, writes to /tmp/gps-build/src/content/toolkits/.
"""
import re
import html
import json
import os
import yaml
from pathlib import Path

SOURCE_DIR = Path('/mnt/user-data/outputs')
TARGET_DIR = Path('/tmp/gps-build/src/content/toolkits')

# Per-toolkit metadata not embedded in source
TOOLKIT_META = {
    'cs01': {
        'code': 'CS2-01', 'name': '文字敘事組', 'nameEn': 'Text Narrative',
        'heroFrom': '#26A7B0', 'heroTo': '#1F8A92',
        'tierAccents': ['#26A7B0', '#7086BA', '#6E5F7C'],
    },
    'cs02': {
        'code': 'CS2-02', 'name': '平面設計組', 'nameEn': 'Graphic Design',
        'heroFrom': '#7086BA', 'heroTo': '#5269A0',
        'tierAccents': ['#26A7B0', '#7086BA', '#6E5F7C'],
    },
    'cs03': {
        'code': 'CS2-03', 'name': '動態攝影組', 'nameEn': 'Motion Photography',
        'heroFrom': '#ED7442', 'heroTo': '#D85A2A',
        'tierAccents': ['#26A7B0', '#7086BA', '#6E5F7C'],
    },
    'cs04': {
        'code': 'CS2-04', 'name': '社群互動組', 'nameEn': 'Community Engagement',
        'heroFrom': '#6BB57E', 'heroTo': '#54A267',
        'tierAccents': ['#26A7B0', '#7086BA', '#6E5F7C'],
    },
    'cs05': {
        'code': 'CS2-05', 'name': '品牌管理組', 'nameEn': 'Brand Management',
        'heroFrom': '#6E5F7C', 'heroTo': '#574A63',
        'tierAccents': ['#26A7B0', '#7086BA', '#6E5F7C'],
    },
    'cs06': {
        'code': 'CS2-06', 'name': '服務體驗組', 'nameEn': 'Service Experience',
        'heroFrom': '#9387A6', 'heroTo': '#766988',
        'tierAccents': ['#26A7B0', '#7086BA', '#6E5F7C'],
    },
}

SRC_FILES = {
    'cs01': 'gps-cs2-01-text-narrative-toolkit-v1_2.html',
    'cs02': 'gps-cs2-02-graphic-design-toolkit-v1_0.html',
    'cs03': 'gps-cs2-03-motion-photography-toolkit-v1_0.html',
    'cs04': 'gps-cs2-04-community-engagement-toolkit-v1_0.html',
    'cs05': 'gps-cs2-05-brand-management-toolkit-v1_0.html',
    'cs06': 'gps-cs2-06-service-experience-toolkit-v1_0.html',
}


def clean_text(s):
    """Strip HTML tags and normalize whitespace."""
    s = re.sub(r'<svg.*?</svg>', '', s, flags=re.S)
    s = re.sub(r'<[^>]+>', '', s)
    s = html.unescape(s)
    s = re.sub(r'\s+', ' ', s).strip()
    return s


def extract_tagline(raw):
    m = re.search(r'<h1[^>]*>.*?</h1>\s*<p[^>]*>(.*?)</p>', raw, re.S)
    return clean_text(m.group(1)) if m else ''


def extract_ground_rule(raw):
    m = re.search(r'class="hero-rule">.*?<span class="hero-rule-label">[^<]*</span>(.*?)</div>', raw, re.S)
    return clean_text(m.group(1)) if m else ''


def extract_gate_group(raw):
    """Extract §0 gate section: title, intro, list of gates."""
    intro_match = re.search(r'<details class="intro-collapse" id="intro">.*?</details>', raw, re.S)
    if not intro_match:
        return None
    block = intro_match.group(0)

    title_m = re.search(r'<summary>\s*<span>\s*<span class="intro-code">§ 0</span>([^<]+)</span>', block)
    title = clean_text(title_m.group(1)) if title_m else ''

    h2_m = re.search(r'<h2>(.*?)</h2>', block, re.S)
    if h2_m:
        title = clean_text(h2_m.group(1))

    intro_p_m = re.search(r'<h2>.*?</h2>\s*<p>(.*?)</p>', block, re.S)
    intro = clean_text(intro_p_m.group(1)) if intro_p_m else ''

    gates = []
    for vm in re.finditer(r'<div class="voice" data-v="\d+">(.*?)</div>\s*</div>', block, re.S):
        v = vm.group(1)
        # Number is after "VOICE · NN" or "GATE · NN"
        num_m = re.search(r'class="voice-num">[^·]*·\s*(\d+)\s*</span>', v)
        name_m = re.search(r'<h4>([^·<]+)\s*·\s*([^<]+)</h4>', v)
        when_m = re.search(r'class="voice-when">\s*<strong>([^<]+)</strong>([^<]*)</p>', v, re.S)
        label_m = re.search(r'class="voice-example-label">([^<]+)</span>', v)
        example_m = re.search(r'class="voice-example-label">[^<]*</span>\s*(.*?)\s*<em>', v, re.S)
        # cs01 uses "常見寫法/品牌寫法", cs02-06 uses "常見破口/對的做法"
        common_m = re.search(r'<em>(?:常見破口|常見寫法)[:：](.+?)</em>', v, re.S)
        right_m = re.search(r'<em>(?:對的做法|品牌寫法)[:：](.+?)</em>', v, re.S)

        if name_m and when_m:
            gates.append({
                'num': num_m.group(1) if num_m else '',
                'name': clean_text(name_m.group(1)),
                'nameEn': clean_text(name_m.group(2)),
                'when': clean_text(when_m.group(1) + when_m.group(2)),
                'scenarioLabel': clean_text(label_m.group(1)) if label_m else '',
                'scenario': clean_text(example_m.group(1)) if example_m else '',
                'common': clean_text(common_m.group(1)) if common_m else '',
                'right': clean_text(right_m.group(1)) if right_m else '',
            })

    return {'title': title, 'intro': intro, 'gates': gates}


def extract_projects(raw):
    """Extract all <details class="project"> blocks."""
    projects = []
    for pm in re.finditer(r'<details class="project" id="(\w+)">(.*?)</details>', raw, re.S):
        pid = pm.group(1)
        block = pm.group(2)

        code_m = re.search(r'<div class="project-code">(\w+)</div>', block)
        title_m = re.search(r'<div class="project-title-block">\s*<h3>([^<]+)</h3>', block)
        direction_m = re.search(r'<p class="field-direction">(.*?)</p>', block, re.S)

        prep = []
        prep_section_m = re.search(r'<ul class="prep-list">(.*?)</ul>', block, re.S)
        if prep_section_m:
            for li_m in re.finditer(r'<li><strong>([^<]+)</strong>[:：]([^<]+)</li>', prep_section_m.group(1)):
                prep.append({'label': clean_text(li_m.group(1)), 'desc': clean_text(li_m.group(2))})

        prompt_m = re.search(r'<pre class="field-prompt">(.*?)</pre>', block, re.S)
        prompt = html.unescape(prompt_m.group(1)).strip() if prompt_m else ''

        steps = []
        steps_m = re.search(r'<ol class="op-steps">(.*?)</ol>', block, re.S)
        if steps_m:
            for li_m in re.finditer(r'<li>(.*?)</li>', steps_m.group(1), re.S):
                # preserve <em> tags for highlighting
                step = li_m.group(1).strip()
                step = re.sub(r'\s+', ' ', step)
                steps.append(step)

        tips = []
        tips_m = re.search(r'<ul class="tips-list">(.*?)</ul>', block, re.S)
        if tips_m:
            for li_m in re.finditer(r'<li><strong>([^<]+)</strong>[:：]([^<]+)</li>', tips_m.group(1)):
                tips.append({'problem': clean_text(li_m.group(1)), 'solution': clean_text(li_m.group(2))})

        scenario_m = re.search(r'<div class="case-scenario">\s*<strong>[^<]*</strong>\s*(.*?)\s*</div>', block, re.S)
        bad_m = re.search(r'<div class="case-panel bad">.*?<p class="case-content">(.*?)</p>', block, re.S)
        good_m = re.search(r'<div class="case-panel good">.*?<p class="case-content">(.*?)</p>', block, re.S)
        takeaway_m = re.search(r'<p class="case-takeaway">\s*<strong>[^<]*</strong>\s*(.*?)\s*</p>', block, re.S)

        projects.append({
            'id': pid,
            'code': clean_text(code_m.group(1)) if code_m else pid.upper(),
            'title': clean_text(title_m.group(1)) if title_m else '',
            'direction': clean_text(direction_m.group(1)) if direction_m else '',
            'prep': prep,
            'prompt': prompt,
            'steps': steps,
            'tips': tips,
            'caseScenario': clean_text(scenario_m.group(1)) if scenario_m else '',
            'caseBad': clean_text(bad_m.group(1)) if bad_m else '',
            'caseGood': clean_text(good_m.group(1)) if good_m else '',
            'caseTakeaway': clean_text(takeaway_m.group(1)) if takeaway_m else '',
        })
    return projects


def extract_tier_subtitles(raw):
    subs = []
    for m in re.finditer(r'<p class="tier-subtitle">([^<]+)</p>', raw):
        subs.append(clean_text(m.group(1)))
    return subs


def parse_toolkit(key):
    path = SOURCE_DIR / SRC_FILES[key]
    raw = path.read_text(encoding='utf-8')
    meta = TOOLKIT_META[key]

    tagline = extract_tagline(raw)
    ground_rule = extract_ground_rule(raw)
    gate_group = extract_gate_group(raw)
    projects = extract_projects(raw)
    tier_subtitles = extract_tier_subtitles(raw)

    # Validate
    assert len(projects) == 9, f"{key}: expected 9 projects, got {len(projects)}"
    assert gate_group, f"{key}: gate group not found"
    assert len(gate_group['gates']) in (3, 4), f"{key}: expected 3 or 4 gates/voices, got {len(gate_group['gates'])}"
    assert len(tier_subtitles) == 3, f"{key}: expected 3 tier subtitles, got {len(tier_subtitles)}"

    # Split projects into 3 tiers (3 each, in order a/b/c)
    tiers = []
    tier_labels = [('基礎', 'Foundational'), ('進階', 'Intermediate'), ('高階', 'Advanced')]
    for i in range(3):
        tier_projects = projects[i*3:(i+1)*3]
        tiers.append({
            'label': tier_labels[i][0],
            'labelEn': tier_labels[i][1],
            'subtitle': tier_subtitles[i],
            'accent': meta['tierAccents'][i],
            'projects': tier_projects,
        })

    return {
        'code': meta['code'],
        'name': meta['name'],
        'nameEn': meta['nameEn'],
        'tagline': tagline,
        'heroFrom': meta['heroFrom'],
        'heroTo': meta['heroTo'],
        'groundRule': ground_rule,
        'gateGroup': gate_group,
        'tiers': tiers,
        'version': 'v1.0',
        'draftNotice': f'<strong>v1.0 草稿 · 待組長校稿</strong>——案例皆為自帶情境的劣稿/佳稿對照，不假設讀者看過任何過往作品；提示詞拆為「準備 → 範本 → 操作步驟 → 常見調整」四段。 待 {meta["code"]} 組長就位後將進入正式校稿與案例庫迭代。',
    }


def emit_mdx(key, data):
    """Write MDX file with frontmatter + Toolkit component invocation."""
    # YAML frontmatter — use safe_dump with allow_unicode
    fm = yaml.safe_dump(data, allow_unicode=True, sort_keys=False, width=10000, default_flow_style=False)
    content = f"""---
{fm}---
import Toolkit from '../../components/Toolkit.astro';
import BaseLayout from '../../layouts/BaseLayout.astro';

<BaseLayout title={{`${{frontmatter.code}} ${{frontmatter.name}} · Toolkit`}}>
  <Toolkit {{...frontmatter}} />
</BaseLayout>
"""
    out = TARGET_DIR / f"{key}.mdx"
    out.write_text(content, encoding='utf-8')
    return out


def main():
    TARGET_DIR.mkdir(parents=True, exist_ok=True)
    print(f"Parsing 6 toolkits from {SOURCE_DIR}")
    for key in ['cs01', 'cs02', 'cs03', 'cs04', 'cs05', 'cs06']:
        data = parse_toolkit(key)
        out = emit_mdx(key, data)
        print(f"  ✓ {key}: {len(data['tiers'])} tiers, "
              f"{sum(len(t['projects']) for t in data['tiers'])} projects, "
              f"{len(data['gateGroup']['gates'])} gates → {out.name}")
    print("\nAll toolkits migrated.")


if __name__ == '__main__':
    main()
