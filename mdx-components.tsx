import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef } from "react";

// Long-form project write-ups. Keeps prose at ~66ch and styles tables/code to
// match the notebook look.
const components = {
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2
      className="mt-16 mb-5 border-t border-ink pt-4 font-display text-[clamp(28px,3vw,36px)] leading-tight font-bold tracking-[-0.025em] first:mt-0"
      {...props}
    />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3 className="mt-10 mb-3 font-display text-[22px] font-semibold tracking-[-0.015em]" {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => <p className="my-5 max-w-[66ch]" {...props} />,
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="my-5 grid max-w-[66ch] gap-3 [&>li]:relative [&>li]:pl-6 [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-signal-ink [&>li]:before:content-['→']" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => <ol className="my-5 max-w-[66ch] list-decimal gap-3 pl-6" {...props} />,
  strong: (props: ComponentPropsWithoutRef<"strong">) => <strong className="font-semibold text-ink" {...props} />,
  a: (props: ComponentPropsWithoutRef<"a">) => {
    const external = props.href?.startsWith("http");
    return <a className="link" {...(external ? { target: "_blank", rel: "noopener" } : {})} {...props} />;
  },
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code className="rounded-chip bg-paper-sunk px-1.5 py-0.5 font-mono text-[0.85em] [pre_&]:bg-transparent [pre_&]:p-0" {...props} />
  ),
  pre: (props: ComponentPropsWithoutRef<"pre">) => (
    <pre className="my-6 overflow-x-auto border border-rule bg-paper-raised p-5 font-mono text-[13px] leading-relaxed" {...props} />
  ),
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div className="my-6 overflow-x-auto border-y border-ink">
      <table className="w-full min-w-[520px] border-collapse text-left text-sm" {...props} />
    </div>
  ),
  th: (props: ComponentPropsWithoutRef<"th">) => (
    <th className="label border-b border-ink px-3 py-3 font-normal text-muted first:pl-0" {...props} />
  ),
  td: (props: ComponentPropsWithoutRef<"td">) => (
    <td className="border-b border-rule px-3 py-3 align-top first:pl-0" {...props} />
  ),
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
