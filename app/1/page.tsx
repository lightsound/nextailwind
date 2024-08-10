"use client";

import { memo, ReactNode, useState, useTransition } from "react";

export default function Page() {
  const tabs = ["one", "two", "three"] as const;
  const [tab, setTab] = useState<(typeof tabs)[number]>("one");

  return (
    <div className="p-4">
      <div className="mb-4 flex space-x-4">
        {tabs.map((tabName) => {
          return (
            <TabButton
              key={tabName}
              isActive={tab === tabName}
              onClick={() => setTab(tabName)}
            >
              Tab {tabName.charAt(0).toUpperCase() + tabName.slice(1)}
            </TabButton>
          );
        })}
      </div>

      <div className="rounded border p-4 text-lg">
        {tab === "one" && <p>1</p>}
        {tab === "two" && <p>2</p>}
        {tab === "three" && <HeavyTab />}
      </div>
    </div>
  );
}

function TabButton({
  children,
  isActive,
  onClick,
}: {
  children: ReactNode;
  isActive: boolean;
  onClick: () => void;
}) {
  const [isPending, startTransition] = useTransition();

  if (isActive) {
    return <b>{children}</b>;
  }

  if (isPending) {
    return <span className="text-gray-400">{children}</span>;
  }

  return (
    <button
      onClick={() => {
        // onClick();
        startTransition(() => {
          onClick();
        });
      }}
    >
      {children}
    </button>
  );
}

const HeavyTab = memo(function HeavyTab() {
  return (
    <ul>
      {Array.from({ length: 1000 }, (_, i) => (
        <SlowListItem key={i} index={i} />
      ))}
    </ul>
  );
});

function SlowListItem({ index }: { index: number }) {
  let startTime = performance.now();
  while (performance.now() - startTime < 1) {}
  return <li>#{index + 1}</li>;
}
