import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

const OUT = '/home/z/my-project/public/images';
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

const STYLE_PRODUCT =
  'Luxury e-commerce product photography, centered on dark charcoal seamless backdrop, dramatic studio lighting with warm copper rim light, deep shadows, rich visible leather grain texture, high-end catalog style, cinematic mood, ultra detailed, no text, no watermark, no people';
const STYLE_CINEMA =
  'Cinematic luxury fashion editorial photography, moody dark atmosphere, deep charcoal and espresso brown palette with warm amber rim lighting, dramatic chiaroscuro, high contrast, film grain, high fashion campaign quality, ultra detailed, no text, no watermark';

const jobs: Array<[string, string, string]> = [
  // ---------- HERO / CAMPAIGN / CRAFT ----------
  ['hero.jpg', '1440x704', `Elegant Iranian man in his mid 30s with groomed short beard, wearing a dark charcoal wool overcoat over black turtleneck, holding a premium dark brown leather briefcase in one hand, standing confidently in a vast brutalist concrete architectural hall with monumental columns, strong directional key light with deep shadows, warm amber rim light, ${STYLE_CINEMA}`],
  ['mobile-hero.jpg', '768x1344', `Vertical cinematic portrait, elegant Iranian man in his mid 30s with groomed short beard wearing dark charcoal overcoat over black turtleneck, holding a premium dark brown leather briefcase, standing in dark brutalist concrete architecture, dramatic directional light, deep shadows, warm amber rim light, low key, ${STYLE_CINEMA}`],
  ['campaign.jpg', '1344x768', `Man in long black leather coat walking through a dark brutalist concrete corridor with light fog, dramatic backlight silhouette, warm amber glow from one side, wide composition with negative space, ${STYLE_CINEMA}`],
  ['craft-hands.jpg', '864x1152', `Close-up of master leather craftsman weathered hands saddle-stitching dark brown leather with waxed thread and needle, vintage workshop, dramatic chiaroscuro lighting, warm copper tones, shallow depth of field, ${STYLE_CINEMA}`],
  ['craft-tools.jpg', '1024x1024', `Still life of vintage leather crafting tools, awl, hammer, edge beveller, spools of waxed thread arranged on dark walnut workbench, dark moody workshop, dramatic warm side lighting, ${STYLE_CINEMA}`],
  ['craft-hides.jpg', '1344x768', `Rolls of premium full-grain leather hides in rich cognac and espresso brown tones stacked in a dark tannery, warm directional light beams, dust particles floating in air, ${STYLE_CINEMA}`],

  // ---------- CATEGORIES (portrait) ----------
  ['cat-shoes.jpg', '768x1344', `Pair of dark brown leather oxford dress shoes on dark textured stone floor, dramatic side lighting, deep shadows, warm rim light, ${STYLE_CINEMA}`],
  ['cat-bag.jpg', '768x1344', `Premium dark brown full-grain leather messenger bag hanging from a raw concrete ledge in brutalist architecture, dramatic directional light, warm amber rim light, ${STYLE_CINEMA}`],
  ['cat-belt.jpg', '768x1344', `Coiled dark brown leather belt with aged brass buckle on dark slate surface, dramatic side light, deep shadows, warm rim light, ${STYLE_CINEMA}`],
  ['cat-wallet.jpg', '768x1344', `Black leather bifold wallet slightly open showing card slots, on dark textured concrete, dramatic directional lighting, deep shadows, moody, ${STYLE_CINEMA}`],
  ['cat-accessory.jpg', '768x1344', `Black leather driving gloves and brown leather watch strap arranged on dark stone slab, dramatic side lighting, deep shadows, warm copper rim light, ${STYLE_CINEMA}`],

  // ---------- PRODUCTS (square) ----------
  ['prod-shoe-1.jpg', '1024x1024', `Single black calfskin leather oxford dress shoe, three-quarter view, elegant last shape, ${STYLE_PRODUCT}`],
  ['prod-shoe-2.jpg', '1024x1024', `Single cognac brown leather derby shoe with brogue detailing, three-quarter view, ${STYLE_PRODUCT}`],
  ['prod-shoe-3.jpg', '1024x1024', `Single espresso brown leather chelsea boot with elastic side panel, three-quarter view, ${STYLE_PRODUCT}`],
  ['prod-bag-1.jpg', '1024x1024', `Dark brown full-grain leather messenger bag with aged brass buckles and flap closure, three-quarter view, ${STYLE_PRODUCT}`],
  ['prod-bag-2.jpg', '1024x1024', `Structured black leather briefcase with minimal copper hardware and handle, three-quarter view, ${STYLE_PRODUCT}`],
  ['prod-bag-3.jpg', '1024x1024', `Espresso brown leather weekender duffle bag with brass zipper and leather handles, three-quarter view, ${STYLE_PRODUCT}`],
  ['prod-wallet-1.jpg', '1024x1024', `Black leather bifold wallet, closed, showing hand stitching detail, slight angle, ${STYLE_PRODUCT}`],
  ['prod-wallet-2.jpg', '1024x1024', `Cognac tan leather slim cardholder wallet with two dark leather cards peeking out, ${STYLE_PRODUCT}`],
  ['prod-belt-1.jpg', '1024x1024', `Rolled black leather dress belt with minimal brushed steel buckle, ${STYLE_PRODUCT}`],
  ['prod-belt-2.jpg', '1024x1024', `Coiled cognac brown leather casual belt with aged solid brass buckle, ${STYLE_PRODUCT}`],
  ['prod-accessory-1.jpg', '1024x1024', `Folded black lambskin leather driving gloves with perforated detail, ${STYLE_PRODUCT}`],
  ['prod-accessory-2.jpg', '1024x1024', `Coiled chestnut brown leather watch strap beside a minimal dress watch with dark dial, ${STYLE_PRODUCT}`],

  // ---------- PRODUCT GALLERY (featured bag) ----------
  ['gallery-1.jpg', '864x1152', `Extreme close-up macro of dark brown full-grain leather corner with hand saddle stitching and aged brass hardware, chiaroscuro light, warm copper tones, luxury detail, ${STYLE_CINEMA}`],
  ['gallery-2.jpg', '864x1152', `Macro close-up of aged brass buckle and rich leather strap grain on dark brown leather, dramatic side lighting, deep shadows, luxury detail, ${STYLE_CINEMA}`],
  ['gallery-3.jpg', '864x1152', `Cropped torso lifestyle shot of man in dark charcoal coat holding dark brown leather messenger bag against raw brutalist concrete wall, moody dramatic light, ${STYLE_CINEMA}`],

  // ---------- INSTAGRAM (square) ----------
  ['ig-1.jpg', '1024x1024', `Man in dark overcoat carrying leather briefcase walking up grand marble staircase, dramatic shadows and warm light shafts, luxury street style, ${STYLE_CINEMA}`],
  ['ig-2.jpg', '1024x1024', `Brown leather oxford shoes stepping down dark marble stairs, dramatic side light, cropped composition, luxury editorial, ${STYLE_CINEMA}`],
  ['ig-3.jpg', '1024x1024', `Man's hands opening a dark leather wallet at a dark wooden cafe table with a small espresso cup, moody warm light, luxury editorial, ${STYLE_CINEMA}`],
  ['ig-4.jpg', '1024x1024', `Macro of leather belt buckle tucked into dark tailored suit fabric, dramatic directional light, luxury detail, ${STYLE_CINEMA}`],
];

