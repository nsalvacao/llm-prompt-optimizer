import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App Smoke Tests', () => {
    it('should render without crashing', () => {
        render(<App />)
        expect(document.body).toBeDefined()
    })

    it('should display the main title', () => {
        render(<App />)
        const title = screen.getByText(/LLM Prompt Optimizer/i)
        expect(title).toBeInTheDocument()
    })

    it('should display the optimize button', () => {
        render(<App />)
        const button = screen.getByRole('button', { name: /optimize/i })
        expect(button).toBeInTheDocument()
    })

    it('should have a textarea for prompt input', () => {
        render(<App />)
        const textarea = screen.getByPlaceholderText(/enter your prompt/i)
        expect(textarea).toBeInTheDocument()
    })

    it('should display all LLM selection buttons', () => {
        render(<App />)
        expect(screen.getByText(/Gemini/i)).toBeInTheDocument()
        expect(screen.getByText(/Anthropic/i)).toBeInTheDocument()
        expect(screen.getByText(/OpenAI/i)).toBeInTheDocument()
        expect(screen.getByText(/Meta/i)).toBeInTheDocument()
    })

    it('should display template section', () => {
        render(<App />)
        const templateHeader = screen.getByText(/Start with a Template/i)
        expect(templateHeader).toBeInTheDocument()
    })

    it('should display history sidebar', () => {
        render(<App />)
        const historyTab = screen.getByRole('button', { name: /history/i })
        const favoritesTab = screen.getByRole('button', { name: /favorites/i })
        expect(historyTab).toBeInTheDocument()
        expect(favoritesTab).toBeInTheDocument()
    })
})
