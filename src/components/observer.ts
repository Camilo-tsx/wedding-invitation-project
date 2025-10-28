export const useObserver = (
  domElement: NodeListOf<Element>,
  addedClassName: string
) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(addedClassName);
        }
      });
    },
    { threshold: 0.5 }
  );

  domElement.forEach((el) => observer.observe(el));

  return () => {
    observer.disconnect();
  };
};
