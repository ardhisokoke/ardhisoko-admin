"use client";
import { useState } from "react";
import { useSiteStore } from "@/lib/store";
import { Card } from "@/components/ui/Card";
import { FormField, Input } from "@/components/ui/FormField";
import toast from "react-hot-toast";
import { generateIndexHtml, generateProjectHtml } from "@/lib/htmlExporter";

type FileStatus = "waiting" | "pushing" | "done" | "error";

interface FileRow {
  filename: string;
  label: string;
  status: FileStatus;
}

const INITIAL_FILES: FileRow[] = [
  { filename: "index.html", label: "Homepage", status: "waiting" },
  { filename: "malindi.html", label: "Malindi Product Page", status: "waiting" },
  { filename: "konza.html", label: "Konza Product Page", status: "waiting" },
  { filename: "kamakis.html", label: "Kamakis Product Page", status: "waiting" },
];

const STATUS_STYLES: Record<FileStatus, string> = {
  waiting: "bg-[#F5F5F5] text-[#666]",
  pushing: "bg-[#FFF3E0] text-[#F5921E]",
  done: "bg-[#E8F5E4] text-[#2E7D1F]",
  error: "bg-[#FFEBEE] text-[#E53935]",
};

const STATUS_LABELS: Record<FileStatus, string> = {
  waiting: "Waiting",
  pushing: "Pushing…",
  done: "✓ Done",
  error: "✕ Error",
};

async function pushFileToGitHub(
  username: string,
  repo: string,
  token: string,
  filename: string,
  content: string
): Promise<void> {
  const apiUrl = `https://api.github.com/repos/${username}/${repo}/contents/${filename}`;
  const headers = {
    Authorization: `token ${token}`,
    "Content-Type": "application/json",
  };

  // Check if file exists (to get SHA for update)
  let sha: string | undefined;
  try {
    const getRes = await fetch(apiUrl, { headers });
    if (getRes.ok) {
      const existing = await getRes.json();
      sha = existing.sha;
    }
  } catch {}

  const body: Record<string, string> = {
    message: `Update ${filename} via ArdhiSoko Admin`,
    content: btoa(unescape(encodeURIComponent(content))),
  };
  if (sha) body.sha = sha;

  const putRes = await fetch(apiUrl, {
    method: "PUT",
    headers,
    body: JSON.stringify(body),
  });
  if (!putRes.ok) {
    const err = await putRes.json();
    throw new Error(err.message || "GitHub push failed");
  }
}

