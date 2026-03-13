import { SiteData, Project } from "@/types";

// ── Helpers ──────────────────────────────────────────────────────────────────

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function featureTags(features: string[]): string {
  return features
    .filter(Boolean)
    .map((f) => `<span class="proj-feat">${esc(f)}</span>`)
    .join("");
}

function projectTypeTag(type: string): string {
  if (type === "apt") return "Apartments";
  if (type === "house") return "Houses";
  if (type === "commercial") return "Commercial";
  return "Land for Sale";
}

function projectTypeClass(type: string): string {
  return type === "apt" ? "tag-apt" : "tag-land";
}

// ── INDEX HTML ───────────────────────────────────────────────────────────────

export function generateIndexHtml(data: SiteData): string {
  const { projects, banners, testimonials, blogPosts, contact, logo } = data;

  const projectCards = projects
    .map((p) => {
      const typeLabel = projectTypeTag(p.type);
      const typeClass = projectTypeClass(p.type);
      const anchor = p.id === "ma" ? "malindi" : p.id === "ko" ? "konza" : "kamakis";
      return `
<div class="proj-card">
  <div class="proj-img">
    <img src="${esc(p.imageUrl)}" alt="${esc(p.name)}">
    <span class="proj-tag ${typeClass}">${typeLabel}</span>
    <span class="proj-status">${esc(p.statusBadge)}</span>
  </div>
  <div class="proj-body">
    <div class="proj-location">📍 ${esc(p.location)}</div>
    <div class="proj-name">${esc(p.name)}</div>
    <p class="proj-desc">${esc(p.shortDesc)}</p>
    <div class="proj-features">${featureTags(p.features)}</div>
    <div class="proj-price-row">
      <div>
        <div class="proj-price">${esc(p.price)}</div>
        <div class="proj-price-sub">${esc(p.priceSubtitle)}</div>
      </div>
      <button class="proj-cta" onclick="document.getElementById('${anchor}').scrollIntoView({behavior:'smooth'})">Learn More</button>
    </div>
  </div>
</div>`;
    })
    .join("\n");

  const whyCards = banners
    .map(
      (b) => `
<div class="wc">
  <img class="wc-img" src="${esc(b.img)}" alt="${esc(b.title)}">
  <div class="wc-overlay"></div>
  <span class="wc-tag">${esc(b.tag)}</span>
  <div class="wc-body">
    <div class="wc-title">${esc(b.title)}</div>
    <p class="wc-desc">${esc(b.desc)}</p>
  </div>
</div>`
    )
    .join("\n");

  const testiCards = testimonials
    .map(
      (t) => `
<div class="testi-card">
  <div class="testi-avatar">${esc(t.initials)}</div>
  <div class="testi-quote">"${esc(t.quote)}"</div>
  <div class="testi-name">${esc(t.name)}</div>
  <div class="testi-role">${esc(t.role)}</div>
</div>`
    )
    .join("\n");

  const blogCards = blogPosts
    .map(
      (b) => `
<div class="blog-card">
  <div class="blog-img" style="background-image:url('${esc(b.img)}')">
    <span class="blog-badge">${esc(b.statusBadge)}</span>
  </div>
  <div class="blog-body">
    <div class="blog-cat">${esc(b.category)}</div>
    <div class="blog-loc">📍 ${esc(b.location)}</div>
    <div class="blog-title">${esc(b.title)}</div>
    <p class="blog-excerpt">${esc(b.excerpt)}</p>
    <div class="blog-meta">${esc(b.date)} · ${esc(b.readTime)}</div>
  </div>
</div>`
    )
    .join("\n");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(logo.part1)}${esc(logo.part2)} — ${esc(logo.tagline)}</title>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800;900&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">
