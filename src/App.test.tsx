import {render, screen} from '@testing-library/react'
import App from "./App.tsx";
import {describe, expect, test} from "vitest";
import "@testing-library/jest-dom/vitest"

describe("App tests", () => {
    test("component renders", () => {
        // Test case code
        render(<App/>);
        expect(screen.getByText(/Car Shop/i)).toBeInTheDocument();
    })
})