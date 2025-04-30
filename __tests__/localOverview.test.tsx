import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from '../src/app/local-overview/page'
import { AppContextComponent } from '../src/app/components/Layout/AppContextComponent'

describe('Page', () => {
    it('render Local HeadContainer', () => {
        const appConfig = {
            appName: 'Jest App',
            appVersion: '1.0.0',
            backend_url: 'http://localhost:3000',
            configured: true,
            background_image: false,
        }
        render(<AppContextComponent appConfig={appConfig}><Page /></AppContextComponent>)

        const headContainer = screen.getByTestId('headContainer');
        const backdrop = headContainer.querySelector('[alt=backdrop]');
        const posterCount = headContainer.querySelectorAll('[alt="poster"]').length;

        expect(headContainer).toBeInTheDocument()
        expect(backdrop).toBeInTheDocument()
        expect(posterCount).toBe(4)
    })

    it('render Local BodyContainer', () => {
        const appConfig = {
            appName: 'Jest App',
            appVersion: '1.0.0',
            backend_url: 'http://localhost:3000',
            configured: true,
            background_image: false,
        }
        render(<AppContextComponent appConfig={appConfig}><Page /></AppContextComponent>)

        const bodyContainer = screen.getByTestId('bodyContainer');
        const posterCount = bodyContainer.querySelectorAll('[alt="poster"]').length;

        expect(bodyContainer).toBeInTheDocument()
        expect(posterCount).toBe(0)
    })
})