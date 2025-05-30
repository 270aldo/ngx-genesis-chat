
import { useToast } from "@/hooks/use-toast";

export { useToast };

// Re-export toast function from the main hook
export const toast = (...args: Parameters<ReturnType<typeof useToast>['toast']>) => {
  const { toast: toastFn } = useToast();
  return toastFn(...args);
};
