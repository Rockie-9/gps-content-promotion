import { defineCollection, z } from 'astro:content';

const governance = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    titleEn: z.string(),
    description: z.string(),
    order: z.number(),
    type: z.literal('governance'),
    isHtml: z.boolean().optional(),
  }),
});

const toolkits = defineCollection({
  type: 'content',
  schema: z.object({
    code: z.string(),
    name: z.string(),
    nameEn: z.string(),
    tagline: z.string(),
    heroFrom: z.string(),
    heroTo: z.string(),
    groundRule: z.string(),
    gateGroup: z.object({
      title: z.string(),
      intro: z.string(),
      gates: z.array(z.object({
        num: z.string(),
        name: z.string(),
        nameEn: z.string(),
        when: z.string(),
        scenarioLabel: z.string(),
        scenario: z.string(),
        common: z.string(),
        right: z.string(),
      })),
    }),
    tiers: z.array(z.object({
      label: z.string(),
      labelEn: z.string(),
      subtitle: z.string(),
      accent: z.string(),
      projects: z.array(z.object({
        id: z.string(),
        code: z.string(),
        title: z.string(),
        direction: z.string(),
        prep: z.array(z.object({ label: z.string(), desc: z.string() })),
        prompt: z.string(),
        steps: z.array(z.string()),
        tips: z.array(z.object({ problem: z.string(), solution: z.string() })),
        caseScenario: z.string(),
        caseBad: z.string(),
        caseGood: z.string(),
        caseTakeaway: z.string(),
      })),
    })),
    version: z.string().optional(),
    draftNotice: z.string().optional(),
  }),
});

export const collections = { governance, toolkits };
