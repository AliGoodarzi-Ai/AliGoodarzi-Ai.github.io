import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Navbar from "@/components/Navbar";
import Index from "@/pages/Index";
import Contact from "@/pages/Contact";
import Skills from "@/pages/Skills";
import NotFound from "@/pages/NotFound";
import { propagate } from "@/lib/gcn";

const renderPage = (ui: React.ReactElement) =>
  render(
    <ThemeProvider>
      <MemoryRouter>
        <Navbar />
        {ui}
      </MemoryRouter>
    </ThemeProvider>,
  );

const pages = { Index, Contact, Skills, NotFound };

describe.each(Object.entries(pages))("%s page", (_, Page) => {
  it("contains no em or en dashes", () => {
    const { container } = renderPage(<Page />);
    expect(container.textContent).not.toMatch(/[\u2013\u2014]/);
  });

  it("opens external links safely", () => {
    const { container } = renderPage(<Page />);
    container.querySelectorAll('a[target="_blank"]').forEach((a) => {
      const rel = a.getAttribute("rel") ?? "";
      expect(rel).toContain("noopener");
      expect(rel).toContain("noreferrer");
      expect(a.getAttribute("href")).toMatch(/^https:\/\//);
    });
  });

  it("gives every image alt text", () => {
    const { container } = renderPage(<Page />);
    container.querySelectorAll("img").forEach((img) => {
      expect(img.getAttribute("alt")).toBeTruthy();
    });
  });
});

describe("Navbar", () => {
  it("toggles the mobile menu", () => {
    renderPage(<div />);
    const toggle = screen.getByRole("button", { name: "Menu" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(toggle);
    expect(screen.getByRole("button", { name: "Close" })).toHaveAttribute("aria-expanded", "true");
    expect(document.getElementById("mobile-menu")).toBeInTheDocument();
  });

  it("switches theme", () => {
    renderPage(<div />);
    const [toggle] = screen.getAllByRole("button", { name: /Switch to/ });
    fireEvent.click(toggle);
    expect(document.documentElement.classList.contains("light")).toBe(true);
  });
});

describe("Mind Elevator walkthrough", () => {
  it("shows Toulmin feedback per component and then human discussions", () => {
    renderPage(<Index />);
    fireEvent.click(screen.getByRole("button", { name: "Analyse the essay" }));
    fireEvent.click(screen.getByRole("button", { name: "Rebuttal" }));
    expect(screen.getByRole("button", { name: "Rebuttal" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText(/What would someone who disagrees say first/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("tab", { name: "3. Human discussions" }));
    expect(screen.getByText(/Free transit sounds good, but who pays for it\?/)).toBeInTheDocument();
  });
});

describe("CapaCoach walkthrough", () => {
  it("fills the profile, synthesises, and writes plans that differ by profile depth", () => {
    renderPage(<Index />);
    const profile = () => screen.getByRole("complementary", { name: "Capability profile" });
    expect(within(profile()).queryByText("trail near the house")).toBeNull();

    while (screen.queryByRole("button", { name: /Next turn/ })) {
      fireEvent.click(screen.getByRole("button", { name: /Next turn/ }));
    }
    expect(within(profile()).getByText("trail near the house")).toBeInTheDocument();
    expect(within(profile()).getByText("early mornings")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Synthesise" }));
    expect(screen.getByText(/converges and conflicts/)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Write plan" }));
    expect(screen.getByText(/flat sections for your knee/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Baseline profile" }));
    expect(screen.getByText(/jog before work/)).toBeInTheDocument();
    expect(screen.getByText(/Ignores the profile: early morning/)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Start again" }));
    expect(within(profile()).queryByText("trail near the house")).toBeNull();
  });
});

describe("GCN propagation", () => {
  it("applies symmetric normalisation with self-loops", () => {
    expect(propagate(2, [[0, 1]], [1, 0])).toEqual([0.5, 0.5]);
    const h = propagate(3, [[0, 1], [1, 2]], [1, 0, 0]);
    expect(h[0]).toBeCloseTo(0.5);
    expect(h[1]).toBeCloseTo(1 / Math.sqrt(6));
    expect(h[2]).toBe(0);
  });

  it("reaches a node k hops away only after k layers", () => {
    const edges: [number, number][] = [[0, 1], [1, 2], [2, 3]];
    let h = [1, 0, 0, 0];
    for (let k = 1; k <= 3; k++) {
      h = propagate(4, edges, h);
      expect(h[k]).toBeGreaterThan(0);
      if (k < 3) expect(h[k + 1]).toBe(0);
    }
  });
});

describe("Contact page", () => {
  it("offers an email link", () => {
    renderPage(<Contact />);
    expect(screen.getByRole("link", { name: "ali.goodarzi@oulu.fi" })).toHaveAttribute(
      "href",
      "mailto:ali.goodarzi@oulu.fi",
    );
  });
});
