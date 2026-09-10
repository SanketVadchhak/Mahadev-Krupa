/**
 * Tiny module-level store for passing a selected vehicle name
 * from the fleet cards to the contact form's vehicle dropdown.
 * Uses a simple event emitter pattern — no external dependency needed.
 */

type Listener = (vehicleName: string) => void;
const listeners = new Set<Listener>();

export const bookingStore = {
    /** Call this when a user clicks "Book" on a fleet card */
    selectVehicle(vehicleName: string) {
        listeners.forEach(fn => {
            if (typeof fn === 'function') {
                try {
                    fn(vehicleName);
                } catch (e) {
                    console.error('bookingStore notify error:', e);
                }
            }
        });
    },
    subscribe(fn: Listener): () => void {
        if (typeof fn === 'function') {
            listeners.add(fn);
        }
        return () => {
            if (typeof fn === 'function') {
                listeners.delete(fn);
            }
        };
    },
};
