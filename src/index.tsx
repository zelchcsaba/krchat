import { render } from 'preact';
import './index.css';
import { Login } from './Login';
import { Main } from './Main';
import { useEffect, useState } from 'preact/hooks';
import { chatService } from './ChatService';
import "./Pwa";

// --- Push notification engedélykérés ---
if ('Notification' in window) {
    Notification.requestPermission().then(permission => {
        console.log('Notification permission:', permission);
    });
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(reg => console.log('Service Worker registered:', reg))
        .catch(err => console.error('SW registration failed:', err));
}

function App() {
    let [renderCount, setRenderCount] = useState(1);
    console.log("App render count: " + renderCount);
    useEffect(() => {
        const listener = () => setRenderCount(x => x + 1);
        chatService.addListener(listener);
        return () => chatService.removeListener(listener);
    }, []);
    return chatService.inbox ? <Main /> : <Login />;
}

render(<App />, document.getElementById('app'));
