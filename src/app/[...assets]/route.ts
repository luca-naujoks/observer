import * as fs from "fs";
import { NextResponse } from "next/server";
import path from "path";
import {
  getConfiguration,
  updateConfiguration,
} from "../actions/configurationProvider";

export async function GET() {
  const assetsDir = path.join(process.cwd(), "assets");
  const wallpaper = fs
    .readdirSync(assetsDir)
    .find((file) => file.startsWith("wallpaper"));

  if (!wallpaper) {
    getConfiguration().then((config) => {
      updateConfiguration({
        ...config,
        background_image: false,
      });
    });
    return new Response("No wallpaper found", { status: 404 });
  }

  return new Response(fs.readFileSync(path.join(assetsDir, wallpaper)));
}

export async function POST(request: Request) {
  const assetsDir = path.join(process.cwd(), "assets");
  const file = (await request.formData()).get("file") as File;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const fileExtension = path.extname(file.name);

  if (!file) {
    return NextResponse.json({ error: "No file found in request" });
  }

  function removeOldWallpaper() {
    const oldFile = fs
      .readdirSync(assetsDir)
      .find((file) => file.startsWith("wallpaper"));
    if (!oldFile) {
      return;
    }

    try {
      fs.unlinkSync(path.join(assetsDir, oldFile));
    } catch (e) {
      console.error("Failed to remove old wallpaper", e);
      return NextResponse.json({ error: "Failed to remove old wallpaper" });
    }
  }

  removeOldWallpaper();
  fs.writeFileSync(path.join(assetsDir, `wallpaper${fileExtension}`), buffer);

  return NextResponse.json({ Message: "File Uploaded Successfully" });
}
