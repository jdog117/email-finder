import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { WrappedApp, App } from "./App";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

describe("App", () => {
    it("Renders Find Email", () => {
        //ARRANGE
        render(<WrappedApp />);
        //ACT
        //EXPECT
        expect(
            screen.getByRole("heading", {
                level: 1,
            })
        ).toHaveTextContent("Email Finder");
    });

    // unit tests
    describe("render", () => {
        it("renders main page", () => {
            render(<WrappedApp />);
            expect(true).toBe(true);
        });
    });

    it("Renders NotFound if invalid path", () => {
        render(
            <MemoryRouter initialEntries={["/bad-route"]}>
                <App />
            </MemoryRouter>
        );
        expect(
            screen.getByRole("heading", {
                level: 1,
            })
        ).toHaveTextContent("404 - Page Not Found");
    });
});
