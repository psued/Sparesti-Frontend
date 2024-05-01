import {onBeforeUnmount, onMounted} from 'vue'
import type {Ref} from 'vue'

/**
 * useClickOutside is a utility function that listens for clicks outside of a specified component.
 * If a click outside of the component is detected, a provided callback function is executed.
 *
 * @param {Ref<HTMLElement>} component - The component to listen for outside clicks on.
 * @param {Function} callback - The function to execute when an outside click is detected.
 * @param {Ref<HTMLElement>} excludeComponent - An optional component to exclude from the outside click detection.
 */
export default function useClickOutside(
    component: Ref<HTMLElement>,
    callback: Function,
    excludeComponent: Ref<HTMLElement>
) {
    if (!component) {
        throw new Error('A target component has to be provided.')
    }
    if (!callback) {
        throw new Error('A callback has to be provided.')
    }

    const listener = (event: MouseEvent) => {
        if (
            event.target === component.value ||
            event.composedPath().includes(component.value) ||
            event.target === excludeComponent.value ||
            event.composedPath().includes(excludeComponent.value)
        ) {
            return
        }
        if (typeof callback === 'function') {
            callback()
        }
    }

    onMounted(() => {
        window.addEventListener('click', listener)
    })

    onBeforeUnmount(() => {
        window.removeEventListener('click', listener)
    })
}