<style>
:root{--o:#F5921E;--g:#2E7D1F;--bk:#1A1A1A;--w:#fff;--gl:#F5F5F5;--gm:#E0E0E0;--gr:#666;}
*{margin:0;padding:0;box-sizing:border-box;}
body{font-family:'Open Sans',sans-serif;color:var(--bk);}
.top-bar{background:var(--bk);padding:.5rem 2rem;display:flex;justify-content:space-between;align-items:center;font-size:.75rem;color:rgba(255,255,255,.6);}
.top-bar a{color:rgba(255,255,255,.6);text-decoration:none;}
nav{background:var(--w);padding:1rem 2rem;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--gm);position:sticky;top:0;z-index:100;box-shadow:0 2px 10px rgba(0,0,0,.08);}
.logo{display:flex;align-items:center;gap:.6rem;text-decoration:none;}
.logo-triangle{width:0;height:0;border-left:9px solid transparent;border-right:9px solid transparent;border-bottom:16px solid var(--g);}
.logo-text{font-family:'Montserrat',sans-serif;font-size:1.2rem;font-weight:800;}
.logo-text .ardhi{color:var(--bk)}.logo-text .soko{color:var(--o)}
.logo-tagline{font-size:.58rem;color:var(--gr);letter-spacing:.1em;text-transform:uppercase;}
.nav-links{display:flex;list-style:none;gap:1.5rem;}
.nav-links a{text-decoration:none;font-family:'Montserrat',sans-serif;font-size:.8rem;font-weight:600;color:var(--bk);}
.nav-cta{background:var(--o);color:var(--w)!important;padding:.5rem 1.2rem;border-radius:4px;}
.hero{position:relative;height:80vh;min-height:500px;display:flex;align-items:center;overflow:hidden;}
.hero-bg{position:absolute;inset:0;background:url('${esc(logo.heroImage)}') center/cover no-repeat;filter:brightness(.45);}
.hero-content{position:relative;z-index:1;padding:0 8%;max-width:700px;}
.hero-badge{display:inline-flex;align-items:center;gap:.5rem;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.2);color:#fff;font-family:'Montserrat',sans-serif;font-size:.72rem;font-weight:700;padding:.4rem 1rem;border-radius:20px;margin-bottom:1.2rem;backdrop-filter:blur(6px);}
.badge-dot{width:8px;height:8px;background:var(--o);border-radius:50%;}
.hero-title{font-family:'Montserrat',sans-serif;font-size:3.2rem;font-weight:900;color:#fff;line-height:1.1;margin-bottom:1.2rem;}
.hero-title .hl{color:var(--o);}
.hero-sub{color:rgba(255,255,255,.75);font-size:.95rem;line-height:1.7;margin-bottom:2rem;max-width:560px;}
.hero-btns{display:flex;gap:1rem;}
.btn-primary{background:var(--o);color:#fff;border:none;padding:1rem 2.2rem;border-radius:4px;font-family:'Montserrat',sans-serif;font-size:.88rem;font-weight:700;cursor:pointer;transition:background .2s;}
.btn-primary:hover{background:#D97A10}
.btn-outline{background:transparent;color:#fff;border:2px solid rgba(255,255,255,.4);padding:1rem 2.2rem;border-radius:4px;font-family:'Montserrat',sans-serif;font-size:.88rem;font-weight:700;cursor:pointer;transition:all .2s;}
.btn-outline:hover{border-color:#fff;}
.stats-strip{display:grid;grid-template-columns:repeat(5,1fr);background:var(--bk);padding:1.5rem 5%;}
.ss-block{text-align:center;border-right:1px solid rgba(255,255,255,.08);padding:0 1rem;}
.ss-block:last-child{border:none;}
.ss-num{font-family:'Montserrat',sans-serif;font-size:1.5rem;font-weight:900;color:var(--o);}
.ss-lbl{font-size:.66rem;color:rgba(255,255,255,.4);text-transform:uppercase;letter-spacing:.08em;margin-top:.2rem;}
.sec{padding:5rem 8%;}
.sec-eyebrow{font-family:'Montserrat',sans-serif;font-size:.7rem;font-weight:800;letter-spacing:.2em;text-transform:uppercase;color:var(--o);margin-bottom:.8rem;}
.sec-title{font-family:'Montserrat',sans-serif;font-size:2.2rem;font-weight:900;line-height:1.2;margin-bottom:1rem;}
.sec-title span{color:var(--o);}
.sec-desc{font-size:.95rem;color:var(--gr);line-height:1.75;max-width:580px;margin-bottom:3rem;}
.projects-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;}
.proj-card{background:var(--w);border-radius:8px;overflow:hidden;border:1px solid var(--gm);transition:box-shadow .2s;}
.proj-card:hover{box-shadow:0 12px 40px rgba(0,0,0,.12);}
.proj-img{position:relative;height:220px;overflow:hidden;}
.proj-img img{width:100%;height:100%;object-fit:cover;transition:transform .4s;}
.proj-card:hover .proj-img img{transform:scale(1.04);}
.proj-tag{position:absolute;top:.8rem;left:.8rem;font-family:'Montserrat',sans-serif;font-size:.6rem;font-weight:800;padding:.24rem .6rem;border-radius:2px;letter-spacing:.06em;text-transform:uppercase;}
.tag-land{background:var(--g);color:#fff}.tag-apt{background:var(--bk);color:#fff}
.proj-status{position:absolute;top:.8rem;right:.8rem;background:var(--o);color:#fff;font-family:'Montserrat',sans-serif;font-size:.58rem;font-weight:700;padding:.22rem .58rem;border-radius:2px;letter-spacing:.06em;text-transform:uppercase;}
.proj-body{padding:1.2rem;}
.proj-location{font-size:.66rem;color:var(--o);font-family:'Montserrat',sans-serif;font-weight:700;letter-spacing:.1em;text-transform:uppercase;margin-bottom:.3rem;}
.proj-name{font-family:'Montserrat',sans-serif;font-size:1rem;font-weight:800;margin-bottom:.6rem;}
.proj-desc{font-size:.82rem;color:var(--gr);line-height:1.6;margin-bottom:.9rem;}
.proj-features{display:flex;flex-wrap:wrap;gap:.3rem;margin-bottom:1rem;}
.proj-feat{background:var(--gl);font-family:'Montserrat',sans-serif;font-size:.6rem;font-weight:700;padding:.2rem .6rem;border-radius:2px;color:var(--bk);}
.proj-price-row{display:flex;align-items:center;justify-content:space-between;}
.proj-price{font-family:'Montserrat',sans-serif;font-size:1.15rem;font-weight:900;color:var(--g);}
.proj-price-sub{font-size:.68rem;color:var(--gr);}
.proj-cta{background:var(--o);color:#fff;border:none;padding:.55rem 1.2rem;border-radius:4px;font-family:'Montserrat',sans-serif;font-size:.72rem;font-weight:700;cursor:pointer;transition:background .2s;}
.proj-cta:hover{background:#D97A10}
.why-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;}
.wc{position:relative;border-radius:8px;overflow:hidden;height:260px;}
.wc-img{width:100%;height:100%;object-fit:cover;display:block;}
.wc-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.8) 0%,transparent 55%);}
.wc-tag{position:absolute;top:.8rem;left:.8rem;background:var(--o);color:#fff;font-family:'Montserrat',sans-serif;font-size:.58rem;font-weight:800;padding:.2rem .6rem;border-radius:2px;text-transform:uppercase;letter-spacing:.08em;}
.wc-body{position:absolute;bottom:0;left:0;right:0;padding:1.2rem;}
.wc-title{font-family:'Montserrat',sans-serif;font-size:.9rem;font-weight:800;color:#fff;margin-bottom:.3rem;}
.wc-desc{font-size:.75rem;color:rgba(255,255,255,.75);line-height:1.5;}
.testi-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;}
.testi-card{background:var(--w);border-radius:8px;padding:2rem;border:1px solid var(--gm);}
.testi-avatar{width:52px;height:52px;border-radius:50%;background:var(--g);color:#fff;font-family:'Montserrat',sans-serif;font-size:1rem;font-weight:800;display:flex;align-items:center;justify-content:center;margin-bottom:1.2rem;}
.testi-quote{font-size:.88rem;color:var(--bk);line-height:1.75;margin-bottom:1.2rem;font-style:italic;}
.testi-name{font-family:'Montserrat',sans-serif;font-size:.85rem;font-weight:800;}
.testi-role{font-size:.72rem;color:var(--gr);margin-top:.2rem;}
.blog-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;}
.blog-card{background:var(--w);border-radius:8px;overflow:hidden;border:1px solid var(--gm);cursor:pointer;transition:box-shadow .2s;}
.blog-card:hover{box-shadow:0 8px 30px rgba(0,0,0,.1);}
.blog-img{height:180px;background:center/cover no-repeat;position:relative;}
.blog-badge{position:absolute;top:.7rem;right:.7rem;background:var(--o);color:#fff;font-family:'Montserrat',sans-serif;font-size:.58rem;font-weight:800;padding:.2rem .6rem;border-radius:2px;text-transform:uppercase;}
.blog-body{padding:1.2rem;}
.blog-cat{font-family:'Montserrat',sans-serif;font-size:.6rem;font-weight:800;text-transform:uppercase;letter-spacing:.1em;color:var(--o);margin-bottom:.2rem;}
.blog-loc{font-size:.65rem;color:var(--gr);margin-bottom:.4rem;}
.blog-title{font-family:'Montserrat',sans-serif;font-size:.92rem;font-weight:800;line-height:1.3;margin-bottom:.6rem;}
.blog-excerpt{font-size:.8rem;color:var(--gr);line-height:1.6;margin-bottom:.8rem;}
.blog-meta{font-size:.68rem;color:var(--gr);border-top:1px solid var(--gm);padding-top:.6rem;}
.enquiry-form{background:var(--gl);border-radius:8px;padding:2.5rem;max-width:600px;margin:0 auto;}
.enquiry-form input,.enquiry-form select,.enquiry-form textarea{width:100%;padding:.8rem 1rem;border:1.5px solid var(--gm);border-radius:4px;font-family:'Open Sans',sans-serif;font-size:.9rem;outline:none;margin-bottom:1rem;transition:border-color .2s;}
.enquiry-form input:focus,.enquiry-form select:focus,.enquiry-form textarea:focus{border-color:var(--o);}
.enquiry-form textarea{min-height:100px;resize:vertical;}
.submit-btn{width:100%;background:var(--o);color:#fff;border:none;padding:1rem;border-radius:4px;font-family:'Montserrat',sans-serif;font-size:.9rem;font-weight:700;cursor:pointer;transition:background .2s;}
.submit-btn:hover{background:#D97A10}
footer{background:var(--bk);color:rgba(255,255,255,.5);padding:3rem 8%;font-size:.8rem;}
.footer-top{display:grid;grid-template-columns:1fr 1fr 1fr;gap:3rem;margin-bottom:2rem;}
.footer-brand .fn{font-family:'Montserrat',sans-serif;font-size:1.1rem;font-weight:800;margin-bottom:.3rem;}
.footer-brand .fn .a{color:#fff}.footer-brand .fn .s{color:var(--o)}
.footer-bottom{border-top:1px solid rgba(255,255,255,.08);padding-top:1.5rem;text-align:center;}
</style>
</head>
<body>

<div class="top-bar">
  <div>
    <a href="tel:${esc(contact.phone)}">${esc(contact.phone)}</a> &nbsp;·&nbsp;
    <a href="mailto:${esc(contact.email)}">${esc(contact.email)}</a>
  </div>
  <span>${esc(logo.tagline)}</span>
</div>

<nav>
  <a href="#" class="logo">
    <div class="logo-triangle"></div>
    <div>
      <div class="logo-text"><span class="ardhi">${esc(logo.part1)}</span><span class="soko">${esc(logo.part2)}</span></div>
      <div class="logo-tagline">${esc(logo.tagline)}</div>
    </div>
  </a>
  <ul class="nav-links">
    <li><a href="#projects">Our Projects</a></li>
    <li><a href="#malindi">Malindi</a></li>
    <li><a href="#konza">Konza</a></li>
    <li><a href="#kamakis">Kamakis</a></li>
    <li><a href="#enquiry" class="nav-cta">Enquire Now</a></li>
  </ul>
</nav>

<div class="hero">
  <div class="hero-bg"></div>
  <div class="hero-content">
    <div class="hero-badge"><div class="badge-dot"></div><span>3 Premium Projects — Across Kenya</span></div>
    <h1 class="hero-title">Own Prime Land.<br>Live <span class="hl">Premium.</span><br>Invest Smart.</h1>
    <p class="hero-sub">${esc(logo.part1)}${esc(logo.part2)} brings you three hand-picked property investments across Kenya.</p>
    <div class="hero-btns">
      <button class="btn-primary" onclick="document.getElementById('projects').scrollIntoView({behavior:'smooth'})">View Our Projects</button>
      <button class="btn-outline" onclick="document.getElementById('enquiry').scrollIntoView({behavior:'smooth'})">Enquire Now</button>
    </div>
  </div>
</div>

<div class="stats-strip">
  <div class="ss-block"><div class="ss-num">3</div><div class="ss-lbl">Prime Locations</div></div>
  <div class="ss-block"><div class="ss-num">${esc(projects[0]?.plotSize ?? "1 Acre")}</div><div class="ss-lbl">Malindi Plots</div></div>
  <div class="ss-block"><div class="ss-num">${esc(projects[1]?.plotSize ?? "1/8 Acre")}</div><div class="ss-lbl">Konza Plots</div></div>
  <div class="ss-block"><div class="ss-num">${esc(projects[2]?.plotSize ?? "1BR-3BR")}</div><div class="ss-lbl">Kamakis Units</div></div>
  <div class="ss-block"><div class="ss-num">✓</div><div class="ss-lbl">Title Deed Ready</div></div>
</div>

<section class="sec" style="background:#fff" id="projects">
  <div class="sec-eyebrow">Our Projects</div>
  <h2 class="sec-title">Three locations.<br><span>One trusted developer.</span></h2>
  <p class="sec-desc">Whether you are looking for a coastal retreat, a smart tech-city investment, or a modern apartment — ${esc(logo.part1)}${esc(logo.part2)} has the right property for you.</p>
  <div class="projects-grid">${projectCards}</div>
</section>

<section class="sec" style="background:var(--gl)">
  <div class="sec-eyebrow">Why Buy With Us</div>
  <h2 class="sec-title">Buy with total <span>confidence.</span></h2>
  <p class="sec-desc">Every property we sell is legally verified, competitively priced, and backed by our full support team.</p>
  <div class="why-grid">${whyCards}</div>
</section>

<section class="sec" style="background:#fff">
  <div class="sec-eyebrow">Trusted by Real Buyers</div>
  <h2 class="sec-title">What our <span>clients say.</span></h2>
  <div class="testi-grid">${testiCards}</div>
</section>

<section class="sec" style="background:var(--gl)">
  <div class="sec-eyebrow">Property Insights</div>
  <h2 class="sec-title">Latest from <span>our blog.</span></h2>
  <div class="blog-grid">${blogCards}</div>
</section>

<section class="sec" style="background:#fff" id="enquiry">
  <div class="sec-eyebrow">Get In Touch</div>
  <h2 class="sec-title" style="text-align:center">Enquire <span>Now</span></h2>
  <div class="enquiry-form">
    <input type="text" placeholder="Your Full Name">
    <input type="tel" placeholder="Phone / WhatsApp">
    <select>
      <option value="">Select a Project</option>
      ${projects.map((p) => `<option>${esc(p.name)}</option>`).join("\n      ")}
    </select>
    <textarea placeholder="Any questions or message?"></textarea>
    <button class="submit-btn" onclick="alert('Thank you! We will contact you shortly.')">Send Enquiry →</button>
  </div>
</section>

<footer>
  <div class="footer-top">
    <div class="footer-brand">
      <div class="fn"><span class="a">${esc(logo.part1)}</span><span class="s">${esc(logo.part2)}</span></div>
      <div>${esc(logo.tagline)}</div>
      <div style="margin-top:.8rem">${esc(contact.address)}</div>
    </div>
    <div>
      <div style="font-family:'Montserrat',sans-serif;font-weight:800;color:#fff;margin-bottom:.8rem">Our Projects</div>
      ${projects.map((p) => `<div style="margin-bottom:.4rem">${esc(p.name)}</div>`).join("\n      ")}
    </div>
    <div>
      <div style="font-family:'Montserrat',sans-serif;font-weight:800;color:#fff;margin-bottom:.8rem">Contact</div>
      <div>${esc(contact.phone)}</div>
      <div style="margin-top:.3rem">${esc(contact.email)}</div>
      <div style="margin-top:.3rem">WhatsApp: ${esc(contact.whatsapp)}</div>
    </div>
  </div>
  <div class="footer-bottom">© ${new Date().getFullYear()} ${esc(logo.part1)}${esc(logo.part2)}. All rights reserved.</div>
</footer>

</body>
</html>`;
}

// ── PROJECT PAGE HTML ─────────────────────────────────────────────────────────

export function generateProjectHtml(data: SiteData, projectId: string): string {
  const { contact, logo } = data;
  const project = data.projects.find((p) => p.id === projectId);
  if (!project) return "<html><body>Project not found</body></html>";

  const galleryImgs = project.gallery
    .filter((g) => g.url)
    .map((g, i) => `<div class="gslide ${i === 0 ? "active" : ""}" onclick="goSlide(${i})"><img src="${esc(g.url)}" alt="Gallery ${i + 1}"></div>`)
    .join("\n");

  const specItems = project.specs
    .map((s) => `<div class="spec-item"><div class="spec-val">${esc(s.value)}</div><div class="spec-lbl">${esc(s.label)}</div></div>`)
    .join("\n");

  const featureItems = project.detailFeatures
    .filter(Boolean)
    .map((f) => `<li>✓ ${esc(f)}</li>`)
    .join("\n");

  const planCards = project.paymentPlans
    .map(
      (plan) => `
<div class="plan-card${plan.featured ? " featured" : ""}">
  ${plan.featured ? '<div class="plan-popular">★ Most Popular</div>' : ""}
  <div class="plan-label">${esc(plan.label)}</div>
  <div class="plan-deposit">${esc(plan.deposit)}</div>
  <div class="plan-detail">${esc(plan.detail).replace(/\n/g, "<br>")}</div>
</div>`
    )
    .join("\n");

  const typeLabel = projectTypeTag(project.type);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(project.name)} — ${esc(logo.part1)}${esc(logo.part2)}</title>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800;900&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">
<style>
:root{--o:#F5921E;--g:#2E7D1F;--bk:#1A1A1A;--w:#fff;--gl:#F5F5F5;--gm:#E0E0E0;--gr:#666;}
*{margin:0;padding:0;box-sizing:border-box;}
body{font-family:'Open Sans',sans-serif;color:var(--bk);}
nav{background:var(--w);padding:1rem 2rem;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--gm);position:sticky;top:0;z-index:100;box-shadow:0 2px 10px rgba(0,0,0,.08);}
.logo{display:flex;align-items:center;gap:.6rem;text-decoration:none;}
.logo-t{width:0;height:0;border-left:9px solid transparent;border-right:9px solid transparent;border-bottom:16px solid var(--g);}
.logo-n{font-family:'Montserrat',sans-serif;font-size:1.2rem;font-weight:800;}
.logo-n .a{color:var(--bk)}.logo-n .s{color:var(--o)}
.back-btn{background:var(--gl);border:1.5px solid var(--gm);color:var(--bk);font-family:'Montserrat',sans-serif;font-size:.75rem;font-weight:700;padding:.5rem 1.2rem;border-radius:4px;cursor:pointer;text-decoration:none;}
.hero-strip{background:var(--bk);padding:2.5rem 8%;display:flex;align-items:center;justify-content:space-between;}
.hs-tag{font-family:'Montserrat',sans-serif;font-size:.65rem;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:var(--o);margin-bottom:.5rem;}
.hs-name{font-family:'Montserrat',sans-serif;font-size:2rem;font-weight:900;color:#fff;line-height:1.2;}
.hs-loc{font-size:.85rem;color:rgba(255,255,255,.55);margin-top:.4rem;}
.price-bar{background:var(--o);padding:1rem 8%;display:flex;align-items:center;justify-content:space-between;}
.pb-price{font-family:'Montserrat',sans-serif;font-size:1.6rem;font-weight:900;color:#fff;}
.pb-sub{font-size:.8rem;color:rgba(255,255,255,.8);margin-top:.1rem;}
.pb-badge{background:rgba(255,255,255,.2);color:#fff;font-family:'Montserrat',sans-serif;font-size:.72rem;font-weight:700;padding:.4rem 1rem;border-radius:20px;}
.pb-actions{display:flex;gap:.8rem;}
.pb-btn{padding:.7rem 1.5rem;border-radius:4px;font-family:'Montserrat',sans-serif;font-size:.78rem;font-weight:700;cursor:pointer;border:none;}
.pb-wa{background:#25D366;color:#fff}.pb-call{background:#fff;color:var(--o)}
.gallery{display:grid;grid-template-columns:2fr 1fr 1fr;grid-template-rows:1fr 1fr;gap:.5rem;height:420px;padding:2rem 8%;}
.gslide{overflow:hidden;border-radius:4px;cursor:pointer;}
.gslide:first-child{grid-row:1/-1;border-radius:6px;}
.gslide img{width:100%;height:100%;object-fit:cover;transition:transform .3s;}
.gslide:hover img{transform:scale(1.04);}
.content{padding:3rem 8%;display:grid;grid-template-columns:1fr 380px;gap:2.5rem;}
.about h2{font-family:'Montserrat',sans-serif;font-size:1.4rem;font-weight:800;margin-bottom:1rem;}
.about p{font-size:.9rem;color:var(--gr);line-height:1.8;margin-bottom:2rem;}
.specs-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin-bottom:2.5rem;}
.spec-item{background:var(--gl);padding:1rem;border-radius:6px;border-left:3px solid var(--o);}
.spec-val{font-family:'Montserrat',sans-serif;font-size:1.1rem;font-weight:900;color:var(--bk);}
.spec-lbl{font-size:.68rem;color:var(--gr);text-transform:uppercase;letter-spacing:.06em;margin-top:.2rem;}
.features-list{columns:2;gap:1.5rem;margin-bottom:2.5rem;}
.features-list li{font-size:.88rem;color:var(--bk);margin-bottom:.5rem;list-style:none;font-family:'Montserrat',sans-serif;font-weight:600;}
.plans-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin-top:1.5rem;}
.plan-card{background:var(--gl);border-radius:8px;padding:1.5rem;border-top:3px solid var(--o);text-align:center;}
.plan-card.featured{border-top-color:var(--g);background:var(--g);color:#fff;}
.plan-popular{font-family:'Montserrat',sans-serif;font-size:.6rem;font-weight:800;color:var(--o);text-transform:uppercase;letter-spacing:.1em;margin-bottom:.5rem;}
.plan-card.featured .plan-popular{color:#fff;}
.plan-label{font-family:'Montserrat',sans-serif;font-size:.82rem;font-weight:800;}
.plan-deposit{font-family:'Montserrat',sans-serif;font-size:2rem;font-weight:900;color:var(--o);margin:.4rem 0;}
.plan-card.featured .plan-deposit{color:#fff;}
.plan-detail{font-size:.8rem;color:var(--gr);line-height:1.6;}
.plan-card.featured .plan-detail{color:rgba(255,255,255,.8);}
.sticky-cta{position:sticky;top:76px;background:var(--w);border-radius:8px;border:1px solid var(--gm);padding:1.5rem;box-shadow:0 4px 20px rgba(0,0,0,.08);height:fit-content;}
.cta-price{font-family:'Montserrat',sans-serif;font-size:1.8rem;font-weight:900;color:var(--g);}
.cta-sub{font-size:.75rem;color:var(--gr);margin-bottom:1.2rem;}
.cta-btn{width:100%;padding:.9rem;border-radius:4px;font-family:'Montserrat',sans-serif;font-size:.82rem;font-weight:700;cursor:pointer;border:none;margin-bottom:.6rem;transition:background .2s;}
.cta-wa{background:#25D366;color:#fff}
.cta-call{background:var(--g);color:#fff}
.cta-wa:hover{background:#1ea852}.cta-call:hover{background:#1E5A12}
footer{background:var(--bk);color:rgba(255,255,255,.5);padding:2rem 8%;text-align:center;font-size:.8rem;margin-top:3rem;}
</style>
</head>
<body>

<nav>
  <a href="index.html" class="logo">
    <div class="logo-t"></div>
    <div class="logo-n"><span class="a">${esc(logo.part1)}</span><span class="s">${esc(logo.part2)}</span></div>
  </a>
  <a href="index.html" class="back-btn">← Back to All Projects</a>
</nav>

<div class="hero-strip">
  <div>
    <div class="hs-tag">${typeLabel}</div>
    <div class="hs-name">${esc(project.name)}</div>
    <div class="hs-loc">📍 ${esc(project.location)}</div>
  </div>
</div>

<div class="price-bar">
  <div>
    <div class="pb-price">${esc(project.price)}</div>
    <div class="pb-sub">${esc(project.priceSubtitle)}</div>
  </div>
  <div class="pb-badge">${esc(project.availBadge)}</div>
  <div class="pb-actions">
    <button class="pb-btn pb-wa" onclick="window.open('https://wa.me/${esc(contact.whatsapp)}','_blank')">💬 WhatsApp</button>
    <button class="pb-btn pb-call" onclick="window.location='tel:${esc(contact.phone)}'">📞 Call Now</button>
  </div>
</div>

<div class="gallery">
  ${galleryImgs || `<div class="gslide active" style="background:#eee;display:flex;align-items:center;justify-content:center;color:#999">No images</div>`}
</div>

<div class="content">
  <div class="about">
    <h2>About ${esc(project.name)}</h2>
    <p>${esc(project.fullDesc)}</p>
    
    <h2 style="margin-bottom:1rem">Key Details</h2>
    <div class="specs-grid">${specItems}</div>

    <h2 style="margin-bottom:.8rem">Features & Highlights</h2>
    <ul class="features-list">${featureItems}</ul>

    <h2 style="margin-bottom:.5rem">Flexible Payment Plans</h2>
    <p style="font-size:.85rem;color:var(--gr);margin-bottom:1rem">Choose the plan that works best for you.</p>
    <div class="plans-grid">${planCards}</div>
  </div>

  <div>
    <div class="sticky-cta">
      <div class="cta-price">${esc(project.price)}</div>
      <div class="cta-sub">${esc(project.priceSubtitle)}</div>
      <button class="cta-btn cta-wa" onclick="window.open('https://wa.me/${esc(contact.whatsapp)}?text=Hi, I am interested in ${encodeURIComponent(project.name)}','_blank')">
        💬 WhatsApp Us Now
      </button>
      <button class="cta-btn cta-call" onclick="window.location='tel:${esc(contact.phone)}'">
        📞 Call ${esc(contact.phone)}
      </button>
      <div style="margin-top:.8rem;font-size:.72rem;color:var(--gr);text-align:center;line-height:1.5">
        ${esc(project.availNote)}
      </div>
    </div>
  </div>
</div>

<footer>
  <div style="font-family:'Montserrat',sans-serif;font-weight:800;font-size:1rem;margin-bottom:.4rem">
    <span style="color:#fff">${esc(logo.part1)}</span><span style="color:var(--o)">${esc(logo.part2)}</span>
  </div>
  ${esc(contact.phone)} · ${esc(contact.email)}<br>
  © ${new Date().getFullYear()} ${esc(logo.part1)}${esc(logo.part2)}. All rights reserved.
</footer>

</body>
</html>`;
}
