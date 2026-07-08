import { useEffect, useRef } from 'react';

// Set synchronously by a layer's popstate handler whenever it consumes a Back
// event (closing a layer or absorbing its own synthetic back). Because layer
// hooks live inside child components, their popstate listeners run BEFORE the
// AppShell view-history listener; the view handler reads and clears this flag
// to avoid mistaking a layer-close Back for a view navigation.
let layerConsumedPop = false;

/** True (and resets) if the most recent popstate was handled by a layer. */
export function consumeLayerPop(): boolean {
  if (layerConsumedPop) {
    layerConsumedPop = false;
    return true;
  }
  return false;
}

interface UseInAppBackOptions {
  /** Whether the layer (modal / sheet / detail) is currently open. */
  open: boolean;
  /** Called when the layer should close (Back button or hardware back). */
  onClose: () => void;
  /** Mobile-gate. When false the hook is inert (desktop stays unchanged). */
  enabled?: boolean;
}

let layerCounter = 0;

/**
 * Makes a locally-controlled overlay layer (modal, bottom sheet, fullscreen
 * detail) closeable via the browser / hardware Back button — without any
 * router migration or global store.
 *
 * How it works:
 * - When `open` becomes true, a history entry tagged with a unique `layerId`
 *   is pushed.
 * - On Back, the entry is popped; if the new top state is no longer THIS layer's
 *   entry, `onClose()` is called. The layerId comparison prevents a Back press
 *   from cascading through several stacked layers — only the topmost closes.
 * - When the layer is closed programmatically (close button / scrim / navigation),
 *   its own history entry is silently consumed if it is still on top.
 *
 * Existing close handlers keep working unchanged: they simply set `open` to
 * false, and the hook reconciles the history entry. No changes to close buttons
 * are required.
 *
 * Mobile-gated via `enabled`; when disabled it never touches history.
 */
export function useInAppBack({ open, onClose, enabled = true }: UseInAppBackOptions): void {
  const layerIdRef = useRef<string>('');
  if (!layerIdRef.current) layerIdRef.current = `rmt-layer-${++layerCounter}`;

  const isPushedRef = useRef(false);
  const ignoreNextPopRef = useRef(false);
  const openRef = useRef(open);
  const onCloseRef = useRef(onClose);

  openRef.current = open;
  onCloseRef.current = onClose;

  // Push on open; consume on programmatic (non-Back) close.
  useEffect(() => {
    if (!enabled) return;
    const layerId = layerIdRef.current;

    if (open) {
      if (!isPushedRef.current) {
        window.history.pushState({ __rmt: true, kind: 'layer', layerId }, '');
        isPushedRef.current = true;
      }
    } else if (isPushedRef.current) {
      // Layer closed via button / scrim / navigation (not via Back).
      isPushedRef.current = false;
      const state = window.history.state as { layerId?: string } | null;
      if (state?.layerId === layerId) {
        // Our entry is still on top — consume it so the stack stays balanced.
        ignoreNextPopRef.current = true;
        window.history.back();
      }
      // Otherwise our entry is buried under newer entries; leave it untouched.
    }
  }, [open, enabled]);

  // Handle the Back button. Listener is registered once while enabled.
  useEffect(() => {
    if (!enabled) return;
    const layerId = layerIdRef.current;

    const onPop = (e: PopStateEvent) => {
      if (ignoreNextPopRef.current) {
        ignoreNextPopRef.current = false;
        // Our own synthetic back (programmatic close) — mark it consumed so the
        // view-history handler does not also react to it.
        layerConsumedPop = true;
        return;
      }
      const state = e.state as { layerId?: string } | null;
      // Close only if THIS layer is open and its entry is the one that was
      // popped (the new top state is no longer ours).
      if (openRef.current && isPushedRef.current && state?.layerId !== layerId) {
        isPushedRef.current = false;
        // A layer close must never also be treated as a view navigation.
        layerConsumedPop = true;
        onCloseRef.current();
      }
    };

    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, [enabled]);
}
