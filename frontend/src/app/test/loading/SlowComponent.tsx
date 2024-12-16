// src/app/test/loading/SlowComponent.tsx
export async function SlowComponent() {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return <div>Content loaded!</div>;
  }