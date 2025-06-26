import { render, screen } from "@testing-library/react";

import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";
import { expect } from "vitest";

describe('<BlogForm /> test', () => {
    const mockHandler = vi.fn()

    beforeEach(() => {
        mockHandler.mockReset();
        render(<BlogForm handleBlog={mockHandler} />)
    })

    test('form functionality', async () => {

        const user = userEvent.setup()

        const title = screen.getByPlaceholderText('title')
        const author = screen.getByPlaceholderText('author')
        const url = screen.getByPlaceholderText('url')

        await user.type(title, "Hero");
        await user.type(author, "dekhlo");
        await user.type(url, "local.com");

        const button = screen.getByText('create');

        await user.click(button)

        expect(mockHandler.mock.calls).toHaveLength(1);

        expect(mockHandler.mock.calls[0][0].title).toBe('Hero')
        expect(mockHandler.mock.calls[0][0].author).toBe('dekhlo')
        expect(mockHandler.mock.calls[0][0].url).toBe('local.com')


    })
})