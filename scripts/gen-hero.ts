import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

const OUT = '/home/z/my-project/public/images';

const STYLE =
  'Cinematic luxury fashion editorial photography, warm espresso brown and ivory palette, dramatic directional light, film grain, high fashion campaign quality, ultra detailed, photorealistic, no text, no watermark';

const jobs: Array<[string, string, string]> = [
  [
    'hero-a.jpg',
    '1440x704',
    `Wide cinematic fashion editorial photograph, elegant Middle Eastern man in his mid 30s with groomed short beard, wearing a tailored cognac brown leather coat over black turtleneck, holding a premium tan leather briefcase in one hand, positioned in the left third of the frame, walking through a vast warm-lit brutalist concrete gallery with monumental columns, large soft dark negative space on the right side of the frame for typography, dramatic directional window light, warm amber glow, ${STYLE}`,
  ],
  [
    'hero-b.jpg',
    '1440x704',
    `Cinematic wide editorial fashion shot, confident bearded man in his 30s wearing a dark espresso wool overcoat with a rich tan leather weekender bag slung on shoulder, standing in a grand modern art gallery with travertine stone walls, subject on left side, generous clean shadowed negative space on right for headline typography, golden hour light beams through tall windows, warm leather brown tones, ${STYLE}`,
  ],
  [
    'hero-c.jpg',
    '1440x704',
    `Editorial luxury fashion photograph, stylish Middle Eastern man with short beard in a charcoal brown overcoat holding a cognac leather messenger bag, seated on a leather bench in a dark moody gallery lounge, warm copper accent lighting, composition with empty dark wall space on the right side, deep espresso and caramel brown palette, ${STYLE}`,
  ],
];

async function main() {
  const zai = await ZAI.create();
  for (const [name, size, prompt] of jobs) {
    for (let attempt = 1; attempt <= 5; attempt++) {
      try {
        const res = await zai.images.generations.create({ prompt, size });
        const b64 = res?.data?.[0]?.base64;
        if (!b64) throw new Error('empty response');
        fs.writeFileSync(path.join(OUT, name), Buffer.from(b64, 'base64'));
        console.log(`OK ${name}`);
        break;
      } catch (e) {
        console.log(`RETRY ${name} attempt ${attempt}: ${e instanceof Error ? e.message : e}`);
        await new Promise((r) => setTimeout(r, 4000 * attempt));
      }
    }
  }
  console.log('ALL_DONE');
}

main();
