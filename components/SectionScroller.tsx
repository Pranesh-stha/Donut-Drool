"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function getTargetFromHash(hash: string) {
  const id = decodeURIComponent(hash.replace(/^#/, ""));
  return id ? document.getElementById(id) : null;
}

function getTargetTop(target: HTMLElement) {
  return target.getBoundingClientRect().top + window.scrollY;
}

function followScrollForAnimations(duration = 2200) {
  const start = performance.now();

  const tick = (now: number) => {
    ScrollTrigger.update();

    if (now - start < duration) {
      requestAnimationFrame(tick);
    } else {
      ScrollTrigger.refresh();
      ScrollTrigger.update();
    }
  };

  requestAnimationFrame(tick);
}

function scrollToTarget(target: HTMLElement, behavior: ScrollBehavior = "smooth") {
  const top = getTargetTop(target);
  const root = document.documentElement;
  const body = document.body;

  window.scrollTo({ top, behavior });
  root.scrollTo({ top, behavior });

  if (typeof body.scrollTo === "function") {
    body.scrollTo({ top, behavior });
  } else {
    body.scrollTop = top;
  }

  followScrollForAnimations();
}

export default function SectionScroller() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const source = event.target;
      if (!(source instanceof Element)) return;

      const link = source.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!link) return;

      const target = getTargetFromHash(link.hash);
      if (!target) return;

      event.preventDefault();
      window.history.pushState(null, "", link.hash);
      scrollToTarget(target);
    };

    const onHashChange = () => {
      const target = getTargetFromHash(window.location.hash);
      if (target) scrollToTarget(target);
    };

    document.addEventListener("click", onClick);
    window.addEventListener("hashchange", onHashChange);

    if (window.location.hash) {
      requestAnimationFrame(() => {
        const target = getTargetFromHash(window.location.hash);
        if (target) scrollToTarget(target, "auto");
      });
    }

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  return null;
}
