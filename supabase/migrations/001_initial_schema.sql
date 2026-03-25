-- ─── CONTACT SUBMISSIONS ────────────────────────────────────────
create table if not exists contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  website text,
  service text not null,
  message text not null,
  status text not null default 'new' check (status in ('new','read','replied','archived')),
  created_at timestamptz not null default now()
);

-- ─── CLIENTS ────────────────────────────────────────────────────
create table if not exists clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  company text,
  phone text,
  website text,
  status text not null default 'prospect' check (status in ('active','completed','paused','prospect')),
  notes text,
  created_at timestamptz not null default now()
);

-- ─── INVOICES ───────────────────────────────────────────────────
create table if not exists invoices (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete cascade,
  invoice_number text not null unique,
  amount numeric(10,2) not null default 0,
  status text not null default 'draft' check (status in ('draft','sent','paid','overdue','cancelled')),
  due_date date not null,
  issued_date date not null default current_date,
  description text,
  line_items jsonb not null default '[]',
  created_at timestamptz not null default now()
);

-- ─── PROJECTS (portfolio) ────────────────────────────────────────
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  category text not null,
  tags text[] not null default '{}',
  image_url text,
  client_name text,
  featured boolean not null default false,
  published boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- ─── TESTIMONIALS ────────────────────────────────────────────────
create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  author_name text not null,
  author_role text not null,
  company text not null,
  content text not null,
  avatar_url text,
  featured boolean not null default false,
  published boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- ─── ROW LEVEL SECURITY ─────────────────────────────────────────
alter table contact_submissions enable row level security;
alter table clients enable row level security;
alter table invoices enable row level security;
alter table projects enable row level security;
alter table testimonials enable row level security;

-- Public can read published projects and testimonials
create policy "published projects are public" on projects
  for select using (published = true);

create policy "published testimonials are public" on testimonials
  for select using (published = true);

-- Public can insert contact submissions (anon key is fine)
create policy "anyone can submit contact" on contact_submissions
  for insert with check (true);

-- Only authenticated users (you) can read/manage everything else
create policy "admin can do everything on contacts" on contact_submissions
  for all using (auth.role() = 'authenticated');

create policy "admin can do everything on clients" on clients
  for all using (auth.role() = 'authenticated');

create policy "admin can do everything on invoices" on invoices
  for all using (auth.role() = 'authenticated');

create policy "admin can manage projects" on projects
  for all using (auth.role() = 'authenticated');

create policy "admin can manage testimonials" on testimonials
  for all using (auth.role() = 'authenticated');

-- ─── SEED DATA ───────────────────────────────────────────────────
insert into projects (title, description, category, tags, client_name, featured, published, sort_order) values
  ('SaaS Analytics Dashboard', 'Custom analytics dashboard with real-time data visualization and reporting tools.', 'Web Application', array['React','Tailwind','Supabase'], 'Meridian Health', true, true, 1),
  ('Fashion Brand E-commerce', 'Full Shopify storefront redesign with custom sections and conversion optimization.', 'E-commerce', array['Shopify','Liquid','CSS'], 'Ember Supply Co.', true, true, 2),
  ('Law Firm Rebrand', 'Complete brand identity and website redesign for a boutique legal practice.', 'Branding', array['Next.js','Figma','Tailwind'], 'Vertex Legal', true, true, 3),
  ('Fintech Landing Page', 'High-converting landing page with A/B tested copy and animated sections.', 'Landing Page', array['Next.js','Framer Motion'], null, false, true, 4),
  ('Restaurant Group Website', 'Multi-location restaurant group site with reservation integrations.', 'Website', array['Next.js','OpenTable'], null, false, true, 5),
  ('Architecture Portfolio', 'Minimal portfolio site showcasing completed projects with lightbox gallery.', 'Portfolio', array['Next.js','GSAP'], null, false, true, 6);

insert into testimonials (author_name, author_role, company, content, featured, published, sort_order) values
  ('Sarah Mitchell', 'CEO', 'Meridian Health', 'Forge delivered a complete redesign in under a week. The new site boosted our lead conversion by 40% in the first month. Genuinely impressive work.', true, true, 1),
  ('James Chen', 'Founder', 'Ember Supply Co.', 'I''ve worked with a lot of agencies. Forge is different — they actually care about the result, not just the invoice. Our Shopify store looks stunning.', true, true, 2),
  ('Alicia Reeves', 'CMO', 'Vertex Legal', 'The ROI was immediate. Within 60 days organic traffic tripled and bounce rate dropped to under 30%. Best investment we made this year.', true, true, 3);
