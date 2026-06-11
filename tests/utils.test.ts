import { afterEach, describe, expect, it, vi } from "vitest";
import { getAppBaseUrl } from "@/lib/utils";

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("getAppBaseUrl", () => {
  it("keeps localhost during local development", () => {
    vi.stubEnv("NODE_ENV", "development");
    vi.stubEnv("APP_BASE_URL", "http://localhost:3000");

    expect(getAppBaseUrl()).toBe("http://localhost:3000");
  });

  it("uses the deployed request host instead of localhost in production", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("APP_BASE_URL", "http://localhost:3000");
    const requestHeaders = new Headers({
      host: "world-cup-cal.vercel.app",
      "x-forwarded-proto": "https"
    });

    expect(getAppBaseUrl(requestHeaders)).toBe("https://world-cup-cal.vercel.app");
  });

  it("honors an explicitly configured public URL", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("APP_BASE_URL", "https://calendar.example.com");

    expect(getAppBaseUrl()).toBe("https://calendar.example.com");
  });
});
