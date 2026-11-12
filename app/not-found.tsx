import { MotionController } from "@/components/motion/motion-controller";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="graph-paper flex min-h-[80svh] items-center pt-16">
      <div className="shell">
        <p className="label text-muted">
          <span className="text-ink">404</span>&nbsp;&nbsp;Job not found in any queue
        </p>
        <h1 className="mt-6 text-h1 font-extrabold">
          Nothing here<span className="text-signal">.</span>
        </h1>
        <p className="mt-6 max-w-[40ch] text-lg text-muted">
          This page was never scheduled — or it has been retried and dropped.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/" className="btn btn-primary">
            Back home
          </Link>
          <Link href="/projects" className="btn btn-secondary">
            All projects
          </Link>
        </div>
      </div>
      <MotionController />
    </div>
  );
}
