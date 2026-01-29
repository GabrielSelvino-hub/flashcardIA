/**
 * Gera ícones do app em vários tamanhos a partir do favicon.png usando Sharp.
 * Tamanhos: 72, 96, 128, 144, 152, 192, 384, 512 px + apple-touch-icon (180 px).
 */

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const ROOT = path.join(__dirname, '..');
const INPUT = path.join(ROOT, 'favicon.png');
const SIZES = [72, 96, 128, 144, 152, 192, 384, 512];
const APPLE_TOUCH_SIZE = 180;

async function generateIcons() {
  if (!fs.existsSync(INPUT)) {
    console.error('Arquivo não encontrado:', INPUT);
    process.exit(1);
  }

  const image = sharp(INPUT);
  const metadata = await image.metadata();
  console.log('Origem:', INPUT, `(${metadata.width}x${metadata.height})`);
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

  console.log('\nÍcones gerados com sucesso.');
}

generateIcons().catch((err) => {
  console.error('Erro ao gerar ícones:', err);
  process.exit(1);
});
