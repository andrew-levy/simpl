import { useEffect, useState } from 'react';

export function useCopyToast() {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (copied) {
      timeout = setTimeout(() => setCopied(false), 2000);
    }
    return () => clearTimeout(timeout);
  }, [copied]);

  return { toastState: copied, triggerToast: () => setCopied(true) };
}