async function main() {
  const zai = await ZAI.create();
  let idx = 0;
  let done = 0;
  const total = jobs.length;

  async function worker() {
    while (idx < total) {
      const i = idx++;
      const [file, size, prompt] = jobs[i];
      const out = path.join(OUT, file);
      if (fs.existsSync(out) && fs.statSync(out).size > 10000) {
        done++;
        console.log(`SKIP ${file} (${done}/${total})`);
        continue;
      }
      for (let attempt = 1; attempt <= 6; attempt++) {
        try {
          const r = await zai.images.generations.create({ prompt, size });
          const b64 = r?.data?.[0]?.base64;
          if (!b64) throw new Error('empty response');
          fs.writeFileSync(out, Buffer.from(b64, 'base64'));
          done++;
          console.log(`OK ${file} (${done}/${total})`);
          break;
        } catch (e: unknown) {
          const msg = e instanceof Error ? e.message : String(e);
          console.log(`RETRY ${file} attempt ${attempt}: ${msg}`);
          await new Promise((res) => setTimeout(res, 4000 * attempt));
        }
      }
    }
  }

  await Promise.all(Array.from({ length: 3 }, worker));
  console.log('ALL_DONE');
}

main().catch((e) => {
  console.error('FATAL', e);
  process.exit(1);
});
