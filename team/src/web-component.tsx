import * as ReactDOM from 'react-dom/client';
import App from './app/app';

class TeamAppElement extends HTMLElement {
    private root: ReactDOM.Root | null = null;

    connectedCallback() {
        this.root = ReactDOM.createRoot(this);
        this.root.render(<App />);
    }

    disconnectedCallback() {
        this.root?.unmount();
    }
}

if (!customElements.get('team-app')) {
    customElements.define('team-app', TeamAppElement);
}