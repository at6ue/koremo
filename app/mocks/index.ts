(async () => {
  if (typeof window !== "undefined") {
    const { worker } = await import("./browser");
    worker.start();
  }
})();

export {};
