declare global {
  interface Window {
    impress: () => {
      init: () => void;
      next: () => void;
      prev: () => void;
      goto: (id: string) => void;
    };
  }
}

export {};
