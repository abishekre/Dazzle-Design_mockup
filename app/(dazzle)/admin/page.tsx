import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { ArrowIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Team area",
  robots: { index: false, follow: false },
};

// Placeholder hub for the team. Will be gated by Supabase auth
// (profiles.role = 'admin') when the backend lands — for now it is simply
// unlinked and noindexed.
const tools = [
  { href: "/admin/studio", title: "Photo studio", desc: "Preview a phone photo with the site's warm styling before adding it." },
  { href: "/admin/leads", title: "Quote requests", desc: "Incoming leads and their status (coming with the backend).", soon: true },
];

export default function AdminPage() {
  return (
    <>
      <PageHeader
        eyebrow="Team area"
        title="Dazzle admin"
        intro="Tools for the three of us. This area will sit behind a team login once the backend is connected."
      />
      <div className="container-content mt-10">
        <ul className="grid max-w-2xl gap-4 sm:grid-cols-2">
          {tools.map((t) => (
            <li key={t.href}>
              <Link
                href={t.href}
                aria-disabled={t.soon}
                className={`group flex h-full flex-col rounded-xl border border-border bg-surface p-5 transition-colors hover:border-primary/40 ${
                  t.soon ? "pointer-events-none opacity-60" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-xl">{t.title}</h2>
                  {t.soon ? (
                    <span className="rounded-full bg-surface-2 px-2.5 py-1 text-[11px] font-semibold text-muted">Soon</span>
                  ) : (
                    <ArrowIcon className="h-4 w-4 text-primary-strong transition-transform group-hover:translate-x-1" />
                  )}
                </div>
                <p className="mt-2 text-sm text-muted">{t.desc}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
