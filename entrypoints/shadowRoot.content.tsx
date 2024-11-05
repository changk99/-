import { createRoot } from 'react-dom/client';
import '@/assets/css/index.css';
import { Button } from '@/components/ui/button';
function App() {
  const count = 0;
  return (
    <div className="w-36 h-36 px-2 absolute top-0 left-0 bg-red-500 flex">
      <button className="m-auto bd" style={{}}>
        shadow root {count}
      </button>
      <Button className="absolute right-0 bottom-0" size={'lg'} variant={'ghost'}>
        helloworld
      </Button>
      <Button className="absolute right-0 bottom-0" size={'lg'}>
        helloworld
      </Button>
    </div>
  );
}

export default defineContentScript({
  matches: ['<all_urls>'],
  cssInjectionMode: 'ui',
  async main(ctx) {
    const ui = await createShadowRootUi(ctx, {
      name: 'example-ui',
      position: 'inline',
      onMount: (uiContainer) => {
        const app = document.createElement('div');
        uiContainer.append(app);
        const root = createRoot(app);
        root.render(<App />);
        return root;
      },
      onRemove: (root) => {
        root?.unmount();
      },
    });
    ui.mount();
  },
});
