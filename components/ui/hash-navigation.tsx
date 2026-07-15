"use client";

import { useEffect } from "react";

function focusHashDestination(hash: string) {
  if (!hash.startsWith("#") || hash.length === 1) return;

  let id = hash.slice(1);
  try {
    id = decodeURIComponent(id);
  } catch {
    return;
  }

  const destination = document.getElementById(id);
  if (!destination) return;

  const hadTabIndex = destination.hasAttribute("tabindex");
  if (!hadTabIndex) destination.setAttribute("tabindex", "-1");
  destination.focus({ preventScroll: true });

  if (!hadTabIndex) {
    destination.addEventListener(
      "blur",
      () => destination.removeAttribute("tabindex"),
      { once: true },
    );
  }
}

export function HashNavigation() {
  useEffect(() => {
    function handleDocumentClick(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        !(event.target instanceof Element)
      ) {
        return;
      }

      const anchor = event.target.closest<HTMLAnchorElement>('a[href^="#"]');
      const hash = anchor?.getAttribute("href");
      if (!hash) return;

      window.setTimeout(() => focusHashDestination(hash), 0);
    }

    function handleHashChange() {
      focusHashDestination(window.location.hash);
    }

    document.addEventListener("click", handleDocumentClick);
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return null;
}