export default function DeployPage() {
  const siteData = useSiteStore((s) => s.data);
  const [username, setUsername] = useState("ardhisokoke");
  const [repo, setRepo] = useState("ArdhiSoko");
  const [token, setToken] = useState("");
  const [files, setFiles] = useState<FileRow[]>(INITIAL_FILES);
  const [pushing, setPushing] = useState(false);

  function setFileStatus(filename: string, status: FileStatus) {
    setFiles((prev) =>
      prev.map((f) => (f.filename === filename ? { ...f, status } : f))
    );
  }

  function generateAllFiles(): Record<string, string> {
    return {
      "index.html": generateIndexHtml(siteData),
      "malindi.html": generateProjectHtml(siteData, "ma"),
      "konza.html": generateProjectHtml(siteData, "ko"),
      "kamakis.html": generateProjectHtml(siteData, "ka"),
    };
  }

  async function handlePushAll() {
    if (!username || !repo || !token) {
      toast.error("Please fill in GitHub username, repo, and token");
      return;
    }
    setPushing(true);
    setFiles(INITIAL_FILES.map((f) => ({ ...f, status: "waiting" })));

    const allFiles = generateAllFiles();
    let allOk = true;

    for (const file of INITIAL_FILES) {
      setFileStatus(file.filename, "pushing");
      try {
        await pushFileToGitHub(username, repo, token, file.filename, allFiles[file.filename]);
        setFileStatus(file.filename, "done");
      } catch (err: unknown) {
        setFileStatus(file.filename, "error");
        allOk = false;
        const message = err instanceof Error ? err.message : "Unknown error";
        toast.error(`${file.filename}: ${message}`);
      }
    }

    setPushing(false);
    if (allOk) {
      toast.success("All 4 pages pushed to GitHub! 🚀");
    }
  }

  function handleDownloadAll() {
    const allFiles = generateAllFiles();
    for (const [filename, content] of Object.entries(allFiles)) {
      const blob = new Blob([content], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    }
    toast.success("Downloading 4 files…");
  }

  return (
    <div>
      {/* GitHub Push */}
      <Card>
        <div className="flex items-center gap-3 mb-5 pb-4 border-b-2 border-[#1A1A1A]">
          <span className="text-[1.6rem]">🔗</span>
          <div>
            <div className="font-montserrat text-[0.88rem] font-extrabold uppercase">
              Push All Pages to GitHub
            </div>
            <div className="text-[0.75rem] text-[#666] mt-0.5">
              Pushes all 4 pages at once — homepage + all 3 product pages
            </div>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 bg-[#E8F5E4] text-[#2E7D1F] font-montserrat text-[0.68rem] font-bold px-3 py-1 rounded-full mb-4">
          ✅ One-click deployment — 4 files
        </div>

        <p className="text-[0.84rem] text-[#666] leading-relaxed mb-5">
          Enter your GitHub credentials once. All changes across homepage, Malindi, Konza, and Kamakis pages will be pushed live automatically.
        </p>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <FormField label="GitHub Username">
            <Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="e.g. ardhisokoke" />
          </FormField>
          <FormField label="Repository Name">
            <Input value={repo} onChange={(e) => setRepo(e.target.value)} placeholder="e.g. ArdhiSoko" />
          </FormField>
        </div>

        <FormField
          label="GitHub Personal Access Token"
          hint="Settings → Developer Settings → Personal Access Tokens → Generate new token → tick 'repo' scope"
        >
          <Input
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
          />
          <p className="text-[0.68rem] text-[#E53935] mt-1 font-semibold">
            🔒 Required — never stored, used only for this push
          </p>
        </FormField>

        {/* File progress rows */}
        <div className="my-5">
          <p className="font-montserrat text-[0.62rem] font-extrabold tracking-widest uppercase text-[#666] mb-3">
            Upload Progress
          </p>
          {files.map((f) => (
            <div
              key={f.filename}
              className="flex items-center gap-3 px-4 py-3 bg-white rounded border border-[#E0E0E0] mb-2"
            >
              <span className="text-base">📄</span>
              <div className="flex-1 font-montserrat text-[0.72rem] font-bold">
                {f.filename}{" "}
                <span className="text-[#666] font-normal">{f.label}</span>
              </div>
              <span className={`font-montserrat text-[0.65rem] font-bold px-2 py-1 rounded-full ${STATUS_STYLES[f.status]}`}>
                {STATUS_LABELS[f.status]}
              </span>
            </div>
          ))}
        </div>

        <div className="flex gap-3 flex-wrap">
          <button
            onClick={handlePushAll}
            disabled={pushing}
            className="inline-flex items-center gap-2 bg-[#F5921E] hover:bg-[#D97A10] disabled:opacity-60 text-white font-montserrat text-[0.85rem] font-bold px-6 py-3 rounded transition-colors"
          >
            🚀 Push All 4 Pages to GitHub
          </button>
          <button
            onClick={handleDownloadAll}
            className="inline-flex items-center gap-2 bg-[#1A1A1A] hover:bg-[#333] text-white font-montserrat text-[0.85rem] font-bold px-6 py-3 rounded transition-colors"
          >
            ⬇ Download All Files
          </button>
        </div>
      </Card>

      {/* How to get token */}
      <Card className="bg-[#F5F5F5]">
        <p className="font-montserrat text-[0.75rem] font-extrabold uppercase text-[#666] mb-4">
          How to get your GitHub Token
        </p>
        <div className="grid grid-cols-3 gap-4 mb-5">
          {[
            { n: "1", title: "Go to GitHub Settings", desc: "Click your profile photo → Settings → scroll to Developer Settings" },
            { n: "2", title: "Create Access Token", desc: "Personal Access Tokens → Tokens (classic) → Generate new token → tick the 'repo' checkbox" },
            { n: "3", title: "Paste Token Above", desc: "Copy the token and paste it in the field above. It only shows once — save it safely." },
          ].map((step) => (
            <div key={step.n} className="bg-[#F5F5F5] p-4 rounded-md border-l-[3px] border-[#F5921E]">
              <div className="font-montserrat text-[1.2rem] font-black text-[#F5921E]">{step.n}</div>
              <div className="font-montserrat text-[0.75rem] font-bold my-1">{step.title}</div>
              <div className="text-[0.72rem] text-[#666] leading-relaxed">{step.desc}</div>
            </div>
          ))}
        </div>
        <a
          href="https://github.com/settings/tokens/new"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 bg-[#1A1A1A] hover:bg-[#333] text-white font-montserrat text-[0.75rem] font-bold px-5 py-2 rounded transition-colors"
        >
          🔗 Open GitHub Token Page
        </a>
      </Card>

      {/* Export section */}
      <div className="bg-gradient-to-br from-[#2E7D1F] to-[#1E5A12] rounded-lg p-9 text-center text-white mt-0">
        <h3 className="font-montserrat text-[1.18rem] font-black mb-2">📤 Export All 4 Pages</h3>
        <p className="text-[0.84rem] opacity-70 mb-6 leading-relaxed">
          Download all pages with your latest changes applied — ready to upload directly to GitHub.
        </p>
        <button
          onClick={handleDownloadAll}
          className="inline-flex items-center gap-2 bg-[#F5921E] hover:bg-[#D97A10] text-white font-montserrat text-[0.88rem] font-bold px-9 py-4 rounded transition-colors"
        >
          ⬇ Download All 4 Files
        </button>
        <div className="grid grid-cols-3 gap-4 mt-7">
          {[
            { n: "1", title: "Make Changes", desc: "Edit projects, prices, gallery, contact details using the sidebar." },
            { n: "📄×4", title: "Download Files", desc: "Saves index.html + malindi.html + konza.html + kamakis.html." },
            { n: "3", title: "Upload to GitHub", desc: "Replace all 4 files in your GitHub repo to go live." },
          ].map((s) => (
            <div key={s.n} className="bg-white/10 p-4 rounded-md text-left">
              <div className="font-montserrat text-[1.35rem] font-black text-[#F5921E]">{s.n}</div>
              <div className="font-montserrat text-[0.76rem] font-bold my-1">{s.title}</div>
              <div className="text-[0.71rem] opacity-60 leading-relaxed">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
