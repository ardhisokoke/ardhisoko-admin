import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { generateIndexHtml, generateProjectHtml } from "@/lib/htmlExporter";
import fs from "fs";
import path from "path";

function loadTemplate(filename: string): string {
  try {
    const p = path.join(process.cwd(), "public", "templates", filename);
    return fs.readFileSync(p, "utf-8");
  } catch {
    return "";
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { siteData } = await req.json();

  const indexTpl = loadTemplate("index.html");
  const malindiTpl = loadTemplate("malindi.html");
  const konzaTpl = loadTemplate("konza.html");
  const kamakisTpl = loadTemplate("kamakis.html");

  if (!indexTpl || !malindiTpl || !konzaTpl || !kamakisTpl) {
    return NextResponse.json(
      { error: "Templates not found." },
      { status: 400 }
    );
  }

  const files = {
    "index.html": generateIndexHtml(siteData, indexTpl),
    "malindi.html": generateProjectHtml(siteData, "ma", malindiTpl),
    "konza.html": generateProjectHtml(siteData, "ko", konzaTpl),
    "kamakis.html": generateProjectHtml(siteData, "ka", kamakisTpl),
  };

  return NextResponse.json({ files });
}
