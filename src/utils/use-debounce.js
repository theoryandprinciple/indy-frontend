import { useState, useEffect } from 'react';
// https://dev.to/gabe_ragland/debouncing-with-react-hooks-jci
// Our hook

// NOTE: TP added in `initialBuildComplete` to this, because we have so many instances
// of this hook, we want to prevent the initial build from firing off a timeout
export default function useDebounce(value, delay, initialBuildComplete) {
    // State and setters for debounced value
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(
        () => {
            // Set debouncedValue to value (passed in) after the specified delay
            if (initialBuildComplete) {
                const handler = setTimeout(() => {
                    setDebouncedValue(value);
                }, delay);

                // Return a cleanup function that will be called every time ...
                // ... useEffect is re-called. useEffect will only be re-called ...
                // ... if value changes (see the inputs array below).
                // This is how we prevent debouncedValue from changing if value is ...
                // ... changed within the delay period. Timeout gets cleared and restarted.
                // To put it in context, if the user is typing within our app's ...
                // ... search box, we don't want the debouncedValue to update until ...
                // ... they've stopped typing for more than 500ms.
                return () => {
                    clearTimeout(handler);
                };
            }
            return () => {};
        },
        // Only re-call effect if value changes
        // You could also add the "delay" var to inputs array if you ...
        // ... need to be able to change that dynamically.
        [value, delay, initialBuildComplete],
    );

    return debouncedValue;
}
