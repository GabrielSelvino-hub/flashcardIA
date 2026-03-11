/**
 * Gera ícones do app em vários tamanhos a partir do logo (nihongodeckc.png ou favicon.png) usando Sharp.
 * Tamanhos: 72, 96, 128, 144, 152, 192, 384, 512 px + apple-touch-icon (180 px) + favicon (48 px).
 */

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const ROOT = path.join(__dirname, '..');
const LOGO_SOURCE = path.join(ROOT, 'nihongodeckc.png');
const FALLBACK_SOURCE = path.join(ROOT, 'favicon.png');
const INPUT = fs.existsSync(LOGO_SOURCE) ? LOGO_SOURCE : FALLBACK_SOURCE;
const SIZES = [72, 96, 128, 144, 152, 192, 384, 512];
const APPLE_TOUCH_SIZE = 180;
const FAVICON_SIZE = 48;

async function generateIcons() {
  if (!fs.existsSync(INPUT)) {
    console.error('Arquivo não encontrado:', INPUT, '(nem nihongodeckc.png nem favicon.png)');
    process.exit(1);
  }

  const image = sharp(INPUT);
  const metadata = await image.metadata();
  console.log('Origem:', path.basename(INPUT), `(${metadata.width}x${metadata.height})`);
  console.log('Gerando ícones...\n');

  for (const size of SIZES) {
    const output = path.join(ROOT, `icon-${size}.png`);
    await image
      .clone()
      .resize(size, size)
      .png()
      .toFile(output);
    console.log(`  icon-${size}.png (${size}x${size})`);
  }

  const appleTouchPath = path.join(ROOT, 'apple-touch-icon.png');
  await image
    .clone()
    .resize(APPLE_TOUCH_SIZE, APPLE_TOUCH_SIZE)
    .png()
    .toFile(appleTouchPath);
  console.log(`  apple-touch-icon.png (${APPLE_TOUCH_SIZE}x${APPLE_TOUCH_SIZE})`);

  const faviconPath = path.join(ROOT, 'favicon.png');
  await image
    .clone()
    .resize(FAVICON_SIZE, FAVICON_SIZE)
    .png()
    .toFile(faviconPath);
  console.log(`  favicon.png (${FAVICON_SIZE}x${FAVICON_SIZE})`);

  console.log('\nÍcones gerados com sucesso.');
}

generateIcons().catch((err) => {
  console.error('Erro ao gerar ícones:', err);
  process.exit(1);
});
