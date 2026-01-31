"use client";

import { BG_IMAGE_URL } from '@/constants/links';

export default function BackgroundImage() {
  return (
    <div
      className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('" + BG_IMAGE_URL + "')",
      }}
    />
  );
}
