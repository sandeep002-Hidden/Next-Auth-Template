"use client";

import { useState } from "react";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { setTheme } = useTheme();
  const [mode, setMode] = useState(false);
  return (
    <>
      <div className="absolute right-8 rounded-lg p-2 font-bold text-xl bg-both text-white hover:bg-highlight font-serif text-pretty">
        {mode && (
          <div>
            <button
              onClick={() => {
                setTheme("dark");
                mode ? setMode(false) : setMode(false);
              }}
            >
              Dark Mode
            </button>
          </div>
        )}
        {!mode && (
          <div>
            <button
              onClick={() => {
                setTheme("light");
                mode ? setMode(true) : setMode(true);
              }}
            >
              Light Mode
            </button>
          </div>
        )}
      </div>
    </>
  );
}
