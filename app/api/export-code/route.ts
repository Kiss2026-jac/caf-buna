import { NextResponse } from 'next/server';
import archiver from 'archiver';

export async function GET() {
  const archive = archiver('zip', { zlib: { level: 9 } });

  archive.glob('**/*', {
    cwd: process.cwd(),
    ignore: ['node_modules/**', '.next/**', '.git/**', 'public/bunashop-codigo-fonte.zip']
  });

  archive.finalize();

  const stream = new ReadableStream({
    start(controller) {
      archive.on('data', (chunk) => controller.enqueue(chunk));
      archive.on('end', () => controller.close());
      archive.on('error', (err) => controller.error(err));
    }
  });

  return new NextResponse(stream as any, {
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': 'attachment; filename="bunashop-codigo-fonte.zip"'
    }
  });
}
