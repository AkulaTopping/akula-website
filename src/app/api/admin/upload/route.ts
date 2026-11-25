import crypto from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { requireAdminSession } from "../../../../lib/admin-auth";
import {
  createSupabaseAdminClient,
  getSupabaseBucket,
  isSupabaseAdminConfigured,
} from "../../../../lib/supabase";
import { normalizeSlug } from "../../../../lib/products-repository";

const MAX_BYTES = 4 * 1024 * 1024; // 4 MB
const MIME_TO_EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

function matchesImageMagicBytes(buf: Buffer, mime: string): boolean {
  if (buf.length < 12) return false;
  if (mime === "image/jpeg") {
    return buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff;
  }
  if (mime === "image/png") {
    return buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47;
  }
  if (mime === "image/webp") {
    return (
      buf.subarray(0, 4).toString("ascii") === "RIFF" &&
      buf.subarray(8, 12).toString("ascii") === "WEBP"
    );
  }
  return false;
}

export async function POST(req: NextRequest) {
  const session = await requireAdminSession();
  if (!session.authenticated) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401, headers: { "Cache-Control": "no-store" } }
    );
  }

  if (!isSupabaseAdminConfigured()) {
    return NextResponse.json(
      {
        error:
          "Supabase Storage credentials (NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY) are not configured.",
      },
      { status: 503 }
    );
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const slugField = formData.get("slug");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No image file uploaded." }, { status: 400 });
    }

    const ext = MIME_TO_EXT[file.type];
    if (!ext) {
      return NextResponse.json(
        { error: "Only JPG, PNG, and WebP images are supported." },
        { status: 400 }
      );
    }

    if (file.size <= 0 || file.size > MAX_BYTES) {
      return NextResponse.json(
        { error: "Image size must be between 1 byte and 4 MB." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    if (!matchesImageMagicBytes(buffer, file.type)) {
      return NextResponse.json(
        { error: "Uploaded file contents do not match the declared image format." },
        { status: 400 }
      );
    }

    const safePrefix =
      normalizeSlug(typeof slugField === "string" ? slugField : "product") || "product";
    const uniqueSuffix = `${Date.now()}-${crypto.randomBytes(4).toString("hex")}`;
    const objectPath = `products/${safePrefix}-${uniqueSuffix}.${ext}`;

    const supabase = createSupabaseAdminClient();
    const bucket = getSupabaseBucket();

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(objectPath, buffer, {
        contentType: file.type,
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      return NextResponse.json(
        { error: `Storage upload failed: ${uploadError.message}` },
        { status: 500 }
      );
    }

    const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(objectPath);

    return NextResponse.json(
      {
        imageUrl: urlData.publicUrl,
        imagePath: objectPath,
      },
      { status: 201, headers: { "Cache-Control": "no-store" } }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upload failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
